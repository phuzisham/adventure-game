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
        },
        {
          text: 'debuggs',
          roomName: 'Floating-Dream-Cont3',
        }
      ]
    },
    {
      name: 'death1',
      messages: [
        'Moments after entering the ground gives way beneath your feet and you fall to your death. The people of your homeland will surely perish now.'
      ],
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
    },
    {
      name: 'wet-tunnel-torch',
      messages: [
        'Now that you have the torch you can continue on your journey.'
      ],
      buttons: [
        {
          text: 'Left Door',
          roomName: 'bat-room',
          healthVar: -10
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
          roomName: 'bat-room-knife',
          healthVar: -10
        }
      ]
    },
    {
      name: 'bat-room-sling',
      messages: [
        'You load a marble into your sling-shot and let it loose, striking the bat square between the eyes. It falls to the ground in a heap.',
        'You look around the room and notice the opening of a tunnel on the opposite side.'
      ],
      buttons: [
        {
          text: 'Enter Tunnel',
          roomName: 'long-tunnel'
        }
      ]
    },
    {
      name: 'bat-room-knife',
      messages: [
        'You strike with the knife missing the bat. It deals you 10 more damage.'
      ],
      buttons: [
        {
          text: 'Attack With Sling-Shot',
          roomName: 'bat-room-sling'
        }
      ]
    },
    {
      name: 'long-tunnel',
      messages: [
        'This tunnel is longer than the ones before. As you walk you notice it has smooth uniform sides. You continue in an uninterupted straight line for many hours.',
        'Your journey has left you feeling tired and weak.'
      ],
      buttons: [
        {
          text: 'Eat Apples',
          roomName: 'long-tunnel-end',
          healthVar: 10,
          removesFromInventory: 'Apples'
        },
        {
          text: 'Eat Bread',
          roomName: 'long-tunnel-end',
          healthVar: 15,
          removesFromInventory: 'Bread'
        }
      ]
    },
    {
      name: 'long-tunnel-end',
      messages: [
        'Your health has been replenished!',
        'You exit the long tunnel into a great cavern with a waterfall flowing into a small river. You see a staircase carved into the cliffside leading to the top of the waterfall.'
      ],
      buttons: [
        {
          text: 'Follow River',
          roomName: 'river'
        },
        {
          text: 'Climb Stairs',
          roomName: 'stairs'
        }
      ]
    },
    {
      name: 'stairs',
      messages: [
        'Before you take your first step you pause for a moment. Is that the sound of music you hear? You can\'t be sure, because the waterfall is roaring just a few feet away, but your curiosity grows as you cautiously take each step. When you finally reach the top of the stairs your torch immediately goes dark.'
      ],
      buttons: [
        {
          text: 'Feel Your Way Around',
          roomName: 'dark-stairs'
        },
        {
          text: 'Return To The River',
          roomName: 'river'
        }
      ]
    },
    {
      name: 'dark-stairs',
      messages: [
        'Panic stricken, you run your hands over the smooth walls, searching for the familiar feeling of a cold brass door handle. Nothing.',
        'You can hear feet shuffling ahead of you, but you\'re not sure how, since you never found your way out of the staircase.'
      ],
      buttons: [
        {
          text: 'Take Out Your Knife',
          roomName: 'light-stairs',
          removesFromInventory: 'Knife'
        },
      ]
    },
    {
      name: 'light-stairs',
      messages: [
        'With nothing to see through the darkness to indicate the entrance of the staircase, your other senses take over. The music has grown even louder and the smell of wet fir takes hold of your nostrils.',
        'The sense of falling, a sharp pain, a loud snap, then nothing. Only darkness behind your eyelids.'
      ],
      buttons: [
        {
          text: 'Open Your Eyes',
          validatesInventoryFor: 'Apples',
          roomNameFailure: 'tomb-failure',
          roomNameSuccess: 'tomb-success',
        }
      ]
    },
    {
      name: 'tomb-success',
      messages: [
        'Spots of sharp, bright light swim in your vision. Your knife lays on the ground just out of reach. A dark figure stands over you.',
        '"Do I smell apples?"',
        'As your vision clears, you find yourself gazing up into the dead-eyed grimace of a Shinigami, Lord of Death.'
        ],
      buttons: [
        {
          text: 'Give Apples',
          removesFromInventory: 'Apples',
          roomName: 'tomb-shinigami'
        }
      ]
    },
    {
      name: 'tomb-failure',
      messages: [
        'Spots of sharp, bright light swim in your vision. Your knife lays on the ground just out of reach. A dark figure stands over you.',
        '"Do I smell apples?"',
        'As your vision clears, you find yourself gazing up into the dead-eyed grimace of a Shinigami, Lord of Death.',
        'The Shinigami begins to laugh, "I do smell apples! After all these decades trapped inside this wretched tomb. I\'d nearly forgot the smell if apples." He floats towards you with a massive claw extended.',
        'As the Shinigami feasts on the partially digested apples in your stomach, your thoughts turn to the millions whose hopes depend on you, for they will surely perish now.'
      ],
      buttons: []
    },
    {
      name: 'tomb-shinigami',
      messages: [
        '"Nomnomnom...apples! I love apples! After all these decades trapped inside this wretched tomb, and now I\'m munching on delicious apples!"',
        '"You showed me a way out of the Tomb and gave me apples. For your kindness, I will fly you out of here. What brought you to this place human?"',
        'As you tell the Shinigami about the people of your homeland you can sense his dis-intereset. Then you speak the name of the evil priest you were sent to defeat.',
        'The Shinigami laughs. "It seems we share a common enemy. I will have my revenge and you will help me, human."'
        ],
      buttons: [
        {
          text: 'Search Room',
          addsToInventory: ['Key', 'Knife', 'Wand-of-Fire'],
          alertMessage: 'You found a key, knife, and the Wand-of-Fire!',
        },
        {
          text: 'Go With Shinigami',
          roomName: 'upper-stairs',
        }
      ]
    },
    {
      name: 'river',
      messages: [
        'Following the river you approach a lovely, placid pool.',
        'Across the pool a looming Prison gate beckons.',
        'Something gleams from within the sand of the shoreline.',
        'A small boat engraved with, "Riki-tee" is anchored here.'
      ],
      buttons: [
        {
          text: 'Search The Shoreline',
          roomName: 'searched river',
          addsToInventory: ['Key'],
          alertMessage: 'You found a key!',
          hideButton: 'hideButton'
        },
        {
          text: 'Board a rickety boat',
          roomName: 'boat'
        },
      ]
    },
    {
      name: 'boat',
      messages: [
        'The boat is shabby, but it holds together. You row across the pool and ascend the small embankment to the prison cell gate.'
      ],
      buttons: [
        {
          text: 'Open Gate',
          roomName: 'prison-cell',
        },
        {
          text: 'Return',
          roomName: 'river'
        },
      ]
    },
    {
      name: 'prison-cell',
      messages: [
        'The door of the prison-cell creaks loudly as you swing it open. You see a pile of dusty old rags in the corner, chains hanging from the ceiling and a chest next to the pile of rags.',
        'As you walk toward the chest, the rags shudder and begin to rise slowly. It forms a body covered in loose pieces of torn cloth and skin with a wide, skeleton grin on it\'s grizzly face.',
        'It lurches forward and claws at you.'
      ],
      buttons: [
        {
          text: 'Attack With Torch',
          roomName: 'prison-duel',
        },
        {
          text: 'Attack With Knife',
          roomName: 'prison-duel',
          alertMessage: 'Stab, stab, stabbing the undead is futile! And then he bit you!',
          healthVar : -15
        },
      ]
    },
    {
      name: 'prison-duel',
      messages: [
        'The shambling mound of rotten flesh ignites with howling agony. The acrid stench of burnt, rotting flesh churns your stomach. Composing yourself you\'re able to approach the rusted treasure chest.',

      ],
      buttons: [
        {
          text: 'Search Chest',
          roomName: 'Prison Pit',
          addsToInventory: ['Fancy Feast']
        },
      ]
    },
    {
      name: 'Prison Pit',
      messages: [
        'The floor crumbles beneath you, dank darkness envelops you. Luckily, you managed to grab the crystalline orb containing a feast most fancy.',
      ],
      buttons: [
        {
          text: 'Continue Falling?',
          roomName: 'Floating-Dream',
        },
      ]
    },
    {
      name: 'Floating-Dream',
      messages: [
        'After falling for what feels like an eternity, you notice a light shining in the distance. The pit in your stomach, and all your human senses are taken over by an otherworldly sense of calm, like floating on the surface of a pool. The light gets brighter as it moves closer, revealing a three legged cat. His skin hangs loosely from his body, and mange has deprived him of fur in many places. The right side of his face is torn up around a large festering scar that runs diagonally across his right eye. His body is translucent and the shimmering blues and purples of the universe wash the color of his fur, like an internet meme.'
      ],
      buttons: [
        {
          text: 'What are you?',
          roomName: 'Floating-Dream-Cont',
          healthVar : +5
        },
      ]
    },
    {
      name: 'Floating-Dream-Cont',
      messages: [
        '\"I am Princess.\"'
      ],
      buttons: [
        {
          text: 'Where have you taken me?',
          roomName: 'Floating-Dream-Cont2',
        },
      ]
    },
    {
      name: 'Floating-Dream-Cont2',
      messages: [
        '\"You are in the Flerbosphere. Proverbial catnip of the universe...I will grant you all of your desires and release you from this captivity, but I require an offering first.\"'
      ],
      buttons: [
        {
          text: 'Marbles',
          roomName: 'Floating-Dream-Cont3',
          removesFromInventory: ['Marbles'],
          alertMessage: 'Too round!'
        },
        {
          text: 'Key',
          roomName: 'Floating-Dream-Cont3',
          removesFromInventory: ['Key'],
          alertMessage: ' Gods have no use for early things!'
        },
        {
          text: 'Fancy Feast',
          removesFromInventory: ['Fancy Feast'],
          roomName: 'Floating-Dream-Cont3',
          removesFromInventory: 'Fancy Feast'
        },
      ]
    },
    {
      name: 'Floating-Dream-Cont3',
      messages: [
        '\"Oh! a feast most fancy!\"',
        'Rivulets of spit are flung from Princess as he attrociously devours his fancy feast, you realize the spit has a soothing effect, and your wounds are healed. He must be pleased with you now.',
        'Imploringly, you fall to your knees and beg \"Princess, millions of people are depending on me to save them. will you free me from the Flerbosphere and grant me the power to deliver them to their final resting place?\"',
        '\"...\"'
      ],
      buttons: [
        {
          text: 'Beg Princess for help',
          roomName: 'Floating-Dream-Cont4'
        },
        {
          text: 'You are faster than a pussy cat, KILL KILL KILL!',
          roomName: 'catFight'
        }
      ]
    },
    {
      name: 'Floating-Dream-Cont4',
      messages: [
        '\"Very well!\"',
        'With the flick of his stump, Princess fades into the constellations and millions of white mice crawl out of the ether beneth your feet, swarming around your body until the weight of their numbers pulls you down into the darkness.'
      ],
      buttons: [
        {
          text: 'Open your eyes',
          roomName: 'dark-stairs',
        }
      ]
    },
    {
      name: 'catFight',
      messages: [
        'Immediatly upon pulling out your knife, Princess turns his eye upon you. You don\'t dare move, you can\'t.',
        'It could be fear that\'s immobilized you, or it could be Princess, you\'re not sure.',
        'In a moment it doesn\'t matter. An immense pain ruptures from your belly and crashes into the back of your throat. You can taste blood. The knife falls from your hands as you crumple over in agonizing pain, then silence, like a fetus in the cold dark womb of space.'
      ],
      buttons: [],
    },
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

  if (button.healthVar) {
    this.getCurrentPlayer().changeHealth(button.healthVar);
  }

  if (button.removesFromInventory) {
    this.getCurrentPlayer().removeInventory(button.removesFromInventory);
    this.getCurrentPlayer().displayInventory();
  }

  if (button.hideButton) {
    console.log('buttonbottobnhodfi');
    $('#'+button.hideButton).hide(800);
  }

  if (button.alertMessage) {
    $('.messages').append(button.alertMessage);
    return;
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
        return memo + "<button id=" + button.hideButton + " class='btn' data-button='"+ JSON.stringify(button) +"'>" + button.text + "</button>";
      }, '');
      window.$('#story .button-group').show(800);
    });

  } else {
    window.$('.button-group').empty(800);
    window.$('.try-again').show(800);
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
}

$(document).ready(handleDocumentReady);
