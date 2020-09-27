let User = class {
  constructor(user_id) {
    this.user_id = user_id;
    this.name = null;
    this.age = null;
    this.sex = null;
    this.special = {
      strong: 0,
      agility: 0,
      wisdom: 0,
      charisma: 0,
      lack: 0
    };
    this.description = null;
    this.personality = null;
    this.biografy = null;
    this.armor = null;
    this.weapons = null;
    this.inventory = null;
    this.money = 0;
    this.pet = null;
    this.skills = {
      atlithic_s: 0,
      acrobatic_a: 0,
      hends_agility_a: 0,
      stealth_a: 0,
      reaction_a: 0,
      livestock_w: 0,
      insight_w: 0,
      medic_w: 0,
      mindfulness_w: 0,
      survival_w: 0,
      cheating_c: 0,
      intimidation: 0,
      perfomance_c: 0,
      conviction_c: 0,
      random_l: 0
    };
    this.abilities = null;
  }
};
module.exports = User;
