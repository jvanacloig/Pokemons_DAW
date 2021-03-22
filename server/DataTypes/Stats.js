var hp;
var attack;
var defense;
var special_attack;
var special_defense;
var speed;

function Stats(hp, attack, defense, special_attack, special_defense, speed) {
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.special_attack = special_attack;
    this.special_defense = special_defense;
    this.speed = speed;
}
exports.Stats = Stats;