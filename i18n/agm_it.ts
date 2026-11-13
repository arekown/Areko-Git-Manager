<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="it" sourcelanguage="de">
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
        <translation>%1 file</translation>
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
        <translation>MAPPA</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="222"/>
        <source>▣ Bild</source>
        <translation>▣ Immagine</translation>
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
            <numerusform>+ altro %n file</numerusform>
            <numerusform>+ altri %n file</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="264"/>
        <source>Für diese Version liegen keine Dateiänderungen vor.</source>
        <translation>Nessuna modifica ai file in questo commit.</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Binärdatei – kein Text-Diff.</source>
        <translation>File binario – nessun diff testuale.</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Keine Textänderungen.</source>
        <translation>Nessuna modifica al testo.</translation>
    </message>
</context>
<context>
    <name>GitActions</name>
    <message>
        <location filename="../src/gitactions.cpp" line="75"/>
        <source>Zeitüberschreitung</source>
        <translation>Timeout</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="77"/>
        <source>git ließ sich nicht starten</source>
        <translation>Impossibile avviare git</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="354"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (troncato)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="392"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>È già in corso un&apos;azione per questo repo.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="457"/>
        <source>Arbeitsstand nicht lesbar: %1</source>
        <translation>Impossibile leggere lo stato di lavoro: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="487"/>
        <location filename="../src/gitactions.cpp" line="518"/>
        <location filename="../src/gitactions.cpp" line="680"/>
        <source>Diese Datei darf nicht bearbeitet werden.</source>
        <translation>Questo file non può essere modificato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="491"/>
        <location filename="../src/gitactions.cpp" line="522"/>
        <location filename="../src/gitactions.cpp" line="684"/>
        <source>Datei hat keine Änderungen mehr.</source>
        <translation>Il file non ha più modifiche.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Vormerken fehlgeschlagen: %1</source>
        <translation>Aggiunta allo stage non riuscita: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Zurücknehmen fehlgeschlagen: %1</source>
        <translation>Rimozione dallo stage non riuscita: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="524"/>
        <source>Neue Dateien lassen sich nur als ganze Datei vormerken.</source>
        <translation>I file nuovi si possono aggiungere allo stage solo per intero.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="527"/>
        <source>Abschnitt gibt es nicht mehr – Ansicht wurde neu geladen.</source>
        <translation>Il blocco non esiste più – vista ricaricata.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="537"/>
        <source>Abschnitt ließ sich nicht ändern: %1</source>
        <translation>Impossibile modificare il blocco: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="545"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Pull nicht möglich.</source>
        <translation>Nessun branch attivo (HEAD scollegato) – pull impossibile.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="549"/>
        <source>Kein Upstream-Zweig eingestellt – nichts zu holen.</source>
        <translation>Nessun branch upstream impostato – niente da scaricare.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="559"/>
        <source>Lokal und auf dem Server gibt es unterschiedliche neue Versionen. Pull holt nur ohne Zusammenführen (fast-forward) – nichts wurde geändert.</source>
        <translation>In locale e sul server ci sono commit nuovi divergenti. Il pull scarica solo senza merge (fast-forward) – nulla è stato modificato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="562"/>
        <source>Lokale Änderungen würden überschrieben – erst committen oder verwerfen.</source>
        <translation>Le modifiche locali verrebbero sovrascritte – prima fai commit o scartale.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="564"/>
        <source>Konflikt beim Holen – bitte selbst klären.</source>
        <translation>Conflitto durante il pull – risolvilo manualmente.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="566"/>
        <source>Pull fehlgeschlagen: %1</source>
        <translation>Pull non riuscito: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="571"/>
        <source>Schon aktuell.</source>
        <translation>Già aggiornato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>1 neue Version geholt.</source>
        <translation>Scaricato 1 nuovo commit.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>%1 neue Versionen geholt.</source>
        <translation>Scaricati %1 nuovi commit.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="583"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Push nicht möglich.</source>
        <translation>Nessun branch attivo (HEAD scollegato) – push impossibile.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="594"/>
        <source>Kein Server (origin) eingerichtet – erst „Auf GitHub sichern“.</source>
        <translation>Nessun server (origin) configurato – prima «Backup su GitHub».</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="601"/>
        <source>Schon aktuell auf dem Server.</source>
        <translation>Il server è già aggiornato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="602"/>
        <source>Hochgeladen.</source>
        <translation>Caricato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="607"/>
        <source>Auf dem Server gibt es neuere Versionen – erst Pull</source>
        <translation>Sul server ci sono commit più recenti – prima il pull</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="609"/>
        <source>Push fehlgeschlagen: %1</source>
        <translation>Push non riuscito: %1</translation>
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
        <translation>OK (dati di test)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="623"/>
        <source>Kurzbeschreibung fehlt.</source>
        <translation>Manca il sommario.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="626"/>
        <source>Nichts vorgemerkt – erst Dateien oder Abschnitte auswählen.</source>
        <translation>Niente in stage – prima seleziona file o blocchi.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="628"/>
        <location filename="../src/gitactions.cpp" line="635"/>
        <source>Commit fehlgeschlagen: %1</source>
        <translation>Commit non riuscito: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="638"/>
        <source>Committet (%1).</source>
        <translation>Commit eseguito (%1).</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="641"/>
        <source>Committet (%1), aber nicht hochgeladen: %2</source>
        <translation>Commit eseguito (%1), ma non caricato: %2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="642"/>
        <source>Committet (%1) und hochgeladen.</source>
        <translation>Commit eseguito (%1) e caricato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="698"/>
        <location filename="../src/gitactions.cpp" line="706"/>
        <source>Verwerfen fehlgeschlagen: %1</source>
        <translation>Impossibile scartare: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="711"/>
        <source>Konnte „%1“ nicht in den Papierkorb legen – nichts gelöscht.</source>
        <translation>Impossibile spostare «%1» nel cestino – nulla eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Verworfen – neue Datei liegt im Papierkorb.</source>
        <translation>Scartato – il nuovo file è nel cestino.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Änderungen verworfen.</source>
        <translation>Modifiche scartate.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="728"/>
        <source>Ungültiger Repo-Name (erlaubt: Buchstaben, Ziffern, . _ -).</source>
        <translation>Nome repo non valido (consentiti: lettere, cifre, . _ -).</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="730"/>
        <source>Hat schon einen Server (origin) – nichts angelegt.</source>
        <translation>Ha già un server (origin) – nulla creato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="732"/>
        <source>Noch keine Version – erst committen.</source>
        <translation>Ancora nessun commit – prima fai commit.</translation>
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
        <translation>Backup pubblico su GitHub: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="743"/>
        <source>Privat auf GitHub gesichert: %1</source>
        <translation>Backup privato su GitHub: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="771"/>
        <source>Gesperrt: Wurzelordner</source>
        <translation>Bloccato: cartella radice</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="774"/>
        <source>Gesperrt: enthält ~/AI/ComfyUI/user</source>
        <translation>Bloccato: contiene ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="777"/>
        <source>Gesperrt: persönlicher Ordner</source>
        <translation>Bloccato: cartella personale</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="882"/>
        <source>Kein Git-Repository</source>
        <translation>Non è un repository Git</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="941"/>
        <source>Ungültiger Name.</source>
        <translation>Nome non valido.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="945"/>
        <source>Den Zweig gibt es nicht mehr.</source>
        <translation>Il branch non esiste più.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="950"/>
        <source>Das ist der aktuelle Zweig – erst einen anderen auschecken.</source>
        <translation>È il branch attuale – prima fai checkout di un altro.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="951"/>
        <source>Ist in der Arbeitskopie %1 ausgecheckt – erst die Arbeitskopie entfernen.</source>
        <translation>È attivo nel worktree %1 – prima rimuovi il worktree.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="962"/>
        <source>Die Arbeitskopie gibt es nicht mehr.</source>
        <translation>Il worktree non esiste più.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="966"/>
        <source>Die Hauptarbeitskopie lässt sich nicht entfernen.</source>
        <translation>Il worktree principale non può essere rimosso.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="975"/>
        <source>Den Tag gibt es nicht mehr.</source>
        <translation>Il tag non esiste più.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="979"/>
        <source>Nur lokale Zweige, Arbeitskopien und Tags lassen sich löschen.</source>
        <translation>Si possono eliminare solo branch locali, worktree e tag.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1013"/>
        <source>%1 – nichts gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – nulla eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1015"/>
        <source>Kein Git-Repository – nichts gelöscht.</source>
        <translation>Non è un repository Git – nulla eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1023"/>
        <source>Arbeitskopie %1 ist gesperrt – nichts gelöscht.</source>
        <translation>Il worktree %1 è bloccato – nulla eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1030"/>
        <location filename="../src/gitactions.cpp" line="1247"/>
        <source>Kein eigenes GitHub-Repo – nichts gelöscht.</source>
        <translation>Non è un tuo repo GitHub – nulla eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1032"/>
        <location filename="../src/gitactions.cpp" line="1249"/>
        <source>gh darf keine Repos löschen (Recht delete_repo fehlt) – nichts gelöscht.</source>
        <translation>gh non può eliminare repo (manca il permesso delete_repo) – nulla eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1035"/>
        <location filename="../src/gitactions.cpp" line="1258"/>
        <source>GitHub: %1 – nichts gelöscht.</source>
        <translation>GitHub: %1 – nulla eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1039"/>
        <source>„%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>Impossibile spostare «%1» nel cestino.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1040"/>
        <source>Auf GitHub gelöscht, aber „%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>Eliminato su GitHub, ma impossibile spostare «%1» nel cestino.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1046"/>
        <source>„%1“ liegt im Papierkorb</source>
        <extracomment>start of a message that goes on with the parts below and ends with &quot;.&quot;</extracomment>
        <translation>«%1» è nel cestino</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ 1 Arbeitskopie)</source>
        <translation> (+ 1 worktree)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ %1 Arbeitskopien)</source>
        <translation> (+ %1 worktree)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1051"/>
        <source>, %1 auf GitHub gelöscht</source>
        <translation>, %1 eliminato su GitHub</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1054"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> Non spostato nel cestino: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1092"/>
        <source>Zweig nicht gelöscht: %1</source>
        <translation>Branch non eliminato: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1093"/>
        <source>Zweig „%1“ gelöscht.</source>
        <translation>Branch «%1» eliminato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1101"/>
        <source>Arbeitskopie nicht in den Papierkorb verschoben.</source>
        <translation>Worktree non spostato nel cestino.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1103"/>
        <source>Arbeitskopie %1 in den Papierkorb verschoben.</source>
        <translation>Worktree %1 spostato nel cestino.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1107"/>
        <source>Arbeitskopie nicht entfernt: %1</source>
        <translation>Worktree non rimosso: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1108"/>
        <source>Arbeitskopie %1 entfernt.</source>
        <translation>Worktree %1 rimosso.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1112"/>
        <source>Tag nicht gelöscht: %1</source>
        <translation>Tag non eliminato: %1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1113"/>
        <source>Tag „%1“ lokal gelöscht.</source>
        <translation>Tag «%1» eliminato in locale.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1202"/>
        <source>Kein eigenes GitHub-Repo – nichts geändert.</source>
        <translation>Non è un tuo repo GitHub – nulla modificato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt öffentlich.</source>
        <translation>%1 ora è pubblico.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt privat.</source>
        <translation>%1 ora è privato.</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1253"/>
        <source>Abgleich mit GitHub fehlgeschlagen: %1 – nichts gelöscht.</source>
        <translation>Confronto con GitHub non riuscito: %1 – nulla eliminato.</translation>
    </message>
    <message numerus="yes">
        <location filename="../src/gitactions.cpp" line="1255"/>
        <source>%n Versionen gibt es nur auf GitHub – vorher Pull. Nichts gelöscht.</source>
        <translation>
            <numerusform>%n commit esiste solo su GitHub – prima fai pull. Nulla eliminato.</numerusform>
            <numerusform>%n commit esistono solo su GitHub – prima fai pull. Nulla eliminato.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1261"/>
        <source>%1 auf GitHub gelöscht, aber origin ließ sich nicht entfernen: %2</source>
        <translation>%1 eliminato su GitHub, ma impossibile rimuovere origin: %2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1262"/>
        <source>%1 auf GitHub gelöscht – das Projekt ist nur noch lokal.</source>
        <translation>%1 eliminato su GitHub – il progetto ora è solo locale.</translation>
    </message>
</context>
<context>
    <name>ImageCompare</name>
    <message>
        <location filename="../qml/ImageCompare.qml" line="11"/>
        <source>◀ ALT</source>
        <translation>◀ PRIMA</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU ▶</source>
        <translation>DOPO ▶</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU HINZUGEFÜGT</source>
        <translation>AGGIUNTO</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>lädt …</source>
        <translation>caricamento …</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>Bild nicht lesbar</source>
        <translation>Immagine non leggibile</translation>
    </message>
</context>
<context>
    <name>Main</name>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>ALLE</source>
        <extracomment>filter chips in the header</extracomment>
        <translation>TUTTI</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>EIGENE</source>
        <translation>MIEI</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>NUR LOKAL</source>
        <translation>SOLO LOCALI</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>GEÄNDERT</source>
        <translation>MODIFICATI</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>UPDATES</source>
        <translation>NOVITÀ</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>FREMD</source>
        <translation>ESTERNI</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="289"/>
        <source>Ordner zum Durchsuchen wählen</source>
        <translation>Scegli cartella da scansionare</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="400"/>
        <source>Projekt suchen …</source>
        <translation>Cerca progetto …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="441"/>
        <source>⟳ LESE EIN …</source>
        <extracomment>status line in the header; the counters are upper case like the rest of the line</extracomment>
        <translation>⟳ LETTURA …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n REPOS</source>
        <translation>
            <numerusform>%n REPO</numerusform>
            <numerusform>%n REPO</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n PROGRAMME</source>
        <translation>
            <numerusform>%n PROGRAMMA</numerusform>
            <numerusform>%n PROGRAMMI</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="443"/>
        <source>%n OHNE SICHERUNG</source>
        <translation>
            <numerusform>%n SENZA BACKUP</numerusform>
            <numerusform>%n SENZA BACKUP</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="444"/>
        <source>%n UPDATES</source>
        <translation>
            <numerusform>%n NOVITÀ</numerusform>
            <numerusform>%n NOVITÀ</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="451"/>
        <source>⟳ Neu einlesen</source>
        <translation>⟳ Ricarica</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Lese Repositories ein …</source>
        <translation>Lettura dei repository …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Keine Repositories gefunden.</source>
        <translation>Nessun repository trovato.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="625"/>
        <source>ÄNDERUNGEN VERWERFEN</source>
        <translation>SCARTA MODIFICHE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="632"/>
        <source>Die neue Datei „%1“ kommt in den Papierkorb.</source>
        <translation>Il nuovo file «%1» verrà spostato nel cestino.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="633"/>
        <source>Alle Änderungen an „%1“ werden verworfen.</source>
        <translation>Tutte le modifiche a «%1» verranno scartate.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="638"/>
        <source>Das lässt sich nicht rückgängig machen.</source>
        <translation>Non si può annullare.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="644"/>
        <source>Verwerfen</source>
        <translation>Scarta</translation>
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
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="651"/>
        <source>☁ AUF GITHUB SICHERN</source>
        <translation>☁ BACKUP SU GITHUB</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="664"/>
        <source>Legt auf GitHub ein Repository an und lädt alle Versionen von „%1“ hoch.</source>
        <translation>Crea un repository su GitHub e carica tutti i commit di «%1».</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="669"/>
        <source>NAME</source>
        <extracomment>name of the new GitHub repository</extracomment>
        <translation>NOME</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="681"/>
        <source>SICHTBARKEIT</source>
        <translation>VISIBILITÀ</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="688"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 PRIVATO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="689"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ PUBBLICO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="711"/>
        <source>Nur Buchstaben, Ziffern, Punkt, Minus und Unterstrich.</source>
        <translation>Solo lettere, cifre, punto, trattino e trattino basso.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>öffentlich</source>
        <translation>pubblico</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>privat</source>
        <translation>privato</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="720"/>
        <location filename="../qml/Main.qml" line="924"/>
        <source>Jeder kann den Code und alle bisherigen Versionen sehen.</source>
        <translation>Chiunque può vedere il codice e tutti i commit precedenti.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Öffentlich sichern</source>
        <translation>☁ Backup pubblico</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Privat sichern</source>
        <translation>☁ Backup privato</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="733"/>
        <source>PROJEKT LÖSCHEN</source>
        <translation>ELIMINA PROGETTO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="750"/>
        <source>„%1“ kommt mit dem ganzen Ordner in den Papierkorb.</source>
        <translation>«%1» verrà spostato nel cestino con l&apos;intera cartella.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="761"/>
        <source>Prüfe Ordner …</source>
        <translation>Controllo cartella …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="769"/>
        <source>%1 – wird nicht gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – non verrà eliminato.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="778"/>
        <source>Größe %1</source>
        <extracomment>%1 = size of the folder</extracomment>
        <translation>Dimensione %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="779"/>
        <source>%n Dateien nicht committet</source>
        <translation>
            <numerusform>%n file non committato</numerusform>
            <numerusform>%n file non committati</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>Arbeitsstand nicht lesbar</source>
        <translation>Stato di lavoro non leggibile</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>alles committet</source>
        <translation>tutto committato</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="782"/>
        <source>%1 Versionen auf keinem Server</source>
        <extracomment>%1 = formatted number of versions (commits) not pushed anywhere</extracomment>
        <translation>
            <numerusform>%1 commit su nessun server</numerusform>
            <numerusform>%1 commit su nessun server</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>keine Versionen</source>
        <translation>nessun commit</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>alle Versionen auf dem Server</source>
        <translation>tutti i commit sul server</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="789"/>
        <source>Das ist die einzige Kopie</source>
        <translation>È l&apos;unica copia</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="798"/>
        <source>Enthält weitere Repos – werden mitgelöscht:</source>
        <translation>Contiene altri repo – eliminati anch&apos;essi:</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="812"/>
        <location filename="../qml/Main.qml" line="837"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ altro %n</numerusform>
            <numerusform>+ altri %n</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="821"/>
        <source>Arbeitskopien – kommen mit in den Papierkorb:</source>
        <translation>Worktree – spostati anch&apos;essi nel cestino:</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="830"/>
        <source>(außerhalb)</source>
        <extracomment>worktree outside the project folder / its uncommitted files</extracomment>
        <translation>(esterno)</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="831"/>
        <source>%n nicht committet</source>
        <translation>
            <numerusform>%n non committato</numerusform>
            <numerusform>%n non committati</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="846"/>
        <source>⚠ Ein Agent arbeitet in %1</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ Un agente sta lavorando in %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>Auch auf GitHub löschen</source>
        <translation>Elimina anche su GitHub</translation>
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
        <translation>gh non può eliminare repo – prima nel terminale: gh auth refresh -s delete_repo</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="894"/>
        <location filename="../qml/Main.qml" line="1149"/>
        <source>In den Papierkorb</source>
        <translation>Nel cestino</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>◉ ÖFFENTLICH MACHEN</source>
        <translation>◉ RENDI PUBBLICO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>🔒 PRIVAT MACHEN</source>
        <translation>🔒 RENDI PRIVATO</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="912"/>
        <source>„%1“ wird auf GitHub öffentlich.</source>
        <translation>«%1» diventerà pubblico su GitHub.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="913"/>
        <source>„%1“ wird auf GitHub privat – nur du siehst es dann.</source>
        <translation>«%1» diventerà privato su GitHub – solo tu potrai vederlo.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Öffentlich machen</source>
        <translation>Rendi pubblico</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Privat machen</source>
        <translation>Rendi privato</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="937"/>
        <source>NUR NOCH LOKAL</source>
        <translation>SOLO LOCALE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="951"/>
        <source>Das Repo auf GitHub wird endgültig gelöscht (auch Issues/Releases). Dein Ordner hier bleibt vollständig.</source>
        <translation>Il repo su GitHub verrà eliminato definitivamente (anche issue/release). La tua cartella qui resta intatta.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="960"/>
        <source>Gleiche mit GitHub ab …</source>
        <translation>Confronto con GitHub …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="969"/>
        <source>%1 Versionen gibt es nur auf GitHub – vorher Pull</source>
        <extracomment>%1 = formatted number of versions (commits)</extracomment>
        <translation>
            <numerusform>%1 commit esiste solo su GitHub – prima fai pull</numerusform>
            <numerusform>%1 commit esistono solo su GitHub – prima fai pull</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>Abgleich mit GitHub fehlgeschlagen – %1</source>
        <extracomment>%1 = error message of git fetch</extracomment>
        <translation>Confronto con GitHub non riuscito – %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>unbekannt</source>
        <translation>sconosciuto</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="983"/>
        <source>✓ alle Versionen von GitHub liegen auch hier</source>
        <translation>✓ tutti i commit di GitHub sono anche qui</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="997"/>
        <source>Auf GitHub löschen</source>
        <translation>Elimina su GitHub</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1003"/>
        <source>ZWEIG LÖSCHEN</source>
        <translation>ELIMINA BRANCH</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>ARBEITSKOPIE ENTFERNEN</source>
        <translation>RIMUOVI WORKTREE</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>TAG LÖSCHEN</source>
        <translation>ELIMINA TAG</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1020"/>
        <source>Zweig „%1“ wird gelöscht.</source>
        <translation>Il branch «%1» verrà eliminato.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1022"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht, der Zweig „%1“ bleibt.</source>
        <translation>Il worktree verrà rimosso – la sua cartella viene eliminata, il branch «%1» resta.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1023"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht.</source>
        <translation>Il worktree verrà rimosso – la sua cartella viene eliminata.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1024"/>
        <source>Tag „%1“ wird nur lokal gelöscht – auf dem Server bleibt er.</source>
        <translation>Il tag «%1» viene eliminato solo in locale – resta sul server.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1025"/>
        <source>Tag „%1“ wird nur lokal gelöscht.</source>
        <translation>Il tag «%1» viene eliminato solo in locale.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1037"/>
        <source>Prüfe …</source>
        <translation>Controllo …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1052"/>
        <source>1 Version gibt es nur in diesem Zweig</source>
        <translation>1 commit esiste solo in questo branch</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1053"/>
        <source>%1 Versionen gibt es nur in diesem Zweig</source>
        <translation>%1 commit esistono solo in questo branch</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Sie gehen mit dem Zweig verloren.</source>
        <translation>Andranno persi con il branch.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Alle Versionen liegen auch in anderen Zweigen.</source>
        <translation>Tutti i commit sono anche in altri branch.</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="1068"/>
        <source>%n Dateien nicht committet – sie kommen in den Papierkorb.</source>
        <translation>
            <numerusform>%n file non committato – verrà spostato nel cestino.</numerusform>
            <numerusform>%n file non committati – verranno spostati nel cestino.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1075"/>
        <source>⚠ Ein Agent arbeitet in dieser Arbeitskopie</source>
        <translation>⚠ Un agente sta lavorando in questo worktree</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Entfernen</source>
        <translation>Rimuovi</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Löschen</source>
        <translation>Elimina</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1088"/>
        <source>PROGRAMM LÖSCHEN</source>
        <translation>ELIMINA PROGRAMMA</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1103"/>
        <source>„%1“ kommt in den Papierkorb.</source>
        <translation>«%1» verrà spostato nel cestino.</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1109"/>
        <source>Suche Starter …</source>
        <extracomment>looking for .desktop launchers of the program</extracomment>
        <translation>Ricerca launcher …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Starter – kommen mit in den Papierkorb:</source>
        <translation>Launcher – spostati anch&apos;essi nel cestino:</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Keine Starter gefunden.</source>
        <translation>Nessun launcher trovato.</translation>
    </message>
</context>
<context>
    <name>ProgramView</name>
    <message>
        <location filename="../qml/ProgramView.qml" line="45"/>
        <source>installiert %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>installata %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="51"/>
        <source>neueste %1</source>
        <extracomment>%1 = newest released version</extracomment>
        <translation>ultima %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>↑ Auf %1 aktualisieren</source>
        <translation>↑ Aggiorna a %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>✓ Aktuell</source>
        <comment>program is up to date</comment>
        <translation>✓ Aggiornato</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="80"/>
        <source>Starten</source>
        <translation>Avvia</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="84"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>Cartella</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="89"/>
        <source>Löschen</source>
        <translation>Elimina</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="134"/>
        <source>%n neuere Versionen</source>
        <translation>
            <numerusform>%n versione più recente</numerusform>
            <numerusform>%n versioni più recenti</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="136"/>
        <source>seit deiner %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>dalla tua %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="137"/>
        <source>Startmenü-Einträge werden beim Update angepasst</source>
        <translation>Le voci del menu di avvio vengono adattate all&apos;aggiornamento</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="142"/>
        <source>VERSIONEN (RELEASES)</source>
        <translation>VERSIONI (RELEASE)</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>INSTALLIERT</source>
        <extracomment>release markers: the installed one / newer than the installed one</extracomment>
        <translation>INSTALLATA</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>NEU</source>
        <translation>NUOVA</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="192"/>
        <source>Deine Version %1 ist älter als die letzten %n Releases.</source>
        <extracomment>%1 = installed version, %n = number of listed releases</extracomment>
        <translation>
            <numerusform>La tua versione %1 è più vecchia di %n release recente.</numerusform>
            <numerusform>La tua versione %1 è più vecchia delle ultime %n release.</numerusform>
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
        <translation>↓ AGGIORNA TUTTI (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="81"/>
        <source>↓ ALLE (%1)</source>
        <translation>↓ TUTTI (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="101"/>
        <source>Kein Projekt gefunden.</source>
        <translation>Nessun progetto trovato.</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="191"/>
        <source>⚠ NUR LOKAL</source>
        <translation>⚠ SOLO LOCALE</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>PRIVAT</source>
        <translation>PRIVATO</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>ÖFFENTLICH</source>
        <translation>PUBBLICO</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="195"/>
        <source>%n NEU</source>
        <extracomment>badge: new versions upstream</extracomment>
        <translation>
            <numerusform>%n NUOVO</numerusform>
            <numerusform>%n NUOVI</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="197"/>
        <source>%n OFFEN</source>
        <extracomment>badge: files with uncommitted changes</extracomment>
        <translation>
            <numerusform>%n APERTO</numerusform>
            <numerusform>%n APERTI</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="201"/>
        <source>%1 Vers.</source>
        <extracomment>badge, short for &quot;versions&quot; (commits); %1 = formatted number</extracomment>
        <translation>
            <numerusform>%1 commit</numerusform>
            <numerusform>%1 commit</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="203"/>
        <source>%1 VERFÜGBAR</source>
        <comment>a newer program version</comment>
        <translation>%1 DISPONIBILE</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="204"/>
        <source>✓ AKTUELL</source>
        <comment>program is up to date</comment>
        <translation>✓ AGGIORNATO</translation>
    </message>
</context>
<context>
    <name>ProjectColumn</name>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="15"/>
        <source>EIGENE PROJEKTE</source>
        <translation>I MIEI PROGETTI</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="20"/>
        <source>FREMDE REPOS</source>
        <translation>REPO ESTERNI</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="26"/>
        <source>Sonstige</source>
        <comment>foreign repos without a sub-group</comment>
        <translation>Altri</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="33"/>
        <source>PROGRAMME</source>
        <translation>PROGRAMMI</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="54"/>
        <source>PROJEKTE</source>
        <translation>PROGETTI</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="103"/>
        <source>DURCHSUCHTE ORDNER</source>
        <translation>CARTELLE SCANSIONATE</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="145"/>
        <source>+ Ordner hinzufügen</source>
        <translation>+ Aggiungi cartella</translation>
    </message>
</context>
<context>
    <name>RefRow</name>
    <message>
        <location filename="../qml/RefRow.qml" line="49"/>
        <source>AKTIV</source>
        <extracomment>marker next to the branch that is checked out</extracomment>
        <translation>ATTIVO</translation>
    </message>
</context>
<context>
    <name>RepoStore</name>
    <message>
        <location filename="../src/repostore.cpp" line="454"/>
        <source>Verlauf konnte nicht gelesen werden: %1</source>
        <translation>Impossibile leggere la cronologia: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="510"/>
        <source>Änderungen konnten nicht gelesen werden: %1</source>
        <translation>Impossibile leggere le modifiche: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="570"/>
        <source>Diff konnte nicht gelesen werden: %1</source>
        <translation>Impossibile leggere il diff: %1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="584"/>
        <source>@@ Binärdatei geändert @@</source>
        <extracomment>diff line for a binary file; keep the &quot;@@&quot; at the start (marks a hunk header)</extracomment>
        <translation>@@ File binario modificato @@</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="601"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (troncato)</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="815"/>
        <location filename="../src/repostore.cpp" line="863"/>
        <source>Ungültige Version</source>
        <translation>Commit non valido</translation>
    </message>
</context>
<context>
    <name>RepoView</name>
    <message>
        <location filename="../qml/RepoView.qml" line="108"/>
        <source>(losgelöst)</source>
        <comment>worktree on a detached HEAD</comment>
        <translation>(scollegato)</translation>
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
        <translation>◉ PUBBLICO</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 PRIVATO</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="169"/>
        <source>⚠ nur lokal – keine Sicherung außerhalb dieses Rechners</source>
        <translation>⚠ solo locale – nessun backup fuori da questo computer</translation>
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
            <numerusform>%1 commit</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="187"/>
        <source>%1 Dateien nicht committet</source>
        <translation>
            <numerusform>%1 file non committato</numerusform>
            <numerusform>%1 file non committati</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="188"/>
        <source>✓ alles committet</source>
        <translation>✓ tutto committato</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="199"/>
        <source>⚠ Ein Agent arbeitet in %1 – vor Commit/Pull abstimmen</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ Un agente sta lavorando in %1 – coordinati prima di commit/pull</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>↓ Aktualisieren (%1)</source>
        <extracomment>%1 = number of new versions upstream / repo is up to date</extracomment>
        <translation>↓ Aggiorna (%1)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>✓ Aktuell</source>
        <translation>✓ Aggiornato</translation>
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
        <translation>☁ Backup su GitHub</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>◉ Öffentlich machen</source>
        <translation>◉ Rendi pubblico</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>🔒 Privat machen</source>
        <translation>🔒 Rendi privato</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="262"/>
        <source>Nur noch lokal</source>
        <extracomment>button: delete the GitHub copy, keep the local folder</extracomment>
        <translation>Solo locale</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="267"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>Cartella</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="268"/>
        <source>Terminal</source>
        <translation>Terminale</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="274"/>
        <source>Löschen</source>
        <translation>Elimina</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="282"/>
        <source>Löschen gesperrt – enthält ~/AI/ComfyUI/user</source>
        <translation>Eliminazione bloccata – contiene ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="367"/>
        <source>ZWEIGE &amp; ARBEITSKOPIEN</source>
        <translation>BRANCH &amp; WORKTREE</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="380"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ altro %n</numerusform>
            <numerusform>+ altri %n</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="382"/>
        <source>VERSIONEN (TAGS)</source>
        <translation>VERSIONI (TAG)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>NEU AUF GITHUB</source>
        <translation>NUOVO SU GITHUB</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>%n Versionen noch nicht geladen</source>
        <translation>
            <numerusform>%n commit non ancora scaricato</numerusform>
            <numerusform>%n commit non ancora scaricati</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="419"/>
        <source>… und %n weitere</source>
        <translation>
            <numerusform>… e altro %n</numerusform>
            <numerusform>… e altri %n</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>VERLAUF</source>
        <extracomment>%1 = loaded versions, %2 = all versions (formatted number)</extracomment>
        <translation>CRONOLOGIA</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>neueste %1 von %2 · alle Zweige</source>
        <translation>ultimi %1 di %2 · tutti i branch</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="438"/>
        <source>jetzt</source>
        <comment>time column of the working state row</comment>
        <translation>ora</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>NICHT COMMITTET</source>
        <translation>NON COMMITTATO</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Datei</source>
        <translation>%1 file</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Dateien</source>
        <translation>%1 file</translation>
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
        <translation>▣ IMMAGINE</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="607"/>
        <source>… ältere Versionen werden beim Scrollen nachgeladen</source>
        <translation>… i commit precedenti vengono caricati scorrendo</translation>
    </message>
</context>
<context>
    <name>Timeline</name>
    <message numerus="yes">
        <location filename="../qml/Timeline.qml" line="69"/>
        <source>ab %1: %n Versionen</source>
        <extracomment>tooltip of a timeline bar: %1 = month, %n = number of versions</extracomment>
        <translation>
            <numerusform>da %1: %n commit</numerusform>
            <numerusform>da %1: %n commit</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>gesamte Geschichte</source>
        <extracomment>below the timeline: the whole history is shown, the marked part is loaded (%1 = loaded versions)</extracomment>
        <translation>cronologia completa</translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>▭ geladen: neueste %1</source>
        <translation>▭ caricati: ultimi %1</translation>
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
        <translation>Spazio insufficiente per il download in %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Download fehlgeschlagen: %1</source>
        <translation>Download non riuscito: %1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Zeitüberschreitung</source>
        <translation>Timeout</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="252"/>
        <source>Im Release %1 ist keine passende AppImage-Datei.</source>
        <translation>La release %1 non contiene un file AppImage adatto.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="257"/>
        <source>%1 liegt schon im Ordner – nichts geändert.</source>
        <translation>%1 è già nella cartella – nulla modificato.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="261"/>
        <source>Konnte %1 nicht ablegen.</source>
        <translation>Impossibile salvare %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="274"/>
        <source>%1 auf %2 aktualisiert, %3 Starter angepasst.</source>
        <extracomment>%1 = program, %2 = new version, %3 = number of changed .desktop launchers</extracomment>
        <translation>%1 aggiornato a %2, %3 launcher adattati.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="276"/>
        <source> Nicht änderbar: %1</source>
        <translation> Non modificabile: %1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="278"/>
        <source> Alte Datei konnte nicht in den Papierkorb.</source>
        <translation> Impossibile spostare il vecchio file nel cestino.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="395"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>È già in corso un&apos;azione per questo repo.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="405"/>
        <location filename="../src/updates.cpp" line="478"/>
        <source>Aktualisiert (Testdaten)</source>
        <translation>Aggiornato (dati di test)</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="409"/>
        <source>Hole neue Versionen …</source>
        <translation>Scaricamento nuovi commit …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="472"/>
        <location filename="../src/updates.cpp" line="553"/>
        <source>Programm %1 nicht gefunden.</source>
        <translation>Programma %1 non trovato.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="474"/>
        <source>%1 wird gerade schon aktualisiert.</source>
        <translation>%1 è già in aggiornamento.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="476"/>
        <source>%1 ist schon aktuell.</source>
        <translation>%1 è già aggiornato.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="485"/>
        <source>Lade %1 …</source>
        <extracomment>%1 = release tag being downloaded</extracomment>
        <translation>Download di %1 …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="518"/>
        <source>%1 gestartet.</source>
        <translation>%1 avviato.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="519"/>
        <source>%1 ließ sich nicht starten.</source>
        <translation>Impossibile avviare %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="555"/>
        <source>Für %1 läuft gerade schon eine Aktion.</source>
        <translation>È già in corso un&apos;azione per %1.</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="557"/>
        <source>OK (Testdaten)</source>
        <translation>OK (dati di test)</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Datei, %3 Starter).</source>
        <extracomment>%1 = program, %2 = number of files, %3 = number of .desktop launchers</extracomment>
        <translation>%1 è nel cestino (%2 file, %3 launcher).</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Dateien, %3 Starter).</source>
        <translation>%1 è nel cestino (%2 file, %3 launcher).</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="580"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> Non spostato nel cestino: %1</translation>
    </message>
</context>
<context>
    <name>Util</name>
    <message>
        <location filename="../qml/Util.js" line="39"/>
        <source>HEUTE</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>OGGI</translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="41"/>
        <source>GESTERN</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>IERI</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="48"/>
        <source>vor %n Min</source>
        <extracomment>age of the last change, short (minutes)</extracomment>
        <translation>
            <numerusform>%n min fa</numerusform>
            <numerusform>%n min fa</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="50"/>
        <source>vor %n Std</source>
        <extracomment>age of the last change, short (hours)</extracomment>
        <translation>
            <numerusform>%n h fa</numerusform>
            <numerusform>%n h fa</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="52"/>
        <source>gestern</source>
        <extracomment>age of the last change</extracomment>
        <translation>ieri</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="54"/>
        <source>vor %n Tagen</source>
        <extracomment>age of the last change (days)</extracomment>
        <translation>
            <numerusform>%n giorno fa</numerusform>
            <numerusform>%n giorni fa</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="99"/>
        <source>Keine Beschreibung.</source>
        <extracomment>release without release notes</extracomment>
        <translation>Nessuna descrizione.</translation>
    </message>
</context>
<context>
    <name>WorkView</name>
    <message>
        <location filename="../qml/WorkView.qml" line="96"/>
        <source>● Nicht committete Änderungen</source>
        <translation>● Modifiche non committate</translation>
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
            <numerusform>%n senza push</numerusform>
            <numerusform>%n senza push</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="117"/>
        <source>⚠ nur lokal</source>
        <translation>⚠ solo locale</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Datei</source>
        <translation>%1 file</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Dateien</source>
        <translation>%1 file</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="126"/>
        <source>%n vorgemerkt</source>
        <extracomment>files staged for the commit</extracomment>
        <translation>
            <numerusform>%n in stage</numerusform>
            <numerusform>%n in stage</numerusform>
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
        <translation>SCARTA</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="240"/>
        <source>Keine Änderungen – alles committet.</source>
        <translation>Nessuna modifica – tutto committato.</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Binärdatei – nur ganz vormerken (Kästchen links).</source>
        <translation>File binario – solo stage completo (casella a sinistra).</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Keine Abschnitte – nur ganz vormerken (Kästchen links).</source>
        <translation>Nessun blocco – solo stage completo (casella a sinistra).</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="307"/>
        <source>VORGEMERKT</source>
        <extracomment>this hunk is staged</extracomment>
        <translation>IN STAGE</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>− Zurücknehmen</source>
        <extracomment>unstage / stage this hunk</extracomment>
        <translation>− Rimuovi</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>+ Vormerken</source>
        <translation>+ Aggiungi</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="352"/>
        <source>KURZBESCHREIBUNG</source>
        <extracomment>commit subject (first line of the commit message)</extracomment>
        <translation>SOMMARIO</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="363"/>
        <source>Was wurde geändert?</source>
        <translation>Cosa è cambiato?</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="369"/>
        <source>DETAILS</source>
        <extracomment>commit message body</extracomment>
        <translation>DETTAGLI</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="380"/>
        <source>optional</source>
        <translation>facoltativo</translation>
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
        <translation>Niente in stage</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Kurzbeschreibung fehlt</source>
        <translation>Manca il sommario</translation>
    </message>
</context>
</TS>
