// Embedded Game Data (for file:// protocol compatibility)
// This version includes the JSON data directly in the JavaScript to avoid fetch() issues

// Game data embedded directly
var embeddedGameData = {
  "questions": {
    "Scout": {
      "100": {
        "answer": "The two stars on the First Class badge represent this",
        "question": "What are Truth and Knowledge"
      },
      "200": {
        "answer": "A proper Scout sign should form this angle",
        "question": "What is a right angle (90 degrees)"
      },
      "300": {
        "answer": "The three fingers in the Scout Sign represent this",
        "question": "What are the three points of the Scout Oath"
      },
      "400": {
        "answer": "This is the Scout Slogan",
        "question": "What is Do a Good Turn Daily"
      },
      "500": {
        "answer": "These words appear on the First Class badge",
        "question": "What is Be Prepared"
      }
    },
    "Tenderfoot": {
      "100": {
        "answer": "This knot is used to join two pieces of rope of the same thickness",
        "question": "What is a square knot"
      },
      "200": {
        "answer": "This is the universal sign for choking",
        "question": "What is both hands clasped around the neck"
      },
      "300": {
        "answer": "This should be said when receiving a knife, ax, or saw from someone",
        "question": "What is \"Thank You\""
      },
      "400": {
        "answer": "Name the three common poisonous plants",
        "question": "What are Poison Ivy, Oak, and Sumac"
      },
      "500": {
        "answer": "How are Eagle required merit badges visibly different from other merit badges",
        "question": "What is a silver border"
      }
    },
    "Second Class": {
      "100": {
        "answer": "This must be earned before using a pocket knife, ax, or saw",
        "question": "What is the Totin' Chip"
      },
      "200": {
        "answer": "This is the second point of the Outdoor Code",
        "question": "What is Be Careful With Fire"
      },
      "300": {
        "answer": "This method of keeping a rope from fraying uses a string",
        "question": "What is whipping"
      },
      "400": {
        "answer": "This knot is known as a rescue knot",
        "question": "What is the bowline"
      },
      "500": {
        "answer": "This type of map uses concentric lines to represent elevation",
        "question": "What is topographic or contour"
      }
    },
    "First Class": {
      "100": {
        "answer": "This is used to start a diagonal lashing",
        "question": "What is a timber hitch"
      },
      "200": {
        "answer": "It is the goal of Scouts of America for every Scout to earn this rank",
        "question": "First Class"
      },
      "300": {
        "answer": "Charred skin is a characteristic of this degree of burn",
        "question": "What is a third degree burn"
      },
      "400": {
        "answer": "Name the three steps for proper dishwashing",
        "question": "What are wash, rinse, and sanitize"
      },
      "500": {
        "answer": "Name the seven basic knots",
        "question": "What are the square knot, two half-hitches, taut line, sheet bend, bowline, clove hitch, and timber hitch"
      }
    },
    "Star Scout": {
      "100": {
        "answer": "These are the ABC's of CPR",
        "question": "What are Airway, Breathing, and Circulation"
      },
      "200": {
        "answer": "Name four parts of an axe",
        "question": "What are the head, shoulder, blade, handle, heel, bit, toe, face, and butt"
      },
      "300": {
        "answer": "In First Aid, RICE stands for this",
        "question": "What is Rest, Ice, Compression, and Elevation"
      },
      "400": {
        "answer": "This is the minimum distance in which you should dispose of dish water from your campsite",
        "question": "What is 200 feet"
      },
      "500": {
        "answer": "This animal appears on the World Conservation Award",
        "question": "What is the panda"
      }
    },
    "Life Scout": {
      "100": {
        "answer": "This is the map symbol for an unimproved dirt road",
        "question": "What is a double dashed line"
      },
      "200": {
        "answer": "This is the minimum number of Eagle required merit badges needed to earn Life Scout",
        "question": "What is Seven"
      },
      "300": {
        "answer": "Name three type of splices",
        "question": "What are back, round, eye, short, or long"
      },
      "400": {
        "answer": "This merit badge requires you to visit a munincipal or school board meeting",
        "question": "Citizenship in the Community"
      },
      "500": {
        "answer": "You must earn this many Eagle required merit badges for Eagle Scout",
        "question": "What is thirteen"
      }
    },
    "Potent Potables": {
      "100": {
        "answer": "This constellation is shaped like a W",
        "question": "Cassiopia"
      },
      "200": {
        "answer": "This is the name of the mule comic character found in Boys' Life magazine",
        "question": "What is Pedro"
      },
      "300": {
        "answer": "This is the common name of the valve on your bicycle tire",
        "question": "What is a Schrader valve"
      },
      "400": {
        "answer": "This president is found on the U.S. Nickel",
        "question": "Who is Thomas Jefferson"
      },
      "500": {
        "answer": "Name the four Scout high adventure bases and give the state which they are located",
        "question": "What are Sea Base (Florida), Philmont Scout Ranch (New Mexico), Northern Tier (Minnesota), and the Summit Bechtel Reserve (West Virginia)"
      }
    }
  }
};

// Embedded team names
var embeddedTeamNames = {
  "patrols": [
    "Patrol 1",
    "Patrol 2", 
    "Patrol 3",
    "Patrol 4",
    "Patrol 5",
    "Patrol 6",
    "Patrol 7",
    "Patrol 8",
    "Patrol 9"
  ]
};

// Use embedded data instead of fetch when file:// protocol is detected
function loadGameDataEmbedded() {
    console.log('Using embedded game data for file:// compatibility');
    game.gameData = embeddedGameData;
    populateGameBoard(embeddedGameData);
}

function loadTeamDropdownEmbedded() {
    console.log('Using embedded team names for file:// compatibility');
    game.teamNames = embeddedTeamNames;
    populateTeamDropdown(embeddedTeamNames);
}

// Check if we're running from file:// protocol and use embedded data
if (window.location.protocol === 'file:') {
    $(document).ready(function() {
        console.log('File protocol detected, using embedded data');
        loadGameDataEmbedded();
        loadTeamDropdownEmbedded();
    });
} else {
    // Use the original fetch-based loading for http:// and https://
    $(document).ready(function() {
        loadGameData();
        loadTeamDropdown();
    });
}

// Jeopardy Game JavaScript - Complete game functions

$(document).ready(function() {
    $('textarea.edit').autogrow();

    $('textarea.edit').focus(function() {
        $(this).addClass('active');
        var val = $(this).val();
        if (val == "Enter Category" || val == "Enter Title")
            this.select();

    })

    $('textarea.edit').blur(function() {
        $(this).removeClass('active');
    })

    $('.clean').mouseover(function() {
        $(this).addClass('ie-hack')
    })

    $('.clean').mouseout(function() {
        $(this).removeClass('ie-hack')
    })
});

var modal = {}
modal.show = function(questionID) {
    modal.activeID = questionID;
    $('#question').val($('#' + questionID).val());
    $('#answer').val($('#a' + questionID).val());
    $('#modal').modal({
        "overlayClose": true
    });
    $('#t' + questionID).addClass("dirty").removeClass("clean")
}

modal.save = function() {
    $('#' + modal.activeID).val($('#question').val())
    $('#a' + modal.activeID).val($('#answer').val())
}

var game = {}
game.gameData = null;
game.teamNames = null;

game.init = function() {
    $('#game').fadeIn(1000);
    $('#options').hide()
    $('#stats').show()
    game.team_cnt = $('#teams').val()
    game.createScoreboard()
    game.current_points = 0;
}

game.playTheme = function() {
    var soundFileUrl = "Jeopardy_Theme.mp3";
    $('#sound_element').html("<embed src='" + soundFileUrl + "' hidden=true autostart=true loop=true>");
}

game.stopTheme = function() {
    $('#sound_element').html("");
}

game.createScoreboard = function() {
    var content = "<table cellspacing=10><tbody><tr>";
    
    // Use loaded team names
    if (game.teamNames && game.teamNames.patrols) {
        for (var i = 0; i < game.team_cnt; i++) {
            content += "<th><h3>" + game.teamNames.patrols[i] + "</h3></th>";
        }
        content += "</tr><tr>";
        for (var i = 0; i < game.team_cnt; i++) {
            content += "<td><h3 id='team" + i + "'>0</h3><input class='add-points' onclick='game.addPoints(" + i + ")' value='+' type='button' /> <input class='subtract-points' onclick='game.subtractPoints(" + i + ")' type='button' value='-' /></td>";
        }
        content += "</tr></tbody></table>";
        $('#stats').html(content);
    } else {
        // Fallback to default team names if no data loaded
        var patrols = ['Patrol 1', 'Patrol 2', 'Patrol 3', 'Patrol 4', 'Patrol 5', 'Patrol 6', 'Patrol 7', 'Patrol 8', 'Patrol 9'];
        for (var i = 0; i < game.team_cnt; i++) {
            content += "<th><h3>" + patrols[i] + "</h3></th>";
        }
        content += "</tr><tr>";
        for (var i = 0; i < game.team_cnt; i++) {
            content += "<td><h3 id='team" + i + "'>0</h3><input class='add-points' onclick='game.addPoints(" + i + ")' value='+' type='button' /> <input class='subtract-points' onclick='game.subtractPoints(" + i + ")' type='button' value='-' /></td>";
        }
        content += "</tr></tbody></table>";
        $('#stats').html(content);
    }
}

game.addPoints = function(team) {
    var points = parseInt($('#team' + team).html()) + game.current_points;

    $('#team' + team).html(points);
    $(('#t' + game.current_questionID)).addClass("dirty");

    $(('#t' + game.current_questionID)).unbind('mouseover')
    $(('#t' + game.current_questionID)).unbind('mouseout')
    $(('#t' + game.current_questionID)).unbind('click')
    $(('#t' + game.current_questionID)).css('cursor', 'default')

    prompt.hide()
}

game.subtractPoints = function(team) {
    var points = parseInt($('#team' + team).html()) - game.current_points;

    $('#team' + team).html(points);
    $(('#t' + game.current_questionID)).addClass("dirty");

    $(('#t' + game.current_questionID)).unbind('mouseover')
    $(('#t' + game.current_questionID)).unbind('mouseout')
    $(('#t' + game.current_questionID)).unbind('click')
    $(('#t' + game.current_questionID)).css('cursor', 'default')

    prompt.hide()
}

var prompt = {}
prompt.show = function(qid, points) {
    game.current_questionID = qid;
    game.current_points = points;
    
    var answer = $('#a' + qid).html();
    var question = $('#' + qid).html();
    
    $('#prompt-answer').html(answer);
    $('#prompt-question').html(question).hide();
    
    $('#prompt').modal({
        "escClose": false,
        "overlayClose": false
    });
}

prompt.showQuestion = function() {
    $('#correct-response').hide();
    $('#prompt-question').show();
}

prompt.hide = function() {
    $('#prompt-question').hide();
    $('#correct-response').show();
    $.modal.close();
}

prompt.noAnswer = function() {
    $(('#t' + game.current_questionID)).addClass("dirty");

    $(('#t' + game.current_questionID)).unbind('mouseover')
    $(('#t' + game.current_questionID)).unbind('mouseout')
    $(('#t' + game.current_questionID)).unbind('click')
    $(('#t' + game.current_questionID)).css('cursor', 'default')

    prompt.hide()
}

// Function to populate team dropdown
function populateTeamDropdown(teamData) {
    const teamsSelect = document.getElementById('teams');
    teamsSelect.innerHTML = ''; // Clear existing options
    
    for (let i = 1; i <= teamData.patrols.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + (i === 1 ? ' patrol' : ' patrols');
        teamsSelect.appendChild(option);
    }
}

// Function to populate the game board with data
function populateGameBoard(data) {
    // Get categories from the questions object keys
    const categories = Object.keys(data.questions);
    const pointValues = ['100', '200', '300', '400', '500'];
    
    // Clear existing content
    const categoryHeaders = document.getElementById('category-headers');
    const gameBoard = document.getElementById('game-board');
    
    categoryHeaders.innerHTML = '';
    gameBoard.innerHTML = '';
    
    // Add category headers
    categories.forEach(category => {
        const th = document.createElement('th');
        th.textContent = category;
        categoryHeaders.appendChild(th);
    });
    
    // Create game board rows
    pointValues.forEach((points, rowIndex) => {
        const row = document.createElement('tr');
        
        categories.forEach((category, colIndex) => {
            const cell = document.createElement('td');
            const questionId = 'q' + rowIndex + colIndex;
            const answerId = 'a' + questionId;
            const cellId = 't' + questionId;
            
            cell.id = cellId;
            cell.className = 'cell clean';
            cell.onclick = function() { prompt.show(questionId, parseInt(points)); };
            
            const pointsHeader = document.createElement('h3');
            pointsHeader.textContent = points;
            
            const hiddenDiv = document.createElement('div');
            hiddenDiv.className = 'hide';
            
            const questionDiv = document.createElement('div');
            questionDiv.id = questionId;
            
            const answerDiv = document.createElement('div');
            answerDiv.id = answerId;
            
            // Set question and answer content if available
            if (data.questions[category] && data.questions[category][points]) {
                const item = data.questions[category][points];
                questionDiv.textContent = item.question;
                answerDiv.textContent = item.answer;
            } else {
                questionDiv.textContent = 'Question not available';
                answerDiv.textContent = 'Answer not available';
            }
            
            hiddenDiv.appendChild(questionDiv);
            hiddenDiv.appendChild(answerDiv);
            
            cell.appendChild(pointsHeader);
            cell.appendChild(hiddenDiv);
            
            row.appendChild(cell);
        });
        
        gameBoard.appendChild(row);
    });
    
    // Add hover effects to cells after they're created
    $('.clean').mouseover(function() {
        $(this).addClass('ie-hack')
    })

    $('.clean').mouseout(function() {
        $(this).removeClass('ie-hack')
    })
}
