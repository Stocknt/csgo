const db = [
    // Skins

    //Kilowatt Case
    {name: "Nova | Dark Sigil", price: 0.09, rarity: "milspec", type: "skin", caseId: "kilowatt"},
    {name: "Dual Berettas | Hideout", price: 0.09, rarity: "milspec", type: "skin", caseId: "kilowatt"},
    {name: "UMP-45 | Motorized", price: 0.09, rarity: "milspec", type: "skin", caseId: "kilowatt"},
    {name: "XM1014 | Irezumi", price: 0.09, rarity: "milspec", type: "skin", caseId: "kilowatt"},
    {name: "Tec-9 | Slag", price: 0.08, rarity: "milspec", type: "skin", caseId: "kilowatt"},
    {name: "SSG 08 | Dezastre", price: 0.08, rarity: "milspec", type: "skin", caseId: "kilowatt"},
    {name: "Mac-10 | Light Box", price: 0.08, rarity: "milspec", type: "skin", caseId: "kilowatt"},
    {name: "Sawed-Off | Analog Input", price: 0.71, rarity: "restricted", type: "skin", caseId: "kilowatt"},
    {name: "MP7 | Just Smile", price: 0.63, rarity: "restricted", type: "skin", caseId: "kilowatt"},
    {name: "Five-SeveN | Hybrid", price: 0.69, rarity: "restricted", type: "skin", caseId: "kilowatt"},
    {name: "M4A4 | Etch Lord", price: 0.66, rarity: "restricted", type: "skin", caseId: "kilowatt"},
    {name: "Glock-18 | Block-18", price: 0.80, rarity: "restricted", type: "skin", caseId: "kilowatt"},
    {name: "Zeus x27 | Olympus", price: 4.67, rarity: "classified", type: "skin", caseId: "kilowatt"},
    {name: "USP-S | Jawbreaker", price: 4.91, rarity: "classified", type: "skin", caseId: "kilowatt"},
    {name: "M4A1-S | Black Lotus", price: 10.95, rarity: "classified", type: "skin", caseId: "kilowatt"},
    {name: "AWP | Chrome Cannon", price: 18.90, rarity: "covert", type: "skin", caseId: "kilowatt"},
    {name: "AK-47 | Inheritance", price: 74.86, rarity: "covert", type: "skin", caseId: "kilowatt"},
    {name: "Special Item", price: 100, rarity: "exceedinglyrare", type: "skin", caseId: "kilowatt"},  

    //Gamma Case
    {name: "Nova | Exo", price: 0.34, rarity: "milspec", type: "skin", caseId: "gamma"},
    {name: "SG 553 | Aerial", price: 0.32, rarity: "milspec", type: "skin", caseId: "gamma"},
    {name: "PP-Bizon | Harvester", price: 0.40, rarity: "milspec", type: "skin", caseId: "gamma"},
    {name: "Mac-10 | Carnivore", price: 0.30, rarity: "milspec", type: "skin", caseId: "gamma"},
    {name: "P250 | Iron Clad", price: 0.27, rarity: "milspec", type: "skin", caseId: "gamma"},
    {name: "Tec-9 | Ice Cap", price: 0.32, rarity: "milspec", type: "skin", caseId: "gamma"},
    {name: "Five-SeveN | Violent Daimyo", price: 0.41, rarity: "milspec", type: "skin", caseId: "gamma"},
    {name: "Sawed-Off | Limelight", price: 0.46, rarity: "restricted", type: "skin", caseId: "gamma"},
    {name: "P90 | Chopper", price: 0.74 , rarity: "restricted", type: "skin", caseId: "gamma"},
    {name: "AUG | Aristocrat", price: 0.99, rarity: "restricted", type: "skin", caseId: "gamma"},
    {name: "R8 Revolver| Reboot", price: 0.47, rarity: "restricted", type: "skin", caseId: "gamma"},
    {name: "AWP | Phobos", price: 2.04, rarity: "restricted", type: "skin", caseId: "gamma"},
    {name: "SCAR-20 | Bloodsport", price: 3.80, rarity: "classified", type: "skin", caseId: "gamma"},
    {name: "P2000 | Imperial Dragon", price: 3.75, rarity: "classified", type: "skin", caseId: "gamma"},
    {name: "M4A4 | Desolate Space", price: 10.14, rarity: "classified", type: "skin", caseId: "gamma"},
    {name: "Glock-18 | Wasteland Rebel", price: 4.41, rarity: "covert", type: "skin", caseId: "gamma"},
    {name: "M4A1-S | Mecha Industries", price: 33.37, rarity: "covert", type: "skin", caseId: "gamma"},
    {name: "Special Item", price: 100, rarity: "exceedinglyrare", type: "skin", caseId: "gamma"},

    //Cases
    {name: "Kilowatt Case", price: 0.70, type: "case", caseId: "kilowatt"},
    {name: "Gamma Case", price: 5, type: "case", caseId: "gamma"}
];

const wdb = {
    "FN": 2.5,
    "MW": 2,
    "FT": 1.7,
    "WW": 1.5,
    "BS": 1.1
}

const updb = [
    [
        {type: "luck", name: "Luck I", price: 50, desc: "+0.5%", add: 0.5},
        {type: "luck", name: "Luck II", price: 230, desc: "+0.5%", add: 0.5},
        {type: "luck", name: "Luck III", price: 490, desc: "+1%", add: 1},
        {type: "luck", name: "Luck IV", price: 700, desc: "+1%", add: 1},
        {type: "luck", name: "Luck V", price: 1000, desc: "+2%", add: 2},
    ],
    [
        {type: "bonus", name: "Sell Bonus I", price: 120, desc: "+2%", add: 2},
        {type: "bonus", name: "Sell Bonus II", price: 230, desc: "+2%", add: 2},
        {type: "bonus", name: "Sell Bonus III", price: 410, desc: "+3%", add: 3},
        {type: "bonus", name: "Sell Bonus IV", price: 650, desc: "+3%", add: 3},
        {type: "bonus", name: "Sell Bonus V", price: 790, desc: "+4%", add: 3},
    ],
    [
        {type: "click", name: "+Click I", price: 80, desc: "+$1 / click", add: 1},
        {type: "click", name: "+Click II", price: 160, desc: "+$1 / click", add: 1},
        {type: "click", name: "+Click III", price: 300, desc: "+$1 / click", add: 1},
        {type: "click", name: "+Click IV", price: 540, desc: "+$2 / click", add: 2},
        {type: "click", name: "+Click V", price: 800, desc: "+$2 / click", add: 2},
    ]
]


export { db };
export { wdb };
export { updb };
