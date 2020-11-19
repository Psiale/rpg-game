import "phaser";

export class BattleScene extends Phaser.Scene {
  constructor() {
    super("Battle");
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      322.5,
      450,
      "player_retro_fight",
      1,
      "Warrior",
      100,
      20
    );
    this.add.existing(warrior);

    const boss1 = new Enemy(this, 322.5, 150, "boss1", null, "Ancient", 50, 3);
    this.add.existing(boss1);
    this.heroes = [warrior];
    this.enemies = [boss1];
    this.units = this.heroes.concat(this.enemies);
    console.log(this.units);
    this.index = -1;
    this.scene.launch("UI");
  }
  nextTurn() {
    this.index++;
    // if there are no more units, we start again from the first one
    if (this.index >= this.units.length) {
      this.index = 0;
    }
    if (this.units[this.index]) {
      // if its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        console.log("un jugador esta jugando");
        this.events.emit("PlayerSelect", this.index);
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
  }

  receivePlayerSelection(action, target) {
    console.log(`esta es la accion ${action} y este es el target ${target}`);
    if (action == "attack") {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
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

  // attack the target unit
  attack(target) {
    target.takeDamage(this.damage);
    this.scene.events.emit(
      "Message",
      `${this.type} attacks ${target.type} for ${this.damage} damage`
    );
    console.log("Estoy enviando el mensaje de ataque");
  },

  takeDamage(damage) {
    this.hp -= damage;
  },
});

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.setScale(2);
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
    damage
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
      color: "#ffffff",
      align: "left",
      fontSize: 35,
    });
  },

  select: function () {
    this.setColor("#f8ff38");
  },

  deselect: function () {
    this.setColor("#ffffff");
  },
});

// The actual container of that menu
const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize: function Menu(x, y, scene, heroes) {
    Phaser.GameObjects.Container.call(this, scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
  },
  clear: function () {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  },
  remap: function (units) {
    this.clear();
    for (let i = 0; i < units.length; i++) {
      let unit = units[i];
      this.addMenuItem('');
    }
    console.log(this.menuItems);
  },
  addMenuItem: function (unit) {
    const menuItem = new MenuItem(
      0,
      this.menuItems.length * 20,
      unit,
      this.scene
    );
    this.menuItems.push(menuItem);
    this.add(menuItem);
  },
  moveSelectionUp: function () {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex--;
    if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    this.menuItems[this.menuItemIndex].select();
  },
  moveSelectionDown: function () {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex++;
    if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    this.menuItems[this.menuItemIndex].select();
  },
  // select the menu as a whole and an element with index from it
  select: function (index) {
    if (!index) index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    this.menuItems[this.menuItemIndex].select();
  },
  // deselect this menu
  deselect: function () {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  },
  confirm: function () {
    // wen the player confirms his slection, do the action
    alert("testing");
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
    this.addMenuItem("Attack");
  },
  confirm: function () {
    this.scene.events.emit("SelectEnemies");
    console.log("cuando presionan space esto sucede");
  },
});

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm: function () {
    this.scene.events.emit("Enemy", this.menuItemIndex);
  },
});

// Message class

var Message = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize: function Message(scene, events) {
    Phaser.GameObjects.Container.call(this, scene, 160, 30);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(100, 100, 180, 30);
    graphics.fillRect(100, 100, 180, 30);
    this.text = new Phaser.GameObjects.Text(scene, 200, 200, "Fuck me", {
      color: "#ffffff",
      align: "center",
      fontSize: 13,
      wordWrap: { width: 160, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on("Message", this.showMessage, this);
    this.visible = false;
  },
  showMessage: function (text) {
    this.text.setText(text);
    console.log(`este es el texto en showMessage: ${text}`);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.hideMessage,
      callbackScope: this,
    });
  },
  hideMessage: function () {
    this.hideEvent = null;
    this.visible = false;
  },
});

// UIScene class
export class UIScene extends Phaser.Scene {
  constructor() {
    super("UI");
  }

  create() {
    this.battleScene = this.scene.get("Battle");
    console.log(this.battleScene);
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    // this.graphics.strokeRect(20, 600, 215, 100);
    // this.graphics.fillRect(20, 600, 215, 100);
    this.graphics.strokeRect(116, 600, 400, 100);
    this.graphics.fillRect(116, 600, 400, 100);
    // this.graphics.strokeRect(431, 600, 195, 100);
    // this.graphics.fillRect(431, 600, 195, 100);

    // menu adding
    // basic container to hold all menus
    this.menus = this.add.container();
    this.message = new Message(this, this.battleScene.events);
    console.log(`este es el mensaje ${this.message}`);
    this.add.existing(this.message);
    this.heroesMenu = new HeroesMenu(0, 0, this);
    this.actionsMenu = new ActionsMenu(280.5, 600, this);
    this.enemiesMenu = new EnemiesMenu(0, 0, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);
    this.remapHeroes();
    this.remapEnemies();
    this.input.keyboard.on("keydown", this.onKeyInput, this);
    this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
    this.events.on("SelectEnemies", this.onSelectEnemies, this);
    this.events.on("Enemy", this.onEnemy, this);
    this.battleScene.nextTurn();
  }
  remapHeroes() {
    const heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  }
  remapEnemies() {
    const enemies = this.battleScene.enemies;
    this.enemiesMenu.remap(enemies);
  }

  onKeyInput(event) {
      this.currentMenu.confirm();
      if (event.code === "Space" || event.code === "ArrowLeft") {
        this.currentMenu.confirm();
      }
    console.log("im workin");
  }

  onPlayerSelect(id) {
    console.log(`player ${id}`);
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onSelectEnemies() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
    console.log(
      `cuando presionan espace esta funcion se dispara: ${this.enemiesMenu.select(
        0
      )}`
    );
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection("attack", index);
  }
}
