#!/usr/bin/env bash
# Script: analyze_project.sh
# Usage: bash scripts/analyze_project.sh
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_FILE="$ROOT_DIR/analysis-output.json"

detect_frontend() {
  FE_DIR="$ROOT_DIR/frontend"
  framework="none"
  details=""

  if [ -d "$FE_DIR" ]; then
    if [ -f "$FE_DIR/package.json" ]; then
      pkg="$FE_DIR/package.json"
      if grep -qi "\"next\"" "$pkg" || [ -f "$FE_DIR/next.config.js" ]; then
        framework="nextjs"
      elif grep -qi "\"react\"" "$pkg"; then
        framework="react"
      elif grep -qi "\"vue\"" "$pkg"; then
        framework="vue"
      fi

      # detect build/test scripts
      build_script=$(grep -Po '"build"\s*:\s*"\K[^"]+' "$pkg" || true)
      test_script=$(grep -Po '"test"\s*:\s*"\K[^"]+' "$pkg" || true)
      details="package.json found; build=\"$build_script\"; test=\"$test_script\""
    else
      # look for common files
      if [ -f "$FE_DIR/vite.config.js" ] || ls $FE_DIR/src >/dev/null 2>&1; then
        framework="unknown-js"
        details="No package.json but frontend folder exists"
      fi
    fi
  fi

  echo "$framework|$details"
}

detect_backend() {
  BK_DIR="$ROOT_DIR"
  framework="none"
  details=""

  # Node backend detection (backend/package.json or package.json at root)
  if [ -f "$ROOT_DIR/backend/package.json" ] || [ -f "$ROOT_DIR/package.json" ]; then
    if [ -f "$ROOT_DIR/backend/package.json" ]; then pkg="$ROOT_DIR/backend/package.json"; else pkg="$ROOT_DIR/package.json"; fi
    if grep -qi "\"express\"" "$pkg"; then
      framework="node_express"
    elif grep -qi "\"koa\"" "$pkg"; then
      framework="node_koa"
    fi
    details="package.json found at $(realpath "$pkg")"
  fi

  # Python backend detection
  if [ -f "$ROOT_DIR/backend_server.py" ] || [ -f "$ROOT_DIR/app.py" ] || [ -f "$ROOT_DIR/main.py" ] || [ -d "$ROOT_DIR/backend" ]; then
    requirements="$ROOT_DIR/requirements.txt"
    if [ -f "$requirements" ]; then
      if grep -qi "fastapi" "$requirements"; then
        framework="python_fastapi"
        details="requirements.txt contains fastapi"
      elif grep -qi "flask" "$requirements"; then
        framework="python_flask"
        details="requirements.txt contains flask"
      else
        # inspect python files for imports
        if grep -R --line-number -E "from +fastapi|import +fastapi" . >/dev/null 2>&1; then
          framework="python_fastapi"
          details="fastapi import detected"
        elif grep -R --line-number -E "from +flask|import +flask" . >/dev/null 2>&1; then
          framework="python_flask"
          details="flask import detected"
        fi
      fi
    else
      # look for python files with flask/fastapi imports
      if grep -R --line-number -E "from +fastapi|import +fastapi" . >/dev/null 2>&1; then
        framework="python_fastapi"
        details="fastapi import detected"
      elif grep -R --line-number -E "from +flask|import +flask" . >/dev/null 2>&1; then
        framework="python_flask"
        details="flask import detected"
      fi
    fi
  fi

  # Docker detection
  if [ -f "$ROOT_DIR/Dockerfile" ] || [ -f "$ROOT_DIR/frontend/Dockerfile" ]; then
    details="$details; Dockerfile present"
  fi

  echo "$framework|$details"
}

echo "Analyzing project at: $ROOT_DIR"
FE_RES=$(detect_frontend)
BK_RES=$(detect_backend)

FE_FRAMEWORK=$(echo "$FE_RES" | cut -d'|' -f1)
FE_DETAILS=$(echo "$FE_RES" | cut -d'|' -f2-)
BK_FRAMEWORK=$(echo "$BK_RES" | cut -d'|' -f1)
BK_DETAILS=$(echo "$BK_RES" | cut -d'|' -f2-)

cat > "$OUT_FILE" <<EOF
{
  "project_root": "$ROOT_DIR",
  "frontend": {
    "framework": "$FE_FRAMEWORK",
    "details": "$FE_DETAILS"
  },
  "backend": {
    "framework": "$BK_FRAMEWORK",
    "details": "$BK_DETAILS"
  },
  "timestamp": "$(date --iso-8601=seconds 2>/dev/null || date +%Y-%m-%dT%H:%M:%S%z)"
}
EOF

echo "Analysis written to: $OUT_FILE"
echo "Frontend framework: $FE_FRAMEWORK"
echo "Frontend details: $FE_DETAILS"
echo "Backend framework: $BK_FRAMEWORK"
echo "Backend details: $BK_DETAILS"
