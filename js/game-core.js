// Jeopardy Game JavaScript - Core Game Logic
// Shared between web (fetch) and local (embedded) versions

$(document).ready(() => {
  $("textarea.edit").autogrow();

  $("textarea.edit").focus(function () {
    $(this).addClass("active");
    var val = $(this).val();
    if (val === "Enter Category" || val === "Enter Title") this.select();
  });

  $("textarea.edit").blur(function () {
    $(this).removeClass("active");
  });

  $(".clean").mouseover(function () {
    $(this).addClass("ie-hack");
  });

  $(".clean").mouseout(function () {
    $(this).removeClass("ie-hack");
  });
});

var modal = {};
modal.show = (questionID) => {
  modal.activeID = questionID;
  $("#question").val($(`#${questionID}`).val());
  $("#answer").val($(`#a${questionID}`).val());
  $("#modal").modal({
    overlayClose: true,
  });
  $(`#t${questionID}`).addClass("dirty").removeClass("clean");
};

modal.save = () => {
  $(`#${modal.activeID}`).val($("#question").val());
  $(`#a${modal.activeID}`).val($("#answer").val());
};

var game = {};
game.gameData = null;
game.teamNames = null;
game.audio = null;

game.init = () => {
  $("#game").fadeIn(1000);
  $("#options").hide();
  $("#stats").show();
  game.team_cnt = $("#teams").val();
  game.createScoreboard();
  game.current_points = 0;
};

game.playTheme = () => {
  if (!game.audio) {
    game.audio = new Audio("Jeopardy_Theme.mp3");
    game.audio.loop = true;
  }
  game.audio.play();
};

game.stopTheme = () => {
  if (game.audio) {
    game.audio.pause();
    game.audio.currentTime = 0;
  }
};

game.toggleFullScreen = () => {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen =
    doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    if (requestFullScreen) {
      requestFullScreen.call(docEl);
    }
  } else {
    if (cancelFullScreen) {
      cancelFullScreen.call(doc);
    }
  }
};

game.createScoreboard = () => {
  var content = "<table cellspacing=10><tbody><tr>";

  // Use loaded team names
  if (game.teamNames?.patrols) {
    for (let i = 0; i < game.team_cnt; i++) {
      content += `<th><h3>${game.teamNames.patrols[i]}</h3></th>`;
    }
    content += "</tr><tr>";
    for (let i = 0; i < game.team_cnt; i++) {
      content +=
        "<td><h3 id='team" +
        i +
        "'>0</h3><input class='add-points' onclick='game.addPoints(" +
        i +
        ")' value='+' type='button' /> <input class='subtract-points' onclick='game.subtractPoints(" +
        i +
        ")' type='button' value='-' /></td>";
    }
    content += "</tr></tbody></table>";
    $("#stats").html(content);
  } else {
    // Fallback to default team names if no data loaded
    const patrols = [
      "Patrol 1",
      "Patrol 2",
      "Patrol 3",
      "Patrol 4",
      "Patrol 5",
      "Patrol 6",
      "Patrol 7",
      "Patrol 8",
      "Patrol 9",
    ];
    for (let i = 0; i < game.team_cnt; i++) {
      content += `<th><h3>${patrols[i]}</h3></th>`;
    }
    content += "</tr><tr>";
    for (let i = 0; i < game.team_cnt; i++) {
      content +=
        "<td><h3 id='team" +
        i +
        "'>0</h3><input class='add-points' onclick='game.addPoints(" +
        i +
        ")' value='+' type='button' /> <input class='subtract-points' onclick='game.subtractPoints(" +
        i +
        ")' type='button' value='-' /></td>";
    }
    content += "</tr></tbody></table>";
    $("#stats").html(content);
  }
};

// Disable a cell after it has been answered (mark dirty, remove handlers)
game.disableCell = (questionID) => {
  var cell = document.getElementById(`t${questionID}`);
  if (cell) {
    $(cell).addClass("dirty").removeClass("clean");
    cell.onclick = null;
    $(cell).off("mouseover");
    $(cell).off("mouseout");
    $(cell).css("cursor", "default");
  }
};

game.addPoints = (team) => {
  var points = parseInt($(`#team${team}`).html(), 10) + game.current_points;

  $(`#team${team}`).html(points);
  game.disableCell(game.current_questionID);

  prompt.hide();
};

game.subtractPoints = (team) => {
  var points = parseInt($(`#team${team}`).html(), 10) - game.current_points;

  $(`#team${team}`).html(points);
  game.disableCell(game.current_questionID);

  prompt.hide();
};

var prompt = {};
prompt.answerRevealed = false;

prompt.show = (qid, points) => {
  game.current_questionID = qid;
  game.current_points = points;
  prompt.answerRevealed = false;

  var answer = $(`#a${qid}`).html();
  var question = $(`#${qid}`).html();

  $("#prompt-answer").html(answer);
  $("#prompt-question").html(question).hide();

  $("#prompt").modal({
    escClose: false,
    overlayClose: false,
  });
};

prompt.showQuestion = () => {
  prompt.answerRevealed = true;
  $("#correct-response").hide();
  $("#prompt-question").show();
};

prompt.hide = () => {
  if (prompt.answerRevealed) {
    game.disableCell(game.current_questionID);
  }
  $("#prompt-question").hide();
  $("#correct-response").show();
  $.modal.close();
};

prompt.noAnswer = () => {
  game.disableCell(game.current_questionID);
  prompt.hide();
};

// Function to populate team dropdown
// biome-ignore lint/correctness/noUnusedVariables: global function used in other scripts
function populateTeamDropdown(teamData) {
  var teamsSelect = document.getElementById("teams");
  teamsSelect.innerHTML = ""; // Clear existing options

  for (let i = 1; i <= teamData.patrols.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i + (i === 1 ? " patrol" : " patrols");
    teamsSelect.appendChild(option);
  }
}

// Function to populate the game board with data
// biome-ignore lint/correctness/noUnusedVariables: global function used in other scripts
function populateGameBoard(data) {
  // Get categories from the questions object keys
  var categories = Object.keys(data.questions);
  var pointValues = ["100", "200", "300", "400", "500"];

  // Clear existing content
  var categoryHeaders = document.getElementById("category-headers");
  var gameBoard = document.getElementById("game-board");

  categoryHeaders.innerHTML = "";
  gameBoard.innerHTML = "";

  // Add category headers
  categories.forEach((category) => {
    var th = document.createElement("th");
    th.textContent = category;
    categoryHeaders.appendChild(th);
  });

  // Create game board rows
  pointValues.forEach((points, rowIndex) => {
    var row = document.createElement("tr");

    categories.forEach((category, colIndex) => {
      var cell = document.createElement("td");
      var questionId = `q${rowIndex}${colIndex}`;
      var answerId = `a${questionId}`;
      var cellId = `t${questionId}`;

      cell.id = cellId;
      cell.className = "cell clean";
      cell.onclick = () => {
        prompt.show(questionId, parseInt(points, 10));
      };

      var pointsHeader = document.createElement("h3");
      pointsHeader.textContent = points;

      var hiddenDiv = document.createElement("div");
      hiddenDiv.className = "hide";

      var questionDiv = document.createElement("div");
      questionDiv.id = questionId;

      var answerDiv = document.createElement("div");
      answerDiv.id = answerId;

      // Set question and answer content if available
      if (data.questions[category]?.[points]) {
        const item = data.questions[category][points];
        questionDiv.textContent = item.question;
        answerDiv.textContent = item.answer;
      } else {
        questionDiv.textContent = "Question not available";
        answerDiv.textContent = "Answer not available";
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
  $(".clean").mouseover(function () {
    $(this).addClass("ie-hack");
  });

  $(".clean").mouseout(function () {
    $(this).removeClass("ie-hack");
  });
}
