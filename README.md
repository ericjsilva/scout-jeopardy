# Scout Jeopardy Game 🎯

A fully interactive Jeopardy-style game designed specifically for Scout troops, featuring Scout-themed categories and questions. The game is completely web-based, works offline, and loads all content dynamically from JSON files for easy customization.

## ✨ Features

- **🎯 Scout-Themed Content**: 7 categories covering Scout ranks from Tenderfoot to Life Scout, plus a fun "Potent Potables" category
- **📱 Fully Responsive**: Works on any modern web browser
- **🔄 Dynamic Content**: All questions, answers, and team names loaded from JSON files
- **🎵 Audio Support**: Includes official Jeopardy theme music
- **👥 Multi-Team Support**: Supports up to 9 patrols/teams with dynamic scoring
- **⚡ Offline Ready**: All dependencies included locally - no internet required
- **🎨 Authentic Jeopardy Look**: Classic blue game board design

## 🎮 How to Play

1. Open `scout-jeopardy-web.html` in any web browser
2. Select the number of patrols participating (1-9)
3. Click "Start" to begin the game
4. Click on dollar amounts to reveal questions
5. Teams can answer in Jeopardy format ("What is...")
6. Score points for correct answers, lose points for incorrect ones
7. Use F11 for full-screen presentation mode

## 📁 Project Structure

```
scout-jeopardy-2025/
├── scout-jeopardy-web.html          # Main game (web version with dynamic loading)
├── scout-jeopardy-local.html        # Local version (embedded data)
├── Jeopardy_Theme.mp3               # Official theme music
├── LICENSE                          # MIT License
├── data/
│   ├── game-data.json              # All questions and answers
│   └── team-names.json             # Patrol names for dropdown
├── js/
│   ├── game.js                     # Main game logic (dynamic)
│   ├── game-embedded.js            # Alternative game logic (embedded)
│   ├── jquery-1.3.2.min.js        # jQuery library
│   ├── autogrow.js                 # Textarea auto-resize
│   └── simplemodal.js              # Modal popup functionality
└── styles/
    └── styles.css                  # All visual styling
```

## 🎯 Game Categories

The game includes questions from these Scout knowledge areas:

1. **Scout** (100-500 pts) - Basic Scout knowledge, signs, slogans
2. **Tenderfoot** (100-500 pts) - First aid, knots, safety
3. **Second Class** (100-500 pts) - Outdoor skills, maps, tools
4. **First Class** (100-500 pts) - Advanced camping, leadership
5. **Star Scout** (100-500 pts) - First aid, conservation, camping
6. **Life Scout** (100-500 pts) - Merit badges, advanced skills
7. **Potent Potables** (100-500 pts) - Fun general knowledge

## 📝 Data Structure

### Questions Format (`data/game-data.json`)
```json
{
  "questions": {
    "Scout": {
      "100": {
        "answer": "The two stars on the First Class badge represent this",
        "question": "What are Truth and Knowledge"
      },
      "200": {
        "answer": "A proper Scout sign should form this angle", 
        "question": "What is a right angle (90 degrees)"
      }
    }
  }
}
```

**Note**: Following Jeopardy format:
- `"answer"` = The clue shown to players
- `"question"` = The correct response format

### Team Names (`data/team-names.json`)
```json
{
  "patrols": [
    "Patrol 1",
    "Patrol 2",
    "Patrol 3"
  ]
}
```

## ⚙️ Customization

### Adding/Editing Questions
1. Open `data/game-data.json`
2. Modify existing questions or add new categories:
```json
{
  "questions": {
    "New Category": {
      "100": { "answer": "Your clue here", "question": "What is the response" }
    }
  }
}
```

### Changing Team Names
1. Edit `data/team-names.json`
2. Modify the `patrols` array with your patrol names

### Styling Changes
1. Edit `styles/styles.css` for visual modifications
2. Main game board uses classic Jeopardy blue (#060CE9)

## 🚀 Getting Started

### Quick Start
1. Download or clone this repository
2. Open `scout-jeopardy-web.html` in any modern web browser
3. No installation or setup required!

### Running with Local Web Server (Recommended for Web Version)
For the best experience with `scout-jeopardy-web.html`, especially to avoid CORS issues when loading JSON files, run a local web server:

**Using Python 3:**
```bash
cd /path/to/scout-jeopardy-2025
python3 -m http.server 8000
```

**Using Python 2:**
```bash
cd /path/to/scout-jeopardy-2025
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000/scout-jeopardy-web.html`

**Benefits of using a local server:**
- Eliminates CORS restrictions when loading JSON data files
- More reliable file loading across different browsers
- Better mimics production web environment

### For Development
1. All files are static HTML/CSS/JavaScript
2. Edit JSON files in the `data/` folder to modify content
3. JavaScript files in `js/` folder contain game logic
4. CSS styling in `styles/` folder

## 🔧 Technical Details

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES5 compatible)
- **Dependencies**: jQuery 1.3.2, custom modal system
- **Data Format**: JSON for easy editing and version control
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Offline Capable**: All resources bundled locally

## 📋 Two Versions Available

1. **`scout-jeopardy-web.html`** (Recommended)
   - Loads data from external JSON files
   - Easy to customize and maintain
   - Better for version control

2. **`scout-jeopardy-local.html`** 
   - Data embedded in JavaScript
   - Single-file solution
   - No external file dependencies

## 🎵 Audio Features

- Includes authentic Jeopardy theme music
- Music controls available in game interface
- Audio files stored locally for offline use

## 🏆 Scoring System

- **Correct Answer**: Add selected point value to team score
- **Incorrect Answer**: Subtract point value from team score  
- **No Answer**: No points awarded or deducted
- Real-time score display for all participating patrols

## 🤝 Contributing

1. Fork the repository
2. Make your changes (especially to JSON data files)
3. Test thoroughly with different browsers
4. Submit a pull request

### Ideas for Contributions
- Additional Scout knowledge questions
- New categories (Merit Badge specific, High Adventure, etc.)
- Enhanced styling or animations
- Mobile-specific improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Perfect For

- **Scout Meetings**: Interactive learning activity
- **Camporees**: Troop competition events  
- **Courts of Honor**: Entertainment between awards
- **Training Events**: Knowledge reinforcement
- **Family Nights**: Fun for parents and siblings
- **Virtual Meetings**: Screen-sharing compatible

## 🚨 System Requirements

- **Browser**: Any modern web browser (Chrome, Firefox, Safari, Edge)
- **Display**: Recommended 1024x768 or higher for best experience
- **Audio**: Speakers or headphones for theme music (optional)
- **Internet**: Not required - fully offline capable

---

**Ready to play?** Open `scout-jeopardy-web.html` and start the game! 🎮

*Be Prepared... to have fun learning Scout knowledge!* 🏕️