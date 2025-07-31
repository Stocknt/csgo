import { db } from "./database.js";

function get(a) {
    return document.getElementById(a);
}

let user = {
    cash: 100,
    inv: [{name: "Filler Gun | 7", price: 50, rarity: "exceedinglyrare", type: "skin", caseId: "fill1"}]
}

function rendCash() {
    //Render Cash
    get("cash").innerHTML = "Cash: $" + user.cash.toFixed(2);

    //Render Value
    // let value = 0;
    // for(let item of user.inv) {
    //     value += item.price;
    // }
    // get("value").innerHTML = "Value: $" + value.toFixed(2);
}

function rendShop() {
    const cases = db.filter(a => a.type == "case");
    for(let data of cases) {
        let div = document.createElement("div");
        div.className = "shop-item base-border container";

        let inner = document.createElement("div");
        inner.className = "shop-item-inner";

        let lower = document.createElement("div");
        lower.className = "shop-item-lower base-col container";
        let label = document.createElement("span");
        label.className = "shop-label";
        label.innerHTML = data.name;

        let price = document.createElement("span");
        price.className = "shop-price";
        price.innerHTML = "$"+ data.price.toFixed(2);

        lower.appendChild(label);
        lower.appendChild(price);
        
        div.appendChild(inner);
        div.appendChild(lower);

        div.addEventListener("click", function() {
            loadPage("caseinfo");
            rendCaseInfo(data);
        });

        get("shop-container").appendChild(div);
    }
}

function rendCaseInfo(a) {
    get("caseinfo-title").innerHTML = a.name;
    console.log(a, a.name);

    get("open1-price").innerHTML = "$" + a.price.toFixed(2);
    get("open5-price").innerHTML = "$" + (a.price * 5).toFixed(2);

    //Render Skin List
    const skins = db.filter(i => i.caseId == a.caseId && i.type == "skin");
    get("skin-list").innerHTML = "";

    for(let data of skins) {
        let div = buildItem(data);
        get("skin-list").appendChild(div);
    }

    get("open1-btn").onclick = function() {
        openCase(a.caseId, 1);
    };
    
}

function rendInv() {
    get("inv-items").innerHTML = "";
    console.log(user.inv);
    for(let d in user.inv) {
        let data = user.inv[d];
        let div = document.createElement("div");
        div.className = "skin-list-item base-border " + data.rarity;

        let inner = document.createElement("div");
        inner.className = "shop-item-inner";

        let lower = document.createElement("div");
        lower.className = "shop-item-lower base-col container inspect";


        let label = document.createElement("span");
        label.className = "shop-label";
        label.innerHTML = data.name;

        let price = document.createElement("span");
        price.className = "shop-price";
        price.innerHTML = "$"+ data.price.toFixed(2);

        let sellWrap = document.createElement("div");
        sellWrap.className = "container btn-wrap";

        let sellBtn = document.createElement("button");
        sellBtn.className = "base-col base-border sell-btn";
        sellBtn.style.display = "none";
        sellBtn.innerHTML = "Sell";

        sellBtn.addEventListener("click", function() {
            user.cash += data.price;
            user.inv.splice(d, 1);
            rendCash();
            rendInv();
        })


        lower.addEventListener("mouseenter", function() {
            console.log("this");
            lower.classList.toggle("hover", true);
            lower.style.alignItems = "none";
            lower.style.justifyContent = "center";
            lower.style.flexDirection = "column";
            lower.style.gap = "10px";
            sellBtn.style.display = "block";

        })

        lower.addEventListener("mouseleave", function() {
            console.log("this");
            lower.classList.toggle("hover", false);
            lower.style.alignItems = "center";
            lower.style.justifyContent = "none";
            lower.style.flexDirection = "row";
            lower.style.gap = "0px";
            sellBtn.style.display = "none";

        })

        sellWrap.appendChild(sellBtn);

        let wrapper = document.createElement("div");
        wrapper.className = "container";
        wrapper.appendChild(label);
        wrapper.appendChild(price);

        lower.appendChild(wrapper);
        lower.appendChild(sellWrap);
        
        div.appendChild(inner);
        div.appendChild(lower);

        get("inv-items").appendChild(div);
    }
}

function loadPage(a) {
    const pages = document.getElementsByClassName("page");
    for(let page of pages) {
        page.classList.toggle("active", false);
    }
    get(a+"-wrapper").classList.toggle("active", true);

    if(a == "inv") {rendInv()}  
}



function openCase(c, n) {
    // c is case id, n is number
    
    user.cash -= getCase(c).price * n;
    rendCash();

    loadPage("case");

    const caseItems = db.filter(a => a.caseId == c && a.type == "skin");

    const con = caseItems.filter(a => a.rarity == "consumer");
    const ind = caseItems.filter(a => a.rarity == "industrial");
    const mil = caseItems.filter(a => a.rarity == "milspec");
    const res = caseItems.filter(a => a.rarity == "restricted");
    const cla = caseItems.filter(a => a.rarity == "classified");
    const cov = caseItems.filter(a => a.rarity == "covert");
    const exc = caseItems.filter(a => a.rarity == "exceedinglyrare");

    let items = [];
    get("case-wheel").innerHTML = "";
    for(let i = 0; i < 40; i++) {
        const r = Math.random();
        let item;
        if(r < 0.025) {
            item = exc[Math.floor(Math.random() * exc.length)];
        } else if(r < 0.07) {
            item = cov[Math.floor(Math.random() * cov.length)];
        } else if(r < 0.125) {
            item = cla[Math.floor(Math.random() * cla.length)];
        } else if(r < 0.2) {
            item = res[Math.floor(Math.random() * res.length)];
        } else if(r < 0.4) {
            item = mil[Math.floor(Math.random() * mil.length)];
        } else if(r < 0.6) {
            item = ind[Math.floor(Math.random() * ind.length)];
        } else {
            item = con[Math.floor(Math.random() * con.length)];
        }
        
        items.push(item);
        let div = document.createElement("div");
        div.className = "container wheel-item " + item.rarity;
        let fade = document.createElement("div");
        fade.className = "fade " + item.rarity;
        div.appendChild(fade);
        if(i == 35) {
            div.id = "skin35";
        }

        get("case-wheel").appendChild(div);
    }

    //Scroll Animation
    const rx = -7210 - Math.random() * 200;
    get("case-wheel").style.animation = "scrollAnim 4s ease-out forwards";

    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
    @keyframes scrollAnim {
        from { transform: translateX(0px)}
        to { transform: translateX(${rx}px)}
    }`
    document.head.appendChild(styleSheet);

    //Create Item
    let prize = items[35];
    prize.wear = genWear();

    prize.st = false;
    if(Math.random() < 0.05) {prize.st = true}

    user.inv.push(prize);
    //
    setTimeout(function() {
        get("skin35").style.scale = 1.1;

        get("case-back-btn").onclick = function() {
            loadPage("caseinfo");
            console.log(getCase(c));
            rendCaseInfo(getCase(c));
        }
        get("case-back-btn").classList.toggle("inactive", false);
    }, 4000);

}

function getDB(name) {
    return db.filter(a => a.name == name)[0];
}

function getCase(id) {
    console.log(db);
    return db.filter(a => a.caseId == id && a.type == "case")[0];
}

function buildItem(data) {
    let div = document.createElement("div");
    div.className = "skin-list-item base-border " + data.rarity;

    let inner = document.createElement("div");
    inner.className = "shop-item-inner";

    let lower = document.createElement("div");
    lower.className = "shop-item-lower base-col container";
    let label = document.createElement("span");
    label.className = "shop-label";
    label.innerHTML = data.name;

    let price = document.createElement("span");
    price.className = "shop-price";
    price.innerHTML = "$"+ data.price.toFixed(2);

    lower.appendChild(label);
    lower.appendChild(price);
    
    div.appendChild(inner);
    div.appendChild(lower);

    

    return div;
}

function genWear() {
    const r = Math.random();
    if(r < 0.1) { return "FN"}
    else if(r < 0.25) {return "MW"}
    else if(r < 0.4) {return "FT"}
    else if(r < 0.7) {return "WW"}
    else {return "BS"}
}

document.addEventListener("DOMContentLoaded", function() {
    rendCash();
    rendShop();

    loadPage("shop")
});


window.loadPage = loadPage;