function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function Game() {
  this.currentPlayer = null;
  this.rooms = [
    {
      name: 'entrance',
      messages: [
        'At long last you\'ve found the dungeon entrance of Flerb!!!',
        'You stand before two tunnels. The one on your left is large and appears relatively dry. The tunnel on your right appears narrow and wet.'
      ],
      buttons: [
        {
          text: 'Left Tunnel',
          roomName: 'death1'
        },
        {
          text: 'Right Tunnel',
          roomName: 'wet-tunnel',
        }
      ]
    },
    {
      name: 'death1',
      messages: ['Moments after entering the ground gives way beneath your feet and you fall to your death. The people of your homeland will surely perish now.'],
      buttons: [],
    },
    {
      name: 'wet-tunnel',
      messages: [
        'You duck into the damp and narrow tunnel, blindly squeazing your way through the tight turns, cold water dripping down your neck. You stumble out into a short corridor and at the end there are two doors.',
        'The door on your right has a cold draft and soft light coming through the cracks in the frame. The door on your left is solid and heavy with no distinguishable features.'
      ],
      buttons: [
        {
          text: 'Left Door',
          validatesInventoryFor: 'Torch',
          roomNameFailure: 'wet-tunnel-end',
          roomNameSuccess: 'bat-room',
        },
        {
          text: 'Right Door',
          roomName: 'cold-room'
        }
      ],
    },
    {
      name: 'wet-tunnel-end',
      messages: [
        'It\'s too dark to go in the door on the left. You curse yourself for going dungeon hunting without a torch.',
        'The door on your right has a cold draft and soft light coming through the cracks in the frame. The door on your left is solid and heavy with no distinguishable features.'
      ],
      buttons: [
        {
          text: 'Right Door',
          roomName: 'cold-room'
        }
      ]
    },
    {
      name: 'bat-room',
      messages: [
        'You cautiously walk into the room with the torch held in front of you and are greeted with the sight of a giant ugly bat. It screeches loudly and dives at you, biting your face. You take 10 damage.',
      ],
      buttons: [
        {
          text: 'Attack With Sling-Shot',
          roomName: 'bat-room-sling'
        },
        {
          text: 'Attack With Knife',
          roomName: 'bat-room-knife'
        }
      ]
    },
    {
      name: 'cold-room',
      messages: [
        'You walk into a cold room with a torch burning on the wall. Your see a table with a sling-shot, two apples, and half a loaf of bread on it. You grab these items and stow them.'
      ],
      buttons: [
        {
          text: 'Return To Corridor',
          roomName: 'wet-tunnel-torch',
          addsToInventory: ['Apples', 'Bread', 'Sling-Shot', 'Torch'],
        }
      ]
    }
  ];
}

Game.prototype.getCurrentPlayer = function() {
  return this.currentPlayer;
};

Game.prototype.start = function() {
  var newPlayer = new Player();
  newPlayer.displayInventory();
  newPlayer.updateHealth();
  this.currentPlayer = newPlayer;
  this.goToRoom('entrance');
};

Game.prototype.goToRoomByButton = function(button) {
  var roomToGoTo;

  if (button.validatesInventoryFor) {
    if (this.getCurrentPlayer().checkForItem(button.validatesInventoryFor)) {
      roomToGoTo = button.roomNameSuccess;
    } else {
      roomToGoTo = button.roomNameFailure;
    }
  } else {
    roomToGoTo = button.roomName;
  }

  if (button.addsToInventory) {
    this.getCurrentPlayer().inventory = this.getCurrentPlayer().inventory.concat(button.addsToInventory);
    this.getCurrentPlayer().displayInventory();
  }

  this.goToRoom(roomToGoTo);
};

Game.prototype.goToRoom = function(roomName) {
  var room = this.rooms.find(function(room) {
    return room.name === roomName;
  });

  if (!room) {
    window.alert('YOU HAVE NOT DEFINED THAT ROOM '+ roomName);
    return;
  }

  window.$('#story .messages').hide(800, function() {
    window.$('#story .messages')[0].innerHTML = room.messages.reduce(function(memo, message) {
      return memo + '<p>' + message + '</p>';
    }, '');
    window.$('#story .messages').show(800);
  });

  if (room.buttons.length) {
    window.$('#story .button-group').hide(800, function() {
      window.$('#story .button-group')[0].innerHTML = room.buttons.reduce(function(memo, button) {
        return memo + "<button class='btn' data-button='"+ JSON.stringify(button) +"'>" + button.text + "</button>";
      }, '');
      window.$('#story .button-group').show(800);
    });

  } else {
    window.$('.button-group').empty();
    window.$('.try-again').show();
  }
};

function Player() {
  this.inventory = ['Knife', 'Marbles'];
  this.health = 90;
}

Player.prototype.displayInventory = function() {
  $('#player-inventory').empty();
  for (var i = 0; i < this.inventory.length; i++) {
    $('#player-inventory').append('<li>' + this.inventory[i] + ' </li>');
  }
};

Player.prototype.removeInventory = function(item) {
	for (var i = 0; i <  this.inventory.length; i++) {
	  if (this.inventory[i] === item) {
    var x = this.inventory.indexOf(item);
	  this.inventory.splice(x, 1);
    this.displayInventory();
    }
  }
};

Player.prototype.checkForItem = function(item) {
  for (var i = 0; i < this.inventory.length; i++) {
    if (this.inventory[i] === item) {
      return true;
    }
  } return false;
};

Player.prototype.changeHealth = function(damage) {
  this.health += damage;
  this.updateHealth();
};

Player.prototype.updateHealth = function() {
  $('#player-health').text(this.health);
};

function handleDocumentReady() {
  prepareGame();
  prepareClickHandlers();
  window.game.start();
}

function prepareGame() {
  var game = new Game();
  window.game = game;
}

function prepareClickHandlers() {
  $('.try-again').click(function() {
    location.reload();
  });

$('#story .button-group').click(function(event) {
  var button = event.target;
  var buttonObj = button.getAttribute('data-button');

  if(buttonObj) {
    window.game.goToRoomByButton(JSON.parse(buttonObj));
  }
});

  // $('#button1-left').click(function(event) {
  //   $('#entrance').hide(800);
  //   $('#death1').show(800);
  // });
  //
  // $('#button1-right').click(function(event) {
  //   $('#entrance').hide(800);
  //   $('#wet-tunnel').show(800);
  // });
  //
  // $('#button2-2-left').click(function(event) {
  //   $('#wet-tunnel').hide(800);
  //   $('#wet-tunnel-end').show(800);
  // });
  //
  // $('#button2-2-right').click(function(event) {
  //   $('#wet-tunnel').hide(800);
  //   $('#cold-room').show(800);
  // });
  //
  // $('#button3-1-right').click(function(event) {
  //   $('#wet-tunnel-end').hide(800);
  //   $('#cold-room').show(800);
  // });
  //
  // $('#button3-2-return').click(function(event) {
  //   $('#cold-room').hide(800);
  //   $('#wet-tunnel-torch').show(800);
  //   window.game.getCurrentPlayer().inventory.push('Apples', 'Bread', 'Sling-Shot', 'Torch');
  //   window.game.getCurrentPlayer().displayInventory();
  // });
  //
  // $('#button3-3-left').click(function(event) {
  //   $('#wet-tunnel-torch').hide(800);
  //   $('#bat-room').show(800);
  //   window.game.getCurrentPlayer().changeHealth(-10);
  // });
  //
  // $('#button4-1-knife').click(function(event) {
  //   $('#bat-room').hide(800);
  //   $('#bat-room-knife').show(800);
  //   window.game.getCurrentPlayer().changeHealth(-10);
  // });
  //
  // $('#button4-1-sling').click(function(event) {
  //   $('#bat-room').hide(800);
  //   $('#bat-room-sling').show(800);
  // });
  //
  // $('#button4-2-tunnel').click(function(event) {
  //   $('#bat-room-sling').hide(800);
  //   $('#long-tunnel').show(800);
  // });
  //
  // $('#button4-3-sling').click(function(event) {
  //   $('#bat-room-knife').hide(800);
  //   $('#bat-room-sling').show(800);
  // });
  //
  // $('#button5-1-apples').click(function(event) {
  //   $('#long-tunnel').hide(800);
  //   $('#long-tunnel-end').show(800);
  //   window.game.getCurrentPlayer().changeHealth(10);
  //   window.game.getCurrentPlayer().removeInventory('Apples');
  // });
  //
  // $('#button5-1-bread').click(function(event) {
  //   $('#long-tunnel').hide(800);
  //   $('#long-tunnel-end').show(800);
  //   window.game.getCurrentPlayer().changeHealth(15);
  //   window.game.getCurrentPlayer().removeInventory('Bread');
  // });
  //
  // $('#button5-2-river').click(function(event) {
  //   $('#long-tunnel-end').hide(800);
  //   $('#river').show(800);
  // });
  //
  // $('#button5-2-stairs').click(function(event) {
  //   $('#long-tunnel-end').hide(800);
  //   $('#stairs').show(800);
  // });
  //
  // $('#return-river').click(function(event) {
  //   $('#long-tunnel-end').show(800);
  //   $('#stairs').hide(800);
  // });
  //
  // $('#feel').click(function(event) {
  //   $('#dark-stairs').show(800);
  //   $('#stairs').hide(800);
  // });
  //
  // $('#knife').click(function(event) {
  //   window.game.getCurrentPlayer().removeInventory('Knife');
  // });
  //
  // $('#blind').click(function(event) {
  //   $('#light-stairs').show(800);
  //   $('#dark-stairs').hide(800);
  // });
  //
  // $('#knife-fall').click(function(event) {
  //   $('#').show(800);
  //   $('#light-stairs').hide(800);
  // });
  //
  // $('#button6-1-search').click(function(event) {
  //   window.game.getCurrentPlayer().inventory.push('Key');
  //   window.game.getCurrentPlayer().displayInventory();
  //   $('#river').append("You found a Key!");
  // });
  //
  // $('#button6-1-boat').click(function(event) {
  //   $('#river').hide(800);
  //   $('#boat').show(800);
  // });
  //
  // $('#boat-open').click(function(event) {
  //   if (window.game.getCurrentPlayer().checkForItem("Key")){
  //     $('#boat').hide(800);
  //     $('#prison-cell').show(800);
  //   } else {
  //     alert("You need a key to enter the prison cell.");
  //     $('#boat').hide(800);
  //     $('#river').show(800);
  //   }
  // });
  //
  // $('#prison-cell-return').click(function(event) {
  //   window.game.getCurrentPlayer().inventory = window.game.getCurrentPlayer().inventory.push('Key');
  // });
}

$(document).ready(handleDocumentReady);
