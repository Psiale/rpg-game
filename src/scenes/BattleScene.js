import 'phaser';
import * as Utilities from '../helpers/utilities';
import * as localStorage from '../helpers/localStorage';
import * as Score from '../helpers/score';


export class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0)');
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
  }

  nextTurn() {
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      this.index++;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);

    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else {
      // else if its enemy unit
      // pick random hero
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[0]);
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({
        delay: 3000,
        callback: this.nextTurn,
        callbackScope: this,
      });
    }
  }

  checkEndBattle() {
    let victory = true;
    const heroe = this.heroes[0];
    const enemy = this.enemies[0];
    // if all enemies are dead we have VICTORY
    for (let i = 0; i < this.enemies.length; i++) {
      if (enemy.living) victory = false;
    }
    let gameOver = true;
    // If all heroes are dead we have GAMEOVER
    for (let i = 0; i < this.heroes.length; i++) {
      if (heroe.living) gameOver = false;
    }
    if (victory) {
      Score.add(enemy.points);
      Utilities.reduceNumberOfZones(localStorage.retrieveItem('numberOfZones'));
    }
    if (Utilities.checkZoneCount(localStorage.retrieveItem('numberOfZones')) || gameOver) {
      Score.updateUserAPIScore(localStorage.retrieveItem('userName'), localStorage.retrieveItem('score'));
      this.scene.remove('UI');
      this.scene.remove('Battle');
      this.scene.stop('World');
      this.scene.start('GameOver');
    }
    return victory || gameOver;
  }

  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i++) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep('UI');
    this.model = this.sys.game.globals.model;
    this.game.sound.stopAll();
    this.bgMusic = this.sound.add('worldMusic', { volume: 0.5, loop: true });
    this.bgMusic.play();
    // return to WorldScene and sleep current BattleScene
    this.scene.switch('World');
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }

  exitBattle() {
    this.scene.sleep('UI');
    this.scene.switch('World');
  }

  startBattle() {
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('battleNormal', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = false;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    let heroHP;
    (localStorage.retrieveItem('heroHp')) ? heroHP = localStorage.retrieveItem('heroHp') : heroHP = 200;
    // player character - hero
    const hero = new PlayerCharacter(
      this,
      322.5,
      450,
      'player_retro_fight',
      1,
      'Hero',
      heroHP,
      25,
    );
    this.add.existing(hero);

    const boss1 = new Enemy(this, 322.5, 150, 'boss1', null, 'Cutulhu', 50, 35, 1000);
    const boss2 = new Enemy(this, 322.5, 150, 'boss2', null, 'Saint Axolotl', 20, 10, 100);
    const boss3 = new Enemy(this, 322.5, 150, 'boss3', null, 'Bunny of Death', 30, 15, 800);
    const boss4 = new Enemy(this, 322.5, 150, 'boss4', null, 'Crazy Lizard', 80, 5, 500);
    const boss5 = new Enemy(this, 322.5, 150, 'boss5', null, 'Wiked Demon', 25, 8, 150);
    const boss6 = new Enemy(this, 322.5, 150, 'boss6', null, 'Toad', 20, 3, 10);


    const bossList = [
      boss1, boss2, boss3, boss4, boss5, boss6, boss1, boss3,
    ];

    const randomBoss = Utilities.randomElement(bossList, 0, bossList.length - 1);
    //  bossList[Phaser.Math.Between(0, bossList.length - 1)]

    this.add.existing(randomBoss);
    this.heroes = [hero];
    this.enemies = [randomBoss];
    this.units = this.heroes.concat(this.enemies);
    this.index = -1;
    this.scene.run('UI');
  }
}

// base class for heroes and enemies
const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize: function Unit(scene, x, y, texture, frame, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
    this.type = type;
    this.hp = hp;
    this.maxHp = this.hp;
    this.damage = damage; // default damage
    this.living = true;
    this.menuItem = null;
  },
  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
    this.menuItem = item;
  },

  // attack the target unit
  attack(target) {
    // checking on every attack if the type is the hero then updating the hp from localStorage
    if (target.type === 'hero' && localStorage.retrieveItem('heroHp')) target.hp = localStorage.retrieveItem('heroHp');
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit(
        'Message',
        `${this.type} attacks ${target.type} for ${this.damage} damage
        ${target.type} remaining life: ${target.hp}`,
      );
      // Saving the heros life so when the next battle is up the hero has and updated life
      if (target.type === 'Hero') localStorage.saveItem('heroHp', target.hp);
    }
  },

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  },
});

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage, points) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.points = points;
    this.setScale(1.5);
  },
});

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize: function PlayerCharacter(
    scene,
    x,
    y,
    texture,
    frame,
    type,
    hp,
    damage,
  ) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.setScale(1);
  },
});

// Menus start here

// The menu element (containers for enemy and hero options)
const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize: function MenuItem(x, y, text, scene) {
    Phaser.GameObjects.Text.call(this, scene, x, y, text, {
      color: '#ffffff',
      align: 'left',
      fontSize: 35,
    });
  },

  select() {
    this.setColor('#f8ff38');
  },

  deselect() {
    this.setColor('#ffffff');
  },

  unitKilled() {
    this.active = false;
    this.visible = false;
  },
});

// The actual container of that menu
const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize: function Menu(x, y, scene, heroes) {
    Phaser.GameObjects.Container.call(this, scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.x = x;
    this.y = y;
  },
  clear() {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  },
  remap(units) {
    this.clear();
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      unit.setMenuItem(this.addMenuItem(''));
    }
    this.menuItemIndex = 0;
  },
  addMenuItem(unit) {
    const menuItem = new MenuItem(
      0,
      this.menuItems.length * 20,
      unit,
      this.scene,
    );
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  },
  // moveSelectionUp: function () {
  //   this.menuItems[this.menuItemIndex].deselect();
  //   this.menuItemIndex--;
  //   if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
  //   this.menuItems[this.menuItemIndex].select();
  // },
  // moveSelectionDown: function () {
  //   this.menuItems[this.menuItemIndex].deselect();
  //   this.menuItemIndex++;
  //   if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
  //   this.menuItems[this.menuItemIndex].select();
  // },
  // select the menu as a whole and an element with index from it
  select(index) {
    if (!index) { index = 0; }
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) { this.menuItemIndex = 0; }
      if (this.menuItemIndex === index) { return; }
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  },
  // deselect this menu
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
    this.selected = false;
  },
  confirm() {
  },
});

// type of menus, heroes and enemies

const HeroesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function HeroesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
});

const ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function ActionsMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem('Attack(spacebar)');
  },
  confirm() {
    this.scene.events.emit('SelectedAction');
  },
});

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm() {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  },
});

// Message class

const Message = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize: function Message(scene, events) {
    Phaser.GameObjects.Container.call(this, scene, 160, 30);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x520C52, 0.3);
    graphics.strokeRect(200, 200, 200, 200);
    graphics.fillRect(200, 200, 200, 200);
    this.text = new Phaser.GameObjects.Text(scene, 300, 300, 'Fuck me', {
      color: '#ffffff',
      align: 'center',
      fontSize: 18,
      wordWrap: { width: 200, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on('Message', this.showMessage, this);
    this.visible = false;
  },
  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 3000,
      callback: this.hideMessage,
      callbackScope: this,
    });
  },
  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  },
});

// UIScene class
export class UIScene extends Phaser.Scene {
  constructor() {
    super('UI');
  }

  create() {
    this.battleScene = this.scene.get('Battle');
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x520C52, 1);
    // this.graphics.strokeRect(20, 600, 215, 100);
    // this.graphics.fillRect(20, 600, 215, 100);
    this.graphics.strokeRect(150, 600, 400, 100);
    this.graphics.fillRect(150, 600, 400, 100);
    // this.graphics.strokeRect(431, 600, 195, 100);
    // this.graphics.fillRect(431, 600, 195, 100);

    // menu adding
    // basic container to hold all menus
    this.menus = this.add.container();
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);
    this.heroesMenu = new HeroesMenu(0, 0, this);
    this.actionsMenu = new ActionsMenu(200.5, 630, this);
    this.enemiesMenu = new EnemiesMenu(0, 0, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);
    this.remapHeroes();
    this.remapEnemies();
    this.input.keyboard.on('keydown', this.onKeyInput, this);
    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);
    this.events.on('SelectedAction', this.onSelectedAction, this);
    this.events.on('Enemy', this.onEnemy, this);
    // when the scene receives wake event
    this.sys.events.on('wake', this.createMenu, this);

    this.createMenu();
    this.model = this.sys.game.globals.model;
    this.bgMusic = this.sound.add('battleNormal', { volume: 0.5, loop: true });
    this.bgMusic.play();
    this.model.bgMusicPlaying = false;
    this.sys.game.globals.bgMusic = this.bgMusic;

    this.battleScene.nextTurn();
  }

  remapHeroes() {
    const { heroes } = this.battleScene;
    this.heroesMenu.remap(heroes);
  }

  remapEnemies() {
    const { enemies } = this.battleScene;
    this.enemiesMenu.remap(enemies);
  }

  onKeyInput(event) {
    // this.currentMenu.confirm();
    if (event.code === 'Space' || event.code === 'ArrowLeft') {
      this.currentMenu.confirm();
    }
  }

  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onSelectedAction() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
  }

  createMenu() {
    this.remapHeroes();
    this.remapEnemies();
    this.battleScene.nextTurn();
  }
}
