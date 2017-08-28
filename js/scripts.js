function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function Player() {
  this.inventory = ['Knife', 'Marbles'];
  this.health = 90;
}

Player.prototype.displayInventory = function() {
  for (var i = 0; i < this.inventory.length; i++) {
    $('#player-inventory').append('<li>' + this.inventory[i] + ' </li>');
  }
}

$(document).ready(function() {
  var newPlayer = new Player();
  newPlayer.displayInventory();

  $('#player-health').text(newPlayer.health);

  $('.try-again').click(function() {
    location.reload();
  });

  $('#button1-left').click(function(event) {
    $('#story1').hide(800);
    $('#story2-1').show(800);
  });

  $('#button1-right').click(function(event) {
    $('#story1').hide(800);
    $('#story2-2').show(800);
  });

  $('#button2-2-left').click(function(event) {
    $('#story2-2').hide(800);
    $('#story3-1').show(800);
  });

  $('#button2-2-right').click(function(event) {
    $('#story2-2').hide(800);
    $('#story3-2').show(800);
  });

  $('#button3-1-right').click(function(event) {
    $('#story3-1').hide(800);
    $('#story3-2').show(800);
  });

  $('#button3-2-return').click(function(event) {
    $('#story3-2').hide(800);
    $('#story3-3').show(800);
    newPlayer.inventory = newPlayer.inventory.push('Apples', 'Bread', 'Sling-Shot', 'Torch');
    newPlayer.displayInventory();
  });

  $('#button3-3-left').click(function(event) {
    $('#story3-3').hide(800);
    $('#story4-1').show(800);
    newPlayer.health = newPlayer.health - 10;
    $('#player-health').text(newPlayer.health);
  });

  $('#button4-1-knife').click(function(event) {
    $('#story4-1').hide(800);
    $('#story4-3').show(800);
    newPlayer.health = newPlayer.health - 10;
    $('#player-health').text(newPlayer.health);
  });

  $('#button4-1-sling').click(function(event) {
    $('#story4-1').hide(800);
    $('#story4-2').show(800);
  });

  $('#button4-2-tunnel').click(function(event) {
    $('#story4-2').hide(800);
    $('#story5-1').show(800);
  });

  $('#button4-3-sling').click(function(event) {
    $('#story4-3').hide(800);
    $('#story4-2').show(800);
  });

  $('#button5-1-apples').click(function(event) {
    $('#story5-1').hide(800);
    $('#story5-2').show(800);
    newPlayer.health = newPlayer.health + 10;
    $('#player-health').text(newPlayer.health);
    newPlayer.health = newPlayer.health + 10;
    $('#player-health').text(newPlayer.health);
  });

  $('#button5-1-bread').click(function(event) {
    $('#story5-1').hide(800);
    $('#story5-2').show(800);
    newPlayer.health = newPlayer.health + 15;
    $('#player-health').text(newPlayer.health);
  });

  $('#button5-2-river').click(function(event) {
    $('#story5-2').hide(800);
    $('#story6-1').show(800);

  });

  $('#button6-1-search').click(function(event) {
    newPlayer.inventory = newPlayer.inventory.push('key');
  });

  $('#button6-1-boat').click(function(event) {
    newPlayer.inventory = newPlayer.inventory.push('key');
  });
  // $('#button5-1-bread').click(function(event) {
  //   $('#story5-1').hide(800);
  //   $('#story5-2').show(800);
  //   newPlayer.health = newPlayer.health + 15;
  //   $('#player-health').text(newPlayer.health);
  // });

});
