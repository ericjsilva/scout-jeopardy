// Jeopardy Game JavaScript

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

    // Load data and populate page
    loadGameData();
    loadTeamDropdown();
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

// Function to load game data
function loadGameData() {
    fetch('data/game-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Game data loaded successfully:', data);
            game.gameData = data;
            populateGameBoard(data);
        })
        .catch(error => {
            console.error('Error loading game data:', error);
            console.log('Trying to load from file:// protocol may be blocked by browser security. Try using a local HTTP server.');
            alert('Could not load game data. If opening from file://, try using a local web server instead. Error: ' + error.message);
        });
}

// Function to load team names and populate dropdown
function loadTeamDropdown() {
    fetch('data/team-names.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Team names loaded successfully:', data);
            game.teamNames = data;
            populateTeamDropdown(data);
        })
        .catch(error => {
            console.error('Error loading team names:', error);
            console.log('Using fallback team names');
            // Create fallback dropdown
            populateTeamDropdown({ patrols: ['Patrol 1', 'Patrol 2', 'Patrol 3', 'Patrol 4', 'Patrol 5', 'Patrol 6', 'Patrol 7', 'Patrol 8', 'Patrol 9'] });
        });
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

// Load game data when page loads
document.addEventListener('DOMContentLoaded', loadGameData);
