<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="en" sourcelanguage="de">
<context>
    <name>CommitDetail</name>
    <message>
        <location filename="../qml/CommitDetail.qml" line="88"/>
        <source>Zusammenführung</source>
        <comment>merge commit</comment>
        <translation>Merge</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Datei</source>
        <translation>%1 file</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Dateien</source>
        <translation>%1 files</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>LISTE</source>
        <extracomment>file view switch: list / map of tiles</extracomment>
        <translation>LIST</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>KARTE</source>
        <translation>MAP</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="222"/>
        <source>▣ Bild</source>
        <translation>▣ Image</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="223"/>
        <source>binär</source>
        <translation>binary</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/CommitDetail.qml" line="245"/>
        <source>+ %n weitere Dateien</source>
        <translation>
            <numerusform>+ %n more file</numerusform>
            <numerusform>+ %n more files</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="264"/>
        <source>Für diese Version liegen keine Dateiänderungen vor.</source>
        <translation>No file changes in this commit.</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Binärdatei – kein Text-Diff.</source>
        <translation>Binary file – no text diff.</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Keine Textänderungen.</source>
        <translation>No text changes.</translation>
    </message>
</context>
<context>
    <name>GitActions</name>
    <message>
        <location filename="../src/gitactions.cpp" line="75"/>
        <source>Zeitüberschreitung</source>
        <translation>Timed out</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="77"/>
        <source>git ließ sich nicht starten</source>
        <translation>git could not be started</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="354"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (truncated)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="392"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>An action is already running for this repo.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="457"/>
        <source>Arbeitsstand nicht lesbar: %1</source>
        <translation>Could not read working state: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="487"/>
        <location filename="../src/gitactions.cpp" line="518"/>
        <location filename="../src/gitactions.cpp" line="680"/>
        <source>Diese Datei darf nicht bearbeitet werden.</source>
        <translation>This file must not be edited.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="491"/>
        <location filename="../src/gitactions.cpp" line="522"/>
        <location filename="../src/gitactions.cpp" line="684"/>
        <source>Datei hat keine Änderungen mehr.</source>
        <translation>File no longer has changes.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Vormerken fehlgeschlagen: %1</source>
        <translation>Staging failed: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Zurücknehmen fehlgeschlagen: %1</source>
        <translation>Unstaging failed: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="524"/>
        <source>Neue Dateien lassen sich nur als ganze Datei vormerken.</source>
        <translation>New files can only be staged as a whole.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="527"/>
        <source>Abschnitt gibt es nicht mehr – Ansicht wurde neu geladen.</source>
        <translation>Hunk no longer exists – view reloaded.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="537"/>
        <source>Abschnitt ließ sich nicht ändern: %1</source>
        <translation>Could not change hunk: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="545"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Pull nicht möglich.</source>
        <translation>No branch checked out (detached HEAD) – cannot pull.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="549"/>
        <source>Kein Upstream-Zweig eingestellt – nichts zu holen.</source>
        <translation>No upstream branch set – nothing to pull.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="559"/>
        <source>Lokal und auf dem Server gibt es unterschiedliche neue Versionen. Pull holt nur ohne Zusammenführen (fast-forward) – nichts wurde geändert.</source>
        <translation>Local and server have diverging new commits. Pull only fast-forwards (no merge) – nothing was changed.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="562"/>
        <source>Lokale Änderungen würden überschrieben – erst committen oder verwerfen.</source>
        <translation>Local changes would be overwritten – commit or discard them first.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="564"/>
        <source>Konflikt beim Holen – bitte selbst klären.</source>
        <translation>Conflict while pulling – please resolve it yourself.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="566"/>
        <source>Pull fehlgeschlagen: %1</source>
        <translation>Pull failed: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="571"/>
        <source>Schon aktuell.</source>
        <translation>Already up to date.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>1 neue Version geholt.</source>
        <translation>Pulled 1 new commit.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>%1 neue Versionen geholt.</source>
        <translation>Pulled %1 new commits.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="583"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Push nicht möglich.</source>
        <translation>No branch checked out (detached HEAD) – cannot push.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="594"/>
        <source>Kein Server (origin) eingerichtet – erst „Auf GitHub sichern“.</source>
        <translation>No server (origin) set up – use “Back up to GitHub” first.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="601"/>
        <source>Schon aktuell auf dem Server.</source>
        <translation>Server already up to date.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="602"/>
        <source>Hochgeladen.</source>
        <translation>Pushed.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="607"/>
        <source>Auf dem Server gibt es neuere Versionen – erst Pull</source>
        <translation>The server has newer commits – pull first</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="609"/>
        <source>Push fehlgeschlagen: %1</source>
        <translation>Push failed: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="617"/>
        <location filename="../src/gitactions.cpp" line="649"/>
        <location filename="../src/gitactions.cpp" line="662"/>
        <location filename="../src/gitactions.cpp" line="675"/>
        <location filename="../src/gitactions.cpp" line="722"/>
        <location filename="../src/gitactions.cpp" line="1006"/>
        <location filename="../src/gitactions.cpp" line="1077"/>
        <location filename="../src/gitactions.cpp" line="1196"/>
        <location filename="../src/gitactions.cpp" line="1241"/>
        <source>OK (Testdaten)</source>
        <translation>OK (test data)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="623"/>
        <source>Kurzbeschreibung fehlt.</source>
        <translation>Summary missing.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="626"/>
        <source>Nichts vorgemerkt – erst Dateien oder Abschnitte auswählen.</source>
        <translation>Nothing staged – select files or hunks first.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="628"/>
        <location filename="../src/gitactions.cpp" line="635"/>
        <source>Commit fehlgeschlagen: %1</source>
        <translation>Commit failed: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="638"/>
        <source>Committet (%1).</source>
        <translation>Committed (%1).</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="641"/>
        <source>Committet (%1), aber nicht hochgeladen: %2</source>
        <translation>Committed (%1), but not pushed: %2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="642"/>
        <source>Committet (%1) und hochgeladen.</source>
        <translation>Committed (%1) and pushed.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="698"/>
        <location filename="../src/gitactions.cpp" line="706"/>
        <source>Verwerfen fehlgeschlagen: %1</source>
        <translation>Discard failed: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="711"/>
        <source>Konnte „%1“ nicht in den Papierkorb legen – nichts gelöscht.</source>
        <translation>Could not move “%1” to the trash – nothing deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Verworfen – neue Datei liegt im Papierkorb.</source>
        <translation>Discarded – new file moved to the trash.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Änderungen verworfen.</source>
        <translation>Changes discarded.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="728"/>
        <source>Ungültiger Repo-Name (erlaubt: Buchstaben, Ziffern, . _ -).</source>
        <translation>Invalid repo name (allowed: letters, digits, . _ -).</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="730"/>
        <source>Hat schon einen Server (origin) – nichts angelegt.</source>
        <translation>Already has a server (origin) – nothing created.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="732"/>
        <source>Noch keine Version – erst committen.</source>
        <translation>No commits yet – commit first.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="742"/>
        <location filename="../src/gitactions.cpp" line="1209"/>
        <source>GitHub: %1</source>
        <translation>GitHub: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="743"/>
        <source>Öffentlich auf GitHub gesichert: %1</source>
        <translation>Backed up publicly on GitHub: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="743"/>
        <source>Privat auf GitHub gesichert: %1</source>
        <translation>Backed up privately on GitHub: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="771"/>
        <source>Gesperrt: Wurzelordner</source>
        <translation>Locked: root folder</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="774"/>
        <source>Gesperrt: enthält ~/AI/ComfyUI/user</source>
        <translation>Locked: contains ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="777"/>
        <source>Gesperrt: persönlicher Ordner</source>
        <translation>Locked: home folder</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="882"/>
        <source>Kein Git-Repository</source>
        <translation>Not a Git repository</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="941"/>
        <source>Ungültiger Name.</source>
        <translation>Invalid name.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="945"/>
        <source>Den Zweig gibt es nicht mehr.</source>
        <translation>The branch no longer exists.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="950"/>
        <source>Das ist der aktuelle Zweig – erst einen anderen auschecken.</source>
        <translation>This is the current branch – check out another one first.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="951"/>
        <source>Ist in der Arbeitskopie %1 ausgecheckt – erst die Arbeitskopie entfernen.</source>
        <translation>Checked out in worktree %1 – remove the worktree first.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="962"/>
        <source>Die Arbeitskopie gibt es nicht mehr.</source>
        <translation>The worktree no longer exists.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="966"/>
        <source>Die Hauptarbeitskopie lässt sich nicht entfernen.</source>
        <translation>The main worktree cannot be removed.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="975"/>
        <source>Den Tag gibt es nicht mehr.</source>
        <translation>The tag no longer exists.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="979"/>
        <source>Nur lokale Zweige, Arbeitskopien und Tags lassen sich löschen.</source>
        <translation>Only local branches, worktrees and tags can be deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1013"/>
        <source>%1 – nichts gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – nothing deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1015"/>
        <source>Kein Git-Repository – nichts gelöscht.</source>
        <translation>Not a Git repository – nothing deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1023"/>
        <source>Arbeitskopie %1 ist gesperrt – nichts gelöscht.</source>
        <translation>Worktree %1 is locked – nothing deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1030"/>
        <location filename="../src/gitactions.cpp" line="1247"/>
        <source>Kein eigenes GitHub-Repo – nichts gelöscht.</source>
        <translation>Not your own GitHub repo – nothing deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1032"/>
        <location filename="../src/gitactions.cpp" line="1249"/>
        <source>gh darf keine Repos löschen (Recht delete_repo fehlt) – nichts gelöscht.</source>
        <translation>gh may not delete repos (delete_repo scope missing) – nothing deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1035"/>
        <location filename="../src/gitactions.cpp" line="1258"/>
        <source>GitHub: %1 – nichts gelöscht.</source>
        <translation>GitHub: %1 – nothing deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1039"/>
        <source>„%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>Could not move “%1” to the trash.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1040"/>
        <source>Auf GitHub gelöscht, aber „%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>Deleted on GitHub, but could not move “%1” to the trash.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1046"/>
        <source>„%1“ liegt im Papierkorb</source>
        <extracomment>start of a message that goes on with the parts below and ends with &quot;.&quot;</extracomment>
        <translation>“%1” moved to the trash</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ 1 Arbeitskopie)</source>
        <translation> (+ 1 worktree)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ %1 Arbeitskopien)</source>
        <translation> (+ %1 worktrees)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1051"/>
        <source>, %1 auf GitHub gelöscht</source>
        <translation>, %1 deleted on GitHub</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1054"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> Not moved to the trash: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1092"/>
        <source>Zweig nicht gelöscht: %1</source>
        <translation>Branch not deleted: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1093"/>
        <source>Zweig „%1“ gelöscht.</source>
        <translation>Branch “%1” deleted.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1101"/>
        <source>Arbeitskopie nicht in den Papierkorb verschoben.</source>
        <translation>Worktree not moved to the trash.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1103"/>
        <source>Arbeitskopie %1 in den Papierkorb verschoben.</source>
        <translation>Worktree %1 moved to the trash.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1107"/>
        <source>Arbeitskopie nicht entfernt: %1</source>
        <translation>Worktree not removed: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1108"/>
        <source>Arbeitskopie %1 entfernt.</source>
        <translation>Worktree %1 removed.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1112"/>
        <source>Tag nicht gelöscht: %1</source>
        <translation>Tag not deleted: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1113"/>
        <source>Tag „%1“ lokal gelöscht.</source>
        <translation>Tag “%1” deleted locally.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1202"/>
        <source>Kein eigenes GitHub-Repo – nichts geändert.</source>
        <translation>Not your own GitHub repo – nothing changed.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt öffentlich.</source>
        <translation>%1 is now public.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt privat.</source>
        <translation>%1 is now private.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1253"/>
        <source>Abgleich mit GitHub fehlgeschlagen: %1 – nichts gelöscht.</source>
        <translation>Check against GitHub failed: %1 – nothing deleted.</translation>
    </message>
    <message numerus="yes">
        <location filename="../src/gitactions.cpp" line="1255"/>
        <source>%n Versionen gibt es nur auf GitHub – vorher Pull. Nichts gelöscht.</source>
        <translation>
            <numerusform>%n commit exists only on GitHub – pull first. Nothing deleted.</numerusform>
            <numerusform>%n commits exist only on GitHub – pull first. Nothing deleted.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1261"/>
        <source>%1 auf GitHub gelöscht, aber origin ließ sich nicht entfernen: %2</source>
        <translation>%1 deleted on GitHub, but origin could not be removed: %2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1262"/>
        <source>%1 auf GitHub gelöscht – das Projekt ist nur noch lokal.</source>
        <translation>%1 deleted on GitHub – the project is now local only.</translation>
    </message>
</context>
<context>
    <name>ImageCompare</name>
    <message>
        <location filename="../qml/ImageCompare.qml" line="11"/>
        <source>◀ ALT</source>
        <translation>◀ OLD</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU ▶</source>
        <translation>NEW ▶</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU HINZUGEFÜGT</source>
        <translation>NEWLY ADDED</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>lädt …</source>
        <translation>loading …</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>Bild nicht lesbar</source>
        <translation>Image not readable</translation>
    </message>
</context>
<context>
    <name>Main</name>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>ALLE</source>
        <extracomment>filter chips in the header</extracomment>
        <translation>ALL</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>EIGENE</source>
        <translation>MINE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>NUR LOKAL</source>
        <translation>LOCAL ONLY</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>GEÄNDERT</source>
        <translation>CHANGED</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>UPDATES</source>
        <translation>UPDATES</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>FREMD</source>
        <translation>EXTERNAL</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="289"/>
        <source>Ordner zum Durchsuchen wählen</source>
        <translation>Choose folder to scan</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="400"/>
        <source>Projekt suchen …</source>
        <translation>Search projects …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="441"/>
        <source>⟳ LESE EIN …</source>
        <extracomment>status line in the header; the counters are upper case like the rest of the line</extracomment>
        <translation>⟳ SCANNING …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n REPOS</source>
        <translation>
            <numerusform>%n REPO</numerusform>
            <numerusform>%n REPOS</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n PROGRAMME</source>
        <translation>
            <numerusform>%n PROGRAM</numerusform>
            <numerusform>%n PROGRAMS</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="443"/>
        <source>%n OHNE SICHERUNG</source>
        <translation>
            <numerusform>%n NOT BACKED UP</numerusform>
            <numerusform>%n NOT BACKED UP</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="444"/>
        <source>%n UPDATES</source>
        <translation>
            <numerusform>%n UPDATE</numerusform>
            <numerusform>%n UPDATES</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="451"/>
        <source>⟳ Neu einlesen</source>
        <translation>⟳ Rescan</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Lese Repositories ein …</source>
        <translation>Scanning repositories …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Keine Repositories gefunden.</source>
        <translation>No repositories found.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="625"/>
        <source>ÄNDERUNGEN VERWERFEN</source>
        <translation>DISCARD CHANGES</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="632"/>
        <source>Die neue Datei „%1“ kommt in den Papierkorb.</source>
        <translation>The new file “%1” will be moved to the trash.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="633"/>
        <source>Alle Änderungen an „%1“ werden verworfen.</source>
        <translation>All changes to “%1” will be discarded.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="638"/>
        <source>Das lässt sich nicht rückgängig machen.</source>
        <translation>This cannot be undone.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="644"/>
        <source>Verwerfen</source>
        <translation>Discard</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="646"/>
        <location filename="../qml/Main.qml" line="728"/>
        <location filename="../qml/Main.qml" line="895"/>
        <location filename="../qml/Main.qml" line="932"/>
        <location filename="../qml/Main.qml" line="998"/>
        <location filename="../qml/Main.qml" line="1083"/>
        <location filename="../qml/Main.qml" line="1150"/>
        <source>Abbrechen</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="651"/>
        <source>☁ AUF GITHUB SICHERN</source>
        <translation>☁ BACK UP TO GITHUB</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="664"/>
        <source>Legt auf GitHub ein Repository an und lädt alle Versionen von „%1“ hoch.</source>
        <translation>Creates a repository on GitHub and pushes all commits of “%1”.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="669"/>
        <source>NAME</source>
        <extracomment>name of the new GitHub repository</extracomment>
        <translation>NAME</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="681"/>
        <source>SICHTBARKEIT</source>
        <translation>VISIBILITY</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="688"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 PRIVATE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="689"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ PUBLIC</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="711"/>
        <source>Nur Buchstaben, Ziffern, Punkt, Minus und Unterstrich.</source>
        <translation>Only letters, digits, dot, hyphen and underscore.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>öffentlich</source>
        <translation>public</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>privat</source>
        <translation>private</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="720"/>
        <location filename="../qml/Main.qml" line="924"/>
        <source>Jeder kann den Code und alle bisherigen Versionen sehen.</source>
        <translation>Anyone can see the code and all previous commits.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Öffentlich sichern</source>
        <translation>☁ Back up publicly</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Privat sichern</source>
        <translation>☁ Back up privately</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="733"/>
        <source>PROJEKT LÖSCHEN</source>
        <translation>DELETE PROJECT</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="750"/>
        <source>„%1“ kommt mit dem ganzen Ordner in den Papierkorb.</source>
        <translation>“%1” and its whole folder will be moved to the trash.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="761"/>
        <source>Prüfe Ordner …</source>
        <translation>Checking folder …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="769"/>
        <source>%1 – wird nicht gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – will not be deleted.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="778"/>
        <source>Größe %1</source>
        <extracomment>%1 = size of the folder</extracomment>
        <translation>Size %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="779"/>
        <source>%n Dateien nicht committet</source>
        <translation>
            <numerusform>%n file not committed</numerusform>
            <numerusform>%n files not committed</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>Arbeitsstand nicht lesbar</source>
        <translation>Working state not readable</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>alles committet</source>
        <translation>all committed</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="782"/>
        <source>%1 Versionen auf keinem Server</source>
        <extracomment>%1 = formatted number of versions (commits) not pushed anywhere</extracomment>
        <translation>
            <numerusform>%1 commit not on any server</numerusform>
            <numerusform>%1 commits not on any server</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>keine Versionen</source>
        <translation>no commits</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>alle Versionen auf dem Server</source>
        <translation>all commits on the server</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="789"/>
        <source>Das ist die einzige Kopie</source>
        <translation>This is the only copy</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="798"/>
        <source>Enthält weitere Repos – werden mitgelöscht:</source>
        <translation>Contains more repos – deleted as well:</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="812"/>
        <location filename="../qml/Main.qml" line="837"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ %n more</numerusform>
            <numerusform>+ %n more</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="821"/>
        <source>Arbeitskopien – kommen mit in den Papierkorb:</source>
        <translation>Worktrees – also moved to the trash:</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="830"/>
        <source>(außerhalb)</source>
        <extracomment>worktree outside the project folder / its uncommitted files</extracomment>
        <translation>(outside)</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="831"/>
        <source>%n nicht committet</source>
        <translation>
            <numerusform>%n not committed</numerusform>
            <numerusform>%n not committed</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="846"/>
        <source>⚠ Ein Agent arbeitet in %1</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ An agent is working in %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>Auch auf GitHub löschen</source>
        <translation>Also delete on GitHub</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>(endgültig)</source>
        <translation>(permanent)</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="888"/>
        <location filename="../qml/Main.qml" line="991"/>
        <source>gh darf keine Repos löschen – erst im Terminal: gh auth refresh -s delete_repo</source>
        <extracomment>keep the command &quot;gh auth refresh -s delete_repo&quot; unchanged</extracomment>
        <translation>gh may not delete repos – first run in a terminal: gh auth refresh -s delete_repo</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="894"/>
        <location filename="../qml/Main.qml" line="1149"/>
        <source>In den Papierkorb</source>
        <translation>Move to trash</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>◉ ÖFFENTLICH MACHEN</source>
        <translation>◉ MAKE PUBLIC</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>🔒 PRIVAT MACHEN</source>
        <translation>🔒 MAKE PRIVATE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="912"/>
        <source>„%1“ wird auf GitHub öffentlich.</source>
        <translation>“%1” becomes public on GitHub.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="913"/>
        <source>„%1“ wird auf GitHub privat – nur du siehst es dann.</source>
        <translation>“%1” becomes private on GitHub – only you can see it then.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Öffentlich machen</source>
        <translation>Make public</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Privat machen</source>
        <translation>Make private</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="937"/>
        <source>NUR NOCH LOKAL</source>
        <translation>LOCAL ONLY</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="951"/>
        <source>Das Repo auf GitHub wird endgültig gelöscht (auch Issues/Releases). Dein Ordner hier bleibt vollständig.</source>
        <translation>The repo on GitHub will be deleted permanently (including issues/releases). Your folder here stays intact.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="960"/>
        <source>Gleiche mit GitHub ab …</source>
        <translation>Checking against GitHub …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="969"/>
        <source>%1 Versionen gibt es nur auf GitHub – vorher Pull</source>
        <extracomment>%1 = formatted number of versions (commits)</extracomment>
        <translation>
            <numerusform>%1 commit exists only on GitHub – pull first</numerusform>
            <numerusform>%1 commits exist only on GitHub – pull first</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>Abgleich mit GitHub fehlgeschlagen – %1</source>
        <extracomment>%1 = error message of git fetch</extracomment>
        <translation>Check against GitHub failed – %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>unbekannt</source>
        <translation>unknown</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="983"/>
        <source>✓ alle Versionen von GitHub liegen auch hier</source>
        <translation>✓ all commits from GitHub are also here</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="997"/>
        <source>Auf GitHub löschen</source>
        <translation>Delete on GitHub</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1003"/>
        <source>ZWEIG LÖSCHEN</source>
        <translation>DELETE BRANCH</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>ARBEITSKOPIE ENTFERNEN</source>
        <translation>REMOVE WORKTREE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>TAG LÖSCHEN</source>
        <translation>DELETE TAG</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1020"/>
        <source>Zweig „%1“ wird gelöscht.</source>
        <translation>Branch “%1” will be deleted.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1022"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht, der Zweig „%1“ bleibt.</source>
        <translation>The worktree will be removed – its folder is deleted, branch “%1” stays.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1023"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht.</source>
        <translation>The worktree will be removed – its folder is deleted.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1024"/>
        <source>Tag „%1“ wird nur lokal gelöscht – auf dem Server bleibt er.</source>
        <translation>Tag “%1” is deleted only locally – it stays on the server.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1025"/>
        <source>Tag „%1“ wird nur lokal gelöscht.</source>
        <translation>Tag “%1” is deleted only locally.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1037"/>
        <source>Prüfe …</source>
        <translation>Checking …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1052"/>
        <source>1 Version gibt es nur in diesem Zweig</source>
        <translation>1 commit exists only on this branch</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1053"/>
        <source>%1 Versionen gibt es nur in diesem Zweig</source>
        <translation>%1 commits exist only on this branch</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Sie gehen mit dem Zweig verloren.</source>
        <translation>They will be lost with the branch.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Alle Versionen liegen auch in anderen Zweigen.</source>
        <translation>All commits are also on other branches.</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="1068"/>
        <source>%n Dateien nicht committet – sie kommen in den Papierkorb.</source>
        <translation>
            <numerusform>%n file not committed – it will be moved to the trash.</numerusform>
            <numerusform>%n files not committed – they will be moved to the trash.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1075"/>
        <source>⚠ Ein Agent arbeitet in dieser Arbeitskopie</source>
        <translation>⚠ An agent is working in this worktree</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Entfernen</source>
        <translation>Remove</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Löschen</source>
        <translation>Delete</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1088"/>
        <source>PROGRAMM LÖSCHEN</source>
        <translation>DELETE PROGRAM</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1103"/>
        <source>„%1“ kommt in den Papierkorb.</source>
        <translation>“%1” will be moved to the trash.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1109"/>
        <source>Suche Starter …</source>
        <extracomment>looking for .desktop launchers of the program</extracomment>
        <translation>Looking for launchers …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Starter – kommen mit in den Papierkorb:</source>
        <translation>Launchers – also moved to the trash:</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Keine Starter gefunden.</source>
        <translation>No launchers found.</translation>
    </message>
</context>
<context>
    <name>ProgramView</name>
    <message>
        <location filename="../qml/ProgramView.qml" line="45"/>
        <source>installiert %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>installed %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="51"/>
        <source>neueste %1</source>
        <extracomment>%1 = newest released version</extracomment>
        <translation>latest %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>↑ Auf %1 aktualisieren</source>
        <translation>↑ Update to %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>✓ Aktuell</source>
        <comment>program is up to date</comment>
        <translation>✓ Up to date</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="80"/>
        <source>Starten</source>
        <translation>Launch</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="84"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>Folder</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="89"/>
        <source>Löschen</source>
        <translation>Delete</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="134"/>
        <source>%n neuere Versionen</source>
        <translation>
            <numerusform>%n newer version</numerusform>
            <numerusform>%n newer versions</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="136"/>
        <source>seit deiner %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>since your %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="137"/>
        <source>Startmenü-Einträge werden beim Update angepasst</source>
        <translation>Start menu entries are adjusted on update</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="142"/>
        <source>VERSIONEN (RELEASES)</source>
        <translation>VERSIONS (RELEASES)</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>INSTALLIERT</source>
        <extracomment>release markers: the installed one / newer than the installed one</extracomment>
        <translation>INSTALLED</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>NEU</source>
        <translation>NEW</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="192"/>
        <source>Deine Version %1 ist älter als die letzten %n Releases.</source>
        <extracomment>%1 = installed version, %n = number of listed releases</extracomment>
        <translation>
            <numerusform>Your version %1 is older than the latest %n release.</numerusform>
            <numerusform>Your version %1 is older than the latest %n releases.</numerusform>
        </translation>
    </message>
</context>
<context>
    <name>ProjRow</name>
    <message>
        <location filename="../qml/ProjRow.qml" line="81"/>
        <location filename="../qml/ProjRow.qml" line="91"/>
        <source>↓ ALLE AKTUALISIEREN (%1)</source>
        <extracomment>%1 = number of repos with news in this sub-group (long and short form)</extracomment>
        <translation>↓ UPDATE ALL (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="81"/>
        <source>↓ ALLE (%1)</source>
        <translation>↓ ALL (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="101"/>
        <source>Kein Projekt gefunden.</source>
        <translation>No project found.</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="191"/>
        <source>⚠ NUR LOKAL</source>
        <translation>⚠ LOCAL ONLY</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>PRIVAT</source>
        <translation>PRIVATE</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>ÖFFENTLICH</source>
        <translation>PUBLIC</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="195"/>
        <source>%n NEU</source>
        <extracomment>badge: new versions upstream</extracomment>
        <translation>
            <numerusform>%n NEW</numerusform>
            <numerusform>%n NEW</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="197"/>
        <source>%n OFFEN</source>
        <extracomment>badge: files with uncommitted changes</extracomment>
        <translation>
            <numerusform>%n OPEN</numerusform>
            <numerusform>%n OPEN</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="201"/>
        <source>%1 Vers.</source>
        <extracomment>badge, short for &quot;versions&quot; (commits); %1 = formatted number</extracomment>
        <translation>
            <numerusform>%1 commit</numerusform>
            <numerusform>%1 commits</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="203"/>
        <source>%1 VERFÜGBAR</source>
        <comment>a newer program version</comment>
        <translation>%1 AVAILABLE</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="204"/>
        <source>✓ AKTUELL</source>
        <comment>program is up to date</comment>
        <translation>✓ UP TO DATE</translation>
    </message>
</context>
<context>
    <name>ProjectColumn</name>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="15"/>
        <source>EIGENE PROJEKTE</source>
        <translation>MY PROJECTS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="20"/>
        <source>FREMDE REPOS</source>
        <translation>EXTERNAL REPOS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="26"/>
        <source>Sonstige</source>
        <comment>foreign repos without a sub-group</comment>
        <translation>Other</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="33"/>
        <source>PROGRAMME</source>
        <translation>PROGRAMS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="54"/>
        <source>PROJEKTE</source>
        <translation>PROJECTS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="103"/>
        <source>DURCHSUCHTE ORDNER</source>
        <translation>SCANNED FOLDERS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="145"/>
        <source>+ Ordner hinzufügen</source>
        <translation>+ Add folder</translation>
    </message>
</context>
<context>
    <name>RefRow</name>
    <message>
        <location filename="../qml/RefRow.qml" line="49"/>
        <source>AKTIV</source>
        <extracomment>marker next to the branch that is checked out</extracomment>
        <translation>ACTIVE</translation>
    </message>
</context>
<context>
    <name>RepoStore</name>
    <message>
        <location filename="../src/repostore.cpp" line="454"/>
        <source>Verlauf konnte nicht gelesen werden: %1</source>
        <translation>Could not read history: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="510"/>
        <source>Änderungen konnten nicht gelesen werden: %1</source>
        <translation>Could not read changes: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="570"/>
        <source>Diff konnte nicht gelesen werden: %1</source>
        <translation>Could not read diff: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="584"/>
        <source>@@ Binärdatei geändert @@</source>
        <extracomment>diff line for a binary file; keep the &quot;@@&quot; at the start (marks a hunk header)</extracomment>
        <translation>@@ Binary file changed @@</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="601"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (truncated)</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="815"/>
        <location filename="../src/repostore.cpp" line="863"/>
        <source>Ungültige Version</source>
        <translation>Invalid commit</translation>
    </message>
</context>
<context>
    <name>RepoView</name>
    <message>
        <location filename="../qml/RepoView.qml" line="108"/>
        <source>(losgelöst)</source>
        <comment>worktree on a detached HEAD</comment>
        <translation>(detached)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="109"/>
        <source>Arbeitskopie %1</source>
        <comment>%1 = last two folders of a worktree</comment>
        <translation>Worktree %1</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ PUBLIC</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 PRIVATE</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="169"/>
        <source>⚠ nur lokal – keine Sicherung außerhalb dieses Rechners</source>
        <translation>⚠ local only – no backup outside this computer</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="175"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>Branch %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="181"/>
        <source>%1 Versionen</source>
        <extracomment>number of versions (commits); %1 = formatted number</extracomment>
        <translation>
            <numerusform>%1 commit</numerusform>
            <numerusform>%1 commits</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="187"/>
        <source>%1 Dateien nicht committet</source>
        <translation>
            <numerusform>%1 file not committed</numerusform>
            <numerusform>%1 files not committed</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="188"/>
        <source>✓ alles committet</source>
        <translation>✓ all committed</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="199"/>
        <source>⚠ Ein Agent arbeitet in %1 – vor Commit/Pull abstimmen</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ An agent is working in %1 – coordinate before commit/pull</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>↓ Aktualisieren (%1)</source>
        <extracomment>%1 = number of new versions upstream / repo is up to date</extracomment>
        <translation>↓ Update (%1)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>✓ Aktuell</source>
        <translation>✓ Up to date</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="220"/>
        <source>Commit …</source>
        <translation>Commit …</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="228"/>
        <source>↓ Pull</source>
        <translation>↓ Pull</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="236"/>
        <source>↑ Push</source>
        <translation>↑ Push</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="244"/>
        <source>☁ Auf GitHub sichern</source>
        <translation>☁ Back up to GitHub</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>◉ Öffentlich machen</source>
        <translation>◉ Make public</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>🔒 Privat machen</source>
        <translation>🔒 Make private</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="262"/>
        <source>Nur noch lokal</source>
        <extracomment>button: delete the GitHub copy, keep the local folder</extracomment>
        <translation>Local only</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="267"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>Folder</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="268"/>
        <source>Terminal</source>
        <translation>Terminal</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="274"/>
        <source>Löschen</source>
        <translation>Delete</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="282"/>
        <source>Löschen gesperrt – enthält ~/AI/ComfyUI/user</source>
        <translation>Deletion locked – contains ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="367"/>
        <source>ZWEIGE &amp; ARBEITSKOPIEN</source>
        <translation>BRANCHES &amp; WORKTREES</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="380"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ %n more</numerusform>
            <numerusform>+ %n more</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="382"/>
        <source>VERSIONEN (TAGS)</source>
        <translation>VERSIONS (TAGS)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>NEU AUF GITHUB</source>
        <translation>NEW ON GITHUB</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>%n Versionen noch nicht geladen</source>
        <translation>
            <numerusform>%n commit not loaded yet</numerusform>
            <numerusform>%n commits not loaded yet</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="419"/>
        <source>… und %n weitere</source>
        <translation>
            <numerusform>… and %n more</numerusform>
            <numerusform>… and %n more</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>VERLAUF</source>
        <extracomment>%1 = loaded versions, %2 = all versions (formatted number)</extracomment>
        <translation>HISTORY</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>neueste %1 von %2 · alle Zweige</source>
        <translation>latest %1 of %2 · all branches</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="438"/>
        <source>jetzt</source>
        <comment>time column of the working state row</comment>
        <translation>now</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>NICHT COMMITTET</source>
        <translation>NOT COMMITTED</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Datei</source>
        <translation>%1 file</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Dateien</source>
        <translation>%1 files</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="471"/>
        <source>Arbeitskopie · Zweig %1</source>
        <translation>Worktree · branch %1</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="493"/>
        <source>▣ BILD</source>
        <comment>chip: this version changes a picture</comment>
        <translation>▣ IMAGE</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="607"/>
        <source>… ältere Versionen werden beim Scrollen nachgeladen</source>
        <translation>… older commits load as you scroll</translation>
    </message>
</context>
<context>
    <name>Timeline</name>
    <message numerus="yes">
        <location filename="../qml/Timeline.qml" line="69"/>
        <source>ab %1: %n Versionen</source>
        <extracomment>tooltip of a timeline bar: %1 = month, %n = number of versions</extracomment>
        <translation>
            <numerusform>from %1: %n commit</numerusform>
            <numerusform>from %1: %n commits</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>gesamte Geschichte</source>
        <extracomment>below the timeline: the whole history is shown, the marked part is loaded (%1 = loaded versions)</extracomment>
        <translation>entire history</translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>▭ geladen: neueste %1</source>
        <translation>▭ loaded: latest %1</translation>
    </message>
</context>
<context>
    <name>Treemap</name>
    <message>
        <location filename="../qml/Treemap.qml" line="67"/>
        <source>binär</source>
        <extracomment>binary file, no line counts</extracomment>
        <translation>binary</translation>
    </message>
</context>
<context>
    <name>Updates</name>
    <message>
        <location filename="../src/updates.cpp" line="231"/>
        <source>Kein Platz für den Download in %1.</source>
        <translation>No space for the download in %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Download fehlgeschlagen: %1</source>
        <translation>Download failed: %1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Zeitüberschreitung</source>
        <translation>Timed out</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="252"/>
        <source>Im Release %1 ist keine passende AppImage-Datei.</source>
        <translation>Release %1 has no matching AppImage file.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="257"/>
        <source>%1 liegt schon im Ordner – nichts geändert.</source>
        <translation>%1 is already in the folder – nothing changed.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="261"/>
        <source>Konnte %1 nicht ablegen.</source>
        <translation>Could not save %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="274"/>
        <source>%1 auf %2 aktualisiert, %3 Starter angepasst.</source>
        <extracomment>%1 = program, %2 = new version, %3 = number of changed .desktop launchers</extracomment>
        <translation>%1 updated to %2, %3 launcher(s) adjusted.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="276"/>
        <source> Nicht änderbar: %1</source>
        <translation> Cannot be changed: %1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="278"/>
        <source> Alte Datei konnte nicht in den Papierkorb.</source>
        <translation> Old file could not be moved to the trash.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="395"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>An action is already running for this repo.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="405"/>
        <location filename="../src/updates.cpp" line="478"/>
        <source>Aktualisiert (Testdaten)</source>
        <translation>Updated (test data)</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="409"/>
        <source>Hole neue Versionen …</source>
        <translation>Pulling new commits …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="472"/>
        <location filename="../src/updates.cpp" line="553"/>
        <source>Programm %1 nicht gefunden.</source>
        <translation>Program %1 not found.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="474"/>
        <source>%1 wird gerade schon aktualisiert.</source>
        <translation>%1 is already being updated.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="476"/>
        <source>%1 ist schon aktuell.</source>
        <translation>%1 is already up to date.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="485"/>
        <source>Lade %1 …</source>
        <extracomment>%1 = release tag being downloaded</extracomment>
        <translation>Downloading %1 …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="518"/>
        <source>%1 gestartet.</source>
        <translation>%1 launched.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="519"/>
        <source>%1 ließ sich nicht starten.</source>
        <translation>%1 could not be launched.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="555"/>
        <source>Für %1 läuft gerade schon eine Aktion.</source>
        <translation>An action is already running for %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="557"/>
        <source>OK (Testdaten)</source>
        <translation>OK (test data)</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Datei, %3 Starter).</source>
        <extracomment>%1 = program, %2 = number of files, %3 = number of .desktop launchers</extracomment>
        <translation>%1 moved to the trash (%2 file, %3 launcher(s)).</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Dateien, %3 Starter).</source>
        <translation>%1 moved to the trash (%2 files, %3 launcher(s)).</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="580"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> Not moved to the trash: %1</translation>
    </message>
</context>
<context>
    <name>Util</name>
    <message>
        <location filename="../qml/Util.js" line="39"/>
        <source>HEUTE</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>TODAY</translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="41"/>
        <source>GESTERN</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>YESTERDAY</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="48"/>
        <source>vor %n Min</source>
        <extracomment>age of the last change, short (minutes)</extracomment>
        <translation>
            <numerusform>%n min ago</numerusform>
            <numerusform>%n min ago</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="50"/>
        <source>vor %n Std</source>
        <extracomment>age of the last change, short (hours)</extracomment>
        <translation>
            <numerusform>%n h ago</numerusform>
            <numerusform>%n h ago</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="52"/>
        <source>gestern</source>
        <extracomment>age of the last change</extracomment>
        <translation>yesterday</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="54"/>
        <source>vor %n Tagen</source>
        <extracomment>age of the last change (days)</extracomment>
        <translation>
            <numerusform>%n day ago</numerusform>
            <numerusform>%n days ago</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="99"/>
        <source>Keine Beschreibung.</source>
        <extracomment>release without release notes</extracomment>
        <translation>No description.</translation>
    </message>
</context>
<context>
    <name>WorkView</name>
    <message>
        <location filename="../qml/WorkView.qml" line="96"/>
        <source>● Nicht committete Änderungen</source>
        <translation>● Uncommitted changes</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="108"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>Branch %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="113"/>
        <source>%n nicht gepusht</source>
        <translation>
            <numerusform>%n not pushed</numerusform>
            <numerusform>%n not pushed</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="117"/>
        <source>⚠ nur lokal</source>
        <translation>⚠ local only</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Datei</source>
        <translation>%1 file</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Dateien</source>
        <translation>%1 files</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="126"/>
        <source>%n vorgemerkt</source>
        <extracomment>files staged for the commit</extracomment>
        <translation>
            <numerusform>%n staged</numerusform>
            <numerusform>%n staged</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="203"/>
        <source>binär</source>
        <translation>binary</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="212"/>
        <source>VERWERFEN</source>
        <extracomment>discard the changes of this file</extracomment>
        <translation>DISCARD</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="240"/>
        <source>Keine Änderungen – alles committet.</source>
        <translation>No changes – all committed.</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Binärdatei – nur ganz vormerken (Kästchen links).</source>
        <translation>Binary file – stage whole file only (checkbox on the left).</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Keine Abschnitte – nur ganz vormerken (Kästchen links).</source>
        <translation>No hunks – stage whole file only (checkbox on the left).</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="307"/>
        <source>VORGEMERKT</source>
        <extracomment>this hunk is staged</extracomment>
        <translation>STAGED</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>− Zurücknehmen</source>
        <extracomment>unstage / stage this hunk</extracomment>
        <translation>− Unstage</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>+ Vormerken</source>
        <translation>+ Stage</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="352"/>
        <source>KURZBESCHREIBUNG</source>
        <extracomment>commit subject (first line of the commit message)</extracomment>
        <translation>SUMMARY</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="363"/>
        <source>Was wurde geändert?</source>
        <translation>What changed?</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="369"/>
        <source>DETAILS</source>
        <extracomment>commit message body</extracomment>
        <translation>DETAILS</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="380"/>
        <source>optional</source>
        <translation>optional</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="392"/>
        <source>Commit</source>
        <translation>Commit</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="400"/>
        <source>Commit &amp; Push</source>
        <translation>Commit &amp; Push</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Nichts vorgemerkt</source>
        <translation>Nothing staged</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Kurzbeschreibung fehlt</source>
        <translation>Summary missing</translation>
    </message>
</context>
</TS>
