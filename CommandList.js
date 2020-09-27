const User = require("./User.js");
const fs = require("fs");

let CommandList = class {
    constructor(userData) {
        this.userData = userData;
    }
    Test() {
        return "down";
    }

    Cmd(context) {
        let user_id = context.message.from_id;
        let text = context.message.text.split(" ");
        if (text[0] != "Команда") {
            return null;
        }
        let answer = null;
        if (text[1] == "рандом") {
            if (text.length > 3) {
                answer = GetRandomNumbers(text[3], text[2]);
            } else if (text.length == 3) {
                answer = GetRandomNumbers(text[2]);
            }
        }
        if (text[1] == "регистрация") {
            answer = UsersList(user_id, this.userData);
        }
        let index = GetDataUser(user_id, this.userData);
        if (index == null) {
            return "Вы еще не зарегистрировались";
        }
        if (text[1] == "инфо" || text[1] == "инфа") {
            index = GetDataUser(user_id, this.userData);
            answer = "Параметры персонажа:";
            for (let i = 2; i < text.length; i++) {
                if (text[i] == "ФИО") {
                    answer = addStroke(answer, GetName(index, this.userData), 1);
                }
                if (text[i] == "Возраст") {
                    answer = addStroke(answer, GetAge(index, this.userData), 1);
                }
                if (text[i] == "Пол") {
                    answer = addStroke(answer, GetSex(index, this.userData), 1);
                }
                if (text[i] == "Характеристики") {
                    answer = addStroke(answer, GetSpecial(index, this.userData), 1);
                }
                if (text[i] == "Описание") {
                    answer = addStroke(answer, GetDescription(index, this.userData), 1);
                }
                if (text[i] == "Характер") {
                    answer = addStroke(answer, GetPersonality(index, this.userData), 1);
                }
                if (text[i] == "Биография") {
                    answer = addStroke(answer, GetBiografy(index, this.userData), 1);
                }
                if (text[i] == "Броня") {
                    answer = addStroke(answer, GetArmor(index, this.userData), 1);
                }
                if (text[i] == "Оружие") {
                    answer = addStroke(answer, GetWeapons(index, this.userData), 1);
                }
                if (text[i] == "Инвентарь") {
                    answer = addStroke(answer, GetInventory(index, this.userData), 1);
                }
                if (text[i] == "Деньги") {
                    answer = addStroke(answer, GetMoney(index, this.userData), 1);
                }
                if (text[i] == "Питомец") {
                    addStroke(answer, GetPet(index, this.userData), 1);
                }
                if (text[i] == "Навыки") {
                    answer = addStroke(answer, GetSkills(index, this.userData), 1);
                }
                if (text[i] == "Способности") {
                    answer = addStroke(answer, GetAbilities(index, this.userData), 1);
                }
            }
        }

        if (text[1] == "запись") {
            if (text[2] == "ФИО") {
                this.userData[index].name = "";
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].name = addStroke(
                        this.userData[index].name,
                        text[i]
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].name = "";
                }
                answer = "Имя установлено";
            }
            if (text[2] == "Возраст") {
                this.userData[index].age = text[3];
                if (text[3] == "удалить") {
                    this.userData[index].age = "";
                }
                answer = "Возраст установлен";
            }
            if (text[2] == "Пол") {
                this.userData[index].sex = text[3];
                if (text[3] == "удалить") {
                    this.userData[index].sex = "";
                }
                answer = "Пол установлен";
            }
            if (text[2] == "Характеристики") {
                answer = '';
                for (let i = 3; i < 13; i = i + 2) {
                    if (text[i] == "Сила") {
                        this.userData[index].special.strong = text[i + 1];
                        answer = addStroke(answer, "Сила установлена", 1);
                    }
                    if (text[i] == "Ловкость") {
                        this.userData[index].special.agility = text[i + 1];
                        answer = addStroke(answer, "Ловкость установлена", 1);
                    }
                    if (text[i] == "Мудрость") {
                        this.userData[index].special.wisdom = text[i + 1];
                        answer = addStroke(answer, "Мудрость установлена", 1);
                    }
                    if (text[i] == "Харизма") {
                        this.userData[index].special.charisma = text[i + 1];
                        answer = addStroke(answer, "Харизма установлена", 1);
                    }
                    if (text[i] == "Удача") {
                        this.userData[index].special.lack = text[i + 1];
                        answer = addStroke(answer, "Удача установлена", 1);
                    }
                }
            }
            if (text[2] == "Описание") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].description = addStroke(
                        this.userData[index].description,
                        text[i]
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].description = "";
                }
                answer = "Описание установлено";
            }
            if (text[2] == "Характер") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].personality = addStroke(
                        this.userData[index].personality,
                        text[i]
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].personality = "";
                }

                answer = "Характер установлен";
            }
            if (text[2] == "Биография") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].biografy = addStroke(
                        this.userData[index].biografy,
                        text[i]
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].biografy = "";
                }

                answer = "Биография установлена";
            }
            if (text[2] == "Броня") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].armor = addStroke(
                        this.userData[index].armor,
                        text[i],
                        1
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].armor = "";
                }

                answer = "Броня установлена";
            }
            if (text[2] == "Оружие") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].weapons = addStroke(
                        this.userData[index].weapons,
                        text[i],
                        1
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].weapons = "";
                }

                answer = "Оружие установлена";
            }
            if (text[2] == "Инвентарь") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].inventory = addStroke(
                        this.userData[index].inventory,
                        text[i],
                        1
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].inventory = "";
                }

                answer = "Инвентарь установлен";
            }
            if (text[2] == "Деньги") {
                this.userData[index].money =
                    parseFloat(this.userData[index].money) + parseFloat(text[3]);
                answer = "Деньги установлены";
                if (text[3] == "удалить") {
                    this.userData[index].money = 0;
                    answer = "Деньги удалены";
                }
            }
            if (text[2] == "Питомец") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].pet = addStroke(
                        this.userData[index].pet,
                        text[i]
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].pet = "";
                }
                answer = "Питомец установлен";
            }
            if (text[2] == "Навыки") {
                for (let i = 3; i < 33; i = i + 2) {
                    if (text[i] == "Атлетика") {
                        this.userData[index].skills.atlithic_s = text[i + 1];
                        answer = addStroke(answer, "Атлетика установлена", 1);
                    }
                    if (text[i] == "Акробатика") {
                        this.userData[index].skills.acrobatic_a = text[i + 1];
                        answer = addStroke(answer, "Акробатика установлена", 1);
                    }
                    if (text[i] == "Ловкость_рук") {
                        this.userData[index].skills.hends_agility_a = text[i + 1];
                        answer = addStroke(answer, "Ловкость рук установлена", 1);
                    }
                    if (text[i] == "Скрытность") {
                        this.userData[index].skills.stealth_a = text[i + 1];
                        answer = addStroke(answer, "Скрытность  установлена", 1);
                    }
                    if (text[i] == "Реакция") {
                        this.userData[index].skills.reaction_a = text[i + 1];
                        answer = addStroke(answer, "Реакция  установлена", 1);
                    }
                    if (text[i] == "Обращение_с_животными") {
                        this.userData[index].skills.livestock_w = text[i + 1];
                        answer = addStroke(answer, "Обращение с животными установлено", 1);
                    }
                    if (text[i] == "Проницательность") {
                        this.userData[index].skills.insight_w = text[i + 1];
                        answer = addStroke(answer, "Проницательность установлена", 1);
                    }
                    if (text[i] == "Медицина") {
                        this.userData[index].skills.medic_w = text[i + 1];
                        answer = addStroke(answer, "Медицина установлена", 1);
                    }
                    if (text[i] == "Внимательность") {
                        this.userData[index].skills.mindfulness_w = text[i + 1];
                        answer = addStroke(answer, "Внимательность установлена", 1);
                    }
                    if (text[i] == "Выживание") {
                        this.userData[index].skills.survival_w = text[i + 1];
                        answer = addStroke(answer, "Выживание установлено", 1);
                    }
                    if (text[i] == "Обман") {
                        this.userData[index].skills.cheating_c = text[i + 1];
                        answer = addStroke(answer, "Обман установлен", 1);
                    }
                    if (text[i] == "Запугивание") {
                        this.userData[index].skills.intimidation = text[i + 1];
                        answer = addStroke(answer, "Запугивание установлено", 1);
                    }
                    if (text[i] == "Выступление") {
                        this.userData[index].skills.perfomance_c = text[i + 1];
                        answer = addStroke(answer, "Выступление установлено", 1);
                    }
                    if (text[i] == "Убеждение") {
                        this.userData[index].skills.conviction_c = text[i + 1];
                        answer = addStroke(answer, "Убеждение установлено", 1);
                    }
                    if (text[i] == "Рандом") {
                        this.userData[index].skills.random_l = text[i + 1];
                        answer = addStroke(answer, "Рандом установлен", 1);
                    }
                }
            }
            if (text[2] == "Способности") {
                for (let i = 3; i < text.length; i++) {
                    this.userData[index].abilities = addStroke(
                        this.userData[index].abilities,
                        text[i]
                    );
                }
                if (text[3] == "удалить") {
                    this.userData[index].abilities = "";
                }
                answer = "Способности установлен";
            }

            fs.writeFileSync("UsersList.json", JSON.stringify(this.userData));
        }

        if (text[1] == "список") {
            answer = `Все команды начинаются со слова 'Команда', а затем указываете следующие параметры (В командах скобки не стоят): 
* 1)рандом (число1)

*2)рандом (число1) (число2)

*3)регистрация

*4)инфо (ФИО и/или Возраст и/или Пол и/или Характеристики и/или Описане и/или Характер и/или Биография и/или Броня и/или Оружие и/или Инвентарь и/или Деньги и/или Питомец и/или Навыки и/или Способности)

*5)запись (Параметр) (значение)

*6)запись (Параметр) удалить

*Примечание 1: команда "Команда запись Характеристики Сила (значение) Ловкость (значение)(и т.д.)"

*Примечание 2: команда "Команда запись Навыки (и т.д.)" записывается так же, как и параметры в примечании 1

*Примечание 3: команды "Описание, Характер, Биография, Питомец, Способности" при записи добавляют новую информацию, не удаляя старую

*Примечание 4: команды "Броня, Оружие, Инвентарь" при записи добавляют текст на новую строку, не удаляя старую 
`;
        }
        if (answer != null) {
            return answer;
        } else {
            return "Команда введена не корректно";
        }
    }
};

function GetDataUser(user_id, userData) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].user_id == user_id) {
            return i;
        }
    }
    return null;
}

function GetName(index, userData) {
    if (userData[index].name != null) {
        return addStroke("Имя:", userData[index].name);
    } else {
        return "Имя отсутсвует";
    }
}
function GetAge(index, userData) {
    if (userData[index].age != null) {
        return addStroke("Возраст:", userData[index].age);
    } else {
        return "Возраст отсутсвует";
    }
}
function GetSex(index, userData) {
    if (userData[index].sex != null) {
        return addStroke("Пол:", userData[index].sex);
    } else {
        return "Пол отсутсвует";
    }
}

function GetSpecial(index, userData) {
    let answer1 = "Характеристики: ";
    answer1 = addStroke(answer1, "Сила:", 1);
    answer1 = addStroke(answer1, userData[index].special.strong);
    answer1 = addStroke(answer1, "Ловкость:", 1);
    answer1 = addStroke(answer1, userData[index].special.agility);
    answer1 = addStroke(answer1, "Мудрость:", 1);
    answer1 = addStroke(answer1, userData[index].special.wisdom);
    answer1 = addStroke(answer1, "Харизма:", 1);
    answer1 = addStroke(answer1, userData[index].special.charisma);
    answer1 = addStroke(answer1, "Удача:", 1);
    answer1 = addStroke(answer1, userData[index].special.lack);
    return answer1;
}
function GetDescription(index, userData) {
    if (userData[index].description != null) {
        return addStroke("Описание:", userData[index].description);
    } else {
        return "Описание отсутсвует";
    }
}
function GetPersonality(index, userData) {
    if (userData[index].personality != null) {
        return addStroke("Характер:", userData[index].personality);
    } else {
        return "Характер отсутсвует";
    }
}
function GetBiografy(index, userData) {
    if (userData[index].biografy != null) {
        return addStroke("Биография:", userData[index].biografy);
    } else {
        return "Биография отсутсвует";
    }
}
function GetArmor(index, userData) {
    if (userData[index].armor != null) {
        return addStroke("Броня:", userData[index].armor);
    } else {
        return "Броня отсутсвует";
    }
}
function GetWeapons(index, userData) {
    if (userData[index].weapons != null) {
        return addStroke("Оружие:", userData[index].weapons);
    } else {
        return "Оружие отсутсвует";
    }
}
function GetInventory(index, userData) {
    if (userData[index].inventory != null) {
        return addStroke("Инвентарь:", userData[index].inventory);
    } else {
        return "Инвентарь отсутсвует";
    }
}
function GetMoney(index, userData) {
    if (userData[index].money != null) {
        return addStroke("Деньги:", userData[index].money);
    } else {
        return "Деньги отсутсвует";
    }
}
function GetPet(index, userData) {
    if (userData[index].pet != null) {
        return addStroke("Питомец:", userData[index].pet);
    } else {
        return "Питомец отсутсвует";
    }
}
function GetSkills(index, userData) {
    let answer1 = "Навыки: ";
    answer1 = addStroke(answer1, "Атлетика:", 1);
    answer1 = addStroke(answer1, userData[index].skills.atlithic_s);
    answer1 = addStroke(answer1, "Акробатика:", 1);
    answer1 = addStroke(answer1, userData[index].skills.acrobatic_a);
    answer1 = addStroke(answer1, "Ловкость рук:", 1);
    answer1 = addStroke(answer1, userData[index].skills.hends_agility_a);
    answer1 = addStroke(answer1, "Скрытность:", 1);
    answer1 = addStroke(answer1, userData[index].skills.stealth_a);
    answer1 = addStroke(answer1, "Реакция:", 1);
    answer1 = addStroke(answer1, userData[index].skills.reaction_a);
    answer1 = addStroke(answer1, "Обращение с животными:", 1);
    answer1 = addStroke(answer1, userData[index].skills.livestock_w);
    answer1 = addStroke(answer1, "Проницательность:", 1);
    answer1 = addStroke(answer1, userData[index].skills.insight_w);
    answer1 = addStroke(answer1, "Медицина:", 1);
    answer1 = addStroke(answer1, userData[index].skills.medic_w);
    answer1 = addStroke(answer1, "Внимательность:", 1);
    answer1 = addStroke(answer1, userData[index].skills.mindfulness_w);
    answer1 = addStroke(answer1, "Выживание:", 1);
    answer1 = addStroke(answer1, userData[index].skills.survival_w);
    answer1 = addStroke(answer1, "Обман:", 1);
    answer1 = addStroke(answer1, userData[index].skills.cheating_c);
    answer1 = addStroke(answer1, "Запугивание:", 1);
    answer1 = addStroke(answer1, userData[index].skills.intimidation);
    answer1 = addStroke(answer1, "Выступление:", 1);
    answer1 = addStroke(answer1, userData[index].skills.perfomance_c);
    answer1 = addStroke(answer1, "Убеждение:", 1);
    answer1 = addStroke(answer1, userData[index].skills.conviction_c);
    answer1 = addStroke(answer1, "Рандом:", 1);
    answer1 = addStroke(answer1, userData[index].skills.random_l);
    return answer1;
}
function GetAbilities(index, userData) {
    if (userData[index].abilities != null) {
        return addStroke("Способности:", userData[index].abilities);
    } else {
        return "Способности отсутсвует";
    }
}

function addStroke(stroke, addstroke, n = 0) {
    if (n == 0) {
        let answer2 = stroke + " " + addstroke;
        return answer2;
    } else {
        let answer2 = stroke + "\n" + addstroke;
        return answer2;
    }
}

function UsersList(user_id, userData) {
    let isHasID = false;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].user_id == user_id) {
            isHasID = true;
        }
    }
    if (isHasID == false) {
        let user = new User(user_id);
        userData.push(user);
        fs.writeFileSync("UsersList.json", JSON.stringify(userData));
        return "Регистрация завершена. Пожалуйста, заполните информацию о своем персонаже.";
    } else {
        return "Вы уже зарегистрированы";
    }
}

function GetRandomNumbers(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + Math.floor(min);
}

module.exports = CommandList;
