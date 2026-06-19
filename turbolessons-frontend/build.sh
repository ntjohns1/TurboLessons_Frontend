#!/usr/bin/env bash
# Local build of the turbolessons frontend image.
#
# Requires BuildKit (for the gh_token secret used to install the private
# @ntjohns1/react-oidc package from GitHub Packages).
#
# Provide a GitHub PAT with read:packages via GH_PACKAGES_TOKEN, e.g.:
#   GH_PACKAGES_TOKEN=$(cat /tmp/ghpat) ./build.sh
#
# Override the auth/Stripe build args as needed (defaults target QAC):
#   ISSUER=... CLIENT_ID=... VITE_STRIPE_PUBLISHABLE_KEY=... ./build.sh
set -euo pipefail

: "${GH_PACKAGES_TOKEN:?Set GH_PACKAGES_TOKEN (PAT with read:packages) to install @ntjohns1/react-oidc}"

ISSUER="${ISSUER:-https://auth.nelsonjohns.com/realms/turbolessons-qac}"
CLIENT_ID="${CLIENT_ID:-turbolessons-spa}"
VITE_STRIPE_PUBLISHABLE_KEY="${VITE_STRIPE_PUBLISHABLE_KEY:-}"
TAG="${TAG:-noslenj/turbolessons-frontend:qac}"

echo "Building $TAG (issuer=$ISSUER client=$CLIENT_ID)"

DOCKER_BUILDKIT=1 docker build \
  --secret id=gh_token,env=GH_PACKAGES_TOKEN \
  --build-arg ISSUER="$ISSUER" \
  --build-arg CLIENT_ID="$CLIENT_ID" \
  --build-arg VITE_STRIPE_PUBLISHABLE_KEY="$VITE_STRIPE_PUBLISHABLE_KEY" \
  -t "$TAG" \
  .
