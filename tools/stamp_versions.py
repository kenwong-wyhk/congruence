"""Give every local script/style link in index.html a version tag made from the file's contents.

    python tools/stamp_versions.py

A file's tag only changes when that file changes, so students' browsers fetch exactly the files
that were updated and keep using their cached copy of everything else.
The git pre-commit hook in .githooks/ runs this automatically.
"""
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
LINK = re.compile(r'((?:src|href)=")((?:js|data|css|vendor)/[^"?]+\.(?:js|css))(\?v=[^"]*)?(")')


def tag(path: str) -> str:
    data = (ROOT / path).read_bytes().replace(b"\r\n", b"\n")
    return hashlib.sha1(data).hexdigest()[:8]


def main() -> int:
    html = INDEX.read_text(encoding="utf-8")
    new = LINK.sub(lambda m: f"{m.group(1)}{m.group(2)}?v={tag(m.group(2))}{m.group(4)}", html)
    if new != html:
        INDEX.write_text(new, encoding="utf-8", newline="\n")
        print("index.html: version tags updated")
    else:
        print("index.html: version tags already up to date")
    return 0


if __name__ == "__main__":
    sys.exit(main())
