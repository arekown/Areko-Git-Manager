# Areko Git Manager

A desktop overview of all local Git repositories for Linux, built with Qt 6 / QML in a dark
cyberpunk look. It finds the repositories below your project folders, shows their history and
changes, commits and syncs them safely, keeps foreign repositories and AppImages up to date and
publishes your own projects on GitHub. The user interface is in German.

## Features

- **Projects:** all repositories below the scanned folders (default `~/projects`, `~/Anwendungen`,
  `~/AI`, `~/localweb`, changeable in the app), split into own and foreign repositories; foreign
  repositories are grouped by the repository they live in
- **History** with a version graph across all branches, tags and worktrees, a **timeline** and an
  **activity** chart of the last 30 days
- **File map** (treemap) of the files changed in a version, diff view per file
- **Image comparison** of changed pictures (before / after), including pictures stored in **Git LFS**
- **Commit** with staging of whole files or single sections (hunks)
- **Pull only fast-forward** – never merges or rebases behind your back; **push never uses force**
- **Trash instead of delete:** discarded new files, deleted projects and programs go to the trash
- **Updates of foreign repositories:** checks upstream in the background and updates fast-forward
- **AppImage updates:** shows installed AppImages, their GitHub releases (from the update
  information embedded in the AppImage) and installs the newest one, launchers are adjusted
- **GitHub:** back up a project as a private or public repository, switch its visibility, or make
  it "local only" again (deletes the GitHub repository after checking nothing exists only there)

## Install

Requires Qt 6.8 or newer, CMake and git; `gh` (GitHub CLI, signed in with `gh auth login`) is
optional and needed for the GitHub functions and AppImage releases.

```sh
git clone https://github.com/arekown/Areko-Git-Manager.git
cd Areko-Git-Manager
./install.sh --deps      # installs the build dependencies (dnf, apt or pacman), then builds, tests and installs
```

If the dependencies are already there, `./install.sh` is enough. The app is installed for the
current user into `~/.local`; open the application menu and type `git`.

| Command | What it does |
|---|---|
| `./install.sh` | build, test and install for the current user (`~/.local`) |
| `./install.sh --deps` | install the build dependencies first (uses `sudo`) |
| `./install.sh --system` | install for all users into `/usr/local` (uses `sudo`) |
| `./install.sh --prefix DIR` | install into `DIR` |
| `./install.sh --uninstall` | remove the app again (add `--system`/`--prefix` if you used it) |

### Dependencies

- **Fedora:** `sudo dnf install cmake ninja-build gcc-c++ git qt6-qtbase-devel qt6-qtdeclarative-devel qt6-qttools-devel gh`
- **Debian / Ubuntu:** `sudo apt install cmake ninja-build g++ git qt6-base-dev qt6-declarative-dev qt6-tools-dev qt6-tools-dev-tools qml6-module-qtquick qml6-module-qtquick-controls qml6-module-qtquick-templates qml6-module-qtquick-dialogs qml6-module-qtquick-layouts qml6-module-qtquick-shapes qml6-module-qtquick-window qml6-module-qtqml-workerscript gh`
- **Arch:** `sudo pacman -S --needed cmake ninja gcc git qt6-base qt6-declarative qt6-tools github-cli`

### Manual build

```sh
cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$HOME/.local
cmake --build build
cmake --install build
```

## Configuration

- **Own repositories** are those without a remote or whose remote belongs to the GitHub user
  signed in with `gh` (`gh api user`). Without `gh` every repository with a remote counts as foreign.
- **AppImages** are looked up in `~/Anwendungen/HomeSuite`; another folder can be set as
  `programs/dir` in `~/.config/Areko/Areko Git Manager.conf`.

## License

Areko Git Manager is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE): free for
personal and other noncommercial use, commercial use is not permitted.

It uses Qt (LGPL). The bundled fonts Orbitron, Rajdhani and Share Tech Mono are under the
SIL Open Font License (see `fonts/OFL-*.txt`).

---

## Deutsch

Der Areko Git Manager zeigt alle lokalen Git-Repos im Überblick: Projekte und Verlauf mit
Versions-Graph, Zeitleiste und Aktivität, Dateikarte, Bildvergleich (auch Git LFS), Commit mit
einzelnen Abschnitten, Pull nur als Fast-Forward, Push nie mit Force, Papierkorb statt Löschen,
Updates fremder Repos und von AppImages sowie GitHub sichern, Sichtbarkeit umschalten und
„nur lokal“.

Installation: `./install.sh --deps` (installiert die Bau-Abhängigkeiten, baut, testet und
installiert nach `~/.local`); danach findet das Startmenü das Programm unter „git“.
Ohne Skript: `cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$HOME/.local && cmake --build build && cmake --install build`.
Entfernen: `./install.sh --uninstall`.

Lizenz: PolyForm Noncommercial 1.0.0 – privat und nicht-kommerziell frei nutzbar,
kommerzielle Nutzung nicht erlaubt.
