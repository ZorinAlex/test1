var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'test1', { preload: preload, create: create, update: update });

let ship;
let weapon;
let keys;
let fire;
let emitter;

function preload ()
{
    this.load.image('sky', 'assets/sky.jpg');
    this.load.image('moon', 'assets/moon.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('fire', 'assets/fire.png');
}

function create ()
{

    this.add.image(0, 0, 'sky').scale.set(1.5);
    let moon = this.add.image(20, 20, 'moon');
    moon.anchor.set(0.5);
    moon.scale.set(0.5);
    ship = this.add.sprite(550, 500, 'ship');
    weapon = game.add.weapon(100, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletAngleOffset = 90;
    weapon.bulletSpeed = 400;
    weapon.fireRate = 60;
    weapon.bulletSpeedVariance = 200;

    weapon.trackSprite(ship, 47, 10);
    keys = this.input.keyboard.createCursorKeys();
    fire = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.physics.arcade.enable(ship);
    game.physics.arcade.enableBody(ship);
    ship.body.collideWorldBounds = true;

    emitter = this.add.emitter(0, 0, 50);
    emitter.makeParticles('fire');
    ship.addChild(emitter);
    emitter.y = 160;
    emitter.x = 48;
    emitter.setAlpha(0.3, 0.8);
    emitter.lifespan = 150;
    emitter.gravity = 2000;

}

function update ()
{
    emitter.emitParticle();
    ship.body.velocity.x = 0;

    if (keys.left.isDown)
    {
        ship.body.velocity.x = -200;
    }
    else if (keys.right.isDown)
    {
        ship.body.velocity.x = 200;
    }

    if (fire.isDown)
    {
        weapon.fire();
    }
}
