function Game() {
  this.currentPlayer = null;
  this.rooms = [
    {
      name: 'entrance',
      messages: [
        'At long last you\'ve found the dungeon entrance of Flerb!',
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
          image: 'prison-cell.jpg'
        },
        {
          text: 'debug',
          roomName: 'win-screen',
          image: 'red-demon.png'
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
        'You duck into the damp and narrow tunnel, blindly squeezing your way through the tight turns, cold water dripping down your neck. You stumble out into a short corridor and at the end are two doors.',
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
          roomName: 'cold-room',
          image: 'breadApp.jpg'
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
          roomName: 'cold-room',
          image: 'breadApp.jpg'
        }
      ]
    },
    {
      name: 'cold-room',
      messages: [
        'You walk into a cold room with a torch burning on the wall. Your see a table with a Sling Shot, two apples, and half a loaf of bread on it.'
      ],
      buttons: [
        {
          text: 'Return To Corridor',
          validatesInventoryFor: 'Torch',
          roomNameSuccess: 'wet-tunnel-torch',
          roomNameFailure: 'wet-tunnel-end',
          image: 'torch2.png'
        },
        {
          text: 'Take Items',
          addsToInventory: [['Apples', 'Nutritious and delicious.'],
          ['Bread', 'A prison meal fit for vagabonds.'],
          ['Sling Shot', 'A great way to put an eye out!'],
          ['Torch', 'Get lit!']],
          alertMessage: 'Apples, bread, a sling shot, and a torch were added to your inventory.',
          hideButton: 'hideButton'
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
          healthVar: -20,
          roomName:'bat-room',
          image: 'bat.png'
        }
      ]
    },
    {
      name: 'bat-room',
      messages: [
        'You cautiously walk into the room with the torch held in front of you and are greeted with the sight of a giant ugly bat. It screeches loudly and dives at you, biting your face. You take 20 damage.',
      ],
      buttons: [
        {
          text: 'Attack With Sling Shot',
          roomName: 'bat-room-sling'
        },
        {
          text: 'Attack With Knife',
          roomName: 'bat-room-knife',
          healthVar: -20
        }
      ]
    },
    {
      name: 'bat-room-sling',
      messages: [
        'You load a marble into your Sling Shot and let it loose, striking the bat square between the eyes. It falls to the ground in a heap.',
        'With a sigh of relief, you look around the room and notice the opening of a tunnel on the opposite side.'
      ],
      buttons: [
        {
          text: 'Enter Tunnel',
          roomName: 'long-tunnel',
          image: 'breadApp.jpg'
        }
      ]
    },
    {
      name: 'bat-room-knife',
      messages: [
        'You strike with the knife missing the bat. It deals you 20 more damage.'
      ],
      buttons: [
        {
          text: 'Attack With Sling Shot',
          roomName: 'bat-room-sling'
        }
      ]
    },
    {
      name: 'long-tunnel',
      messages: [
        'This tunnel is longer than the ones before. As you walk you notice it has smooth uniform sides. You continue in an uninterrupted straight line for many hours.',
        'Your journey has left you feeling tired and weak.'
      ],
      buttons: [
        {
          text: 'Eat Apples For 15 Health',
          roomName: 'long-tunnel-end',
          healthVar: 15,
          removesFromInventory: 'Apples',
          image: 'waterfallRiver.jpg'
        },
        {
          text: 'Eat Bread For 20 Health',
          roomName: 'long-tunnel-end',
          healthVar: 20,
          removesFromInventory: 'Bread',
          image: 'waterfallRiver.jpg'
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
          roomName: 'river',
          image: 'boat.png'
        },
        {
          text: 'Climb Stairs',
          roomName: 'stairs',
          image: 'waterfallRiver.jpg'
        }
      ]
    },
    {
      name: 'stairs',
      messages: [
        'You pause before you taking your first step. Is that the sound of music? You can\'t be sure with the waterfall roaring just a few feet away, but your curiosity grows as you cautiously take each step. When you finally reach the top of the stairs your torch suddenly goes dark.'
      ],
      buttons: [
        {
          text: 'Feel Your Way Around',
          roomName: 'dark-stairs',
          image: '.png'
        },
        {
          text: 'Return To The River',
          roomName: 'river',
          image: '.png'
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
          removesFromInventory: 'Knife',
          image: '.png'
        },
      ]
    },
    {
      name: 'light-stairs',
      messages: [
        'With nothing to see through the darkness, your other senses take over. The music has grown even louder and the smell of wet fur takes hold of your nostrils. You clutch the handle of your knife desperately.',
        'Then the sense of falling, a sharp pain, a loud snap...nothing. Only darkness behind your eyelids.'
      ],
      buttons: [
        {
          text: 'Open Your Eyes',
          validatesInventoryFor: 'Apples',
          roomNameFailure: 'tomb-failure',
          roomNameSuccess: 'tomb-success',
          image: 'red-demon.png'
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
          roomName: 'tomb-shinigami',
        }
      ]
    },
    {
      name: 'tomb-failure',
      messages: [
        'Spots of sharp, bright light swim in your vision. Your knife lays on the ground just out of reach. A dark figure stands over you.',
        '"Do I smell apples?"',
        'As your vision clears, you find yourself gazing up into the dead-eyed grimace of a Shinigami, Lord of Death.',
        'The Shinigami begins to laugh, "I do smell apples! After all these decades trapped inside this wretched tomb. I\'d nearly forgot the smell if apples." He floats towards you with a massive claw extended.'
      ],
      buttons: [
        {
          text: 'Continue',
          roomName: 'tomb-failure-death'
        }
      ]
    },
    {
      name: 'tomb-failure-death',
      messages: [
        'As the Shinigami feasts on the partially digested apples in your stomach, your thoughts turn to the millions whose hopes depend on you, for they will surely perish now.'
      ],
      buttons: []
    },
    {
      name: 'tomb-shinigami',
      messages: [
        '"Nomnomnom...apples! I love apples!"',
        '"You gave me a way out of the Tomb and gave me apples. For your kindness, I will fly you out of here. What brought you to this place human?"',
        'As you tell the Shinigami about the people of your homeland you can sense his disinterest. Then you speak the name of the evil priest you were sent to defeat.',
        'The Shinigami laughs. "It seems we share a common enemy. I will have my revenge and you will help me, human."'
        ],
      buttons: [
        {
          text: 'Search Room',
          addsToInventory: [['Key', 'A regular old key.'], [ 'Knife', 'Aim the pointy end at an enemy, and thrust.'], ['Wand-of-Fire', 'Burn them!']],
          alertMessage: 'You found a key, knife, and the Wand-of-Fire!',
          hideButton: 'hideButton',
        },
        {
          text: 'Go With Shinigami',
          validatesInventoryFor: 'Wand-of-Fire',
          roomNameFailure: 'temple-entrance-failure',
          roomNameSuccess: 'temple-entrance-success',
        }
      ]
    },
    {
      name: 'temple-entrance-failure',
      messages: [
        'Less than an hour later, you arrive at the temple entrance of Flerbania. The Shinigami unceremoniously dumps you on the ground.',
        'Suddenly, a swirling purple portal opens up in front of you and your stomach drops as you recognize the person stepping out.',
        '"What is this?" Booms the Shinigami.',
        'The person before you is not a reflection, it\'s...YOU!',
        'You watch yourself reach for his knife and you grin. Not knowing where he came from or how, just knowing that you are unarmed and at his mercy. You scream as he darts forward.',
        'A moment later, blood lies at your feet. The Shinigami laughs.'
        ],
      buttons: []
    },
    {
      name: 'temple-entrance-success',
      messages: [
        'Less than an hour later, you arrive at the temple entrance of Flerbania. The Shinigami unceremoniously dumps you on the ground.',
        'Suddenly, a swirling purple portal opens up in front of you and your stomach drops as you recognize the person stepping out.',
        '"What is this?" Booms the Shinigami.',
        'The person before you is not a reflection, it\'s...YOU!'
        ],
      buttons: [
        {
          text: 'Talk To Yourself',
          roomName: 'temple-entrance3'
        },
        {
          text: 'Attack!',
          roomName: 'temple-entrance2',
          image: 'temple-door.jpg'
        }
      ]
    },
    {
      name: 'temple-entrance3',
      messages: [
        '"This was foretold by the Oracle of Flerm, but it does not have to be! We can end this now. Let us work together. With both our cunning there\'s no telling what we can accomplish."',
        '"I didn\'t cross dimensions to help save your universe. My people are counting on me. There can be only one."',
        'As he was talking you failed to notice his hands shift. Now it\'s too late...'
        ],
      buttons: []
    },
    {
      name: 'temple-entrance2',
      messages: [
        'You watch yourself reach for his knife and you grin. Not knowing where he came from or how, just knowing that you have the upper hand. You pull the Wand-of-Fire from your bag. A moment later nothing but ash lies at your feet. The Shinigami laughs.',
        'It doesn\'t feel good to watch yourself die. But it\'s not surprising that your quest spans multiple dimensions. The fate of millions rests in your hands. This was foretold. You know you are close to the end now.',
        'The Shinigami seems pleased at least. Hopefully he proves himself useful in the battle to come.',
        ],
      buttons: [
        {
          text: 'Enter Temple',
          roomName: 'temple',
          image: '.png'
        }
      ]
    },
    {
      name: 'temple',
      messages: [
        'An old man is hunched over the altar. He senses your presence but makes no perceptible movements.'
        ],
      buttons: [
        {
          text: 'Speak To Priest',
          roomName: 'temple-conversation',
          image: '.png'
        },
        {
          text: 'Attack!',
          roomName: 'temple-battle',
          image: '.png'
        }
      ]
    },
    {
      name: 'temple-conversation',
      messages: [
        '"You know why I\'m here, Priest! Hand over the sacred Flerbian texts!"',
        '"And what is he doing here?," the priest replies, gesturing at the Shinigami.',
        '"To eat your flesh and apples old man." Snarls the Shinigami.',
        '"You will never get the texts or my apples!"'
        ],
      buttons: [
        {
          text: 'Attack!',
          roomName: 'temple-battle',
          healthVar: -40,
          image: '.png'
        }
      ]
    },
    {
      name: 'temple-battle',
      messages: [
        'As you ready your weapon a burst of white light blast through the rood screen vaporizing the Shinigami leaving nothing left.',
        'You narrowly escape but are deeply wounded.',
        'You take 40 damage.'
        ],
      buttons: [
        {
          text: 'Attack With Sling Shot',
          roomName: 'temple-battle-sling',
          image: '.png'
        },
        {
          text: 'Attack With Knife',
          roomName: 'temple-battle-knife',
          image: '.png'
        },
        {
          text: 'Attack With Wand-of-Fire',
          roomName: 'temple-battle-fire',
          image: '.png'
        }
      ]
    },
    {
      name: 'temple-battle-sling',
      messages: [
        'You let fly a marble from your Sling Shot, striking the priest in the eye. He cries out in rage and agony, gripping his face. Seizing the moment, you dash to the altar and snatch the texts.',
        ],
      buttons: [
        {
          text: 'Escape With The Texts!!!',
          roomName: 'win-screen',
          image: 'army.jpg'
        },
      ]
    },
    {
      name: 'temple-battle-knife',
      messages: [
        'You throw the knife at the Priest, striking him in the heart. He slumps to the floor.',
        'You walk triumphantly to the altar and pickup the long-lost texts.'
        ],
      buttons: [
        {
          text: 'Leave With The Texts',
          roomName: 'win-screen',
          image: 'army.jpg'
        },
      ]
    },
    {
      name: 'temple-battle-fire',
      messages: [
        'You flick the Wand-of-Fire and a stream of flames engulfs the altar, burning everything to ashes.',
        'You\'ve realized your mistake too late. The sacred texts are gone. You have failed. In your grief you take your own life. The people of your homeland will surely perish now.'
      ],
      buttons: []
    },
    {
      name: 'win-screen',
      messages: [
        'At last, the sacred Flerbian Texts are yours! Now you can read the words of the Flerbinomicon out loud to raise a mindless undead army. Finally, you can bring the people of your homeland back to the living world to conquer all!',
        'The people of earth shall know no peace in their few remaining years. Soon the surface will be transformed and evil will rule supreme!'
      ],
      buttons: [
        {
          text: 'Try Again',
          roomName: 'entrance',
          image: 'cave-entrance.png'
        },
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
          addsToInventory: [['Skeleton Key', 'Key made of real bone!']],
          alertMessage: 'You found a key!',
          hideButton: 'hideButton',
        },
        {
          text: 'Board a rickety boat',
          roomName: 'boat',
          image: 'prison-cell.jpg'
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
          validatesInventoryFor: 'Skeleton Key',
          roomNameFailure: 'open-gate-failure',
          roomNameSuccess: 'prison-cell'
        }
      ]
    },
    {
      name: 'open-gate-failure',
      messages: [
        'You need a key to open this door.'
      ],
      buttons: [
        {
          text: 'Return To River',
          roomName: 'river',
          image: 'waterfallRiver.jpg'
        }
      ]
    },
    {
      name: 'prison-cell',
      messages: [
        'The door of the prison-cell creaks loudly as you swing it open. You see a pile of dusty old rags in the corner, chains hanging from the ceiling and a chest next to the pile of rags.',
        'As you walk toward the chest, the rags shudder and begin to rise slowly. It forms a looming body covered in loose pieces of torn cloth and skin.',
        'It lurches forward and claws at you.'
      ],
      buttons: [
        {
          text: 'Attack With Torch',
          roomName: 'prison-duel',
          image: 'zombie.png'
        },
        {
          text: 'Attack With Knife',
          roomName: 'prison-duel',
          alertMessage: 'Stab, stab, stabbing the undead is futile! Take 20 damage.',
          healthVar : -20,
          image: 'zombie.png',
          hideButton: 'hideButton'
        },
      ]
    },
    {
      name: 'prison-duel',
      messages: [
        'The shambling mound of rotten flesh ignites with howling agony. The acrid stench of burnt, rotting flesh churns your stomach. You compose yourself and approach the rusted treasure chest.',
      ],
      buttons: [
        {
          text: 'Search Chest',
          addsToInventory: [['Fancy Feast' , 'A Crystalline orb filled with ground fish chunks.']],
          alertMessage: 'You managed to grab the crystalline orb containing a feast most fancy.',
          hideButton: 'hideButton'
        },
        {
          text: 'Continue',
          roomName: 'Prison Pit',
          image: 'transUniverse.png'
        }
      ]
    },
    {
      name: 'Prison Pit',
      messages: [
        'The floor crumbles beneath you, dank darkness envelops you.',
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
        'After falling for what feels like an eternity, you notice a light shining in the distance. The pit in your stomach, and all your human senses are taken over by an otherworldly sense of calm, like floating on the surface of a pool. The light gets brighter as it moves closer, revealing a three legged cat. His skin hangs loosely from his body and mange has deprived him of fur in many places. The right side of his face is torn up around a large festering scar that runs diagonally across his right eye. His body is translucent and the shimmering blues and purples of the universe wash out the color of his fur, like an internet meme.'
      ],
      buttons: [
        {
          text: 'What are you?',
          roomName: 'Floating-Dream-Cont',
          image: 'princess.png'
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
          image: 'space.jpg'
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
          text: 'Let Princess Search Your Bag',
          validatesInventoryFor: 'Fancy Feast',
          removesFromInventory: ['Fancy Feast'],
          roomNameSuccess: 'Floating-Dream-Cont3',
          roomNameFailure: 'cat-eats-you',
          healthVar: 20,
          image: '.png'
        }
      ]
    },
    {
      name: 'cat-eats-you',
      messages: [
        'With no Fancy-Feast to offer, Princess turns his eye upon you. You don\'t dare move, you can\'t.',
        'It could be fear that\'s immobilized you, or it could be Princess, you\'re not sure.',
        'In a moment it doesn\'t matter. An immense pain ruptures from your belly and crashes into the back of your throat. You can taste blood. The knife falls from your hands as you crumple over in agonizing pain, then silence, like a fetus in the cold dark womb of space.'
      ],
      buttons: []
    },
    {
      name: 'Floating-Dream-Cont3',
      messages: [
        '\"Oh! a feast most fancy!\"',
        'Rivulets of spit fly from Princess as he attrociously devours his fancy feast, you realize the spit has a soothing effect, and your wounds are healed. 20 health restored.'
      ],
      buttons: [
        {
          text: 'Beg Princess for help',
          roomName: 'Floating-Dream-Cont4',
          image: '.png'
        },
        {
          text: 'You are faster than a pussy cat, KILL KILL KILL!',
          roomName: 'catFight',
          image: '.png'
        }
      ]
    },
    {
      name: 'Floating-Dream-Cont4',
      messages: [
        'Imploringly, you fall to your knees and beg \"Princess, millions of people are depending on me to save them. will you free me from the Flerbosphere and grant me the power to deliver them to their final resting place?\"',
        '\"Very well!\"',
        'With the flick of his stump, Princess fades into the constellations and millions of white mice crawl out of the ether beneath your feet. They swarm around your body until the weight of their numbers pulls you down into the darkness.'
      ],
      buttons: [
        {
          text: 'Open your eyes',
          roomName: 'dark-stairs2',
          image: '.png'
        }
      ]
    },
    {
      name: 'dark-stairs2',
      messages: [
        'You can\'t see through the darkness, but you have the sense of a floor beneath you feet and the faint sound of music in the distance.',
        'You reach your hands out and run them along the smooth walls that now contain you.',
        'You can hear feet shuffling ahead of you, but you\'re not sure how and a growing sense of danger consumes you.'
      ],
      buttons: [
        {
          text: 'Take Out Your Knife',
          roomName: 'light-stairs',
          removesFromInventory: 'Knife',
          image: '.png'
        },
      ]
    },
    {
      name: 'catFight',
      messages: [
        'Immediately upon pulling out your knife, Princess turns his eye upon you. You don\'t dare move, you can\'t.',
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
    $('#'+button.hideButton).hide(800);
  }

  if (button.alertMessage) {
    $('#messageDiv').empty();
    $('#messageDiv').append('<h4>'+button.alertMessage+'</h4>');
    $('#messageDiv').show(800);
    return;
  }

  if (button.image) {
    $('#storyImages').fadeOut(800, 'swing', function() {
      $('#storyImages').append('<img src="img/'+button.image+'">');
      $('#storyImages img:first-child').remove();
      $('#storyImages').fadeIn(800);
    });
  }

  this.goToRoom(roomToGoTo);
};

Game.prototype.goToRoom = function(roomName) {
  window.$('#messageDiv').hide(800);
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
      $('#storyImages').prepend('<img src="img/death.png">');
      $("#storyImages img:last-child").remove();
    }
  };

function Player() {
  this.inventory = [['Knife', 'A rusty knife.'], ['Teeth', 'Billy\'s lucky bag of teeth.']];
  this.health = 90;
}

Player.prototype.displayInventory = function() {
  $('#player-inventory').empty();
  for (var i = 0; i < this.inventory.length; i++) {
    $('#player-inventory').append('<li>' + '<a href="#" data-toggle="tooltip" title="' + this.inventory[i][1] + '">'+this.inventory[i][0]+'</a></li>');
  }
};

Player.prototype.removeInventory = function(item) {
	for (var i = 0; i < this.inventory.length; i++) {
    for (var j = 0; j < this.inventory[i].length; j++) {
      if(this.inventory[i][j] === item) {
        this.inventory.splice(i, 1);
      }
    }
  }
};

Player.prototype.checkForItem = function(item) {
  for (var i = 0; i < this.inventory.length; i++) {
    if (this.inventory[i][0] === item) {
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
  $('#healthBar').attr({'style' : 'width:' +this.health+ '%'});
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

  $('.try-again-end').click(function() {
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

$(document).ready(function() {
  handleDocumentReady();
  $('[data-toggle="tooltip"]');
});
