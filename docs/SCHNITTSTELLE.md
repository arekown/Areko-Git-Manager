# Areko Git Manager – Schnittstelle C++ ↔ QML

Verbindlicher Vertrag zwischen den drei Arbeitspaketen (A: Git lesen, B: Aktionen & Updates, C: Oberfläche).
Vorbild für Aussehen und Verhalten: `entwurf/areko-git-manager-entwurf-v2.html` (abgenommen 13.11.2026).

Grundregeln für alle C++-Teile:
- Signale kommen immer im GUI-Thread an. Git/Prozesse laufen in Worker-Threads (`QtConcurrent::run`), nie im GUI-Thread.
- Prozesse nur über `runGit()` / `runTool()` aus `src/gitrun.h` (Zeitlimit, kein Passwort-Prompt, `LC_ALL=C`, `GIT_OPTIONAL_LOCKS=0`).
- Pfade (`path`) sind immer **absolut**; `display` ist die `~/…`-Form für die Anzeige.
- **`~/AI/ComfyUI/user/` wird nie gelesen, durchsucht oder verändert.** Für das Repo `~/AI/ComfyUI` wird `git status` nur mit
  `--untracked-files=no` aufgerufen; der Scanner steigt nie in `…/ComfyUI/user` ab.
- Testdaten-Modus: Umgebungsvariable `AGM_FIXTURE=<…>/entwurf/repos2.json` (Daten des Entwurfs). Dann liefern alle Singletons
  diese Daten statt echter Git-Aufrufe. Dieser Modus muss erhalten bleiben (Oberflächen-Tests, Bildschirmfotos).
- Datum immer ISO 8601 mit Zeitzone (`git … --format=%aI`).

## RepoStore (Paket A) – `src/repostore.h`

| Mitglied | Bedeutung |
|---|---|
| `repos` (Liste) | Repo-Zusammenfassungen, siehe unten |
| `busy` | Einlesen läuft |
| `roots` | durchsuchte Ordner (absolut), Vorgabe `~/projects ~/Anwendungen ~/AI ~/localweb`, gespeichert per `QSettings` |
| `fixture` | Testdaten-Modus aktiv |
| `githubUser` | Login des angemeldeten GitHub-Nutzers (`AGM_GITHUB_USER`, sonst einmal `gh api user --jq .login` im Worker-Thread, zwischengespeichert); `""` = kein gh oder nicht angemeldet – dann gilt kein Repo als eigenes GitHub-Repo |
| `rescan()` | alle Ordner neu durchsuchen; Ergebnis über `reposChanged` |
| `setRoots(list)` | Ordner setzen, speichern, neu einlesen |
| `refreshRepo(path)` | nur dieses Repo neu lesen (nach Commit/Pull/Update), ersetzt den Eintrag in `repos` |
| `reloadVisibility()` | GitHub-Sichtbarkeit neu holen: **ein** `gh repo list <githubUser> --limit 200 --json name,visibility` (nur wenn es ein Repo mit `github` gibt), Ergebnis im Speicher, schreibt `repos[i].visibility`; läuft nach jedem `rescan()` von selbst, die Oberfläche ruft es nach `visibility`/`publish`. Schlägt gh fehl, bleiben die letzten Werte |
| `loadHistory(path, count)` | die neuesten `count` Versionen über alle Zweige → `historyLoaded(path, commits, edges, maxLane, total)` |
| `loadDetail(path, hash)` | Dateien einer Version → `detailLoaded(path, hash, detail)` |
| `loadDiff(path, hash, file)` | Diff einer Datei in einer Version → `diffLoaded(path, hash, file, lines)` |
| `error(path, message)` | Fehlertext (deutsch, kurz) |

**Repo-Zusammenfassung** (`repos[i]`):
```
{ name, path, display,
  group: "eigen" | "fremd",          // eigen = kein Remote oder Remote-Besitzer = githubUser
  sub: "" | <Repo-Name> | "Sonstige",   // nur für fremd: Name des äußersten Repos, in dessen Ordner es liegt
                                        // (oder sein eigener, wenn darin fremde Repos liegen), sonst "Sonstige"
  remote: "" | URL von origin, branch: aktueller Zweig ("" = losgelöst),
  github: "" | "<githubUser>/<name>",  // nur eigen, origin github.com/<githubUser>/<name>
  visibility: "" | "private" | "public",   // aus reloadVisibility; "" = kein eigenes GitHub-Repo oder noch unbekannt
  dirty: Zahl geänderter Dateien (ComfyUI ohne unversionierte; -1 = Prüfung fehlgeschlagen/Zeit abgelaufen),
  ahead, behind: gegenüber Upstream (behind -1 = kein Upstream),
  count: Versionen in HEAD, lastDate: ISO der neuesten Version (alle Zweige),
  refs: [{kind: "branch"|"remote"|"tag", name, date, hash(7), subject}],   // neueste zuerst, max. 40
  worktrees: [{path, display, branch, agent: bool, active: bool}],         // [0] = Hauptarbeitskopie
       // agent = Pfad unter .claude/worktrees/ oder .worktrees/; active = ein laufender Prozess hat dort sein cwd
  activity: [30 Zahlen],               // Versionen pro Tag, letzte 30 Tage, alle Zweige, [29] = heute
  timeline: {from, to, bins: [48]} | null }   // ganze Geschichte in 48 Abschnitten, from/to = Unix-Sekunden
```

**Version** (`commits[i]` in `historyLoaded`, neueste zuerst, `--date-order`):
```
{ id, hash(7), parents: [ids], date, author, refs: ["HEAD -> main", "tag: v1", "origin/main", …],
  subject, body (max 600 Zeichen), hasImage: bool,   // ändert ein Bild (png/jpg/webp/gif)
  lane }                                              // Spur aus graphlayout.h
```
`edges`: `[{from, to, fromLane, toLane, first}]` (`to = -1`: Vorgänger nicht geladen → Linie bis unten). `maxLane` ≤ 7.
`total` = Zahl aller Versionen (für „neueste N von M“). Nachladen beim Scrollen: erneut `loadHistory(path, count + 300)`.

**Detail** (`detailLoaded`):
```
{ files: [{name, status: "A"|"M"|"D"|"R", add, rem,     // add/rem = -1 bei Binärdateien
           imgOld: URL | "", imgNew: URL | ""}],       // Bilder: image://gitblob/… (Testdaten: file://…)
  filesTotal, add, rem, loaded: true }
```
Bild-URLs liefert Paket A über einen `QQuickImageProvider` namens `gitblob` (Registrierung in `main.cpp`, Datei `src/blobimageprovider.*`):
`image://gitblob/<rev>/<base64url(repo)>/<base64url(datei)>` (ohne `=`); `rev` = Hex-Hash oder `WORKTREE` (Datei von der Platte).
In C++ erzeugt `BlobImageProvider::url(rev, repo, file)` die URL.
`lines` (`diffLoaded`): Zeilen wie im Entwurf (`@@ …`, `+…`, `-…`, ` …`), höchstens 4000; danach `… (gekürzt)`.

## GitActions (Paket B) – `src/gitactions.h`

| Mitglied | Bedeutung |
|---|---|
| `busyPaths` | Repos, an denen gerade eine Aktion läuft |
| `loadWorkingTree(path)` | → `workingTreeLoaded(path, tree)` |
| `loadWorkingDiff(path, file)` | → `workingDiffLoaded(path, file, hunks)` |
| `setFileStaged(path, file, staged)` | ganze Datei vormerken / zurücknehmen; danach beide Signale neu |
| `setHunkStaged(path, file, hunk, staged)` | einen Abschnitt vormerken / zurücknehmen (`git apply --cached [-R]`) |
| `commit(path, subject, body, push)` | committet das Vorgemerkte; mit `push` danach normaler Push |
| `pull(path)` | nur `git pull --ff-only`; bei Konflikt/Abweichung Abbruch mit Erklärung |
| `push(path)` | normaler Push, **nie** `--force`; ohne Upstream `push -u origin <zweig>` |
| `discardFile(path, file)` | Änderungen einer Datei verwerfen (die Oberfläche fragt vorher nach) |
| `publishToGitHub(path, name, makePublic)` | `gh repo create <githubUser>/<name> --private\|--public --source <path> --push` (`makePublic` Vorgabe `false`) |
| `setVisibility(path, makePublic)` | `gh repo edit <githubUser>/<name> --visibility public\|private --accept-visibility-change-consequences` (nur eigenes origin `github.com/<githubUser>/<name>`; die Oberfläche fragt vorher nach). Ergebnis `actionFinished(path, "visibility", …)`, danach `RepoStore.reloadVisibility()` |
| `inspectUnpublish(path)` | „Nur noch lokal“ prüfen: `git fetch origin`, dann `git rev-list --count --remotes=origin --not --branches --tags` → `unpublishInspected(path, {github, canDeleteGithub, onlyRemote, fetchError})`; `onlyRemote` = Versionen nur auf GitHub, `-1` = Abgleich fehlgeschlagen (`fetchError`) |
| `unpublish(path)` | prüft dasselbe noch einmal (nur bei `onlyRemote == 0` und Token-Recht `delete_repo`), dann `gh repo delete <githubUser>/<name> --yes` und `git remote remove origin`; der Ordner bleibt unberührt. Ergebnis `actionFinished(path, "unpublish", …)`, danach `RepoStore.refreshRepo(path)` |
| `actionFinished(path, action, ok, message)` | Ergebnis jeder Aktion; `message` deutsch, kurz |

`tree`: `{files: [{name, status: "M"|"A"|"D"|"R"|"?", staged: 0|1|2 (nichts/teilweise/ganz), add, rem, binary}], branch, ahead, behind, remote}`
`hunks`: `[{header: "@@ …", lines: [...], staged: bool}]` – erst die nicht vorgemerkten, dann die vorgemerkten Abschnitte;
`setHunkStaged(…, hunk, …)` zählt in genau dieser Reihenfolge.

`action` in `actionFinished`: `commit`, `commit+push`, `pull`, `push`, `discard`, `publish`, `visibility`, `unpublish`, `delete`, `deleteref`, außerdem `stage` (Fehler beim Vormerken)
und `status` (Fehler beim Lesen des Arbeitsstands).

**Löschen** (erst prüfen, die Oberfläche fragt nach, dann löschen):

| Mitglied | Bedeutung |
|---|---|
| `inspectDelete(path)` | → `deleteInspected(path, info)` |
| `deleteRepo(path, alsoGithub)` | ganzer Ordner **in den Papierkorb** (`QFile::moveToTrash`, nie endgültig), dazu die verknüpften Arbeitskopien außerhalb des Ordners; mit `alsoGithub` vorher `gh repo delete <githubUser>/<name> --yes` (nur eigenes origin `github.com/<githubUser>/<name>` und Token-Recht `delete_repo`). Ergebnis `actionFinished(path, "delete", …)`; danach `RepoStore.refreshRepo(path)` (auch für jedes `nested`), das den Eintrag entfernt |
| `inspectRef(path, kind, name)` | `kind` = `branch` \| `worktree` \| `tag`; bei `worktree` ist `name` der absolute Pfad der Arbeitskopie → `refInspected(path, kind, name, refInfo)` |
| `deleteRef(path, kind, name)` | Zweig `branch -D` (eigene Versionen) bzw. `-d`, Arbeitskopie `worktree remove` (`--force` bei nicht committeten Dateien), Tag `tag -d` (nur lokal). Ergebnis `actionFinished(path, "deleteref", …)` |

`info` (`deleteInspected`):
```
{ name, display, size (Bytes, -1 = nicht gelesen), sizeText ("1,2 GB"), dirty (-1 = nicht lesbar), unpushed (Versionen auf keinem Remote),
  onlyLocal (kein Remote), nested: [{path, display}],              // weitere Repos im Ordner, werden mitgelöscht
  worktrees: [{path, display, branch, inside, exists, dirty}],     // verknüpfte Arbeitskopien (ohne Hauptarbeitskopie)
  github: "" | "<githubUser>/<name>", canDeleteGithub, blocked, blockReason }
```
`blocked`: Ordner ist, enthält oder liegt in `~/AI/ComfyUI/user`, ist `~`/`/` oder kein Repo – dann wird **nichts** darunter gelesen.
Agenten-Warnung: die Oberfläche nimmt `agent`/`active` aus `repos[i].worktrees`.

`refInfo` (`refInspected`): `{reason ("" = löschbar, sonst Grund: aktueller Zweig, in Arbeitskopie ausgecheckt, Hauptarbeitskopie …),
unique (Versionen nur in diesem Zweig), dirty (nicht committete Dateien der Arbeitskopie), branch, display, hasRemote}`.

## Updates (Paket B) – `src/updates.h`

| Mitglied | Bedeutung |
|---|---|
| `news` | Map `path → {n, c: [{h, d, a, s}]}`: n neue Upstream-Versionen, c = bis zu 15 neueste (Hash, Datum, Autor, Betreff) |
| `checking` | Prüfung läuft |
| `checkAll(paths)` | prüft die fremden Repos im Hintergrund (`git ls-remote`, nur bei Änderung `git fetch`) |
| `updateRepo(path)` / `updateRepos(paths)` | `git pull --ff-only`; danach `RepoStore.refreshRepo` durch die Oberfläche |
| `programs` | `[{name, file, display, version, repo, latest, outdated, releases: [{tag, date, body}]}]` |
| `refreshPrograms()` | AppImages im Programm-Ordner (`QSettings` `programs/dir`, Vorgabe `~/Anwendungen/HomeSuite`) + GitHub-Releases des Repos aus der eingebetteten Update-Information (`.upd_info`: `gh-releases-zsync\|<owner>\|<repo>\|…`); ohne diese Information nur die Version, keine Releases |
| `updateProgram(name)` | neueste AppImage laden, ausführbar machen, alte ersetzen, `.desktop`-Starter auf den neuen Dateinamen ändern |
| `launchProgram(name)` | AppImage starten |
| `inspectProgramDelete(name)` | → `programDeleteInspected(name, {files: [{path, display, sizeText}], launchers: [{path, display}], size, sizeText})`; `files` = alle AppImages dieses Programms im Ordner (jede Version), `launchers` = `.desktop`-Starter, die auf eine davon zeigen |
| `deleteProgram(name)` | diese AppImages und Starter in den Papierkorb, Eintrag aus `programs` entfernen, danach `refreshPrograms()` |
| `progress(path, text)` / `actionFinished(path, action, ok, message)` | Fortschritt / Ergebnis; `action` = `update`, `program`, `launch`, `deleteprogram`. Bei Programmen steht in `path` und in `busyPaths` der **Programmname** statt eines Pfads |

## Desktop (fertig) – `src/desktop.h`
`openFolder(path)` (Dolphin), `openTerminal(path)` (Konsole), `openEditor(path)` (Kate), `openUrl(url)`, `copyText(text)`, `homePath()`.

## Theme (fertig) – `qml/Theme.qml`
Farben und Schriften des Entwurfs (`Theme.cyan`, `Theme.lanes`, `Theme.folders`, `Theme.head` = Orbitron, `Theme.num` = Rajdhani, `Theme.mono` = Share Tech Mono).
