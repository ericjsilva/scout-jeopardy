$(document).ready(function () {
  $('textarea.edit').autogrow();

  $('textarea.edit').focus(function () {
    $(this).addClass('active');
    var val = $(this).val();
    if (val == "Enter Category" || val == "Enter Title")
      this.select();

  })

  $('textarea.edit').blur(function () {
    $(this).removeClass('active');
  })

  $('.clean').mouseover(function () {
    $(this).addClass('ie-hack')
  })

  $('.clean').mouseout(function () {
    $(this).removeClass('ie-hack')
  })
});

var modal = {}
modal.show = function (questionID) {
  modal.activeID = questionID;
  $('#question').val($('#' + questionID).val());
  $('#answer').val($('#a' + questionID).val());
  $('#modal').modal({
    "overlayClose": true
  });
  $('#t' + questionID).addClass("dirty").removeClass("clean")
}

modal.save = function () {
  $('#' + modal.activeID).val($('#question').val())
  $('#a' + modal.activeID).val($('#answer').val())
}

var game = {}
game.init = function () {
  $('#game').fadeIn(1000);
  $('#options').hide()
  $('#stats').show()
  game.team_cnt = $('#teams').val()
  game.createScoreboard()
  game.current_points = 0;
}

game.playTheme = function () {
  var soundFileUrl = "Jeopardy_Theme.mp3";
  $('#sound_element').html("<embed src='" + soundFileUrl + "' hidden=true autostart=true loop=true>");
}

game.stopTheme = function () {
  $('#sound_element').html("");
}

game.createScoreboard = function () {
  var content = "<table cellspacing=10><tbody><tr>";
  var patrols = new Array('Red Patrol', 'Orange Patrol', 'Yellow Patrol', 'Green Patrol', 'Blue Patrol', 'Purple Patrol');
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

game.addPoints = function (team) {
  var points = parseInt($('#team' + team).html()) + game.current_points;

  $('#team' + team).html(points);
  $(('#t' + game.current_questionID)).addClass("dirty");

  $(('#t' + game.current_questionID)).unbind('mouseover')
  $(('#t' + game.current_questionID)).unbind('mouseout')
}

game.subtractPoints = function (team) {
  var points = parseInt($('#team' + team).html()) - game.current_points;

  $('#team' + team).html(points);
  $(('#t' + game.current_questionID)).addClass("dirty");
  $(('#t' + game.current_questionID)).unbind('mouseover')
  $(('#t' + game.current_questionID)).unbind('mouseout')
}

var prompt = {}
prompt.show = function (questionID, points) {
  game.current_points = points
  game.current_questionID = questionID
  $('#question').hide()
  $('#game').hide()
  $('#prompt').fadeIn(1000)
  $('#question').html($('#' + questionID).html())
  $('#answer').html($('#a' + questionID).html())
  if ($('#question').html().length == 0)
    $('#correct-response').hide()
  else
    $('#correct-response').show();
}

prompt.noAnswer = function () {
  $(('#t' + game.current_questionID)).addClass("dirty");
  $('#prompt').hide();
  $('#game').show();
}

prompt.hide = function () {
  $('#prompt').hide();
  $('#game').show();
}

prompt.showQuestion = function () {
  $('#question').fadeIn(1000)
}
