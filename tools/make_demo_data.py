#!/usr/bin/env python3
"""Writes made-up demo data (demo/repos.json + demo/bilder/*.png) for the fixture mode.

Used by the UI test and for the README screenshots: everything here is invented, nothing comes from real repos.
Run:  python3 tools/make_demo_data.py   (dates are relative to now, so re-run before taking screenshots)
Needs Pillow for the two pictures of the image comparison.
"""
import datetime as dt
import hashlib
import json
import os
import random

from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "demo")
IMG = os.path.join(ROOT, "bilder")
NOW = dt.datetime.now(dt.timezone.utc).astimezone()
rnd = random.Random(7)


def sha(s):
    return hashlib.sha1(s.encode()).hexdigest()


def iso(t):
    return t.isoformat(timespec="seconds")


# ---------- pictures for the image comparison ----------
def landscape(path, sun):
    w, h = 640, 360
    im = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(im)
    for y in range(h):  # night sky gradient
        k = y / h
        d.line([(0, y), (w, y)], fill=(int(8 + 30 * k), int(10 + 20 * k), int(40 + 60 * k)))
    r = random.Random(3)
    for _ in range(90):
        x, y = r.randrange(w), r.randrange(h // 2)
        d.point((x, y), fill=(200, 230, 255))
    if sun:  # the new version adds a glowing moon and a city
        for rr, a in ((70, 40), (52, 90), (38, 255)):
            d.ellipse([470 - rr, 90 - rr, 470 + rr, 90 + rr], fill=(255, 42 + a // 3, 109 + a // 4))
    d.polygon([(0, 260), (120, 170), (230, 250), (360, 150), (500, 240), (640, 190), (640, 360), (0, 360)], fill=(7, 146, 160))
    d.polygon([(0, 300), (160, 230), (300, 290), (450, 220), (640, 280), (640, 360), (0, 360)], fill=(5, 60, 80))
    if sun:
        for i, x in enumerate(range(40, 620, 46)):
            hh = 30 + (i * 37) % 70
            d.rectangle([x, 330 - hh, x + 30, 330], fill=(10, 14, 26))
            for wy in range(330 - hh + 8, 326, 12):
                d.rectangle([x + 8, wy, x + 12, wy + 4], fill=(249, 240, 2))
    d.rectangle([0, 330, w, h], fill=(6, 8, 15))
    im.save(path)


# ---------- history with branches and merges ----------
CODE = ["src/render/pipeline.cpp", "src/render/shadows.cpp", "src/world/terrain.cpp", "src/world/streaming.cpp",
        "src/audio/mixer.cpp", "src/ui/hud.qml", "src/ui/menu.qml", "shaders/sky.frag", "shaders/water.frag",
        "docs/architecture.md", "tests/test_terrain.cpp", "CMakeLists.txt", "tools/bake_lightmaps.py"]
SUBJ = ["Sky shader: smoother horizon gradient", "Terrain streaming loads tiles in the background",
        "Shadows: cascade split tuned for long views", "HUD shows frame time and draw calls",
        "Water reflects the moon", "Audio mixer: ducking for dialogue", "Menu remembers the last save slot",
        "Fix flicker when tiles swap LOD", "Docs: render pipeline overview", "Bake lightmaps in parallel",
        "Terrain test covers seams between tiles", "Night sky with stars and a moon", "Faster shader compile cache",
        "UI scales with the window", "Streaming budget per frame configurable"]
AUTHORS = ["Mira Lenz", "Jonas Hart", "arekown"]


def diff_for(name):
    if name.endswith((".cpp", ".frag", ".py")):
        return ["@@ -41,7 +41,9 @@ void update(float dt)", "     const float k = clamp(dt * speed, 0.0f, 1.0f);",
                "-    value = mix(value, target, 0.5f);", "+    // ease towards the target, frame-rate independent",
                "+    value = mix(value, target, k);", "+    changed = true;", "     return value;", " }"]
    if name.endswith(".qml"):
        return ["@@ -12,4 +12,6 @@ Item {", "     width: parent.width", "-    height: 40", "+    height: Theme.rowHeight",
                "+    Behavior on opacity { NumberAnimation { duration: 180 } }", " }"]
    return ["@@ -3,3 +3,5 @@", " ## Render pipeline", "+", "+Each frame: cull, shadows, opaque, sky, water, UI."]


def make_repo(name, group, sub, remote, n, branches, with_picture=False, dirty=0, worktrees=0, tags=(), news=None, ahead=0):
    path = "~/projects/" + name if group == "eigen" else "~/src/" + (sub.lower() + "/" if sub != "Sonstige" else "") + name
    commits, t = [], NOW - dt.timedelta(minutes=rnd.randint(20, 90))
    main_ids, side = [], {}
    for i in range(n):
        cid = sha(f"{name}-{i}")
        commits.append({"id": cid, "hash": cid[:7], "parents": [], "date": iso(t), "author": rnd.choice(AUTHORS),
                        "refs": [], "subject": SUBJ[(i * 7 + len(name)) % len(SUBJ)], "body": ""})
        t -= dt.timedelta(minutes=rnd.choice([12, 25, 40, 90, 180, 300, 600, 1300]))
    # newest first: main line with side branches that fork and merge back
    for i, c in enumerate(commits):
        c["parents"] = [commits[i + 1]["id"]] if i + 1 < len(commits) else []
    for b, (start, length) in enumerate(branches):  # side branch: commits start..start+length merged at start-1
        if start + length + 1 >= len(commits):
            continue
        merge, first, base = commits[start - 1], commits[start], commits[start + length]
        # main goes from the merge straight to the fork point; the side commits form their own line
        merge["parents"] = [base["id"], first["id"]]
        merge["subject"] = f"Merge branch 'feature/{['sky', 'stream', 'audio', 'ui'][b % 4]}'"
        for k in range(start, start + length):
            commits[k]["parents"] = [commits[k + 1]["id"]] if k + 1 < start + length else [base["id"]]
    commits[0]["refs"] = ["HEAD -> main", "origin/main"] if remote else ["HEAD -> main"]
    if tags:
        commits[min(6, n - 1)]["refs"].append("tag: " + tags[0])
    # details for the newest commits; one of them changes the picture
    for i, c in enumerate(commits[:14]):
        files = []
        for name_ in rnd.sample(CODE, rnd.randint(2, 7)):
            a, r = rnd.randint(1, 120), rnd.randint(0, 60)
            files.append({"name": name_, "add": a, "rem": r, "status": "M", "diff": diff_for(name_)})
        if with_picture and i == 1:
            c["subject"] = "Night sky: moon and city lights in the title screen"
            files.insert(0, {"name": "assets/title/backdrop.png", "add": None, "rem": None, "status": "M",
                             "imgOld": "bilder/backdrop-alt.png", "imgNew": "bilder/backdrop-neu.png"})
        c["files"], c["filesTotal"] = files, len(files)
    refs = [{"kind": "branch", "name": "main", "date": commits[0]["date"], "hash": commits[0]["hash"], "subject": commits[0]["subject"]}]
    for b, (start, _l) in enumerate(branches[:2]):
        refs.append({"kind": "branch", "name": "feature/" + ["sky", "stream"][b], "date": commits[start]["date"],
                     "hash": commits[start]["hash"], "subject": commits[start]["subject"]})
    if remote:
        refs.append({"kind": "remote", "name": "origin/main", "date": commits[0]["date"], "hash": commits[0]["hash"], "subject": commits[0]["subject"]})
    for tg in tags:
        refs.append({"kind": "tag", "name": tg, "date": commits[6]["date"], "hash": commits[6]["hash"], "subject": "Release " + tg})
    wts = [{"path": path, "branch": "main"}]
    for w in range(worktrees):
        wts.append({"path": path + "/.worktrees/feature-" + ["sky", "stream"][w], "branch": "feature/" + ["sky", "stream"][w]})
    days = [0] * 30
    for c in commits:
        age = (NOW - dt.datetime.fromisoformat(c["date"])).days
        if age < 30:
            days[29 - age] += 1
    first = int(dt.datetime.fromisoformat(commits[-1]["date"]).timestamp()) - 86400 * rnd.randint(120, 400)
    last = int(NOW.timestamp())
    bins = [max(0, int(rnd.gauss(6, 5))) if k % 7 else 0 for k in range(48)]
    bins[-8:] = [rnd.randint(8, 20) for _ in range(8)]
    return {"name": name, "path": path, "group": group, "sub": sub, "remote": remote, "branch": "main",
            "dirty": dirty, "behind": 0 if remote else None, "ahead": ahead if remote else None,
            "count": n + rnd.randint(50, 900), "refs": refs, "worktrees": wts, "commits": commits,
            "activity": days, "timeline": {"from": first, "to": last, "bins": bins}, "news": news}


def news(n):
    t = NOW
    c = []
    for i in range(min(n, 15)):
        t -= dt.timedelta(hours=rnd.randint(2, 30))
        c.append({"h": sha(f"news{n}{i}")[:7], "d": iso(t), "a": rnd.choice(["Ana Ruiz", "K. Tanaka", "Luca B."]),
                  "s": rnd.choice(["Add bilinear sampling option", "Fix crash on empty input (#412)", "Faster decode path",
                                   "Docs: new examples", "Bump version", "Support 16-bit PNG"])})
    return {"n": n, "c": c}


def main():
    os.makedirs(IMG, exist_ok=True)
    landscape(os.path.join(IMG, "backdrop-alt.png"), False)
    landscape(os.path.join(IMG, "backdrop-neu.png"), True)
    repos = [
        make_repo("starfall-engine", "eigen", "", "", 120, [(4, 5), (14, 6), (30, 4)], with_picture=True, worktrees=2, tags=("v0.4.0",)),
        make_repo("pixel-weaver", "eigen", "", "https://github.com/arekown/pixel-weaver.git", 60, [(6, 3)], dirty=4, ahead=2, tags=("v1.2.0",)),
        make_repo("home-dashboard", "eigen", "", "", 45, [(3, 4)], dirty=12),
        make_repo("synth-lab", "eigen", "", "https://github.com/arekown/synth-lab.git", 30, []),
        make_repo("trail-notes", "eigen", "", "", 18, []),
        make_repo("pngkit", "fremd", "Libraries", "https://github.com/example/pngkit.git", 40, [(5, 3)], news=news(23)),
        make_repo("vecmath", "fremd", "Libraries", "https://github.com/example/vecmath.git", 40, [], news=news(4)),
        make_repo("audiobus", "fremd", "Libraries", "https://github.com/example/audiobus.git", 40, []),
        make_repo("mapgen-tools", "fremd", "Sonstige", "https://github.com/example/mapgen-tools.git", 40, [(8, 4)], news=news(57)),
    ]
    programs = []
    for name, ver, tags in (("sketchpad", "1.4.0", ["v1.6.1", "v1.6.0", "v1.5.0", "v1.4.0"]), ("notewave", "2.0.3", ["v2.0.3", "v2.0.2"])):
        rel, t = [], NOW
        for tg in tags:
            t -= dt.timedelta(days=rnd.randint(3, 20))
            rel.append({"tag": tg, "date": iso(t), "body": f"## {name} {tg}\n\n### New\n- Layers can be grouped\n- Export as WebP\n\n### Fixed\n- Brush lag on large canvases\n- Crash when closing an unsaved file"})
        programs.append({"name": name, "file": f"~/Applications/{name}-{ver}-linux-x86_64.AppImage", "version": ver,
                         "repo": f"example/{name}", "releases": rel})
    with open(os.path.join(ROOT, "repos.json"), "w") as f:
        json.dump({"repos": repos, "programs": programs, "generated": iso(NOW)}, f, ensure_ascii=False, indent=1)
    print("demo/repos.json:", len(repos), "repos,", len(programs), "programs")


if __name__ == "__main__":
    main()
