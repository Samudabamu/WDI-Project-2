GAImmersered.Game = function(game) {};

GAImmersered.Game.prototype = {
  //Create Game Handler
  create: function() {
    var worldSize = 550; //Edit Map Size
    this.game.world.setBounds(0, 0, worldSize, worldSize);
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width / 2, this.game.world.height / 2, 'tiles', 65); //Background Selector
    this.background.scale.setTo(2); //Background Scale
    this.player = this.generatePlayer(); //Generate Player
    this.game.camera.follow(this.player); //Camera Following Players
    this.generateObstacles(); //Generate Obstacles
    this.controls = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      spell: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }; // Set Controller
  },

  //Update Game Handler
  update: function() {
    this.playerHandler();
    this.collisionHandler();
  },

  //Game Function
  playerHandler: function() {
    if (this.player.alive) {
      this.playerMovementHandler();
      if (this.player.health > this.player.vitality) {
        this.player.health = this.player.vitality;
      }
    }
  },

  generatePlayer: function() {
    var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');
    player.animations.add('down', [
      3, 4, 5
    ], 10, true);
    player.animations.add('left', [
      15, 16, 17
    ], 10, true);
    player.animations.add('right', [
      27, 28, 29
    ], 10, true);
    player.animations.add('up', [
      39, 40, 41
    ], 10, true);
    player.animations.play('down');
    player.scale.setTo(2);
    this.game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true
    player.alive = true;
    player.name = 'Grant';
    player.speed = 125;
    player.invincibilityFrames = 500;
    player.invincibilityTime = 0;
    return player;
  },

  playerMovementHandler: function() {
    // Up-Left
    if (this.controls.up.isDown && this.controls.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.player.body.velocity.y = -this.player.speed;
      this.player.animations.play('left');
      // Up-Right
    } else if (this.controls.up.isDown && this.controls.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.player.body.velocity.y = -this.player.speed;
      this.player.animations.play('right');
      // Down-Left
    } else if (this.controls.down.isDown && this.controls.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.player.body.velocity.y = this.player.speed;
      this.player.animations.play('left');
      // Down-Right
    } else if (this.controls.down.isDown && this.controls.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.player.body.velocity.y = this.player.speed;
      this.player.animations.play('right');
      // Up
    } else if (this.controls.up.isDown) {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = -this.player.speed;
      this.player.animations.play('up');
      // Down
    } else if (this.controls.down.isDown) {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = this.player.speed;
      this.player.animations.play('down');
      // Left
    } else if (this.controls.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.player.body.velocity.y = 0;
      this.player.animations.play('left');
      // Right
    } else if (this.controls.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.player.body.velocity.y = 0;
      this.player.animations.play('right');
      // Still
    } else {
      this.player.animations.stop();
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
    }
  },

  //**SAM PLEASE SEE BELOW**

  //Stops Player from walking through objects
  collisionHandler: function() {
    this.game.physics.arcade.collide(this.obstacles, this.player, null, null, this);
  },

  //Generate Obstacles Group
  generateObstacles: function() {
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;
    this.generateObstacle();
  },

  //Generate Specific Obstacles
  generateObstacle: function() {
    obstacle = this.obstacles.create(200, 200, 'tiles');
    obstacle.animations.add('tree', [38], 0, true);
    obstacle.animations.play('tree');
    obstacle.scale.setTo(2);
    obstacle.body.moves = false;
    return obstacle;
  }
};
