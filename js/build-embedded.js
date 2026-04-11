const fs = require("node:fs");
const path = require("node:path");

const gameDataPath = path.join(__dirname, "../data/game-data.json");
const teamNamesPath = path.join(__dirname, "../data/team-names.json");
const outputPath = path.join(__dirname, "game-embedded.js");

try {
  const gameData = fs.readFileSync(gameDataPath, "utf8");
  const teamNames = fs.readFileSync(teamNamesPath, "utf8");

  const fileContent = `// Jeopardy Game JavaScript - Local/Embedded Version (file:// protocol compatible)
// Requires game-core.js to be loaded first
// This version includes the JSON data directly in the JavaScript to avoid fetch() issues
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run \`just sync\` to rebuild this file after modifying JSON data.

// Game data embedded directly
const embeddedGameData = ${gameData};

// Embedded team names
const embeddedTeamNames = ${teamNames};

// Load embedded data on ready
$(document).ready(() => {
	console.log("Using embedded game data");
	game.gameData = embeddedGameData;
	game.teamNames = embeddedTeamNames;
	populateGameBoard(embeddedGameData);
	populateTeamDropdown(embeddedTeamNames);
});
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log("Successfully synchronized js/game-embedded.js from JSON data.");
} catch (error) {
  console.error("Error building game-embedded.js:", error);
  process.exit(1);
}
