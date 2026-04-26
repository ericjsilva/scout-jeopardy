# Scout Jeopardy Game 🎯

A sleek, fully interactive Jeopardy-style game for Scout troops. Test your Scouts' knowledge from Tenderfoot to Life Scout with fun, customizable questions. Playable locally or via a simple web server, it requires no internet connection.

## ✨ Quick Start

1. **Option 1 (Web Version - Recommended)**:
   To play the game or develop on this repository, you'll need Node.js. We recommend using [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to automatically use the correct Node version.
   
   **Install nvm & Node.js:**
   We recommend installing `nvm` via a package manager for security.

   **macOS / Linux:**
   ```bash
   brew install nvm
   ```
   
   **Windows:**
   ```powershell
   choco install nvm
   ```
   
   Once `nvm` is installed, automatically install and use the correct Node.js version (defined in `.nvmrc`):
   ```bash
   nvm install
   nvm use
   ```

   **Install pnpm:**
   This project uses `pnpm` as its package manager. You can install it using npm:
   ```bash
   npm install -g pnpm
   ```

   or install using Homebrew:
   ```bash
   brew install pnpm
   ```

   **Install Just:**
   This project uses `just` as its build tool. You can install it using brew:
   ```bash
   brew install just
   ```

   **Install pinact:**
   This project uses `pinact` to update and pin GitHub Action versions. You can install it using brew:
   ```bash
   brew install pinact
   ```


   **Run the App:**
   Once Node and pnpm are installed, set up and run the game:
   ```bash
   just setup
   just serve
   ```
   *(Note: you will also need to install [Just](https://just.systems/man/en/installation.html), e.g., via `brew install just` on mac)*
   
   Open `http://localhost:8000/scout-jeopardy-web.html` in your browser.

2. **Option 2 (Local Version)**:
   Simply double-click `scout-jeopardy-local.html` to open it in any browser. No server required!

## 🛠 Features & Architecture

- **Themes & Rankings**: 7 categories (Scout to Life Scout + Potent Potables).
- **Customizable**: Edit `data/game-data.json` to change questions, and `data/team-names.json` to configure team/patrol names.
- **Scoring**: Full penalty and point awarding support for up to 9 teams.
- **Audio**: Built-in official game show sounds.
- **Tech Stack**: HTML5, Vanilla CSS, JS/jQuery, Playwright (E2E), and Biome (Lint/Formatting).

## 🧑‍💻 Development

We use modern web tooling (Just, Biome, Husky) for a robust development lifecycle:

- `just setup` - Install deps and prepare hooks.
- `just serve` - Runs a local Node HTTP server on port 8000.
- `just check` - Runs formatting and linting rules. 
- `just fix` - Auto-fixes fixable code styling issues.
- `just pinact` - Pins GitHub Actions versions.
- `just test-e2e` - Executes Playwright end-to-end tests.

## 🤝 Contributing & License

Edit the JSON files to add Merit Badge or High Adventure specific categories! Test changes with various browsers and feel free to submit a pull request.
Licensed under the [MIT License](LICENSE).