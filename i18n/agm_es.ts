<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="es" sourcelanguage="de">
<context>
    <name>CommitDetail</name>
    <message>
        <location filename="../qml/CommitDetail.qml" line="88"/>
        <source>Zusammenführung</source>
        <comment>merge commit</comment>
        <translation>Fusión</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Datei</source>
        <translation>%1 archivo</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Dateien</source>
        <translation>%1 archivos</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>LISTE</source>
        <extracomment>file view switch: list / map of tiles</extracomment>
        <translation>LISTA</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>KARTE</source>
        <translation>MAPA</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="222"/>
        <source>▣ Bild</source>
        <translation>▣ Imagen</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="223"/>
        <source>binär</source>
        <translation>binario</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/CommitDetail.qml" line="245"/>
        <source>+ %n weitere Dateien</source>
        <translation>
            <numerusform>+ %n archivo más</numerusform>
            <numerusform>+ %n archivos más</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="264"/>
        <source>Für diese Version liegen keine Dateiänderungen vor.</source>
        <translation>Este commit no tiene cambios de archivos.</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Binärdatei – kein Text-Diff.</source>
        <translation>Archivo binario – sin diff de texto.</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Keine Textänderungen.</source>
        <translation>Sin cambios de texto.</translation>
    </message>
</context>
<context>
    <name>GitActions</name>
    <message>
        <location filename="../src/gitactions.cpp" line="75"/>
        <source>Zeitüberschreitung</source>
        <translation>Tiempo agotado</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="77"/>
        <source>git ließ sich nicht starten</source>
        <translation>No se pudo iniciar git</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="354"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (truncado)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="392"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>Ya hay una acción en curso para este repo.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="457"/>
        <source>Arbeitsstand nicht lesbar: %1</source>
        <translation>No se pudo leer el estado de trabajo: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="487"/>
        <location filename="../src/gitactions.cpp" line="518"/>
        <location filename="../src/gitactions.cpp" line="680"/>
        <source>Diese Datei darf nicht bearbeitet werden.</source>
        <translation>Este archivo no se puede editar.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="491"/>
        <location filename="../src/gitactions.cpp" line="522"/>
        <location filename="../src/gitactions.cpp" line="684"/>
        <source>Datei hat keine Änderungen mehr.</source>
        <translation>El archivo ya no tiene cambios.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Vormerken fehlgeschlagen: %1</source>
        <translation>Error al preparar: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Zurücknehmen fehlgeschlagen: %1</source>
        <translation>Error al quitar la preparación: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="524"/>
        <source>Neue Dateien lassen sich nur als ganze Datei vormerken.</source>
        <translation>Los archivos nuevos solo se pueden preparar completos.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="527"/>
        <source>Abschnitt gibt es nicht mehr – Ansicht wurde neu geladen.</source>
        <translation>El fragmento ya no existe – vista recargada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="537"/>
        <source>Abschnitt ließ sich nicht ändern: %1</source>
        <translation>No se pudo cambiar el fragmento: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="545"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Pull nicht möglich.</source>
        <translation>Ninguna rama activa (HEAD separado) – no se puede hacer pull.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="549"/>
        <source>Kein Upstream-Zweig eingestellt – nichts zu holen.</source>
        <translation>No hay rama upstream configurada – nada que traer.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="559"/>
        <source>Lokal und auf dem Server gibt es unterschiedliche neue Versionen. Pull holt nur ohne Zusammenführen (fast-forward) – nichts wurde geändert.</source>
        <translation>Hay commits nuevos distintos en local y en el servidor. Pull solo avanza sin fusionar (fast-forward) – no se cambió nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="562"/>
        <source>Lokale Änderungen würden überschrieben – erst committen oder verwerfen.</source>
        <translation>Se sobrescribirían cambios locales – haz commit o descártalos primero.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="564"/>
        <source>Konflikt beim Holen – bitte selbst klären.</source>
        <translation>Conflicto al hacer pull – resuélvelo tú mismo.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="566"/>
        <source>Pull fehlgeschlagen: %1</source>
        <translation>Error en pull: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="571"/>
        <source>Schon aktuell.</source>
        <translation>Ya está actualizado.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>1 neue Version geholt.</source>
        <translation>1 commit nuevo traído.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>%1 neue Versionen geholt.</source>
        <translation>%1 commits nuevos traídos.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="583"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Push nicht möglich.</source>
        <translation>Ninguna rama activa (HEAD separado) – no se puede hacer push.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="594"/>
        <source>Kein Server (origin) eingerichtet – erst „Auf GitHub sichern“.</source>
        <translation>No hay servidor (origin) configurado – primero «Respaldar en GitHub».</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="601"/>
        <source>Schon aktuell auf dem Server.</source>
        <translation>El servidor ya está actualizado.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="602"/>
        <source>Hochgeladen.</source>
        <translation>Subido.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="607"/>
        <source>Auf dem Server gibt es neuere Versionen – erst Pull</source>
        <translation>El servidor tiene commits más nuevos – haz pull primero</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="609"/>
        <source>Push fehlgeschlagen: %1</source>
        <translation>Error en push: %1</translation>
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
        <translation>OK (datos de prueba)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="623"/>
        <source>Kurzbeschreibung fehlt.</source>
        <translation>Falta el resumen.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="626"/>
        <source>Nichts vorgemerkt – erst Dateien oder Abschnitte auswählen.</source>
        <translation>Nada preparado – primero selecciona archivos o fragmentos.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="628"/>
        <location filename="../src/gitactions.cpp" line="635"/>
        <source>Commit fehlgeschlagen: %1</source>
        <translation>Error en commit: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="638"/>
        <source>Committet (%1).</source>
        <translation>Commit hecho (%1).</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="641"/>
        <source>Committet (%1), aber nicht hochgeladen: %2</source>
        <translation>Commit hecho (%1), pero no subido: %2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="642"/>
        <source>Committet (%1) und hochgeladen.</source>
        <translation>Commit hecho (%1) y subido.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="698"/>
        <location filename="../src/gitactions.cpp" line="706"/>
        <source>Verwerfen fehlgeschlagen: %1</source>
        <translation>Error al descartar: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="711"/>
        <source>Konnte „%1“ nicht in den Papierkorb legen – nichts gelöscht.</source>
        <translation>No se pudo mover «%1» a la papelera – no se borró nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Verworfen – neue Datei liegt im Papierkorb.</source>
        <translation>Descartado – el archivo nuevo está en la papelera.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Änderungen verworfen.</source>
        <translation>Cambios descartados.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="728"/>
        <source>Ungültiger Repo-Name (erlaubt: Buchstaben, Ziffern, . _ -).</source>
        <translation>Nombre de repo no válido (permitido: letras, dígitos, . _ -).</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="730"/>
        <source>Hat schon einen Server (origin) – nichts angelegt.</source>
        <translation>Ya tiene un servidor (origin) – no se creó nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="732"/>
        <source>Noch keine Version – erst committen.</source>
        <translation>Aún no hay commits – haz commit primero.</translation>
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
        <translation>Respaldado en GitHub como público: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="743"/>
        <source>Privat auf GitHub gesichert: %1</source>
        <translation>Respaldado en GitHub como privado: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="771"/>
        <source>Gesperrt: Wurzelordner</source>
        <translation>Bloqueado: carpeta raíz</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="774"/>
        <source>Gesperrt: enthält ~/AI/ComfyUI/user</source>
        <translation>Bloqueado: contiene ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="777"/>
        <source>Gesperrt: persönlicher Ordner</source>
        <translation>Bloqueado: carpeta personal</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="882"/>
        <source>Kein Git-Repository</source>
        <translation>No es un repositorio Git</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="941"/>
        <source>Ungültiger Name.</source>
        <translation>Nombre no válido.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="945"/>
        <source>Den Zweig gibt es nicht mehr.</source>
        <translation>La rama ya no existe.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="950"/>
        <source>Das ist der aktuelle Zweig – erst einen anderen auschecken.</source>
        <translation>Es la rama actual – primero cambia a otra.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="951"/>
        <source>Ist in der Arbeitskopie %1 ausgecheckt – erst die Arbeitskopie entfernen.</source>
        <translation>Está activa en el worktree %1 – primero elimina el worktree.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="962"/>
        <source>Die Arbeitskopie gibt es nicht mehr.</source>
        <translation>El worktree ya no existe.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="966"/>
        <source>Die Hauptarbeitskopie lässt sich nicht entfernen.</source>
        <translation>El worktree principal no se puede eliminar.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="975"/>
        <source>Den Tag gibt es nicht mehr.</source>
        <translation>El tag ya no existe.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="979"/>
        <source>Nur lokale Zweige, Arbeitskopien und Tags lassen sich löschen.</source>
        <translation>Solo se pueden borrar ramas locales, worktrees y tags.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1013"/>
        <source>%1 – nichts gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – no se borró nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1015"/>
        <source>Kein Git-Repository – nichts gelöscht.</source>
        <translation>No es un repositorio Git – no se borró nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1023"/>
        <source>Arbeitskopie %1 ist gesperrt – nichts gelöscht.</source>
        <translation>El worktree %1 está bloqueado – no se borró nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1030"/>
        <location filename="../src/gitactions.cpp" line="1247"/>
        <source>Kein eigenes GitHub-Repo – nichts gelöscht.</source>
        <translation>No es un repo propio de GitHub – no se borró nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1032"/>
        <location filename="../src/gitactions.cpp" line="1249"/>
        <source>gh darf keine Repos löschen (Recht delete_repo fehlt) – nichts gelöscht.</source>
        <translation>gh no puede borrar repos (falta el permiso delete_repo) – no se borró nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1035"/>
        <location filename="../src/gitactions.cpp" line="1258"/>
        <source>GitHub: %1 – nichts gelöscht.</source>
        <translation>GitHub: %1 – no se borró nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1039"/>
        <source>„%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>No se pudo mover «%1» a la papelera.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1040"/>
        <source>Auf GitHub gelöscht, aber „%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>Borrado en GitHub, pero no se pudo mover «%1» a la papelera.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1046"/>
        <source>„%1“ liegt im Papierkorb</source>
        <extracomment>start of a message that goes on with the parts below and ends with &quot;.&quot;</extracomment>
        <translation>«%1» está en la papelera</translation>
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
        <translation>, %1 borrado en GitHub</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1054"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> No movido a la papelera: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1092"/>
        <source>Zweig nicht gelöscht: %1</source>
        <translation>Rama no borrada: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1093"/>
        <source>Zweig „%1“ gelöscht.</source>
        <translation>Rama «%1» borrada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1101"/>
        <source>Arbeitskopie nicht in den Papierkorb verschoben.</source>
        <translation>Worktree no movido a la papelera.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1103"/>
        <source>Arbeitskopie %1 in den Papierkorb verschoben.</source>
        <translation>Worktree %1 movido a la papelera.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1107"/>
        <source>Arbeitskopie nicht entfernt: %1</source>
        <translation>Worktree no eliminado: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1108"/>
        <source>Arbeitskopie %1 entfernt.</source>
        <translation>Worktree %1 eliminado.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1112"/>
        <source>Tag nicht gelöscht: %1</source>
        <translation>Tag no borrado: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1113"/>
        <source>Tag „%1“ lokal gelöscht.</source>
        <translation>Tag «%1» borrado en local.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1202"/>
        <source>Kein eigenes GitHub-Repo – nichts geändert.</source>
        <translation>No es un repo propio de GitHub – no se cambió nada.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt öffentlich.</source>
        <translation>%1 ahora es público.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt privat.</source>
        <translation>%1 ahora es privado.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1253"/>
        <source>Abgleich mit GitHub fehlgeschlagen: %1 – nichts gelöscht.</source>
        <translation>Error al comparar con GitHub: %1 – no se borró nada.</translation>
    </message>
    <message numerus="yes">
        <location filename="../src/gitactions.cpp" line="1255"/>
        <source>%n Versionen gibt es nur auf GitHub – vorher Pull. Nichts gelöscht.</source>
        <translation>
            <numerusform>%n commit solo existe en GitHub – haz pull antes. No se borró nada.</numerusform>
            <numerusform>%n commits solo existen en GitHub – haz pull antes. No se borró nada.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1261"/>
        <source>%1 auf GitHub gelöscht, aber origin ließ sich nicht entfernen: %2</source>
        <translation>%1 borrado en GitHub, pero no se pudo quitar origin: %2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1262"/>
        <source>%1 auf GitHub gelöscht – das Projekt ist nur noch lokal.</source>
        <translation>%1 borrado en GitHub – el proyecto ahora es solo local.</translation>
    </message>
</context>
<context>
    <name>ImageCompare</name>
    <message>
        <location filename="../qml/ImageCompare.qml" line="11"/>
        <source>◀ ALT</source>
        <translation>◀ ANTERIOR</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU ▶</source>
        <translation>NUEVO ▶</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU HINZUGEFÜGT</source>
        <translation>AÑADIDO</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>lädt …</source>
        <translation>cargando …</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>Bild nicht lesbar</source>
        <translation>Imagen no legible</translation>
    </message>
</context>
<context>
    <name>Main</name>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>ALLE</source>
        <extracomment>filter chips in the header</extracomment>
        <translation>TODOS</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>EIGENE</source>
        <translation>PROPIOS</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>NUR LOKAL</source>
        <translation>SOLO LOCAL</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>GEÄNDERT</source>
        <translation>CAMBIADOS</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>UPDATES</source>
        <translation>NOVEDADES</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>FREMD</source>
        <translation>AJENOS</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="289"/>
        <source>Ordner zum Durchsuchen wählen</source>
        <translation>Elige carpeta para escanear</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="400"/>
        <source>Projekt suchen …</source>
        <translation>Buscar proyecto …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="441"/>
        <source>⟳ LESE EIN …</source>
        <extracomment>status line in the header; the counters are upper case like the rest of the line</extracomment>
        <translation>⟳ LEYENDO …</translation>
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
            <numerusform>%n PROGRAMA</numerusform>
            <numerusform>%n PROGRAMAS</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="443"/>
        <source>%n OHNE SICHERUNG</source>
        <translation>
            <numerusform>%n SIN RESPALDO</numerusform>
            <numerusform>%n SIN RESPALDO</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="444"/>
        <source>%n UPDATES</source>
        <translation>
            <numerusform>%n NOVEDAD</numerusform>
            <numerusform>%n NOVEDADES</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="451"/>
        <source>⟳ Neu einlesen</source>
        <translation>⟳ Recargar</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Lese Repositories ein …</source>
        <translation>Leyendo repositorios …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Keine Repositories gefunden.</source>
        <translation>No se encontraron repositorios.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="625"/>
        <source>ÄNDERUNGEN VERWERFEN</source>
        <translation>DESCARTAR CAMBIOS</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="632"/>
        <source>Die neue Datei „%1“ kommt in den Papierkorb.</source>
        <translation>El archivo nuevo «%1» irá a la papelera.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="633"/>
        <source>Alle Änderungen an „%1“ werden verworfen.</source>
        <translation>Se descartarán todos los cambios en «%1».</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="638"/>
        <source>Das lässt sich nicht rückgängig machen.</source>
        <translation>No se puede deshacer.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="644"/>
        <source>Verwerfen</source>
        <translation>Descartar</translation>
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
        <translation>Cancelar</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="651"/>
        <source>☁ AUF GITHUB SICHERN</source>
        <translation>☁ RESPALDAR EN GITHUB</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="664"/>
        <source>Legt auf GitHub ein Repository an und lädt alle Versionen von „%1“ hoch.</source>
        <translation>Crea un repositorio en GitHub y sube todos los commits de «%1».</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="669"/>
        <source>NAME</source>
        <extracomment>name of the new GitHub repository</extracomment>
        <translation>NOMBRE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="681"/>
        <source>SICHTBARKEIT</source>
        <translation>VISIBILIDAD</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="688"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 PRIVADO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="689"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ PÚBLICO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="711"/>
        <source>Nur Buchstaben, Ziffern, Punkt, Minus und Unterstrich.</source>
        <translation>Solo letras, dígitos, punto, guion y guion bajo.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>öffentlich</source>
        <translation>público</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>privat</source>
        <translation>privado</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="720"/>
        <location filename="../qml/Main.qml" line="924"/>
        <source>Jeder kann den Code und alle bisherigen Versionen sehen.</source>
        <translation>Cualquiera puede ver el código y todos los commits anteriores.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Öffentlich sichern</source>
        <translation>☁ Respaldar público</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Privat sichern</source>
        <translation>☁ Respaldar privado</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="733"/>
        <source>PROJEKT LÖSCHEN</source>
        <translation>BORRAR PROYECTO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="750"/>
        <source>„%1“ kommt mit dem ganzen Ordner in den Papierkorb.</source>
        <translation>«%1» irá a la papelera con toda su carpeta.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="761"/>
        <source>Prüfe Ordner …</source>
        <translation>Comprobando carpeta …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="769"/>
        <source>%1 – wird nicht gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – no se borrará.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="778"/>
        <source>Größe %1</source>
        <extracomment>%1 = size of the folder</extracomment>
        <translation>Tamaño %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="779"/>
        <source>%n Dateien nicht committet</source>
        <translation>
            <numerusform>%n archivo sin commit</numerusform>
            <numerusform>%n archivos sin commit</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>Arbeitsstand nicht lesbar</source>
        <translation>Estado de trabajo no legible</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>alles committet</source>
        <translation>todo con commit</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="782"/>
        <source>%1 Versionen auf keinem Server</source>
        <extracomment>%1 = formatted number of versions (commits) not pushed anywhere</extracomment>
        <translation>
            <numerusform>%1 commit sin servidor</numerusform>
            <numerusform>%1 commits sin servidor</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>keine Versionen</source>
        <translation>sin commits</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>alle Versionen auf dem Server</source>
        <translation>todos los commits en el servidor</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="789"/>
        <source>Das ist die einzige Kopie</source>
        <translation>Es la única copia</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="798"/>
        <source>Enthält weitere Repos – werden mitgelöscht:</source>
        <translation>Contiene otros repos – también se borran:</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="812"/>
        <location filename="../qml/Main.qml" line="837"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ %n más</numerusform>
            <numerusform>+ %n más</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="821"/>
        <source>Arbeitskopien – kommen mit in den Papierkorb:</source>
        <translation>Worktrees – también van a la papelera:</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="830"/>
        <source>(außerhalb)</source>
        <extracomment>worktree outside the project folder / its uncommitted files</extracomment>
        <translation>(fuera)</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="831"/>
        <source>%n nicht committet</source>
        <translation>
            <numerusform>%n sin commit</numerusform>
            <numerusform>%n sin commit</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="846"/>
        <source>⚠ Ein Agent arbeitet in %1</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ Un agente trabaja en %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>Auch auf GitHub löschen</source>
        <translation>Borrar también en GitHub</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>(endgültig)</source>
        <translation>(definitivo)</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="888"/>
        <location filename="../qml/Main.qml" line="991"/>
        <source>gh darf keine Repos löschen – erst im Terminal: gh auth refresh -s delete_repo</source>
        <extracomment>keep the command &quot;gh auth refresh -s delete_repo&quot; unchanged</extracomment>
        <translation>gh no puede borrar repos – primero en la terminal: gh auth refresh -s delete_repo</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="894"/>
        <location filename="../qml/Main.qml" line="1149"/>
        <source>In den Papierkorb</source>
        <translation>A la papelera</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>◉ ÖFFENTLICH MACHEN</source>
        <translation>◉ HACER PÚBLICO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>🔒 PRIVAT MACHEN</source>
        <translation>🔒 HACER PRIVADO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="912"/>
        <source>„%1“ wird auf GitHub öffentlich.</source>
        <translation>«%1» será público en GitHub.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="913"/>
        <source>„%1“ wird auf GitHub privat – nur du siehst es dann.</source>
        <translation>«%1» será privado en GitHub – solo tú podrás verlo.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Öffentlich machen</source>
        <translation>Hacer público</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Privat machen</source>
        <translation>Hacer privado</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="937"/>
        <source>NUR NOCH LOKAL</source>
        <translation>SOLO LOCAL</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="951"/>
        <source>Das Repo auf GitHub wird endgültig gelöscht (auch Issues/Releases). Dein Ordner hier bleibt vollständig.</source>
        <translation>El repo en GitHub se borrará definitivamente (también issues/releases). Tu carpeta aquí queda intacta.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="960"/>
        <source>Gleiche mit GitHub ab …</source>
        <translation>Comparando con GitHub …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="969"/>
        <source>%1 Versionen gibt es nur auf GitHub – vorher Pull</source>
        <extracomment>%1 = formatted number of versions (commits)</extracomment>
        <translation>
            <numerusform>%1 commit solo existe en GitHub – haz pull antes</numerusform>
            <numerusform>%1 commits solo existen en GitHub – haz pull antes</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>Abgleich mit GitHub fehlgeschlagen – %1</source>
        <extracomment>%1 = error message of git fetch</extracomment>
        <translation>Error al comparar con GitHub – %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>unbekannt</source>
        <translation>desconocido</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="983"/>
        <source>✓ alle Versionen von GitHub liegen auch hier</source>
        <translation>✓ todos los commits de GitHub también están aquí</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="997"/>
        <source>Auf GitHub löschen</source>
        <translation>Borrar en GitHub</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1003"/>
        <source>ZWEIG LÖSCHEN</source>
        <translation>BORRAR RAMA</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>ARBEITSKOPIE ENTFERNEN</source>
        <translation>ELIMINAR WORKTREE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>TAG LÖSCHEN</source>
        <translation>BORRAR TAG</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1020"/>
        <source>Zweig „%1“ wird gelöscht.</source>
        <translation>Se borrará la rama «%1».</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1022"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht, der Zweig „%1“ bleibt.</source>
        <translation>Se eliminará el worktree – se borra su carpeta, la rama «%1» se conserva.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1023"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht.</source>
        <translation>Se eliminará el worktree – se borra su carpeta.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1024"/>
        <source>Tag „%1“ wird nur lokal gelöscht – auf dem Server bleibt er.</source>
        <translation>El tag «%1» solo se borra en local – se conserva en el servidor.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1025"/>
        <source>Tag „%1“ wird nur lokal gelöscht.</source>
        <translation>El tag «%1» solo se borra en local.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1037"/>
        <source>Prüfe …</source>
        <translation>Comprobando …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1052"/>
        <source>1 Version gibt es nur in diesem Zweig</source>
        <translation>1 commit solo existe en esta rama</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1053"/>
        <source>%1 Versionen gibt es nur in diesem Zweig</source>
        <translation>%1 commits solo existen en esta rama</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Sie gehen mit dem Zweig verloren.</source>
        <translation>Se perderán con la rama.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Alle Versionen liegen auch in anderen Zweigen.</source>
        <translation>Todos los commits están también en otras ramas.</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="1068"/>
        <source>%n Dateien nicht committet – sie kommen in den Papierkorb.</source>
        <translation>
            <numerusform>%n archivo sin commit – irá a la papelera.</numerusform>
            <numerusform>%n archivos sin commit – irán a la papelera.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1075"/>
        <source>⚠ Ein Agent arbeitet in dieser Arbeitskopie</source>
        <translation>⚠ Un agente trabaja en este worktree</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Entfernen</source>
        <translation>Eliminar</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Löschen</source>
        <translation>Borrar</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1088"/>
        <source>PROGRAMM LÖSCHEN</source>
        <translation>BORRAR PROGRAMA</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1103"/>
        <source>„%1“ kommt in den Papierkorb.</source>
        <translation>«%1» irá a la papelera.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1109"/>
        <source>Suche Starter …</source>
        <extracomment>looking for .desktop launchers of the program</extracomment>
        <translation>Buscando lanzadores …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Starter – kommen mit in den Papierkorb:</source>
        <translation>Lanzadores – también van a la papelera:</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Keine Starter gefunden.</source>
        <translation>No se encontraron lanzadores.</translation>
    </message>
</context>
<context>
    <name>ProgramView</name>
    <message>
        <location filename="../qml/ProgramView.qml" line="45"/>
        <source>installiert %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>instalada %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="51"/>
        <source>neueste %1</source>
        <extracomment>%1 = newest released version</extracomment>
        <translation>última %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>↑ Auf %1 aktualisieren</source>
        <translation>↑ Actualizar a %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>✓ Aktuell</source>
        <comment>program is up to date</comment>
        <translation>✓ Actualizado</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="80"/>
        <source>Starten</source>
        <translation>Iniciar</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="84"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>Carpeta</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="89"/>
        <source>Löschen</source>
        <translation>Borrar</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="134"/>
        <source>%n neuere Versionen</source>
        <translation>
            <numerusform>%n versión más nueva</numerusform>
            <numerusform>%n versiones más nuevas</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="136"/>
        <source>seit deiner %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>desde tu %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="137"/>
        <source>Startmenü-Einträge werden beim Update angepasst</source>
        <translation>Las entradas del menú de inicio se ajustan al actualizar</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="142"/>
        <source>VERSIONEN (RELEASES)</source>
        <translation>VERSIONES (RELEASES)</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>INSTALLIERT</source>
        <extracomment>release markers: the installed one / newer than the installed one</extracomment>
        <translation>INSTALADA</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>NEU</source>
        <translation>NUEVA</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="192"/>
        <source>Deine Version %1 ist älter als die letzten %n Releases.</source>
        <extracomment>%1 = installed version, %n = number of listed releases</extracomment>
        <translation>
            <numerusform>Tu versión %1 es anterior a %n release reciente.</numerusform>
            <numerusform>Tu versión %1 es anterior a las %n últimas releases.</numerusform>
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
        <translation>↓ ACTUALIZAR TODOS (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="81"/>
        <source>↓ ALLE (%1)</source>
        <translation>↓ TODOS (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="101"/>
        <source>Kein Projekt gefunden.</source>
        <translation>No se encontró ningún proyecto.</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="191"/>
        <source>⚠ NUR LOKAL</source>
        <translation>⚠ SOLO LOCAL</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>PRIVAT</source>
        <translation>PRIVADO</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>ÖFFENTLICH</source>
        <translation>PÚBLICO</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="195"/>
        <source>%n NEU</source>
        <extracomment>badge: new versions upstream</extracomment>
        <translation>
            <numerusform>%n NUEVO</numerusform>
            <numerusform>%n NUEVOS</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="197"/>
        <source>%n OFFEN</source>
        <extracomment>badge: files with uncommitted changes</extracomment>
        <translation>
            <numerusform>%n ABIERTO</numerusform>
            <numerusform>%n ABIERTOS</numerusform>
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
        <translation>%1 DISPONIBLE</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="204"/>
        <source>✓ AKTUELL</source>
        <comment>program is up to date</comment>
        <translation>✓ ACTUALIZADO</translation>
    </message>
</context>
<context>
    <name>ProjectColumn</name>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="15"/>
        <source>EIGENE PROJEKTE</source>
        <translation>MIS PROYECTOS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="20"/>
        <source>FREMDE REPOS</source>
        <translation>REPOS AJENOS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="26"/>
        <source>Sonstige</source>
        <comment>foreign repos without a sub-group</comment>
        <translation>Otros</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="33"/>
        <source>PROGRAMME</source>
        <translation>PROGRAMAS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="54"/>
        <source>PROJEKTE</source>
        <translation>PROYECTOS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="103"/>
        <source>DURCHSUCHTE ORDNER</source>
        <translation>CARPETAS ESCANEADAS</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="145"/>
        <source>+ Ordner hinzufügen</source>
        <translation>+ Añadir carpeta</translation>
    </message>
</context>
<context>
    <name>RefRow</name>
    <message>
        <location filename="../qml/RefRow.qml" line="49"/>
        <source>AKTIV</source>
        <extracomment>marker next to the branch that is checked out</extracomment>
        <translation>ACTIVA</translation>
    </message>
</context>
<context>
    <name>RepoStore</name>
    <message>
        <location filename="../src/repostore.cpp" line="454"/>
        <source>Verlauf konnte nicht gelesen werden: %1</source>
        <translation>No se pudo leer el historial: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="510"/>
        <source>Änderungen konnten nicht gelesen werden: %1</source>
        <translation>No se pudieron leer los cambios: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="570"/>
        <source>Diff konnte nicht gelesen werden: %1</source>
        <translation>No se pudo leer el diff: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="584"/>
        <source>@@ Binärdatei geändert @@</source>
        <extracomment>diff line for a binary file; keep the &quot;@@&quot; at the start (marks a hunk header)</extracomment>
        <translation>@@ Archivo binario cambiado @@</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="601"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (truncado)</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="815"/>
        <location filename="../src/repostore.cpp" line="863"/>
        <source>Ungültige Version</source>
        <translation>Commit no válido</translation>
    </message>
</context>
<context>
    <name>RepoView</name>
    <message>
        <location filename="../qml/RepoView.qml" line="108"/>
        <source>(losgelöst)</source>
        <comment>worktree on a detached HEAD</comment>
        <translation>(separado)</translation>
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
        <translation>◉ PÚBLICO</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 PRIVADO</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="169"/>
        <source>⚠ nur lokal – keine Sicherung außerhalb dieses Rechners</source>
        <translation>⚠ solo local – sin respaldo fuera de este equipo</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="175"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>Rama %1</translation>
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
            <numerusform>%1 archivo sin commit</numerusform>
            <numerusform>%1 archivos sin commit</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="188"/>
        <source>✓ alles committet</source>
        <translation>✓ todo con commit</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="199"/>
        <source>⚠ Ein Agent arbeitet in %1 – vor Commit/Pull abstimmen</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ Un agente trabaja en %1 – coordina antes de commit/pull</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>↓ Aktualisieren (%1)</source>
        <extracomment>%1 = number of new versions upstream / repo is up to date</extracomment>
        <translation>↓ Actualizar (%1)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>✓ Aktuell</source>
        <translation>✓ Actualizado</translation>
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
        <translation>☁ Respaldar en GitHub</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>◉ Öffentlich machen</source>
        <translation>◉ Hacer público</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>🔒 Privat machen</source>
        <translation>🔒 Hacer privado</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="262"/>
        <source>Nur noch lokal</source>
        <extracomment>button: delete the GitHub copy, keep the local folder</extracomment>
        <translation>Solo local</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="267"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>Carpeta</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="268"/>
        <source>Terminal</source>
        <translation>Terminal</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="274"/>
        <source>Löschen</source>
        <translation>Borrar</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="282"/>
        <source>Löschen gesperrt – enthält ~/AI/ComfyUI/user</source>
        <translation>Borrado bloqueado – contiene ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="367"/>
        <source>ZWEIGE &amp; ARBEITSKOPIEN</source>
        <translation>RAMAS &amp; WORKTREES</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="380"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ %n más</numerusform>
            <numerusform>+ %n más</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="382"/>
        <source>VERSIONEN (TAGS)</source>
        <translation>VERSIONES (TAGS)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>NEU AUF GITHUB</source>
        <translation>NUEVO EN GITHUB</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>%n Versionen noch nicht geladen</source>
        <translation>
            <numerusform>%n commit aún sin traer</numerusform>
            <numerusform>%n commits aún sin traer</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="419"/>
        <source>… und %n weitere</source>
        <translation>
            <numerusform>… y %n más</numerusform>
            <numerusform>… y %n más</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>VERLAUF</source>
        <extracomment>%1 = loaded versions, %2 = all versions (formatted number)</extracomment>
        <translation>HISTORIAL</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>neueste %1 von %2 · alle Zweige</source>
        <translation>últimos %1 de %2 · todas las ramas</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="438"/>
        <source>jetzt</source>
        <comment>time column of the working state row</comment>
        <translation>ahora</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>NICHT COMMITTET</source>
        <translation>SIN COMMIT</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Datei</source>
        <translation>%1 archivo</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Dateien</source>
        <translation>%1 archivos</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="471"/>
        <source>Arbeitskopie · Zweig %1</source>
        <translation>Worktree · rama %1</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="493"/>
        <source>▣ BILD</source>
        <comment>chip: this version changes a picture</comment>
        <translation>▣ IMAGEN</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="607"/>
        <source>… ältere Versionen werden beim Scrollen nachgeladen</source>
        <translation>… los commits anteriores se cargan al desplazarte</translation>
    </message>
</context>
<context>
    <name>Timeline</name>
    <message numerus="yes">
        <location filename="../qml/Timeline.qml" line="69"/>
        <source>ab %1: %n Versionen</source>
        <extracomment>tooltip of a timeline bar: %1 = month, %n = number of versions</extracomment>
        <translation>
            <numerusform>desde %1: %n commit</numerusform>
            <numerusform>desde %1: %n commits</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>gesamte Geschichte</source>
        <extracomment>below the timeline: the whole history is shown, the marked part is loaded (%1 = loaded versions)</extracomment>
        <translation>historial completo</translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>▭ geladen: neueste %1</source>
        <translation>▭ cargados: últimos %1</translation>
    </message>
</context>
<context>
    <name>Treemap</name>
    <message>
        <location filename="../qml/Treemap.qml" line="67"/>
        <source>binär</source>
        <extracomment>binary file, no line counts</extracomment>
        <translation>binario</translation>
    </message>
</context>
<context>
    <name>Updates</name>
    <message>
        <location filename="../src/updates.cpp" line="231"/>
        <source>Kein Platz für den Download in %1.</source>
        <translation>No hay espacio para la descarga en %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Download fehlgeschlagen: %1</source>
        <translation>Error en la descarga: %1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Zeitüberschreitung</source>
        <translation>Tiempo agotado</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="252"/>
        <source>Im Release %1 ist keine passende AppImage-Datei.</source>
        <translation>La release %1 no tiene ningún archivo AppImage adecuado.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="257"/>
        <source>%1 liegt schon im Ordner – nichts geändert.</source>
        <translation>%1 ya está en la carpeta – no se cambió nada.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="261"/>
        <source>Konnte %1 nicht ablegen.</source>
        <translation>No se pudo guardar %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="274"/>
        <source>%1 auf %2 aktualisiert, %3 Starter angepasst.</source>
        <extracomment>%1 = program, %2 = new version, %3 = number of changed .desktop launchers</extracomment>
        <translation>%1 actualizado a %2, %3 lanzador(es) ajustado(s).</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="276"/>
        <source> Nicht änderbar: %1</source>
        <translation> No modificable: %1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="278"/>
        <source> Alte Datei konnte nicht in den Papierkorb.</source>
        <translation> El archivo antiguo no se pudo mover a la papelera.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="395"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>Ya hay una acción en curso para este repo.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="405"/>
        <location filename="../src/updates.cpp" line="478"/>
        <source>Aktualisiert (Testdaten)</source>
        <translation>Actualizado (datos de prueba)</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="409"/>
        <source>Hole neue Versionen …</source>
        <translation>Trayendo commits nuevos …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="472"/>
        <location filename="../src/updates.cpp" line="553"/>
        <source>Programm %1 nicht gefunden.</source>
        <translation>Programa %1 no encontrado.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="474"/>
        <source>%1 wird gerade schon aktualisiert.</source>
        <translation>%1 ya se está actualizando.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="476"/>
        <source>%1 ist schon aktuell.</source>
        <translation>%1 ya está actualizado.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="485"/>
        <source>Lade %1 …</source>
        <extracomment>%1 = release tag being downloaded</extracomment>
        <translation>Descargando %1 …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="518"/>
        <source>%1 gestartet.</source>
        <translation>%1 iniciado.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="519"/>
        <source>%1 ließ sich nicht starten.</source>
        <translation>No se pudo iniciar %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="555"/>
        <source>Für %1 läuft gerade schon eine Aktion.</source>
        <translation>Ya hay una acción en curso para %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="557"/>
        <source>OK (Testdaten)</source>
        <translation>OK (datos de prueba)</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Datei, %3 Starter).</source>
        <extracomment>%1 = program, %2 = number of files, %3 = number of .desktop launchers</extracomment>
        <translation>%1 está en la papelera (%2 archivo, %3 lanzador(es)).</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Dateien, %3 Starter).</source>
        <translation>%1 está en la papelera (%2 archivos, %3 lanzador(es)).</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="580"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> No movido a la papelera: %1</translation>
    </message>
</context>
<context>
    <name>Util</name>
    <message>
        <location filename="../qml/Util.js" line="39"/>
        <source>HEUTE</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>HOY</translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="41"/>
        <source>GESTERN</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>AYER</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="48"/>
        <source>vor %n Min</source>
        <extracomment>age of the last change, short (minutes)</extracomment>
        <translation>
            <numerusform>hace %n min</numerusform>
            <numerusform>hace %n min</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="50"/>
        <source>vor %n Std</source>
        <extracomment>age of the last change, short (hours)</extracomment>
        <translation>
            <numerusform>hace %n h</numerusform>
            <numerusform>hace %n h</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="52"/>
        <source>gestern</source>
        <extracomment>age of the last change</extracomment>
        <translation>ayer</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="54"/>
        <source>vor %n Tagen</source>
        <extracomment>age of the last change (days)</extracomment>
        <translation>
            <numerusform>hace %n día</numerusform>
            <numerusform>hace %n días</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="99"/>
        <source>Keine Beschreibung.</source>
        <extracomment>release without release notes</extracomment>
        <translation>Sin descripción.</translation>
    </message>
</context>
<context>
    <name>WorkView</name>
    <message>
        <location filename="../qml/WorkView.qml" line="96"/>
        <source>● Nicht committete Änderungen</source>
        <translation>● Cambios sin commit</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="108"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>Rama %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="113"/>
        <source>%n nicht gepusht</source>
        <translation>
            <numerusform>%n sin push</numerusform>
            <numerusform>%n sin push</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="117"/>
        <source>⚠ nur lokal</source>
        <translation>⚠ solo local</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Datei</source>
        <translation>%1 archivo</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Dateien</source>
        <translation>%1 archivos</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="126"/>
        <source>%n vorgemerkt</source>
        <extracomment>files staged for the commit</extracomment>
        <translation>
            <numerusform>%n preparado</numerusform>
            <numerusform>%n preparados</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="203"/>
        <source>binär</source>
        <translation>binario</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="212"/>
        <source>VERWERFEN</source>
        <extracomment>discard the changes of this file</extracomment>
        <translation>DESCARTAR</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="240"/>
        <source>Keine Änderungen – alles committet.</source>
        <translation>Sin cambios – todo con commit.</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Binärdatei – nur ganz vormerken (Kästchen links).</source>
        <translation>Archivo binario – solo se prepara completo (casilla a la izquierda).</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Keine Abschnitte – nur ganz vormerken (Kästchen links).</source>
        <translation>Sin fragmentos – solo se prepara completo (casilla a la izquierda).</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="307"/>
        <source>VORGEMERKT</source>
        <extracomment>this hunk is staged</extracomment>
        <translation>PREPARADO</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>− Zurücknehmen</source>
        <extracomment>unstage / stage this hunk</extracomment>
        <translation>− Quitar</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>+ Vormerken</source>
        <translation>+ Preparar</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="352"/>
        <source>KURZBESCHREIBUNG</source>
        <extracomment>commit subject (first line of the commit message)</extracomment>
        <translation>RESUMEN</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="363"/>
        <source>Was wurde geändert?</source>
        <translation>¿Qué se cambió?</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="369"/>
        <source>DETAILS</source>
        <extracomment>commit message body</extracomment>
        <translation>DETALLES</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="380"/>
        <source>optional</source>
        <translation>opcional</translation>
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
        <translation>Nada preparado</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Kurzbeschreibung fehlt</source>
        <translation>Falta el resumen</translation>
    </message>
</context>
</TS>
