#!/bin/bash
# TOOL: deploy.sh | FAMILY: vijay-wiki | VERSION: 1.0.0 | DATE: 2026-11-24
# CHAT: Vijay_Wiki: build all suggested topics in groups and upload | CHANGES: 1.0.0 build, copy to site repo, commit and push
set -e
MSG="$1"
REPO=/home/claude/haivijayanand.github.io
cd /home/claude/wiki-build && python3 build.py /tmp/wout
cp /tmp/wout/*.html $REPO/vijay-wiki/
mkdir -p $REPO/vijay-wiki/_build/articles
cp wiki.py build.py deploy.sh $REPO/vijay-wiki/_build/ && cp articles/*.py $REPO/vijay-wiki/_build/articles/
cd $REPO
if grep -rliE "amagb|\blca\b|drdo|cvrde|camt|tejas|amca" vijay-wiki/*.html; then echo "RESTRICTED NAME FOUND"; exit 1; fi
git add -A vijay-wiki _data/sections.json
git -c user.name="haivijayanand" -c user.email="haivijayanand@gmail.com" commit -q -m "$MSG

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01LSta6t3pemjVg6PKgJiiCZ"
git -c push.negotiate=true push origin main 2>&1 | tail -1
