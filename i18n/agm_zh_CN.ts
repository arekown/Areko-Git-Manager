<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh_CN" sourcelanguage="de">
<context>
    <name>CommitDetail</name>
    <message>
        <location filename="../qml/CommitDetail.qml" line="88"/>
        <source>Zusammenführung</source>
        <comment>merge commit</comment>
        <translation>合并</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Datei</source>
        <translation>%1 个文件</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="120"/>
        <source>%1 Dateien</source>
        <translation>%1 个文件</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>LISTE</source>
        <extracomment>file view switch: list / map of tiles</extracomment>
        <translation>列表</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="129"/>
        <source>KARTE</source>
        <translation>图块</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="222"/>
        <source>▣ Bild</source>
        <translation>▣ 图片</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="223"/>
        <source>binär</source>
        <translation>二进制</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/CommitDetail.qml" line="245"/>
        <source>+ %n weitere Dateien</source>
        <translation>
            <numerusform>+ 另外 %n 个文件</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="264"/>
        <source>Für diese Version liegen keine Dateiänderungen vor.</source>
        <translation>此提交没有文件更改。</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Binärdatei – kein Text-Diff.</source>
        <translation>二进制文件 – 无文本差异。</translation>
    </message>
    <message>
        <location filename="../qml/CommitDetail.qml" line="324"/>
        <source>Keine Textänderungen.</source>
        <translation>无文本更改。</translation>
    </message>
</context>
<context>
    <name>GitActions</name>
    <message>
        <location filename="../src/gitactions.cpp" line="75"/>
        <source>Zeitüberschreitung</source>
        <translation>超时</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="77"/>
        <source>git ließ sich nicht starten</source>
        <translation>无法启动 git</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="354"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (已截断)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="392"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>此仓库已有操作正在进行。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="457"/>
        <source>Arbeitsstand nicht lesbar: %1</source>
        <translation>无法读取工作区状态：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="487"/>
        <location filename="../src/gitactions.cpp" line="518"/>
        <location filename="../src/gitactions.cpp" line="680"/>
        <source>Diese Datei darf nicht bearbeitet werden.</source>
        <translation>不允许编辑此文件。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="491"/>
        <location filename="../src/gitactions.cpp" line="522"/>
        <location filename="../src/gitactions.cpp" line="684"/>
        <source>Datei hat keine Änderungen mehr.</source>
        <translation>文件已无更改。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Vormerken fehlgeschlagen: %1</source>
        <translation>暂存失败：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="505"/>
        <source>Zurücknehmen fehlgeschlagen: %1</source>
        <translation>取消暂存失败：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="524"/>
        <source>Neue Dateien lassen sich nur als ganze Datei vormerken.</source>
        <translation>新文件只能整体暂存。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="527"/>
        <source>Abschnitt gibt es nicht mehr – Ansicht wurde neu geladen.</source>
        <translation>该代码块已不存在 – 视图已重新加载。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="537"/>
        <source>Abschnitt ließ sich nicht ändern: %1</source>
        <translation>无法更改代码块：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="545"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Pull nicht möglich.</source>
        <translation>未检出分支（分离 HEAD）– 无法拉取。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="549"/>
        <source>Kein Upstream-Zweig eingestellt – nichts zu holen.</source>
        <translation>未设置上游分支 – 没有可拉取的内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="559"/>
        <source>Lokal und auf dem Server gibt es unterschiedliche neue Versionen. Pull holt nur ohne Zusammenführen (fast-forward) – nichts wurde geändert.</source>
        <translation>本地和服务器上各有不同的新提交。拉取仅支持快进（fast-forward），不做合并 – 未做任何更改。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="562"/>
        <source>Lokale Änderungen würden überschrieben – erst committen oder verwerfen.</source>
        <translation>本地更改将被覆盖 – 请先提交或丢弃。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="564"/>
        <source>Konflikt beim Holen – bitte selbst klären.</source>
        <translation>拉取时发生冲突 – 请手动解决。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="566"/>
        <source>Pull fehlgeschlagen: %1</source>
        <translation>拉取失败：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="571"/>
        <source>Schon aktuell.</source>
        <translation>已是最新。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>1 neue Version geholt.</source>
        <translation>已拉取 1 个新提交。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="575"/>
        <source>%1 neue Versionen geholt.</source>
        <translation>已拉取 %1 个新提交。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="583"/>
        <source>Kein Zweig ausgecheckt (losgelöster Stand) – Push nicht möglich.</source>
        <translation>未检出分支（分离 HEAD）– 无法推送。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="594"/>
        <source>Kein Server (origin) eingerichtet – erst „Auf GitHub sichern“.</source>
        <translation>未设置服务器（origin）– 请先“备份到 GitHub”。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="601"/>
        <source>Schon aktuell auf dem Server.</source>
        <translation>服务器上已是最新。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="602"/>
        <source>Hochgeladen.</source>
        <translation>已推送。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="607"/>
        <source>Auf dem Server gibt es neuere Versionen – erst Pull</source>
        <translation>服务器上有更新的提交 – 请先拉取</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="609"/>
        <source>Push fehlgeschlagen: %1</source>
        <translation>推送失败：%1</translation>
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
        <translation>OK（测试数据）</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="623"/>
        <source>Kurzbeschreibung fehlt.</source>
        <translation>缺少摘要。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="626"/>
        <source>Nichts vorgemerkt – erst Dateien oder Abschnitte auswählen.</source>
        <translation>未暂存任何内容 – 请先选择文件或代码块。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="628"/>
        <location filename="../src/gitactions.cpp" line="635"/>
        <source>Commit fehlgeschlagen: %1</source>
        <translation>提交失败：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="638"/>
        <source>Committet (%1).</source>
        <translation>已提交（%1）。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="641"/>
        <source>Committet (%1), aber nicht hochgeladen: %2</source>
        <translation>已提交（%1），但未推送：%2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="642"/>
        <source>Committet (%1) und hochgeladen.</source>
        <translation>已提交（%1）并已推送。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="698"/>
        <location filename="../src/gitactions.cpp" line="706"/>
        <source>Verwerfen fehlgeschlagen: %1</source>
        <translation>丢弃失败：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="711"/>
        <source>Konnte „%1“ nicht in den Papierkorb legen – nichts gelöscht.</source>
        <translation>无法将“%1”移入回收站 – 未删除任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Verworfen – neue Datei liegt im Papierkorb.</source>
        <translation>已丢弃 – 新文件已移入回收站。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="715"/>
        <source>Änderungen verworfen.</source>
        <translation>更改已丢弃。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="728"/>
        <source>Ungültiger Repo-Name (erlaubt: Buchstaben, Ziffern, . _ -).</source>
        <translation>仓库名称无效（允许：字母、数字、. _ -）。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="730"/>
        <source>Hat schon einen Server (origin) – nichts angelegt.</source>
        <translation>已有服务器（origin）– 未创建任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="732"/>
        <source>Noch keine Version – erst committen.</source>
        <translation>还没有提交 – 请先提交。</translation>
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
        <translation>已公开备份到 GitHub：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="743"/>
        <source>Privat auf GitHub gesichert: %1</source>
        <translation>已私有备份到 GitHub：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="771"/>
        <source>Gesperrt: Wurzelordner</source>
        <translation>已锁定：根目录</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="774"/>
        <source>Gesperrt: enthält ~/AI/ComfyUI/user</source>
        <translation>已锁定：包含 ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="777"/>
        <source>Gesperrt: persönlicher Ordner</source>
        <translation>已锁定：个人主目录</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="882"/>
        <source>Kein Git-Repository</source>
        <translation>不是 Git 仓库</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="941"/>
        <source>Ungültiger Name.</source>
        <translation>名称无效。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="945"/>
        <source>Den Zweig gibt es nicht mehr.</source>
        <translation>该分支已不存在。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="950"/>
        <source>Das ist der aktuelle Zweig – erst einen anderen auschecken.</source>
        <translation>这是当前分支 – 请先检出其他分支。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="951"/>
        <source>Ist in der Arbeitskopie %1 ausgecheckt – erst die Arbeitskopie entfernen.</source>
        <translation>已在工作树 %1 中检出 – 请先移除该工作树。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="962"/>
        <source>Die Arbeitskopie gibt es nicht mehr.</source>
        <translation>该工作树已不存在。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="966"/>
        <source>Die Hauptarbeitskopie lässt sich nicht entfernen.</source>
        <translation>主工作树无法移除。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="975"/>
        <source>Den Tag gibt es nicht mehr.</source>
        <translation>该标签已不存在。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="979"/>
        <source>Nur lokale Zweige, Arbeitskopien und Tags lassen sich löschen.</source>
        <translation>只能删除本地分支、工作树和标签。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1013"/>
        <source>%1 – nichts gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – 未删除任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1015"/>
        <source>Kein Git-Repository – nichts gelöscht.</source>
        <translation>不是 Git 仓库 – 未删除任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1023"/>
        <source>Arbeitskopie %1 ist gesperrt – nichts gelöscht.</source>
        <translation>工作树 %1 已锁定 – 未删除任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1030"/>
        <location filename="../src/gitactions.cpp" line="1247"/>
        <source>Kein eigenes GitHub-Repo – nichts gelöscht.</source>
        <translation>不是自己的 GitHub 仓库 – 未删除任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1032"/>
        <location filename="../src/gitactions.cpp" line="1249"/>
        <source>gh darf keine Repos löschen (Recht delete_repo fehlt) – nichts gelöscht.</source>
        <translation>gh 无权删除仓库（缺少 delete_repo 权限）– 未删除任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1035"/>
        <location filename="../src/gitactions.cpp" line="1258"/>
        <source>GitHub: %1 – nichts gelöscht.</source>
        <translation>GitHub：%1 – 未删除任何内容。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1039"/>
        <source>„%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>无法将“%1”移入回收站。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1040"/>
        <source>Auf GitHub gelöscht, aber „%1“ ließ sich nicht in den Papierkorb legen.</source>
        <translation>已在 GitHub 上删除，但无法将“%1”移入回收站。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1046"/>
        <source>„%1“ liegt im Papierkorb</source>
        <extracomment>start of a message that goes on with the parts below and ends with &quot;.&quot;</extracomment>
        <translation>“%1”已移入回收站</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ 1 Arbeitskopie)</source>
        <translation> (+ 1 个工作树)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1049"/>
        <source> (+ %1 Arbeitskopien)</source>
        <translation> (+ %1 个工作树)</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1051"/>
        <source>, %1 auf GitHub gelöscht</source>
        <translation>，GitHub 上的 %1 已删除</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1054"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> 未能移入回收站：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1092"/>
        <source>Zweig nicht gelöscht: %1</source>
        <translation>分支未删除：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1093"/>
        <source>Zweig „%1“ gelöscht.</source>
        <translation>分支“%1”已删除。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1101"/>
        <source>Arbeitskopie nicht in den Papierkorb verschoben.</source>
        <translation>工作树未移入回收站。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1103"/>
        <source>Arbeitskopie %1 in den Papierkorb verschoben.</source>
        <translation>工作树 %1 已移入回收站。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1107"/>
        <source>Arbeitskopie nicht entfernt: %1</source>
        <translation>工作树未移除：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1108"/>
        <source>Arbeitskopie %1 entfernt.</source>
        <translation>工作树 %1 已移除。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1112"/>
        <source>Tag nicht gelöscht: %1</source>
        <translation>标签未删除：%1</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1113"/>
        <source>Tag „%1“ lokal gelöscht.</source>
        <translation>标签“%1”已在本地删除。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1202"/>
        <source>Kein eigenes GitHub-Repo – nichts geändert.</source>
        <translation>不是自己的 GitHub 仓库 – 未做任何更改。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt öffentlich.</source>
        <translation>%1 现在是公开的。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1210"/>
        <source>%1 ist jetzt privat.</source>
        <translation>%1 现在是私有的。</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1253"/>
        <source>Abgleich mit GitHub fehlgeschlagen: %1 – nichts gelöscht.</source>
        <translation>与 GitHub 同步失败：%1 – 未删除任何内容。</translation>
    </message>
    <message numerus="yes">
        <location filename="../src/gitactions.cpp" line="1255"/>
        <source>%n Versionen gibt es nur auf GitHub – vorher Pull. Nichts gelöscht.</source>
        <translation>
            <numerusform>有 %n 个提交仅存在于 GitHub – 请先拉取。未删除任何内容。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1261"/>
        <source>%1 auf GitHub gelöscht, aber origin ließ sich nicht entfernen: %2</source>
        <translation>%1 已在 GitHub 上删除，但无法移除 origin：%2</translation>
    </message>
    <message>
        <location filename="../src/gitactions.cpp" line="1262"/>
        <source>%1 auf GitHub gelöscht – das Projekt ist nur noch lokal.</source>
        <translation>%1 已在 GitHub 上删除 – 项目现在仅存在于本地。</translation>
    </message>
</context>
<context>
    <name>ImageCompare</name>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>lädt …</source>
        <translation>加载中 …</translation>
    </message>
    <message>
        <location filename="../qml/ImageCompare.qml" line="51"/>
        <source>Bild nicht lesbar</source>
        <translation>无法读取图片</translation>
    </message>
</context>
<context>
    <name>Main</name>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>ALLE</source>
        <extracomment>filter chips in the header</extracomment>
        <translation>全部</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>EIGENE</source>
        <translation>我的</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="101"/>
        <source>NUR LOKAL</source>
        <translation>仅本地</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="102"/>
        <source>GEÄNDERT</source>
        <translation>已更改</translation>
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
        <translation>选择要扫描的文件夹</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="400"/>
        <source>Projekt suchen …</source>
        <translation>搜索项目 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="441"/>
        <source>⟳ LESE EIN …</source>
        <extracomment>status line in the header; the counters are upper case like the rest of the line</extracomment>
        <translation>⟳ 正在扫描 …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n REPOS</source>
        <translation>
            <numerusform>%n 个仓库</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="442"/>
        <source>%n PROGRAMME</source>
        <translation>
            <numerusform>%n 个程序</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="443"/>
        <source>%n OHNE SICHERUNG</source>
        <translation>
            <numerusform>%n 个未备份</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="444"/>
        <source>%n UPDATES</source>
        <translation>
            <numerusform>%n 个更新</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="451"/>
        <source>⟳ Neu einlesen</source>
        <translation>⟳ 重新扫描</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Lese Repositories ein …</source>
        <translation>正在扫描仓库 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="503"/>
        <source>Keine Repositories gefunden.</source>
        <translation>未找到仓库。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="625"/>
        <source>ÄNDERUNGEN VERWERFEN</source>
        <translation>丢弃更改</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="632"/>
        <source>Die neue Datei „%1“ kommt in den Papierkorb.</source>
        <translation>新文件“%1”将被移入回收站。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="633"/>
        <source>Alle Änderungen an „%1“ werden verworfen.</source>
        <translation>对“%1”的所有更改都将被丢弃。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="638"/>
        <source>Das lässt sich nicht rückgängig machen.</source>
        <translation>此操作无法撤销。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="644"/>
        <source>Verwerfen</source>
        <translation>丢弃</translation>
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
        <translation>取消</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="651"/>
        <source>☁ AUF GITHUB SICHERN</source>
        <translation>☁ 备份到 GITHUB</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="664"/>
        <source>Legt auf GitHub ein Repository an und lädt alle Versionen von „%1“ hoch.</source>
        <translation>在 GitHub 上创建仓库，并推送“%1”的所有提交。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="669"/>
        <source>NAME</source>
        <extracomment>name of the new GitHub repository</extracomment>
        <translation>名称</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="681"/>
        <source>SICHTBARKEIT</source>
        <translation>可见性</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="688"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 私有</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="689"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ 公开</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="711"/>
        <source>Nur Buchstaben, Ziffern, Punkt, Minus und Unterstrich.</source>
        <translation>仅限字母、数字、点、减号和下划线。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>öffentlich</source>
        <translation>公开</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="712"/>
        <source>privat</source>
        <translation>私有</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="720"/>
        <location filename="../qml/Main.qml" line="924"/>
        <source>Jeder kann den Code und alle bisherigen Versionen sehen.</source>
        <translation>任何人都能看到代码及所有历史提交。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Öffentlich sichern</source>
        <translation>☁ 公开备份</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="726"/>
        <source>☁ Privat sichern</source>
        <translation>☁ 私有备份</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="733"/>
        <source>PROJEKT LÖSCHEN</source>
        <translation>删除项目</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="750"/>
        <source>„%1“ kommt mit dem ganzen Ordner in den Papierkorb.</source>
        <translation>“%1”将连同整个文件夹移入回收站。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="761"/>
        <source>Prüfe Ordner …</source>
        <translation>正在检查文件夹 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="769"/>
        <source>%1 – wird nicht gelöscht.</source>
        <extracomment>%1 = why the folder is locked</extracomment>
        <translation>%1 – 不会被删除。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="778"/>
        <source>Größe %1</source>
        <extracomment>%1 = size of the folder</extracomment>
        <translation>大小 %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="779"/>
        <source>%n Dateien nicht committet</source>
        <translation>
            <numerusform>%n 个文件未提交</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>Arbeitsstand nicht lesbar</source>
        <translation>无法读取工作区状态</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="780"/>
        <source>alles committet</source>
        <translation>全部已提交</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="782"/>
        <source>%1 Versionen auf keinem Server</source>
        <extracomment>%1 = formatted number of versions (commits) not pushed anywhere</extracomment>
        <translation>
            <numerusform>%1 个提交不在任何服务器上</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>keine Versionen</source>
        <translation>没有提交</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="783"/>
        <source>alle Versionen auf dem Server</source>
        <translation>所有提交都在服务器上</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="789"/>
        <source>Das ist die einzige Kopie</source>
        <translation>这是唯一的副本</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="798"/>
        <source>Enthält weitere Repos – werden mitgelöscht:</source>
        <translation>包含其他仓库 – 将一并删除：</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="812"/>
        <location filename="../qml/Main.qml" line="837"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ 另外 %n 个</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="821"/>
        <source>Arbeitskopien – kommen mit in den Papierkorb:</source>
        <translation>工作树 – 将一并移入回收站：</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="830"/>
        <source>(außerhalb)</source>
        <extracomment>worktree outside the project folder / its uncommitted files</extracomment>
        <translation>(在外部)</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="831"/>
        <source>%n nicht committet</source>
        <translation>
            <numerusform>%n 个未提交</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="846"/>
        <source>⚠ Ein Agent arbeitet in %1</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ 有代理正在 %1 中工作</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>Auch auf GitHub löschen</source>
        <translation>同时在 GitHub 上删除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="869"/>
        <source>(endgültig)</source>
        <translation>(永久)</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="888"/>
        <location filename="../qml/Main.qml" line="991"/>
        <source>gh darf keine Repos löschen – erst im Terminal: gh auth refresh -s delete_repo</source>
        <extracomment>keep the command &quot;gh auth refresh -s delete_repo&quot; unchanged</extracomment>
        <translation>gh 无权删除仓库 – 请先在终端运行：gh auth refresh -s delete_repo</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="894"/>
        <location filename="../qml/Main.qml" line="1149"/>
        <source>In den Papierkorb</source>
        <translation>移入回收站</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>◉ ÖFFENTLICH MACHEN</source>
        <translation>◉ 设为公开</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="900"/>
        <source>🔒 PRIVAT MACHEN</source>
        <translation>🔒 设为私有</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="912"/>
        <source>„%1“ wird auf GitHub öffentlich.</source>
        <translation>“%1”将在 GitHub 上公开。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="913"/>
        <source>„%1“ wird auf GitHub privat – nur du siehst es dann.</source>
        <translation>“%1”将在 GitHub 上设为私有 – 之后只有你能看到。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Öffentlich machen</source>
        <translation>设为公开</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="930"/>
        <source>Privat machen</source>
        <translation>设为私有</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="937"/>
        <source>NUR NOCH LOKAL</source>
        <translation>仅保留本地</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="951"/>
        <source>Das Repo auf GitHub wird endgültig gelöscht (auch Issues/Releases). Dein Ordner hier bleibt vollständig.</source>
        <translation>GitHub 上的仓库将被永久删除（包括 Issues/Releases）。你这里的文件夹会完整保留。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="960"/>
        <source>Gleiche mit GitHub ab …</source>
        <translation>正在与 GitHub 同步 …</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="969"/>
        <source>%1 Versionen gibt es nur auf GitHub – vorher Pull</source>
        <extracomment>%1 = formatted number of versions (commits)</extracomment>
        <translation>
            <numerusform>有 %1 个提交仅存在于 GitHub – 请先拉取</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>Abgleich mit GitHub fehlgeschlagen – %1</source>
        <extracomment>%1 = error message of git fetch</extracomment>
        <translation>与 GitHub 同步失败 – %1</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="978"/>
        <source>unbekannt</source>
        <translation>未知</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="983"/>
        <source>✓ alle Versionen von GitHub liegen auch hier</source>
        <translation>✓ GitHub 上的所有提交本地都有</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="997"/>
        <source>Auf GitHub löschen</source>
        <translation>在 GitHub 上删除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1003"/>
        <source>ZWEIG LÖSCHEN</source>
        <translation>删除分支</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>ARBEITSKOPIE ENTFERNEN</source>
        <translation>移除工作树</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1004"/>
        <source>TAG LÖSCHEN</source>
        <translation>删除标签</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1020"/>
        <source>Zweig „%1“ wird gelöscht.</source>
        <translation>分支“%1”将被删除。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1022"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht, der Zweig „%1“ bleibt.</source>
        <translation>工作树将被移除 – 其文件夹会被删除，分支“%1”保留。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1023"/>
        <source>Die Arbeitskopie wird entfernt – ihr Ordner wird gelöscht.</source>
        <translation>工作树将被移除 – 其文件夹会被删除。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1024"/>
        <source>Tag „%1“ wird nur lokal gelöscht – auf dem Server bleibt er.</source>
        <translation>标签“%1”仅在本地删除 – 服务器上的保留。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1025"/>
        <source>Tag „%1“ wird nur lokal gelöscht.</source>
        <translation>标签“%1”仅在本地删除。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1037"/>
        <source>Prüfe …</source>
        <translation>正在检查 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1052"/>
        <source>1 Version gibt es nur in diesem Zweig</source>
        <translation>有 1 个提交仅存在于此分支</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1053"/>
        <source>%1 Versionen gibt es nur in diesem Zweig</source>
        <translation>有 %1 个提交仅存在于此分支</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Sie gehen mit dem Zweig verloren.</source>
        <translation>它们将随分支一起丢失。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1061"/>
        <source>Alle Versionen liegen auch in anderen Zweigen.</source>
        <translation>所有提交也存在于其他分支中。</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Main.qml" line="1068"/>
        <source>%n Dateien nicht committet – sie kommen in den Papierkorb.</source>
        <translation>
            <numerusform>%n 个文件未提交 – 将被移入回收站。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1075"/>
        <source>⚠ Ein Agent arbeitet in dieser Arbeitskopie</source>
        <translation>⚠ 有代理正在此工作树中工作</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Entfernen</source>
        <translation>移除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1081"/>
        <source>Löschen</source>
        <translation>删除</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1088"/>
        <source>PROGRAMM LÖSCHEN</source>
        <translation>删除程序</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1103"/>
        <source>„%1“ kommt in den Papierkorb.</source>
        <translation>“%1”将被移入回收站。</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1109"/>
        <source>Suche Starter …</source>
        <extracomment>looking for .desktop launchers of the program</extracomment>
        <translation>正在查找启动器 …</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Starter – kommen mit in den Papierkorb:</source>
        <translation>启动器 – 将一并移入回收站：</translation>
    </message>
    <message>
        <location filename="../qml/Main.qml" line="1132"/>
        <source>Keine Starter gefunden.</source>
        <translation>未找到启动器。</translation>
    </message>
</context>
<context>
    <name>ProgramView</name>
    <message>
        <location filename="../qml/ProgramView.qml" line="45"/>
        <source>installiert %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>已安装 %1</translation>
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
        <translation>↑ 更新到 %1</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="74"/>
        <source>✓ Aktuell</source>
        <comment>program is up to date</comment>
        <translation>✓ 已是最新</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="80"/>
        <source>Starten</source>
        <translation>启动</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="84"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>文件夹</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="89"/>
        <source>Löschen</source>
        <translation>删除</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="134"/>
        <source>%n neuere Versionen</source>
        <translation>
            <numerusform>%n 个更新的版本</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="136"/>
        <source>seit deiner %1</source>
        <extracomment>%1 = installed version</extracomment>
        <translation>自你的 %1 以来</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="137"/>
        <source>Startmenü-Einträge werden beim Update angepasst</source>
        <translation>更新时会同步调整开始菜单项</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="142"/>
        <source>VERSIONEN (RELEASES)</source>
        <translation>版本（RELEASES）</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>INSTALLIERT</source>
        <extracomment>release markers: the installed one / newer than the installed one</extracomment>
        <translation>已安装</translation>
    </message>
    <message>
        <location filename="../qml/ProgramView.qml" line="176"/>
        <source>NEU</source>
        <translation>新</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProgramView.qml" line="192"/>
        <source>Deine Version %1 ist älter als die letzten %n Releases.</source>
        <extracomment>%1 = installed version, %n = number of listed releases</extracomment>
        <translation>
            <numerusform>你的版本 %1 比最近的 %n 个版本都旧。</numerusform>
        </translation>
    </message>
</context>
<context>
    <name>ProjRow</name>
    <message>
        <location filename="../qml/ProjRow.qml" line="80"/>
        <source>↓ ALLE AKTUALISIEREN (%1)</source>
        <extracomment>%1 = number of repos with news in this sub-group (long and short form)</extracomment>
        <translation>↓ 全部更新 (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="80"/>
        <source>↓ ALLE (%1)</source>
        <translation>↓ 全部 (%1)</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="92"/>
        <source>Kein Projekt gefunden.</source>
        <translation>未找到项目。</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="182"/>
        <source>⚠ NUR LOKAL</source>
        <translation>⚠ 仅本地</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="183"/>
        <source>PRIVAT</source>
        <translation>私有</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="183"/>
        <source>ÖFFENTLICH</source>
        <translation>公开</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="186"/>
        <source>%n NEU</source>
        <extracomment>badge: new versions upstream</extracomment>
        <translation>
            <numerusform>%n 新</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="188"/>
        <source>%n OFFEN</source>
        <extracomment>badge: files with uncommitted changes</extracomment>
        <translation>
            <numerusform>%n 未提交</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/ProjRow.qml" line="192"/>
        <source>%1 Vers.</source>
        <extracomment>badge, short for &quot;versions&quot; (commits); %1 = formatted number</extracomment>
        <translation>
            <numerusform>%1 提交</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="194"/>
        <source>%1 VERFÜGBAR</source>
        <comment>a newer program version</comment>
        <translation>%1 可用</translation>
    </message>
    <message>
        <location filename="../qml/ProjRow.qml" line="195"/>
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
        <translation>我的项目</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="20"/>
        <source>FREMDE REPOS</source>
        <translation>外部仓库</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="26"/>
        <source>Sonstige</source>
        <comment>foreign repos without a sub-group</comment>
        <translation>其他</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="33"/>
        <source>PROGRAMME</source>
        <translation>程序</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="54"/>
        <source>PROJEKTE</source>
        <translation>项目</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="103"/>
        <source>DURCHSUCHTE ORDNER</source>
        <translation>扫描的文件夹</translation>
    </message>
    <message>
        <location filename="../qml/ProjectColumn.qml" line="145"/>
        <source>+ Ordner hinzufügen</source>
        <translation>+ 添加文件夹</translation>
    </message>
</context>
<context>
    <name>RefRow</name>
    <message>
        <location filename="../qml/RefRow.qml" line="49"/>
        <source>AKTIV</source>
        <extracomment>marker next to the branch that is checked out</extracomment>
        <translation>当前</translation>
    </message>
</context>
<context>
    <name>RepoStore</name>
    <message>
        <location filename="../src/repostore.cpp" line="454"/>
        <source>Verlauf konnte nicht gelesen werden: %1</source>
        <translation>无法读取历史：%1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="510"/>
        <source>Änderungen konnten nicht gelesen werden: %1</source>
        <translation>无法读取更改：%1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="570"/>
        <source>Diff konnte nicht gelesen werden: %1</source>
        <translation>无法读取差异：%1</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="584"/>
        <source>@@ Binärdatei geändert @@</source>
        <extracomment>diff line for a binary file; keep the &quot;@@&quot; at the start (marks a hunk header)</extracomment>
        <translation>@@ 二进制文件已更改 @@</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="601"/>
        <source>… (gekürzt)</source>
        <extracomment>last line of a cut diff; keep the leading &quot;…&quot; (marks a note line)</extracomment>
        <translation>… (已截断)</translation>
    </message>
    <message>
        <location filename="../src/repostore.cpp" line="815"/>
        <location filename="../src/repostore.cpp" line="863"/>
        <source>Ungültige Version</source>
        <translation>无效的提交</translation>
    </message>
</context>
<context>
    <name>RepoView</name>
    <message>
        <location filename="../qml/RepoView.qml" line="108"/>
        <source>(losgelöst)</source>
        <comment>worktree on a detached HEAD</comment>
        <translation>(分离)</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="109"/>
        <source>Arbeitskopie %1</source>
        <comment>%1 = last two folders of a worktree</comment>
        <translation>工作树 %1</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>◉ ÖFFENTLICH</source>
        <translation>◉ 公开</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="163"/>
        <source>🔒 PRIVAT</source>
        <translation>🔒 私有</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="169"/>
        <source>⚠ nur lokal – keine Sicherung außerhalb dieses Rechners</source>
        <translation>⚠ 仅本地 – 此电脑之外没有备份</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="175"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>分支 %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="181"/>
        <source>%1 Versionen</source>
        <extracomment>number of versions (commits); %1 = formatted number</extracomment>
        <translation>
            <numerusform>%1 个提交</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="187"/>
        <source>%1 Dateien nicht committet</source>
        <translation>
            <numerusform>%1 个文件未提交</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="188"/>
        <source>✓ alles committet</source>
        <translation>✓ 全部已提交</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="199"/>
        <source>⚠ Ein Agent arbeitet in %1 – vor Commit/Pull abstimmen</source>
        <extracomment>%1 = worktree folders an AI agent is working in</extracomment>
        <translation>⚠ 有代理正在 %1 中工作 – 提交/拉取前请先协调</translation>
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
        <translation>✓ 已是最新</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="220"/>
        <source>Commit …</source>
        <translation>提交 …</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="228"/>
        <source>↓ Pull</source>
        <translation>↓ 拉取</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="236"/>
        <source>↑ Push</source>
        <translation>↑ 推送</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="244"/>
        <source>☁ Auf GitHub sichern</source>
        <translation>☁ 备份到 GitHub</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>◉ Öffentlich machen</source>
        <translation>◉ 设为公开</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="252"/>
        <source>🔒 Privat machen</source>
        <translation>🔒 设为私有</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="262"/>
        <source>Nur noch lokal</source>
        <extracomment>button: delete the GitHub copy, keep the local folder</extracomment>
        <translation>仅保留本地</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="267"/>
        <source>Ordner</source>
        <extracomment>button: opens the folder in the file manager</extracomment>
        <translation>文件夹</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="268"/>
        <source>Terminal</source>
        <translation>终端</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="274"/>
        <source>Löschen</source>
        <translation>删除</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="282"/>
        <source>Löschen gesperrt – enthält ~/AI/ComfyUI/user</source>
        <translation>禁止删除 – 包含 ~/AI/ComfyUI/user</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="367"/>
        <source>ZWEIGE &amp; ARBEITSKOPIEN</source>
        <translation>分支和工作树</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="380"/>
        <source>+ %n weitere</source>
        <translation>
            <numerusform>+ 另外 %n 个</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="382"/>
        <source>VERSIONEN (TAGS)</source>
        <translation>版本（标签）</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>NEU AUF GITHUB</source>
        <translation>GITHUB 上的新提交</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="396"/>
        <source>%n Versionen noch nicht geladen</source>
        <translation>
            <numerusform>%n 个提交尚未拉取</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/RepoView.qml" line="419"/>
        <source>… und %n weitere</source>
        <translation>
            <numerusform>… 以及另外 %n 个</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>VERLAUF</source>
        <extracomment>%1 = loaded versions, %2 = all versions (formatted number)</extracomment>
        <translation>历史</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="423"/>
        <source>neueste %1 von %2 · alle Zweige</source>
        <translation>最新 %1 / 共 %2 · 所有分支</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="438"/>
        <source>jetzt</source>
        <comment>time column of the working state row</comment>
        <translation>现在</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>NICHT COMMITTET</source>
        <translation>未提交</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Datei</source>
        <translation>%1 个文件</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="465"/>
        <source>%1 Dateien</source>
        <translation>%1 个文件</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="471"/>
        <source>Arbeitskopie · Zweig %1</source>
        <translation>工作树 · 分支 %1</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="493"/>
        <source>▣ BILD</source>
        <comment>chip: this version changes a picture</comment>
        <translation>▣ 图片</translation>
    </message>
    <message>
        <location filename="../qml/RepoView.qml" line="607"/>
        <source>… ältere Versionen werden beim Scrollen nachgeladen</source>
        <translation>… 滚动时加载更早的提交</translation>
    </message>
</context>
<context>
    <name>Timeline</name>
    <message numerus="yes">
        <location filename="../qml/Timeline.qml" line="69"/>
        <source>ab %1: %n Versionen</source>
        <extracomment>tooltip of a timeline bar: %1 = month, %n = number of versions</extracomment>
        <translation>
            <numerusform>自 %1 起：%n 个提交</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>gesamte Geschichte</source>
        <extracomment>below the timeline: the whole history is shown, the marked part is loaded (%1 = loaded versions)</extracomment>
        <translation>完整历史</translation>
    </message>
    <message>
        <location filename="../qml/Timeline.qml" line="85"/>
        <source>▭ geladen: neueste %1</source>
        <translation>▭ 已加载：最新 %1</translation>
    </message>
</context>
<context>
    <name>Treemap</name>
    <message>
        <location filename="../qml/Treemap.qml" line="67"/>
        <source>binär</source>
        <extracomment>binary file, no line counts</extracomment>
        <translation>二进制</translation>
    </message>
</context>
<context>
    <name>Updates</name>
    <message>
        <location filename="../src/updates.cpp" line="231"/>
        <source>Kein Platz für den Download in %1.</source>
        <translation>%1 中没有足够空间用于下载。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Download fehlgeschlagen: %1</source>
        <translation>下载失败：%1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="239"/>
        <source>Zeitüberschreitung</source>
        <translation>超时</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="252"/>
        <source>Im Release %1 ist keine passende AppImage-Datei.</source>
        <translation>版本 %1 中没有合适的 AppImage 文件。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="257"/>
        <source>%1 liegt schon im Ordner – nichts geändert.</source>
        <translation>%1 已在文件夹中 – 未做任何更改。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="261"/>
        <source>Konnte %1 nicht ablegen.</source>
        <translation>无法保存 %1。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="274"/>
        <source>%1 auf %2 aktualisiert, %3 Starter angepasst.</source>
        <extracomment>%1 = program, %2 = new version, %3 = number of changed .desktop launchers</extracomment>
        <translation>%1 已更新到 %2，已调整 %3 个启动器。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="276"/>
        <source> Nicht änderbar: %1</source>
        <translation> 无法更改：%1</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="278"/>
        <source> Alte Datei konnte nicht in den Papierkorb.</source>
        <translation> 旧文件无法移入回收站。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="395"/>
        <source>Für dieses Repo läuft gerade schon eine Aktion.</source>
        <translation>此仓库已有操作正在进行。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="405"/>
        <location filename="../src/updates.cpp" line="478"/>
        <source>Aktualisiert (Testdaten)</source>
        <translation>已更新（测试数据）</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="409"/>
        <source>Hole neue Versionen …</source>
        <translation>正在拉取新提交 …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="472"/>
        <location filename="../src/updates.cpp" line="553"/>
        <source>Programm %1 nicht gefunden.</source>
        <translation>未找到程序 %1。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="474"/>
        <source>%1 wird gerade schon aktualisiert.</source>
        <translation>%1 已在更新中。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="476"/>
        <source>%1 ist schon aktuell.</source>
        <translation>%1 已是最新。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="485"/>
        <source>Lade %1 …</source>
        <extracomment>%1 = release tag being downloaded</extracomment>
        <translation>正在下载 %1 …</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="518"/>
        <source>%1 gestartet.</source>
        <translation>%1 已启动。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="519"/>
        <source>%1 ließ sich nicht starten.</source>
        <translation>无法启动 %1。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="555"/>
        <source>Für %1 läuft gerade schon eine Aktion.</source>
        <translation>%1 已有操作正在进行。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="557"/>
        <source>OK (Testdaten)</source>
        <translation>OK（测试数据）</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Datei, %3 Starter).</source>
        <extracomment>%1 = program, %2 = number of files, %3 = number of .desktop launchers</extracomment>
        <translation>%1 已移入回收站（%2 个文件，%3 个启动器）。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="577"/>
        <source>%1 liegt im Papierkorb (%2 Dateien, %3 Starter).</source>
        <translation>%1 已移入回收站（%2 个文件，%3 个启动器）。</translation>
    </message>
    <message>
        <location filename="../src/updates.cpp" line="580"/>
        <source> Nicht in den Papierkorb: %1</source>
        <translation> 未能移入回收站：%1</translation>
    </message>
</context>
<context>
    <name>Util</name>
    <message>
        <location filename="../qml/Util.js" line="39"/>
        <source>HEUTE</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>今天</translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="41"/>
        <source>GESTERN</source>
        <extracomment>day heading in the history, upper case</extracomment>
        <translation>昨天</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="48"/>
        <source>vor %n Min</source>
        <extracomment>age of the last change, short (minutes)</extracomment>
        <translation>
            <numerusform>%n 分钟前</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="50"/>
        <source>vor %n Std</source>
        <extracomment>age of the last change, short (hours)</extracomment>
        <translation>
            <numerusform>%n 小时前</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="52"/>
        <source>gestern</source>
        <extracomment>age of the last change</extracomment>
        <translation>昨天</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/Util.js" line="54"/>
        <source>vor %n Tagen</source>
        <extracomment>age of the last change (days)</extracomment>
        <translation>
            <numerusform>%n 天前</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/Util.js" line="99"/>
        <source>Keine Beschreibung.</source>
        <extracomment>release without release notes</extracomment>
        <translation>无说明。</translation>
    </message>
</context>
<context>
    <name>WorkView</name>
    <message>
        <location filename="../qml/WorkView.qml" line="96"/>
        <source>● Nicht committete Änderungen</source>
        <translation>● 未提交的更改</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="108"/>
        <source>Zweig %1</source>
        <extracomment>%1 = branch name</extracomment>
        <translation>分支 %1</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="113"/>
        <source>%n nicht gepusht</source>
        <translation>
            <numerusform>%n 个未推送</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="117"/>
        <source>⚠ nur lokal</source>
        <translation>⚠ 仅本地</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Datei</source>
        <translation>%1 个文件</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="124"/>
        <source>%1 Dateien</source>
        <translation>%1 个文件</translation>
    </message>
    <message numerus="yes">
        <location filename="../qml/WorkView.qml" line="126"/>
        <source>%n vorgemerkt</source>
        <extracomment>files staged for the commit</extracomment>
        <translation>
            <numerusform>已暂存 %n 个</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="203"/>
        <source>binär</source>
        <translation>二进制</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="212"/>
        <source>VERWERFEN</source>
        <extracomment>discard the changes of this file</extracomment>
        <translation>丢弃</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="240"/>
        <source>Keine Änderungen – alles committet.</source>
        <translation>无更改 – 全部已提交。</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Binärdatei – nur ganz vormerken (Kästchen links).</source>
        <translation>二进制文件 – 只能整体暂存（左侧复选框）。</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="263"/>
        <source>Keine Abschnitte – nur ganz vormerken (Kästchen links).</source>
        <translation>无代码块 – 只能整体暂存（左侧复选框）。</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="307"/>
        <source>VORGEMERKT</source>
        <extracomment>this hunk is staged</extracomment>
        <translation>已暂存</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>− Zurücknehmen</source>
        <extracomment>unstage / stage this hunk</extracomment>
        <translation>− 取消暂存</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="321"/>
        <source>+ Vormerken</source>
        <translation>+ 暂存</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="352"/>
        <source>KURZBESCHREIBUNG</source>
        <extracomment>commit subject (first line of the commit message)</extracomment>
        <translation>摘要</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="363"/>
        <source>Was wurde geändert?</source>
        <translation>更改了什么？</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="369"/>
        <source>DETAILS</source>
        <extracomment>commit message body</extracomment>
        <translation>描述</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="380"/>
        <source>optional</source>
        <translation>可选</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="392"/>
        <source>Commit</source>
        <translation>提交</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="400"/>
        <source>Commit &amp; Push</source>
        <translation>提交并推送</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Nichts vorgemerkt</source>
        <translation>未暂存任何内容</translation>
    </message>
    <message>
        <location filename="../qml/WorkView.qml" line="409"/>
        <source>Kurzbeschreibung fehlt</source>
        <translation>缺少摘要</translation>
    </message>
</context>
</TS>
