#!/bin/bash
# Render 환경 변수 동기화 스크립트
# 이 스크립트는 Render CLI를 사용하여 환경 변수를 설정합니다.
# Render CLI 설치: https://render.com/docs/cli

echo "🚀 Render 환경 변수 동기화 시작..."

# .env 파일에서 값 읽기
if [ ! -f .env ]; then
    echo "❌ .env 파일을 찾을 수 없습니다."
    exit 1
fi

# Render CLI 설치 확인
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI가 설치되어 있지 않습니다."
    echo "설치 방법: https://render.com/docs/cli"
    exit 1
fi

# 환경 변수 읽기
source .env

# Render 서비스 이름 (사용자가 수정 필요)
RENDER_SERVICE_NAME="coffee-order-api"

echo "📋 설정할 환경 변수:"
echo "  NODE_ENV=production"
echo "  PORT=10000"
echo "  DB_HOST=${DB_HOST}"
echo "  DB_PORT=${DB_PORT}"
echo "  DB_NAME=${DB_NAME}"
echo "  DB_USER=${DB_USER}"
echo "  DB_PASSWORD=*** (숨김)"

# Render CLI로 환경 변수 설정
echo ""
echo "🔧 Render에 환경 변수 설정 중..."

render env:set NODE_ENV=production --service $RENDER_SERVICE_NAME
render env:set PORT=10000 --service $RENDER_SERVICE_NAME
render env:set DB_HOST=$DB_HOST --service $RENDER_SERVICE_NAME
render env:set DB_PORT=$DB_PORT --service $RENDER_SERVICE_NAME
render env:set DB_NAME=$DB_NAME --service $RENDER_SERVICE_NAME
render env:set DB_USER=$DB_USER --service $RENDER_SERVICE_NAME
render env:set DB_PASSWORD="$DB_PASSWORD" --service $RENDER_SERVICE_NAME

echo ""
echo "✅ 환경 변수 설정 완료!"
echo "📝 Render 대시보드에서 확인하세요: https://dashboard.render.com"

