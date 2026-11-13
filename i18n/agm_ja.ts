<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ja" sourcelanguage="de">
<context>
    <name>CommitDetail</name>
    <message>
        <location filename="../qml/CommitDetail.qml" line="88"/>
        <source>Zusammenführung</source>
        <comment>merge commit</comment>
        <translation>マージ</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Datei</source>
        <translation>%1 ファイル</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Dateien</source>
        <translation>%1 ファイル</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>LISTE</source>
        <extracomment>file view switch: list / map of tiles</extracomment>
        <translation>リスト</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>KARTE</source>
        <translation>マップ</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="222"/>
        <source>▣ Bild</source>
        <translation>▣ 画像</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="223"/>
        <source>binär</source>
        <translation>バイナリ</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/CommitDetail.qml" line="245"/>
        <source>+ %n weitere Dateien</source>
        <translation>
            <numerusform>+ 他 %n ファイル</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="264"/>
        <source>Für diese Version liegen keine Dateiänderungen vor.</source>
        <translation>このコミットにはファイルの変更がありません。</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Binärdatei – kein Text-Diff.</source>
        <translation>バイナリファイル – テキスト差分なし。</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Keine Textänderungen.</source>
        <translation>テキストの変更はありません。</translation>
    </message>
</context>
<context>
    <name>GitActions</name>
    <message>
        <location filename="../src/gitactions.cpp" line="75"/>
        <source>Zeitüberschreitung</source>
        <translation>タイムアウト</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="77"/>
        <source>git ließ sich nicht starten</source>
        <translation>git を起動できませんでした</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="354"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (省略)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="392"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>このリポジトリでは既に操作が実行中です。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="457"/>
        <source>Arbeitsstand nicht lesbar: %1</source>
        <translation>作業状態を読み取れません：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="487"/>
        <location filename="../src/gitactions.cpp" line="518"/>
        <location filename="../src/gitactions.cpp" line="680"/>
        <source>Diese Datei darf nicht bearbeitet werden.</source>
        <translation>このファイルは編集できません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="491"/>
        <location filename="../src/gitactions.cpp" line="522"/>
        <location filename="../src/gitactions.cpp" line="684"/>
        <source>Datei hat keine Änderungen mehr.</source>
        <translation>ファイルに変更はもうありません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Vormerken fehlgeschlagen: %1</source>
        <translation>ステージに失敗しました：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Zurücknehmen fehlgeschlagen: %1</source>
        <translation>ステージ解除に失敗しました：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="524"/>
        <source>Neue Dateien lassen sich nur als ganze Datei vormerken.</source>
        <translation>新規ファイルはファイル全体でのみステージできます。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="527"/>
        <source>Abschnitt gibt es nicht mehr – Ansicht wurde neu geladen.</source>
        <translation>ハンクはもう存在しません – 表示を再読み込みしました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="537"/>
        <source>Abschnitt ließ sich nicht ändern: %1</source>
        <translation>ハンクを変更できませんでした：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="545"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Pull nicht möglich.</source>
        <translation>ブランチがチェックアウトされていません（デタッチ HEAD）– プルできません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="549"/>
        <source>Kein Upstream-Zweig eingestellt – nichts zu holen.</source>
        <translation>上流ブランチが設定されていません – 取得するものはありません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="559"/>
        <source>Lokal und auf dem Server gibt es unterschiedliche neue Versionen. Pull holt nur ohne Zusammenführen (fast-forward) – nichts wurde geändert.</source>
        <translation>ローカルとサーバーにそれぞれ異なる新しいコミットがあります。プルはマージなし（fast-forward）でのみ行います – 何も変更していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="562"/>
        <source>Lokale Änderungen würden überschrieben – erst committen oder verwerfen.</source>
        <translation>ローカルの変更が上書きされます – 先にコミットするか破棄してください。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="564"/>
        <source>Konflikt beim Holen – bitte selbst klären.</source>
        <translation>取得中にコンフリクトが発生しました – 手動で解決してください。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="566"/>
        <source>Pull fehlgeschlagen: %1</source>
        <translation>プルに失敗しました：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="571"/>
        <source>Schon aktuell.</source>
        <translation>既に最新です。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>1 neue Version geholt.</source>
        <translation>新しいコミットを 1 件取得しました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>%1 neue Versionen geholt.</source>
        <translation>新しいコミットを %1 件取得しました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="583"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Push nicht möglich.</source>
        <translation>ブランチがチェックアウトされていません（デタッチ HEAD）– プッシュできません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="594"/>
        <source>Kein Server (origin) eingerichtet – erst „Auf GitHub sichern“.</source>
        <translation>サーバー（origin）が未設定です – 先に「GitHub にバックアップ」してください。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="601"/>
        <source>Schon aktuell auf dem Server.</source>
        <translation>サーバー上は既に最新です。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="602"/>
        <source>Hochgeladen.</source>
        <translation>プッシュしました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="607"/>
        <source>Auf dem Server gibt es neuere Versionen – erst Pull</source>
        <translation>サーバーに新しいコミットがあります – 先にプル</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="609"/>
        <source>Push fehlgeschlagen: %1</source>
        <translation>プッシュに失敗しました：%1</translation>
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
        <translation>OK（テストデータ）</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="623"/>
        <source>Kurzbeschreibung fehlt.</source>
        <translation>概要がありません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="626"/>
        <source>Nichts vorgemerkt – erst Dateien oder Abschnitte auswählen.</source>
        <translation>何もステージされていません – 先にファイルかハンクを選択してください。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="628"/>
        <location filename="../src/gitactions.cpp" line="635"/>
        <source>Commit fehlgeschlagen: %1</source>
        <translation>コミットに失敗しました：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="638"/>
        <source>Committet (%1).</source>
        <translation>コミットしました（%1）。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="641"/>
        <source>Committet (%1), aber nicht hochgeladen: %2</source>
        <translation>コミットしました（%1）が、プッシュできませんでした：%2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="642"/>
        <source>Committet (%1) und hochgeladen.</source>
        <translation>コミットしてプッシュしました（%1）。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="698"/>
        <location filename="../src/gitactions.cpp" line="706"/>
        <source>Verwerfen fehlgeschlagen: %1</source>
        <translation>破棄に失敗しました：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="711"/>
        <source>Konnte „%1“ nicht in den Papierkorb legen – nichts gelöscht.</source>
        <translation>「%1」をゴミ箱に移動できませんでした – 何も削除していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Verworfen – neue Datei liegt im Papierkorb.</source>
        <translation>破棄しました – 新規ファイルはゴミ箱にあります。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Änderungen verworfen.</source>
        <translation>変更を破棄しました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="728"/>
        <source>Ungültiger Repo-Name (erlaubt: Buchstaben, Ziffern, . _ -).</source>
        <translation>無効なリポジトリ名です（使用可：英字、数字、. _ -）。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="730"/>
        <source>Hat schon einen Server (origin) – nichts angelegt.</source>
        <translation>既にサーバー（origin）があります – 何も作成していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="732"/>
        <source>Noch keine Version – erst committen.</source>
        <translation>まだコミットがありません – 先にコミットしてください。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="742"/>
        <location filename="../src/gitactions.cpp" line="1209"/>
        <source>GitHub: %1</source>
        <translation>GitHub：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="743"/>
        <source>Öffentlich auf GitHub gesichert: %1</source>
        <translation>GitHub に公開でバックアップしました：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="743"/>
        <source>Privat auf GitHub gesichert: %1</source>
        <translation>GitHub に非公開でバックアップしました：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="771"/>
        <source>Gesperrt: Wurzelordner</source>
        <translation>ロック中：ルートフォルダー</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="774"/>
        <source>Gesperrt: enthält ~/AI/ComfyUI/user</source>
        <translation>ロック中：~/AI/ComfyUI/user を含む</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="777"/>
        <source>Gesperrt: persönlicher Ordner</source>
        <translation>ロック中：ホームフォルダー</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="882"/>
        <source>Kein Git-Repository</source>
        <translation>Git リポジトリではありません</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="941"/>
        <source>Ungültiger Name.</source>
        <translation>無効な名前です。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="945"/>
        <source>Den Zweig gibt es nicht mehr.</source>
        <translation>このブランチはもう存在しません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="950"/>
        <source>Das ist der aktuelle Zweig – erst einen anderen auschecken.</source>
        <translation>現在のブランチです – 先に別のブランチをチェックアウトしてください。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="951"/>
        <source>Ist in der Arbeitskopie %1 ausgecheckt – erst die Arbeitskopie entfernen.</source>
        <translation>ワークツリー %1 でチェックアウトされています – 先にワークツリーを削除してください。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="962"/>
        <source>Die Arbeitskopie gibt es nicht mehr.</source>
        <translation>このワークツリーはもう存在しません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="966"/>
        <source>Die Hauptarbeitskopie lässt sich nicht entfernen.</source>
        <translation>メインワークツリーは削除できません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="975"/>
        <source>Den Tag gibt es nicht mehr.</source>
        <translation>このタグはもう存在しません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="979"/>
        <source>Nur lokale Zweige, Arbeitskopien und Tags lassen sich löschen.</source>
        <translation>削除できるのはローカルブランチ、ワークツリー、タグのみです。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1013"/>
        <source>%1 – nichts gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – 何も削除していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1015"/>
        <source>Kein Git-Repository – nichts gelöscht.</source>
        <translation>Git リポジトリではありません – 何も削除していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1023"/>
        <source>Arbeitskopie %1 ist gesperrt – nichts gelöscht.</source>
        <translation>ワークツリー %1 はロックされています – 何も削除していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1030"/>
        <location filename="../src/gitactions.cpp" line="1247"/>
        <source>Kein eigenes GitHub-Repo – nichts gelöscht.</source>
        <translation>自分の GitHub リポジトリではありません – 何も削除していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1032"/>
        <location filename="../src/gitactions.cpp" line="1249"/>
        <source>gh darf keine Repos löschen (Recht delete_repo fehlt) – nichts gelöscht.</source>
        <translation>gh にリポジトリ削除の権限がありません（delete_repo 権限なし）– 何も削除していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1035"/>
        <location filename="../src/gitactions.cpp" line="1258"/>
        <source>GitHub: %1 – nichts gelöscht.</source>
        <translation>GitHub：%1 – 何も削除していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1039"/>
        <source>„%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>「%1」をゴミ箱に移動できませんでした。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1040"/>
        <source>Auf GitHub gelöscht, aber „%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>GitHub では削除しましたが、「%1」をゴミ箱に移動できませんでした。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1046"/>
        <source>„%1“ liegt im Papierkorb</source>
        <extracomment>start of a message that goes on with the parts below and ends with &quot;.&quot;</extracomment>
        <translation>「%1」をゴミ箱に移動しました</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ 1 Arbeitskopie)</source>
        <translation> (+ ワークツリー 1 件)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ %1 Arbeitskopien)</source>
        <translation> (+ ワークツリー %1 件)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1051"/>
        <source>, %1 auf GitHub gelöscht</source>
        <translation>、GitHub の %1 を削除しました</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1054"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> ゴミ箱に移動できなかったもの：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1092"/>
        <source>Zweig nicht gelöscht: %1</source>
        <translation>ブランチを削除できませんでした：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1093"/>
        <source>Zweig „%1“ gelöscht.</source>
        <translation>ブランチ「%1」を削除しました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1101"/>
        <source>Arbeitskopie nicht in den Papierkorb verschoben.</source>
        <translation>ワークツリーをゴミ箱に移動できませんでした。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1103"/>
        <source>Arbeitskopie %1 in den Papierkorb verschoben.</source>
        <translation>ワークツリー %1 をゴミ箱に移動しました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1107"/>
        <source>Arbeitskopie nicht entfernt: %1</source>
        <translation>ワークツリーを削除できませんでした：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1108"/>
        <source>Arbeitskopie %1 entfernt.</source>
        <translation>ワークツリー %1 を削除しました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1112"/>
        <source>Tag nicht gelöscht: %1</source>
        <translation>タグを削除できませんでした：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1113"/>
        <source>Tag „%1“ lokal gelöscht.</source>
        <translation>タグ「%1」をローカルで削除しました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1202"/>
        <source>Kein eigenes GitHub-Repo – nichts geändert.</source>
        <translation>自分の GitHub リポジトリではありません – 何も変更していません。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt öffentlich.</source>
        <translation>%1 は公開になりました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt privat.</source>
        <translation>%1 は非公開になりました。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1253"/>
        <source>Abgleich mit GitHub fehlgeschlagen: %1 – nichts gelöscht.</source>
        <translation>GitHub との照合に失敗しました：%1 – 何も削除していません。</translation>
    </message>
    <message numerus="yes">
        <location filename="../src/gitactions.cpp" line="1255"/>
        <source>%n Versionen gibt es nur auf GitHub – vorher Pull. Nichts gelöscht.</source>
        <translation>
            <numerusform>%n 件のコミットが GitHub にしかありません – 先にプルしてください。何も削除していません。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1261"/>
        <source>%1 auf GitHub gelöscht, aber origin ließ sich nicht entfernen: %2</source>
        <translation>GitHub の %1 を削除しましたが、origin を削除できませんでした：%2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1262"/>
        <source>%1 auf GitHub gelöscht – das Projekt ist nur noch lokal.</source>
        <translation>GitHub の %1 を削除しました – プロジェクトはローカルのみになりました。</translation>
    </message>
</context>
<context>
    <name>ImageCompare</name>
    <message>
        <location filename="../qml/ImageCompare.qml" line="11"/>
        <source>◀ ALT</source>
        <translation>◀ 変更前</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU ▶</source>
        <translation>変更後 ▶</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="12"/>
        <source>NEU HINZUGEFÜGT</source>
        <translation>新規追加</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>lädt …</source>
        <translation>読み込み中 …</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>Bild nicht lesbar</source>
        <translation>画像を読み取れません</translation>
    </message>
</context>
<context>
    <name>Main</name>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>ALLE</source>
        <extracomment>filter chips in the header</extracomment>
        <translation>すべて</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>EIGENE</source>
        <translation>自分</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>NUR LOKAL</source>
        <translation>ローカルのみ</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>GEÄNDERT</source>
        <translation>変更あり</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>UPDATES</source>
        <translation>更新</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>FREMD</source>
        <translation>外部</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="289"/>
        <source>Ordner zum Durchsuchen wählen</source>
        <translation>スキャンするフォルダーを選択</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="400"/>
        <source>Projekt suchen …</source>
        <translation>プロジェクトを検索 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="441"/>
        <source>⟳ LESE EIN …</source>
        <extracomment>status line in the header; the counters are upper case like the rest of the line</extracomment>
        <translation>⟳ スキャン中 …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n REPOS</source>
        <translation>
            <numerusform>%n リポジトリ</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n PROGRAMME</source>
        <translation>
            <numerusform>%n プログラム</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="443"/>
        <source>%n OHNE SICHERUNG</source>
        <translation>
            <numerusform>%n 件 未バックアップ</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="444"/>
        <source>%n UPDATES</source>
        <translation>
            <numerusform>%n 件の更新</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="451"/>
        <source>⟳ Neu einlesen</source>
        <translation>⟳ 再スキャン</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Lese Repositories ein …</source>
        <translation>リポジトリをスキャン中 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Keine Repositories gefunden.</source>
        <translation>リポジトリが見つかりません。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="625"/>
        <source>ÄNDERUNGEN VERWERFEN</source>
        <translation>変更を破棄</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="632"/>
        <source>Die neue Datei „%1“ kommt in den Papierkorb.</source>
        <translation>新規ファイル「%1」はゴミ箱に移動されます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="633"/>
        <source>Alle Änderungen an „%1“ werden verworfen.</source>
        <translation>「%1」へのすべての変更が破棄されます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="638"/>
        <source>Das lässt sich nicht rückgängig machen.</source>
        <translation>この操作は元に戻せません。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="644"/>
        <source>Verwerfen</source>
        <translation>破棄</translation>
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
        <translation>キャンセル</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="651"/>
        <source>☁ AUF GITHUB SICHERN</source>
        <translation>☁ GITHUB にバックアップ</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="664"/>
        <source>Legt auf GitHub ein Repository an und lädt alle Versionen von „%1“ hoch.</source>
        <translation>GitHub にリポジトリを作成し、「%1」のすべてのコミットをプッシュします。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="669"/>
        <source>NAME</source>
        <extracomment>name of the new GitHub repository</extracomment>
        <translation>名前</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="681"/>
        <source>SICHTBARKEIT</source>
        <translation>公開範囲</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="688"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 非公開</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="689"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ 公開</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="711"/>
        <source>Nur Buchstaben, Ziffern, Punkt, Minus und Unterstrich.</source>
        <translation>英字、数字、ピリオド、ハイフン、アンダースコアのみ。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>öffentlich</source>
        <translation>公開</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>privat</source>
        <translation>非公開</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="720"/>
        <location filename="../qml/Main.qml" line="924"/>
        <source>Jeder kann den Code und alle bisherigen Versionen sehen.</source>
        <translation>誰でもコードと過去のすべてのコミットを閲覧できます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Öffentlich sichern</source>
        <translation>☁ 公開でバックアップ</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Privat sichern</source>
        <translation>☁ 非公開でバックアップ</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="733"/>
        <source>PROJEKT LÖSCHEN</source>
        <translation>プロジェクトを削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="750"/>
        <source>„%1“ kommt mit dem ganzen Ordner in den Papierkorb.</source>
        <translation>「%1」はフォルダーごとゴミ箱に移動されます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="761"/>
        <source>Prüfe Ordner …</source>
        <translation>フォルダーを確認中 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="769"/>
        <source>%1 – wird nicht gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – 削除されません。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="778"/>
        <source>Größe %1</source>
        <extracomment>%1 = size of the folder</extracomment>
        <translation>サイズ %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="779"/>
        <source>%n Dateien nicht committet</source>
        <translation>
            <numerusform>%n ファイルが未コミット</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>Arbeitsstand nicht lesbar</source>
        <translation>作業状態を読み取れません</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>alles committet</source>
        <translation>すべてコミット済み</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="782"/>
        <source>%1 Versionen auf keinem Server</source>
        <extracomment>%1 = formatted number of versions (commits) not pushed anywhere</extracomment>
        <translation>
            <numerusform>%1 件のコミットがどのサーバーにもありません</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>keine Versionen</source>
        <translation>コミットなし</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>alle Versionen auf dem Server</source>
        <translation>すべてのコミットがサーバー上にあります</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="789"/>
        <source>Das ist die einzige Kopie</source>
        <translation>これが唯一のコピーです</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="798"/>
        <source>Enthält weitere Repos – werden mitgelöscht:</source>
        <translation>他のリポジトリを含みます – 一緒に削除されます：</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="812"/>
        <location filename="../qml/Main.qml" line="837"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ 他 %n 件</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="821"/>
        <source>Arbeitskopien – kommen mit in den Papierkorb:</source>
        <translation>ワークツリー – 一緒にゴミ箱に移動されます：</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="830"/>
        <source>(außerhalb)</source>
        <extracomment>worktree outside the project folder / its uncommitted files</extracomment>
        <translation>(外部)</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="831"/>
        <source>%n nicht committet</source>
        <translation>
            <numerusform>%n 件 未コミット</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="846"/>
        <source>⚠ Ein Agent arbeitet in %1</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ エージェントが %1 で作業中</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>Auch auf GitHub löschen</source>
        <translation>GitHub でも削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>(endgültig)</source>
        <translation>(完全に削除)</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="888"/>
        <location filename="../qml/Main.qml" line="991"/>
        <source>gh darf keine Repos löschen – erst im Terminal: gh auth refresh -s delete_repo</source>
        <extracomment>keep the command &quot;gh auth refresh -s delete_repo&quot; unchanged</extracomment>
        <translation>gh にリポジトリ削除の権限がありません – 先にターミナルで実行：gh auth refresh -s delete_repo</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="894"/>
        <location filename="../qml/Main.qml" line="1149"/>
        <source>In den Papierkorb</source>
        <translation>ゴミ箱に移動</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>◉ ÖFFENTLICH MACHEN</source>
        <translation>◉ 公開にする</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>🔒 PRIVAT MACHEN</source>
        <translation>🔒 非公開にする</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="912"/>
        <source>„%1“ wird auf GitHub öffentlich.</source>
        <translation>「%1」は GitHub で公開されます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="913"/>
        <source>„%1“ wird auf GitHub privat – nur du siehst es dann.</source>
        <translation>「%1」は GitHub で非公開になります – 以後はあなただけが閲覧できます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Öffentlich machen</source>
        <translation>公開にする</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Privat machen</source>
        <translation>非公開にする</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="937"/>
        <source>NUR NOCH LOKAL</source>
        <translation>ローカルのみにする</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="951"/>
        <source>Das Repo auf GitHub wird endgültig gelöscht (auch Issues/Releases). Dein Ordner hier bleibt vollständig.</source>
        <translation>GitHub 上のリポジトリは完全に削除されます（Issues/Releases も含む）。ここにあるフォルダーはそのまま残ります。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="960"/>
        <source>Gleiche mit GitHub ab …</source>
        <translation>GitHub と照合中 …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="969"/>
        <source>%1 Versionen gibt es nur auf GitHub – vorher Pull</source>
        <extracomment>%1 = formatted number of versions (commits)</extracomment>
        <translation>
            <numerusform>%1 件のコミットが GitHub にしかありません – 先にプル</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>Abgleich mit GitHub fehlgeschlagen – %1</source>
        <extracomment>%1 = error message of git fetch</extracomment>
        <translation>GitHub との照合に失敗しました – %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>unbekannt</source>
        <translation>不明</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="983"/>
        <source>✓ alle Versionen von GitHub liegen auch hier</source>
        <translation>✓ GitHub のすべてのコミットがここにもあります</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="997"/>
        <source>Auf GitHub löschen</source>
        <translation>GitHub で削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1003"/>
        <source>ZWEIG LÖSCHEN</source>
        <translation>ブランチを削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>ARBEITSKOPIE ENTFERNEN</source>
        <translation>ワークツリーを削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>TAG LÖSCHEN</source>
        <translation>タグを削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1020"/>
        <source>Zweig „%1“ wird gelöscht.</source>
        <translation>ブランチ「%1」を削除します。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1022"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht, der Zweig „%1“ bleibt.</source>
        <translation>ワークツリーを削除します – フォルダーは削除され、ブランチ「%1」は残ります。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1023"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht.</source>
        <translation>ワークツリーを削除します – フォルダーは削除されます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1024"/>
        <source>Tag „%1“ wird nur lokal gelöscht – auf dem Server bleibt er.</source>
        <translation>タグ「%1」はローカルでのみ削除されます – サーバー上には残ります。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1025"/>
        <source>Tag „%1“ wird nur lokal gelöscht.</source>
        <translation>タグ「%1」はローカルでのみ削除されます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1037"/>
        <source>Prüfe …</source>
        <translation>確認中 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1052"/>
        <source>1 Version gibt es nur in diesem Zweig</source>
        <translation>このブランチにしかないコミットが 1 件あります</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1053"/>
        <source>%1 Versionen gibt es nur in diesem Zweig</source>
        <translation>このブランチにしかないコミットが %1 件あります</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Sie gehen mit dem Zweig verloren.</source>
        <translation>ブランチと一緒に失われます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Alle Versionen liegen auch in anderen Zweigen.</source>
        <translation>すべてのコミットは他のブランチにもあります。</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="1068"/>
        <source>%n Dateien nicht committet – sie kommen in den Papierkorb.</source>
        <translation>
            <numerusform>%n ファイルが未コミット – ゴミ箱に移動されます。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1075"/>
        <source>⚠ Ein Agent arbeitet in dieser Arbeitskopie</source>
        <translation>⚠ このワークツリーでエージェントが作業中</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Entfernen</source>
        <translation>削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Löschen</source>
        <translation>削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1088"/>
        <source>PROGRAMM LÖSCHEN</source>
        <translation>プログラムを削除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1103"/>
        <source>„%1“ kommt in den Papierkorb.</source>
        <translation>「%1」はゴミ箱に移動されます。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1109"/>
        <source>Suche Starter …</source>
        <extracomment>looking for .desktop launchers of the program</extracomment>
        <translation>ランチャーを検索中 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Starter – kommen mit in den Papierkorb:</source>
        <translation>ランチャー – 一緒にゴミ箱に移動されます：</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Keine Starter gefunden.</source>
        <translation>ランチャーが見つかりません。</translation>
    </message>
</context>
<context>
    <name>ProgramView</name>
    <message>
        <location filename="../qml/ProgramView.qml" line="45"/>
        <source>installiert %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>インストール済み %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="51"/>
        <source>neueste %1</source>
        <extracomment>%1 = newest released version</extracomment>
        <translation>最新 %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>↑ Auf %1 aktualisieren</source>
        <translation>↑ %1 に更新</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>✓ Aktuell</source>
        <comment>program is up to date</comment>
        <translation>✓ 最新</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="80"/>
        <source>Starten</source>
        <translation>起動</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="84"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>フォルダー</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="89"/>
        <source>Löschen</source>
        <translation>削除</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="134"/>
        <source>%n neuere Versionen</source>
        <translation>
            <numerusform>%n 件の新しいバージョン</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="136"/>
        <source>seit deiner %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>あなたの %1 以降</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="137"/>
        <source>Startmenü-Einträge werden beim Update angepasst</source>
        <translation>スタートメニュー項目は更新時に調整されます</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="142"/>
        <source>VERSIONEN (RELEASES)</source>
        <translation>バージョン（リリース）</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>INSTALLIERT</source>
        <extracomment>release markers: the installed one / newer than the installed one</extracomment>
        <translation>インストール済み</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>NEU</source>
        <translation>新規</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="192"/>
        <source>Deine Version %1 ist älter als die letzten %n Releases.</source>
        <extracomment>%1 = installed version, %n = number of listed releases</extracomment>
        <translation>
            <numerusform>あなたのバージョン %1 は直近 %n 件のリリースより古いです。</numerusform>
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
        <translation>↓ すべて更新 (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="81"/>
        <source>↓ ALLE (%1)</source>
        <translation>↓ すべて (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="101"/>
        <source>Kein Projekt gefunden.</source>
        <translation>プロジェクトが見つかりません。</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="191"/>
        <source>⚠ NUR LOKAL</source>
        <translation>⚠ ローカルのみ</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>PRIVAT</source>
        <translation>非公開</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>ÖFFENTLICH</source>
        <translation>公開</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="195"/>
        <source>%n NEU</source>
        <extracomment>badge: new versions upstream</extracomment>
        <translation>
            <numerusform>%n 新着</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="197"/>
        <source>%n OFFEN</source>
        <extracomment>badge: files with uncommitted changes</extracomment>
        <translation>
            <numerusform>%n 未コミット</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="201"/>
        <source>%1 Vers.</source>
        <extracomment>badge, short for &quot;versions&quot; (commits); %1 = formatted number</extracomment>
        <translation>
            <numerusform>%1 コミット</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="203"/>
        <source>%1 VERFÜGBAR</source>
        <comment>a newer program version</comment>
        <translation>%1 あり</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="204"/>
        <source>✓ AKTUELL</source>
        <comment>program is up to date</comment>
        <translation>✓ 最新</translation>
    </message>
</context>
<context>
    <name>ProjectColumn</name>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="15"/>
        <source>EIGENE PROJEKTE</source>
        <translation>自分のプロジェクト</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="20"/>
        <source>FREMDE REPOS</source>
        <translation>外部リポジトリ</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="26"/>
        <source>Sonstige</source>
        <comment>foreign repos without a sub-group</comment>
        <translation>その他</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="33"/>
        <source>PROGRAMME</source>
        <translation>プログラム</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="54"/>
        <source>PROJEKTE</source>
        <translation>プロジェクト</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="103"/>
        <source>DURCHSUCHTE ORDNER</source>
        <translation>スキャン対象フォルダー</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="145"/>
        <source>+ Ordner hinzufügen</source>
        <translation>+ フォルダーを追加</translation>
    </message>
</context>
<context>
    <name>RefRow</name>
    <message>
        <location filename="../qml/RefRow.qml" line="49"/>
        <source>AKTIV</source>
        <extracomment>marker next to the branch that is checked out</extracomment>
        <translation>現在</translation>
    </message>
</context>
<context>
    <name>RepoStore</name>
    <message>
        <location filename="../src/repostore.cpp" line="454"/>
        <source>Verlauf konnte nicht gelesen werden: %1</source>
        <translation>履歴を読み取れませんでした：%1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="510"/>
        <source>Änderungen konnten nicht gelesen werden: %1</source>
        <translation>変更を読み取れませんでした：%1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="570"/>
        <source>Diff konnte nicht gelesen werden: %1</source>
        <translation>差分を読み取れませんでした：%1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="584"/>
        <source>@@ Binärdatei geändert @@</source>
        <extracomment>diff line for a binary file; keep the &quot;@@&quot; at the start (marks a hunk header)</extracomment>
        <translation>@@ バイナリファイルが変更されました @@</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="601"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (省略)</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="815"/>
        <location filename="../src/repostore.cpp" line="863"/>
        <source>Ungültige Version</source>
        <translation>無効なコミット</translation>
    </message>
</context>
<context>
    <name>RepoView</name>
    <message>
        <location filename="../qml/RepoView.qml" line="108"/>
        <source>(losgelöst)</source>
        <comment>worktree on a detached HEAD</comment>
        <translation>(デタッチ)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="109"/>
        <source>Arbeitskopie %1</source>
        <comment>%1 = last two folders of a worktree</comment>
        <translation>ワークツリー %1</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ 公開</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 非公開</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="169"/>
        <source>⚠ nur lokal – keine Sicherung außerhalb dieses Rechners</source>
        <translation>⚠ ローカルのみ – このコンピューター以外にバックアップなし</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="175"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>ブランチ %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="181"/>
        <source>%1 Versionen</source>
        <extracomment>number of versions (commits); %1 = formatted number</extracomment>
        <translation>
            <numerusform>%1 コミット</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="187"/>
        <source>%1 Dateien nicht committet</source>
        <translation>
            <numerusform>%1 ファイルが未コミット</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="188"/>
        <source>✓ alles committet</source>
        <translation>✓ すべてコミット済み</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="199"/>
        <source>⚠ Ein Agent arbeitet in %1 – vor Commit/Pull abstimmen</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ エージェントが %1 で作業中 – コミット/プル前に調整してください</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>↓ Aktualisieren (%1)</source>
        <extracomment>%1 = number of new versions upstream / repo is up to date</extracomment>
        <translation>↓ 更新 (%1)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="212"/>
        <source>✓ Aktuell</source>
        <translation>✓ 最新</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="220"/>
        <source>Commit …</source>
        <translation>コミット …</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="228"/>
        <source>↓ Pull</source>
        <translation>↓ プル</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="236"/>
        <source>↑ Push</source>
        <translation>↑ プッシュ</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="244"/>
        <source>☁ Auf GitHub sichern</source>
        <translation>☁ GitHub にバックアップ</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>◉ Öffentlich machen</source>
        <translation>◉ 公開にする</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>🔒 Privat machen</source>
        <translation>🔒 非公開にする</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="262"/>
        <source>Nur noch lokal</source>
        <extracomment>button: delete the GitHub copy, keep the local folder</extracomment>
        <translation>ローカルのみにする</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="267"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>フォルダー</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="268"/>
        <source>Terminal</source>
        <translation>ターミナル</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="274"/>
        <source>Löschen</source>
        <translation>削除</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="282"/>
        <source>Löschen gesperrt – enthält ~/AI/ComfyUI/user</source>
        <translation>削除不可 – ~/AI/ComfyUI/user を含む</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="367"/>
        <source>ZWEIGE &amp; ARBEITSKOPIEN</source>
        <translation>ブランチとワークツリー</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="380"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ 他 %n 件</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="382"/>
        <source>VERSIONEN (TAGS)</source>
        <translation>バージョン（タグ）</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>NEU AUF GITHUB</source>
        <translation>GITHUB の新着</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>%n Versionen noch nicht geladen</source>
        <translation>
            <numerusform>%n 件のコミットが未取得</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="419"/>
        <source>… und %n weitere</source>
        <translation>
            <numerusform>… 他 %n 件</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>VERLAUF</source>
        <extracomment>%1 = loaded versions, %2 = all versions (formatted number)</extracomment>
        <translation>履歴</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>neueste %1 von %2 · alle Zweige</source>
        <translation>最新 %1 / 全 %2 件 · 全ブランチ</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="438"/>
        <source>jetzt</source>
        <comment>time column of the working state row</comment>
        <translation>現在</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>NICHT COMMITTET</source>
        <translation>未コミット</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Datei</source>
        <translation>%1 ファイル</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Dateien</source>
        <translation>%1 ファイル</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="471"/>
        <source>Arbeitskopie · Zweig %1</source>
        <translation>ワークツリー · ブランチ %1</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="493"/>
        <source>▣ BILD</source>
        <comment>chip: this version changes a picture</comment>
        <translation>▣ 画像</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="607"/>
        <source>… ältere Versionen werden beim Scrollen nachgeladen</source>
        <translation>… 古いコミットはスクロール時に読み込まれます</translation>
    </message>
</context>
<context>
    <name>Timeline</name>
    <message numerus="yes">
        <location filename="../qml/Timeline.qml" line="69"/>
        <source>ab %1: %n Versionen</source>
        <extracomment>tooltip of a timeline bar: %1 = month, %n = number of versions</extracomment>
        <translation>
            <numerusform>%1 から：%n コミット</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>gesamte Geschichte</source>
        <extracomment>below the timeline: the whole history is shown, the marked part is loaded (%1 = loaded versions)</extracomment>
        <translation>全履歴</translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>▭ geladen: neueste %1</source>
        <translation>▭ 読み込み済み：最新 %1</translation>
    </message>
</context>
<context>
    <name>Treemap</name>
    <message>
        <location filename="../qml/Treemap.qml" line="67"/>
        <source>binär</source>
        <extracomment>binary file, no line counts</extracomment>
        <translation>バイナリ</translation>
    </message>
</context>
<context>
    <name>Updates</name>
    <message>
        <location filename="../src/updates.cpp" line="231"/>
        <source>Kein Platz für den Download in %1.</source>
        <translation>%1 にダウンロード用の空き容量がありません。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Download fehlgeschlagen: %1</source>
        <translation>ダウンロードに失敗しました：%1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Zeitüberschreitung</source>
        <translation>タイムアウト</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="252"/>
        <source>Im Release %1 ist keine passende AppImage-Datei.</source>
        <translation>リリース %1 に適合する AppImage ファイルがありません。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="257"/>
        <source>%1 liegt schon im Ordner – nichts geändert.</source>
        <translation>%1 は既にフォルダーにあります – 何も変更していません。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="261"/>
        <source>Konnte %1 nicht ablegen.</source>
        <translation>%1 を保存できませんでした。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="274"/>
        <source>%1 auf %2 aktualisiert, %3 Starter angepasst.</source>
        <extracomment>%1 = program, %2 = new version, %3 = number of changed .desktop launchers</extracomment>
        <translation>%1 を %2 に更新し、ランチャーを %3 件調整しました。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="276"/>
        <source> Nicht änderbar: %1</source>
        <translation> 変更できなかったもの：%1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="278"/>
        <source> Alte Datei konnte nicht in den Papierkorb.</source>
        <translation> 古いファイルをゴミ箱に移動できませんでした。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="395"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>このリポジトリでは既に操作が実行中です。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="405"/>
        <location filename="../src/updates.cpp" line="478"/>
        <source>Aktualisiert (Testdaten)</source>
        <translation>更新しました（テストデータ）</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="409"/>
        <source>Hole neue Versionen …</source>
        <translation>新しいコミットを取得中 …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="472"/>
        <location filename="../src/updates.cpp" line="553"/>
        <source>Programm %1 nicht gefunden.</source>
        <translation>プログラム %1 が見つかりません。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="474"/>
        <source>%1 wird gerade schon aktualisiert.</source>
        <translation>%1 は既に更新中です。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="476"/>
        <source>%1 ist schon aktuell.</source>
        <translation>%1 は既に最新です。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="485"/>
        <source>Lade %1 …</source>
        <extracomment>%1 = release tag being downloaded</extracomment>
        <translation>%1 をダウンロード中 …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="518"/>
        <source>%1 gestartet.</source>
        <translation>%1 を起動しました。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="519"/>
        <source>%1 ließ sich nicht starten.</source>
        <translation>%1 を起動できませんでした。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="555"/>
        <source>Für %1 läuft gerade schon eine Aktion.</source>
        <translation>%1 では既に操作が実行中です。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="557"/>
        <source>OK (Testdaten)</source>
        <translation>OK（テストデータ）</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Datei, %3 Starter).</source>
        <extracomment>%1 = program, %2 = number of files, %3 = number of .desktop launchers</extracomment>
        <translation>%1 をゴミ箱に移動しました（ファイル %2 件、ランチャー %3 件）。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Dateien, %3 Starter).</source>
        <translation>%1 をゴミ箱に移動しました（ファイル %2 件、ランチャー %3 件）。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="580"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> ゴミ箱に移動できなかったもの：%1</translation>
    </message>
</context>
<context>
    <name>Util</name>
    <message>
        <location filename="../qml/Util.js" line="39"/>
        <source>HEUTE</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>今日</translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="41"/>
        <source>GESTERN</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>昨日</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="48"/>
        <source>vor %n Min</source>
        <extracomment>age of the last change, short (minutes)</extracomment>
        <translation>
            <numerusform>%n 分前</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="50"/>
        <source>vor %n Std</source>
        <extracomment>age of the last change, short (hours)</extracomment>
        <translation>
            <numerusform>%n 時間前</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="52"/>
        <source>gestern</source>
        <extracomment>age of the last change</extracomment>
        <translation>昨日</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="54"/>
        <source>vor %n Tagen</source>
        <extracomment>age of the last change (days)</extracomment>
        <translation>
            <numerusform>%n 日前</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="99"/>
        <source>Keine Beschreibung.</source>
        <extracomment>release without release notes</extracomment>
        <translation>説明なし。</translation>
    </message>
</context>
<context>
    <name>WorkView</name>
    <message>
        <location filename="../qml/WorkView.qml" line="96"/>
        <source>● Nicht committete Änderungen</source>
        <translation>● 未コミットの変更</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="108"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>ブランチ %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="113"/>
        <source>%n nicht gepusht</source>
        <translation>
            <numerusform>%n 件 未プッシュ</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="117"/>
        <source>⚠ nur lokal</source>
        <translation>⚠ ローカルのみ</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Datei</source>
        <translation>%1 ファイル</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Dateien</source>
        <translation>%1 ファイル</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="126"/>
        <source>%n vorgemerkt</source>
        <extracomment>files staged for the commit</extracomment>
        <translation>
            <numerusform>%n 件 ステージ済み</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="203"/>
        <source>binär</source>
        <translation>バイナリ</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="212"/>
        <source>VERWERFEN</source>
        <extracomment>discard the changes of this file</extracomment>
        <translation>破棄</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="240"/>
        <source>Keine Änderungen – alles committet.</source>
        <translation>変更なし – すべてコミット済み。</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Binärdatei – nur ganz vormerken (Kästchen links).</source>
        <translation>バイナリファイル – ファイル全体でのみステージ可（左のチェックボックス）。</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Keine Abschnitte – nur ganz vormerken (Kästchen links).</source>
        <translation>ハンクなし – ファイル全体でのみステージ可（左のチェックボックス）。</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="307"/>
        <source>VORGEMERKT</source>
        <extracomment>this hunk is staged</extracomment>
        <translation>ステージ済み</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>− Zurücknehmen</source>
        <extracomment>unstage / stage this hunk</extracomment>
        <translation>− ステージ解除</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>+ Vormerken</source>
        <translation>+ ステージ</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="352"/>
        <source>KURZBESCHREIBUNG</source>
        <extracomment>commit subject (first line of the commit message)</extracomment>
        <translation>概要</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="363"/>
        <source>Was wurde geändert?</source>
        <translation>何を変更しましたか？</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="369"/>
        <source>DETAILS</source>
        <extracomment>commit message body</extracomment>
        <translation>説明</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="380"/>
        <source>optional</source>
        <translation>任意</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="392"/>
        <source>Commit</source>
        <translation>コミット</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="400"/>
        <source>Commit &amp; Push</source>
        <translation>コミットしてプッシュ</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Nichts vorgemerkt</source>
        <translation>何もステージされていません</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Kurzbeschreibung fehlt</source>
        <translation>概要がありません</translation>
    </message>
</context>
</TS>
