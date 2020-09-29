const User = require("./User.js");
const fs = require("fs");

let CommandList = class {
    constructor(userData) {
        this.userData = userData;
    }

    Cmd(context, Bot) {
        let user_id = context.message.from_id;
        let text = context.message.text.split(" ");
        let bot = Bot;
        if (text[0].toUpperCase() !== "Команда".toUpperCase()) {
            return null;
        }
        let answer = null;
        if(text.length > 1) {
            if (text[1].toUpperCase() === "рандом".toUpperCase()) {
                if (text.length > 3) {
                    answer = GetRandomNumbers(text[3], text[2]);
                } else if (text.length === 3) {
                    answer = GetRandomNumbers(text[2]);
                }
            }
            if (text[1].toUpperCase() === "регистрация".toUpperCase()) {
                answer = UsersList(user_id, this.userData);
            }
            let index = GetDataUser(user_id, this.userData);
            if (index == null) {
                return "Вы еще не зарегистрировались";
            }
            if (text[1].toUpperCase() === "инфо".toUpperCase() || text[1] === "инфа".toUpperCase()) {
                index = GetDataUser(user_id, this.userData);
                answer = "Параметры персонажа:";
                for (let i = 2; i < text.length; i++) {
                    if (text[i] === "ФИО") {
                        answer = addStroke(answer, GetName(index, this.userData), 1);
                    }
                    if (text[i] === "Возраст") {
                        answer = addStroke(answer, GetAge(index, this.userData), 1);
                    }
                    if (text[i] === "Пол") {
                        answer = addStroke(answer, GetSex(index, this.userData), 1);
                    }
                    if (text[i] === "Характеристики") {
                        answer = addStroke(answer, GetSpecial(index, this.userData), 1);
                    }
                    if (text[i] === "Описание") {
                        answer = addStroke(answer, GetDescription(index, this.userData), 1);
                    }
                    if (text[i] === "Характер") {
                        answer = addStroke(answer, GetPersonality(index, this.userData), 1);
                    }
                    if (text[i] === "Биография") {
                        answer = addStroke(answer, GetBiografy(index, this.userData), 1);
                    }
                    if (text[i] === "Броня") {
                        answer = addStroke(answer, GetArmor(index, this.userData), 1);
                    }
                    if (text[i] === "Оружие") {
                        answer = addStroke(answer, GetWeapons(index, this.userData), 1);
                    }
                    if (text[i] === "Инвентарь") {
                        answer = addStroke(answer, GetInventory(index, this.userData), 1);
                    }
                    if (text[i] === "Деньги") {
                        answer = addStroke(answer, GetMoney(index, this.userData), 1);
                    }
                    if (text[i] === "Питомец") {
                        addStroke(answer, GetPet(index, this.userData), 1);
                    }
                    if (text[i] === "Навыки") {
                        answer = addStroke(answer, GetSkills(index, this.userData), 1);
                    }
                    if (text[i] === "Способности") {
                        answer = addStroke(answer, GetAbilities(index, this.userData), 1);
                    }
                    if (text[i] === "Ранг") {
                        answer = addStroke(answer, GetRang(index, this.userData), 1);
                    }
                }
            }
            if (text[1].toUpperCase() === "запись".toUpperCase()) {
                if (text[2].toUpperCase() === ("ФИО").toUpperCase()) {
                    this.userData[index].name = "";
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].name = addStroke(
                            this.userData[index].name,
                            text[i]
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].name = "";
                    }
                    answer = "Имя установлено";
                }
                if (text[2].toUpperCase() === ("Возраст").toUpperCase()) {
                    this.userData[index].age = text[3];
                    if (text[3] === "удалить") {
                        this.userData[index].age = "";
                    }
                    answer = "Возраст установлен";
                }
                if (text[2].toUpperCase() === ("Пол").toUpperCase()) {
                    this.userData[index].sex = text[3];
                    if (text[3] === "удалить") {
                        this.userData[index].sex = "";
                    }
                    answer = "Пол установлен";
                }
                if (text[2].toUpperCase() === ("Характеристики").toUpperCase()) {
                    answer = '';
                    for (let i = 3; i < text.length; i = i + 2) {
                        if (text[i].toUpperCase() === "Сила".toUpperCase()) {
                            this.userData[index].special.strong = text[i + 1];
                            this.userData[index].skills.atlithic_s = text[i + 1];
                            answer = addStroke(answer, "Сила установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Ловкость".toUpperCase()) {
                            this.userData[index].special.agility = text[i + 1];
                            this.userData[index].skills.reaction_a = text[i + 1];
                            this.userData[index].skills.stealth_a = text[i + 1];
                            this.userData[index].skills.acrobatic_a = text[i + 1];
                            this.userData[index].skills.hends_agility_a = text[i + 1];
                            answer = addStroke(answer, "Ловкость установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Мудрость".toUpperCase()) {
                            this.userData[index].special.wisdom = text[i + 1];
                            this.userData[index].skills.livestock_w = text[i + 1];
                            this.userData[index].skills.insight_w = text[i + 1];
                            this.userData[index].skills.medic_w = text[i + 1];
                            this.userData[index].skills.mindfulness_w = text[i + 1];
                            this.userData[index].skills.survival_w = text[i + 1];
                            answer = addStroke(answer, "Мудрость установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Харизма".toUpperCase()) {
                            this.userData[index].special.charisma = text[i + 1];
                            this.userData[index].skills.cheating_c = text[i + 1];
                            this.userData[index].skills.conviction_c = text[i + 1];
                            this.userData[index].skills.perfomance_c = text[i + 1];
                            answer = addStroke(answer, "Харизма установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Удача".toUpperCase()) {
                            this.userData[index].special.lack = text[i + 1];
                            this.userData[index].skills.random_l = text[i + 1];
                            answer = addStroke(answer, "Удача установлена", 1);
                        }
                    }
                }
                if (text[2].toUpperCase() === ("Описание").toUpperCase()) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].description = addStroke(
                            this.userData[index].description,
                            text[i]
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].description = "";
                    }
                    answer = "Описание установлено";
                }
                if (text[2].toUpperCase() === ("Характер").toUpperCase()) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].personality = addStroke(
                            this.userData[index].personality,
                            text[i]
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].personality = "";
                    }

                    answer = "Характер установлен";
                }
                if (text[2].toUpperCase() === ("Биография".toUpperCase())) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].biografy = addStroke(
                            this.userData[index].biografy,
                            text[i]
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].biografy = "";
                    }

                    answer = "Биография установлена";
                }
                if (text[2].toUpperCase() === ("Броня").toUpperCase()) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].armor = addStroke(
                            this.userData[index].armor,
                            text[i],
                            1
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].armor = "";
                    }

                    answer = "Броня установлена";
                }
                if (text[2].toUpperCase() === ("Оружие").toUpperCase()) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].weapons = addStroke(
                            this.userData[index].weapons,
                            text[i],
                            1
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].weapons = "";
                    }

                    answer = "Оружие установлена";
                }
                if (text[2].toUpperCase() === ("Инвентарь").toUpperCase()) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].inventory = addStroke(
                            this.userData[index].inventory,
                            text[i],
                            1
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].inventory = "";
                    }

                    answer = "Инвентарь установлен";
                }
                if (text[2].toUpperCase() === ("Деньги").toUpperCase()) {
                    this.userData[index].money =
                        parseFloat(this.userData[index].money) + parseFloat(text[3]);
                    answer = "Деньги установлены";
                    if (text[3] === "удалить") {
                        this.userData[index].money = 0;
                        answer = "Деньги удалены";
                    }
                }
                if (text[2].toUpperCase() === "Питомец".toUpperCase()) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].pet = addStroke(
                            this.userData[index].pet,
                            text[i]
                        );
                    }
                    if (text[3] === "удалить") {
                        this.userData[index].pet = "";
                    }
                    answer = "Питомец установлен";
                }
                if (text[2].toUpperCase() === "Навыки".toUpperCase()) {
                    for (let i = 3; i < text.length; i = i + 2) {
                        if (text[i].toUpperCase() === "Атлетика".toUpperCase()) {
                            this.userData[index].skills.atlithic_s = text[i + 1];
                            answer = addStroke(answer, "Атлетика установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Акробатика".toUpperCase()) {
                            this.userData[index].skills.acrobatic_a = text[i + 1];
                            answer = addStroke(answer, "Акробатика установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Ловкость_рук".toUpperCase()) {
                            this.userData[index].skills.hends_agility_a = text[i + 1];
                            answer = addStroke(answer, "Ловкость рук установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Скрытность".toUpperCase()) {
                            this.userData[index].skills.stealth_a = text[i + 1];
                            answer = addStroke(answer, "Скрытность  установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Реакция".toUpperCase()) {
                            this.userData[index].skills.reaction_a = text[i + 1];
                            answer = addStroke(answer, "Реакция  установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Обращение_с_животными".toUpperCase()) {
                            this.userData[index].skills.livestock_w = text[i + 1];
                            answer = addStroke(answer, "Обращение с животными установлено", 1);
                        }
                        if (text[i].toUpperCase() === "Проницательность".toUpperCase()) {
                            this.userData[index].skills.insight_w = text[i + 1];
                            answer = addStroke(answer, "Проницательность установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Медицина".toUpperCase()) {
                            this.userData[index].skills.medic_w = text[i + 1];
                            answer = addStroke(answer, "Медицина установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Внимательность".toUpperCase()) {
                            this.userData[index].skills.mindfulness_w = text[i + 1];
                            answer = addStroke(answer, "Внимательность установлена", 1);
                        }
                        if (text[i].toUpperCase() === "Выживание".toUpperCase()) {
                            this.userData[index].skills.survival_w = text[i + 1];
                            answer = addStroke(answer, "Выживание установлено", 1);
                        }
                        if (text[i].toUpperCase() === "Обман".toUpperCase()) {
                            this.userData[index].skills.cheating_c = text[i + 1];
                            answer = addStroke(answer, "Обман установлен", 1);
                        }
                        if (text[i].toUpperCase() === "Запугивание".toUpperCase()) {
                            this.userData[index].skills.intimidation = text[i + 1];
                            answer = addStroke(answer, "Запугивание установлено", 1);
                        }
                        if (text[i].toUpperCase() === "Выступление".toUpperCase()) {
                            this.userData[index].skills.perfomance_c = text[i + 1];
                            answer = addStroke(answer, "Выступление установлено", 1);
                        }
                        if (text[i].toUpperCase() === "Убеждение".toUpperCase()) {
                            this.userData[index].skills.conviction_c = text[i + 1];
                            answer = addStroke(answer, "Убеждение установлено", 1);
                        }
                        if (text[i].toUpperCase() === "Рандом".toUpperCase()) {
                            this.userData[index].skills.random_l = text[i + 1];
                            answer = addStroke(answer, "Рандом установлен", 1);
                        }
                    }
                }
                if (text[2].toUpperCase() === "Способности".toUpperCase()) {
                    for (let i = 3; i < text.length; i++) {
                        this.userData[index].abilities = addStroke(
                            this.userData[index].abilities,
                            text[i]
                        );
                    }
                    if (text[3].toUpperCase() === "удалить".toUpperCase()) {
                        this.userData[index].abilities = "";
                    }
                    answer = "Способности установлен";
                }
                if (text[2].toUpperCase() === "Ранг".toUpperCase()) {
                    if (this.userData[index].rang === 5) {
                        (async () => {
                            console.log(GetIds(text, 4));
                            let users = await bot.execute('users.get', {user_ids: GetIds(text, 4)});
                            console.log(users);
                            for (let i = 0; i < users.length; i++) {
                                for (let j = 0; j < this.userData.length; j++) {
                                    if (users[i].id === this.userData[j].user_id) {
                                        this.userData[j].rang = parseFloat(text[3]);
                                    }
                                }
                            }
                        })();
                        answer = "Ранг установлен";
                    } else {
                        answer = "У вас недостаточный уровень доступа"
                    }
                }

                fs.writeFileSync("UsersList.json", JSON.stringify(this.userData));
            }
            if (text[1].toUpperCase() === "список".toUpperCase()) {
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
            if (text[1].toUpperCase() === "стереть".toUpperCase()) {
                if (text.length === 2) {
                    this.userData.splice(index, 1);
                } else if (this.userData[index].user_id === 5) {
                    (async () => {
                        console.log(GetIds(text, 2));
                        let users = await bot.execute('users.get', {user_ids: GetIds(text, 2)});
                        console.log(users);
                        for (let i = 0; i < users.length; i++) {
                            for (let j = 0; j < this.userData.length; j++) {
                                if (users[i].id === this.userData[j].user_id) {
                                    this.userData.splice(j, 1);
                                }
                            }
                        }
                    })();
                }
            }
            if (text[1].toUpperCase() === "проверка".toUpperCase()) {
                answer = "Проверки:";
                let buff;
                for (let i = 2; i < text.length; i++) {
                    if (text[i].toUpperCase() === "Сила".toUpperCase()) {
                        answer = addStroke(answer, "Проверка силы", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].special.strong);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Ловкость".toUpperCase()) {
                        answer = addStroke(answer, "Проверка ловкости", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].special.agility);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Мудрость".toUpperCase()) {
                        answer = addStroke(answer, "Проверка мудрости", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].special.wisdom);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Харизма".toUpperCase()) {
                        answer = addStroke(answer, "Проверка харизмы", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].special.charisma);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Удача".toUpperCase()) {
                        answer = addStroke(answer, "Проверка удачи", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].special.lack);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Атлетика".toUpperCase()) {
                        answer = addStroke(answer, "Проверка атлетики", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.atlithic_s);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Акробатика".toUpperCase()) {
                        answer = addStroke(answer, "Проверка акробатики", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.acrobatic_a);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Ловкость_рук".toUpperCase()) {
                        answer = addStroke(answer, "Проверка ловкости рук", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.hends_agility_a);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Скрытность".toUpperCase()) {
                        answer = addStroke(answer, "Проверка скрытности", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.stealth_a);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Реакция".toUpperCase()) {
                        answer = addStroke(answer, "Проверка реакции", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.reaction_a);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Обращение_с_животными".toUpperCase()) {
                        answer = addStroke(answer, "Проверка обращения с животными", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.livestock_w);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Проницательность".toUpperCase()) {
                        answer = addStroke(answer, "Проверка проницательности", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.insight_w);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Медицина".toUpperCase()) {
                        answer = addStroke(answer, "Проверка медицины", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.medic_w);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Внимательность".toUpperCase()) {
                        answer = addStroke(answer, "Проверка внимательности", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.mindfulness_w);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Выживание".toUpperCase()) {
                        answer = addStroke(answer, "Проверка выживания", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.survival_w);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Обман".toUpperCase()) {
                        answer = addStroke(answer, "Проверка обмана", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.cheating_c);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Запугивание".toUpperCase()) {
                        answer = addStroke(answer, "Проверка запугивания", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.intimidation);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Выступление".toUpperCase()) {
                        answer = addStroke(answer, "Проверка выступления", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.perfomance_c);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Убеждение".toUpperCase()) {
                        answer = addStroke(answer, "Проверка убеждения", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.conviction_c);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                    if (text[i].toUpperCase() === "Рандом".toUpperCase()) {
                        answer = addStroke(answer, "Проверка случая", 1);
                        buff = GetRandomNumbers(6) - parseFloat(this.userData[index].skills.random_l);
                        if (buff < 2) {
                            answer = addStroke(answer, "успешна");
                        } else {
                            answer = addStroke(answer, "провалена");
                        }
                    }
                }
            }
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
        if (userData[i].user_id === user_id) {
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

function GetRang(index, userData) {
    if (userData[index].rang != null) {
        return addStroke("Ранг:", userData[index].rang);
    } else {
        return "Ранг отсутсвует";
    }
}

function GetIds(text, index) {
    let answer = '';
    for (let i = index; i < text.length; i++) {
        answer = answer + text[i] + ',';
    }
    return answer.slice(0, -1);
}

function addStroke(stroke, addstroke, n = 0) {
    if (n === 0) {
        return stroke + " " + addstroke;
    } else {
        return stroke + "\n" + addstroke;
    }
}

function UsersList(user_id, userData) {
    let isHasID = false;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].user_id === user_id) {
            isHasID = true;
        }
    }
    if (isHasID === false) {
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
