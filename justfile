# Justfile for common project tasks
# Install just: https://just.systems/man/en/installation.html

set shell := ["bash", "-c"]

default:
    @just --list

# Format the codebase using Biome
format:
    npx biome format --write .

# Lint the codebase using Biome
lint:
    npx biome lint .

# Run both format and lint checks
check: sync
    npx biome check .

# Fix auto-fixable format and lint issues
fix:
    npx biome check --write .

# Start a local HTTP server for testing
serve port="8000":
    @echo "Starting local Node HTTP server on port {{port}}..."
    npx http-server . -p {{port}} -a localhost -c-1 -o /scout-jeopardy-web.html

# Run npm install and husky init
setup: sync
    npm install
    npm run prepare

# Clean dependencies
clean:
    rm -rf node_modules package-lock.json

# Run end-to-end tests using Playwright
test-e2e:
    npx playwright test

# Install browser binaries for Playwright
install-playwright:
    npx playwright install --with-deps

# Synchronize JSON data with local offline JavaScript
sync:
    node js/build-embedded.js
