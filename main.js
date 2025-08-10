import { db , wdb , updb } from "./database.js";

function get(a) {
    return document.getElementById(a);
}

let user = {
    cash: 2,
    wallet: 0,
    inv: [],
    luck: {num: 0, count: 0},
    bonus:  {num: 0, count: 0},
    click: {num: 1, count: 0}
}

function rendCash() {
    //Render Cash
    get("cash").innerHTML = "Cash: $" + user.cash.toFixed(2);

    //Render Value
    let value = 0;
    for(let item of user.inv) {
        let val = item.price * wdb[item.wear];
        val *= user.bonus.num/100 + 1;
        value += val;
    }
    get("value").innerHTML = "Value: $" + value.toFixed(2);
}

function rendShop() {
    get("shop-container").innerHTML = "";
    const cases = db.filter(a => a.type == "case");
    for(let data of cases) {
        let div = document.createElement("div");
        div.className = "shop-item base-border container";

        let inner = document.createElement("div");
        inner.className = "shop-item-inner";

        inner.innerHTML = `<img class="inner-image" src="https://raw.githubusercontent.com/stocknt/csgo/main/images/${data.caseId}.png" alt="image">`

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

        console.log(data.price, user.cash);
        if(user.cash < data.price.toFixed(2)) {
            div.classList.add("hide");
        }
        get("shop-container").appendChild(div);
    }
}

function rendCaseInfo(a) {
    get("caseinfo-title").innerHTML = a.name;

    get("open1-price").innerHTML = "$" + a.price.toFixed(2);
    get("open3-price").innerHTML = "$" + (a.price * 3).toFixed(2);

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

    get("open3-btn").onclick = function() {
        openCase(a.caseId, 3);
    }
    
}

function rendInv() {
    get("inv-items").innerHTML = "";

    user.inv.sort( function(a, b) {
			var aData = getDB(a.name);
			var bData = getDB(b.name);
			var aPrice = aData.price * wdb[a.wear];
			var bPrice = bData.price * wdb[b.wear];
		    if(aPrice > bPrice) return -1;
		    if(aPrice < bPrice) return 1;
		    return 0;
	});

    let page = Number(get("page-num").innerHTML);
    let last = page*18;
    if(user.inv.length < last) {last = user.inv.length}
    console.log(page, user.inv.length);
    if(page == 1) {get("prev-btn").classList.toggle("hide", true)} 
    else {get("prev-btn").classList.toggle("hide", false)}
    if(user.inv.length == last) {get("next-btn").classList.toggle("hide", true)}
    else {get("next-btn").classList.toggle("hide", false)}

    for(let d = (page-1)*18; d < last; d++) {
        let data = user.inv[d];
        let div = document.createElement("div");
        div.className = "skin-list-item base-border inv-item container " + data.rarity;

        let inner = document.createElement("div");
        inner.className = "shop-item-inner container";
        
        let wear = document.createElement("span");
        wear.className = "wear";
        wear.innerHTML = data.wear;

        let price = document.createElement("span");
        price.className = "inv-price";
        price.innerHTML = "$"+ (data.price * wdb[data.wear]).toFixed(2) + " +" + user.bonus.num + "%";


        inner.appendChild(price);
        inner.appendChild(wear);

        let img = document.createElement("img");
        img.src = `https://raw.githubusercontent.com/stocknt/csgo/main/images/${data.name.replace(' ', '').replace(' ', '').replace(' ', '').replace('|', '').replace('-', '').replace('-', '')}.png`
        img.className = "inv-inner inner-image";
        inner.appendChild(img);

        let lower = document.createElement("div");
        lower.className = "shop-item-lower base-col mini container inspect inv-item";


        let label = document.createElement("span");
        label.className = "shop-label inv-label";
        label.innerHTML = data.name;

        

        let sellWrap = document.createElement("div");
        sellWrap.className = "container btn-wrap";

        let sellBtn = document.createElement("button");
        sellBtn.className = "base-col base-border sell-btn";
        sellBtn.innerHTML = "Sell";

        sellBtn.addEventListener("click", function() {
            let value = Number(data.price) * Number(wdb[data.wear]);
            value += (value * (Number(user.bonus.num)/100));
            
            user.cash += value;
            user.inv.splice(d, 1);
            rendCash();
            rendInv();
        })

        // lower.addEventListener("mouseenter", function() {
        //     lower.classList.toggle("hover", true);
        //     lower.style.alignItems = "none";
        //     lower.style.flexDirection = "column";
        //     lower.style.gap = "10px";
        //     sellBtn.style.display = "block";

        // })

        // lower.addEventListener("mouseleave", function() {
        //     lower.classList.toggle("hover", false);
        //     lower.style.alignItems = "center";
        //     lower.style.justifyContent = "none";
        //     lower.style.flexDirection = "row";
        //     lower.style.gap = "0px";
        //     sellBtn.style.display = "none";

        // // })
        sellWrap.appendChild(sellBtn);

        let wrapper = document.createElement("div");
        wrapper.className = "container";
        wrapper.appendChild(label);

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
    for(let btn of document.getElementsByClassName("nav-btn")) {btn.classList.toggle("selected", false)}
    if(a != "caseinfo" && a != "case") {get(a+"-btn").classList.toggle("selected", true)};
    get(a+"-wrapper").classList.toggle("active", true);


    if(a == "inv") {rendInv()}  
    if(a == "betting") {
        resetBetting();
        rendWallet();
        checkInvalidBet();
    }
    if(a == "upgrades") {
        rendUpgrades();
    }
    if(a == "shop") {
        rendShop();
    }
}



function openCase(c, n) {
    // c is case id, n is number
    if(buy(getCase(c).price * n)) {
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

        get("case-wheels").innerHTML = "";
        let prizes = [];
        for(let t = 0; t < n; t ++) {
            let container = document.createElement("div");
            container.className = "container case-wheel-container";

            let wheel = document.createElement("div");
            wheel.className = "container case-wheel";

            let arm = document.createElement("div");
            arm.className = "wheel-arm";

            let items = [];
            for(let i = 0; i < 40; i++) {
                const r = Math.random();
                let item;
                if(r < (0.025 + user.luck.num/100) && exc.length > 0) {
                    item = exc[Math.floor(Math.random() * exc.length)];
                } else if(r < (0.07 + user.luck.num/100) && cov.length > 0) {
                    item = cov[Math.floor(Math.random() * cov.length)];
                } else if(r <(0.125 + user.luck.num/100) && cla.length > 0) {
                    item = cla[Math.floor(Math.random() * cla.length)];
                } else if(r < (0.2 + user.luck.num/100) && res.length > 0) {
                    item = res[Math.floor(Math.random() * res.length)];
                } else if(r < (1 + user.luck.num/100) && mil.length > 0) {
                    item = mil[Math.floor(Math.random() * mil.length)];
                } else if(r < (0.6 + user.luck.num/100) && ind.length > 0) {
                    item = ind[Math.floor(Math.random() * ind.length)];
                } else if(con.length > 0) {
                    item = con[Math.floor(Math.random() * con.length)];
                }
                
                items.push(item);
                let div = document.createElement("div");
                console.log(item);
                div.className = "non35 container wheel-item " + item.rarity;
                if(i == 35) {
                    div.id = "skin35";
                    div.classList.add("skin35");
                    div.classList.remove("non35");

                    let overlay = document.createElement("div");
                    overlay.className = "prize-overlay container";

                    let prize = structuredClone(items[35]);
                    prize.wear = genWear();

                    prize.st = false;
                    if(Math.random() < 0.05) {prize.st = true}

                    let price = document.createElement("span");
                    price.className = "inv-price prize";
                    
                    price.innerHTML = "$"+ (prize.price * wdb[prize.wear]).toFixed(2) + " +" + user.bonus.num + "%";

                    let wear = document.createElement("span");
                    wear.className = "wear prize";
                    wear.innerHTML = prize.wear;

                    let sellbtn = document.createElement("button");
                    sellbtn.className = "prize prize-sell base-col";
                    sellbtn.innerHTML = "$";

                    sellbtn.addEventListener("click", function() {
                        div.classList.add("hide");
                        div.style.scale = 1;
                        overlay.classList.remove("show");

                        user.inv.splice(user.inv.length-(3-t), 1);
                        for(let i in prizes) {
                            if(prizes[i] == prize) {prizes.splice(i, 1)}
                        }
                        
                        let sum = 0;
                        for(let i of prizes) {
                            let val = i.price * wdb[i.wear];
                            val *= user.bonus.num/100 + 1
                            sum += val;
                        }
                        get("sellall-value").innerHTML = "$" + sum.toFixed(2);
                        if(prizes.length == 0) {
                            get("sellall-btn").classList.add("hide");
                        }

                        let value = Number((prize.price * wdb[prize.wear]));
                        user.cash += Number(value * (user.bonus.num/100 + 1));
                        console.log((value * (user.bonus.num/100 + 1)));
                        
                        rendCash();
                    })

                    overlay.appendChild(price);
                    overlay.appendChild(wear);
                    overlay.appendChild(sellbtn);
                    div.appendChild(overlay);

                    user.inv.push(prize);
                    prizes.push(prize);
                }
                let img = document.createElement("img");
                img.src = `https://raw.githubusercontent.com/stocknt/csgo/main/images/${item.name.replace(' ', '').replace(' ', '').replace(' ', '').replace('|', '').replace('-', '')}.png`
                img.className = "inner-image no-hover";
                div.appendChild(img);
                let fade = document.createElement("div");
                fade.className = "fade " + item.rarity;
                div.appendChild(fade);
                
                wheel.appendChild(div);
            }

            container.appendChild(wheel);
            container.appendChild(arm);

            get("case-wheels").appendChild(container);

            //Scroll Animation
            let rx = -7210 - Math.random() * 200;
            wheel.style.animation = `scrollAnim${t} 4s ease-out forwards`;

            const styleSheet = document.createElement("style");
            styleSheet.innerHTML = `
            @keyframes scrollAnim${t} {
                0% { transform: translateX(0px)}
                90% { transform: translateX(${rx}px)}
                95% { transform: translateX(${rx}px)}
                100% { transform: translateX(-7310px)}
            }`
            document.head.appendChild(styleSheet);

            
            
            //
            setTimeout(function() {
                get("skin35").style.scale = 1.1;
                get("skin35").id = "done";
                let non35 = document.getElementsByClassName("non35");
                for(let i of non35) {
                    i.classList.add("hide");
                }
                let wheelarms = document.getElementsByClassName("wheel-arm");
                for(let i of wheelarms) {
                    i.classList.add("hide");
                }
                let overlays = document.getElementsByClassName("prize-overlay");
                for(let i of overlays) {
                    i.classList.add("show");
                }

                get("case-back-btn").onclick = function() {
                    get("case-btns").classList.toggle("inactive", true);
                    loadPage("caseinfo");
                    rendCaseInfo(getCase(c));
                    rendCash();
                }
                get("case-btns").classList.toggle("inactive", false);
            }, 4000);
        }
        let sum = 0;
        console.log("sell-all");
        prizes.map(a => sum += a.price * wdb[a.wear]);
        sum *= user.bonus.num/100 + 1;
        get("sellall-value").innerHTML = "$" + sum.toFixed(2);

        get("sellall-btn").classList.remove("hide");

        get("sellall-btn").onclick = function() {
            user.cash += sum;
            user.inv.splice(user.inv.length-n, n);
            rendCash();
            const skin35s = document.getElementsByClassName("skin35");
            for(let i of skin35s) {
                i.style.scale = 1;
                i.classList.add("hide");
            }
            const overlays = document.getElementsByClassName("prize-overlay");
            for(let i of overlays) {
                i.classList.remove("show");
            }
            get("sellall-btn").classList.add("hide");
        }
    }
}

function getDB(name) {
    return db.filter(a => a.name == name)[0];
}

function getCase(id) {
    return db.filter(a => a.caseId == id && a.type == "case")[0];
}

function buildItem(data) {
    let div = document.createElement("div");
    div.className = "skin-list-item base-border " + data.rarity;

    let inner = document.createElement("div");
    inner.className = "shop-item-inner container";

    let img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/stocknt/csgo/main/images/${data.name.replace(' ', '').replace(' ', '').replace(' ', '').replace('|', '').replace('-', '').replace('-', '')}.png`
    img.className = "inv-inner inner-image";
    inner.appendChild(img);

    let lower = document.createElement("div");
    lower.className = "shop-item-lower mini base-col container";
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
    const w = Math.random();
    if(w < 0.1) { return "FN"}
    else if(w < 0.3) {return "MW"}
    else if(w < 0.6) {return "FT"}
    else if(w < 0.9) {return "WW"}
    else {return "BS"}
}

document.addEventListener("DOMContentLoaded", function() {
    get("prev-btn").onclick = function() {
        let pagenum = Number(get("page-num").innerHTML);
        if(pagenum > 1) {
            get("page-num").innerHTML = pagenum - 1;
            rendInv();
        }
    }

    get("next-btn").onclick = function() {
        let pagenum = Number(get("page-num").innerHTML);
        if(pagenum < Math.ceil((user.inv.length)/18)) {
            get("page-num").innerHTML = pagenum + 1;
            rendInv();
        }
    }
    get("prev-btn-deposit").onclick = function() {
        let pagenum = Number(get("page-num-deposit").innerHTML);
        if(pagenum > 1) {
            get("page-num-deposit").innerHTML = pagenum - 1;
            rendDeposit();
        }
    }

    get("next-btn-deposit").onclick = function() {
        let pagenum = Number(get("page-num-deposit").innerHTML);
        if(pagenum < Math.ceil((user.inv.length)/18)) {
            get("page-num-deposit").innerHTML = pagenum + 1;
            rendDeposit();
        }
    }
    let bet = get("bet-field");
    checkInvalidBet();
    // bet.addEventListener("input", function() {
    //     checkInvalidBet();
    //     bet.value = Number(bet.value).toFixed(2);
    // });
    bet.addEventListener("blur", function() {
        bet.value = Number(bet.value).toFixed(2);
    })

    let bet1Btn = get("bet-1");
    let bet2Btn = get("bet-2");
    let betAllIn = get("bet-allin");
    bet1Btn.addEventListener("click", function() {
        bet.value = 1;
        bet.value = Number(bet.value).toFixed(2);
        checkInvalidBet();
    })
    bet2Btn.addEventListener("click", function() {
        bet.value = 2;
        bet.value = Number(bet.value).toFixed(2);
        checkInvalidBet();
    })
    betAllIn.addEventListener("click", function() {
        bet.value = user.wallet;
        bet.value = Number(bet.value).toFixed(2);
        checkInvalidBet();
    })

    get("deposit-btn").addEventListener("click", function() {
        loadPage("deposit");
        rendDeposit();
    });

    get("withdraw-btn").addEventListener("click", function() {
        user.cash += user.wallet;
        user.wallet = 0;
        resetBetting();
        rendWallet();
        rendCash();
        checkInvalidBet();
    })

    get("event-btn").addEventListener("click", function() {
        coinflipPlay();
    })

    get("heads-btn").addEventListener("click", function() {
        coinflip("heads");
    })
    get("tails-btn").addEventListener("click", function() {
        coinflip("tails");
    })

    get("select").addEventListener("mouseenter", function() {
        //get("menu-img").src = "https://raw.githubusercontent.com/stocknt/csgo/main/icons/upchevron.png";
        get("menu-img").style.transform = "rotate(0deg)";
    });
    get("select").addEventListener("mouseleave", function() {
        //get("menu-img").src = "https://raw.githubusercontent.com/stocknt/csgo/main/icons/downchevron.png";
        get("menu-img").style.transform = "rotate(180deg)";
    });

    get("earn-wrapper").addEventListener("click", function(e) {
        let r = Number((Math.random()*user.click.num).toFixed(2));
		user.cash += r;
		
		rendCash();
		
		let div = document.createElement("div");
		div.innerHTML = "+ $" + r;
		div.className = "fadeup";

		setTimeout(function() {
			div.parentNode.removeChild(div);
		}, 1000);
		get("earn-wrapper").appendChild(div);
		div.style.left = e.pageX - (Math.random().toFixed(2)*20 + 20) + "px";
		div.style.top = e.pageY + "px";
    })

    rendCash();
    rendShop();

    loadPage("shop")
});

function rendDeposit() {
    get("deposit-items").innerHTML = "";

    user.inv.sort( function(a, b) {
			var aData = getDB(a.name);
			var bData = getDB(b.name);
			var aPrice = aData.price * wdb[a.wear];
			var bPrice = bData.price * wdb[b.wear];
		    if(aPrice > bPrice) return -1;
		    if(aPrice < bPrice) return 1;
		    return 0;
	});

    let page = Number(get("page-num-deposit").innerHTML);
    let last = page*18;
    if(user.inv.length < last) {last = user.inv.length}
    if(page == 1) {get("prev-btn-deposit").classList.toggle("hide", true)} 
    else {get("prev-btn-deposit").classList.toggle("hide", false)}
    if(user.inv.length == last) {get("next-btn-deposit").classList.toggle("hide", true)}
    else {get("next-btn-deposit").classList.toggle("hide", false)}

    for(let d = (page-1)*18; d < last; d++) {
        let data = user.inv[d];
        let div = document.createElement("div");
        div.className = "skin-list-item base-border inv-item " + data.rarity;

        let inner = document.createElement("div");
        inner.className = "shop-item-inner inv-item container";
        
        let wear = document.createElement("span");
        wear.className = "wear";
        wear.innerHTML = data.wear;

        let price = document.createElement("span");
        price.className = "inv-price";
        price.innerHTML = "$"+ (data.price * wdb[data.wear]).toFixed(2);


        inner.appendChild(price);
        inner.appendChild(wear);

        let img = document.createElement("img");
        img.src = `https://raw.githubusercontent.com/stocknt/csgo/main/images/${data.caseId}.png`
        img.className = "inv-inner inner-image";
        inner.appendChild(img);

        let lower = document.createElement("div");
        lower.className = "shop-item-lower base-col mini container inspect inv-item";


        let label = document.createElement("span");
        label.className = "shop-label inv-label";
        label.innerHTML = data.name;

        

        let depositWrap = document.createElement("div");
        depositWrap.className = "container btn-wrap";

        let depositBtn = document.createElement("button");
        depositBtn.className = "base-col base-border sell-btn";
        depositBtn.innerHTML = "Deposit";

        depositBtn.addEventListener("click", function() {
            user.wallet += data.price * wdb[data.wear];
            user.inv.splice(d, 1);
            rendCash();
            rendDeposit();
            rendWallet();
        })


        depositWrap.appendChild(depositBtn);

        let wrapper = document.createElement("div");
        wrapper.className = "container";
        wrapper.appendChild(label);

        lower.appendChild(wrapper);
        lower.appendChild(depositWrap);
        
        div.appendChild(inner);
        div.appendChild(lower);

        get("deposit-items").appendChild(div);
    }
}

function checkInvalidDeposit() {
    let deposit = get("deposit");
    if(deposit.value > user.cash || deposit.value <= 0) {
        deposit.classList.toggle("error", true);
        return true;
    } else {
        deposit.classList.toggle("error", false);
        return false;
    }
}

function checkInvalidBet() {
    let bet = get("bet-field");
    console.log(bet.value);
    if(Number(bet.value).toFixed(2) > Number(user.wallet.toFixed(2)) || Number(bet.value) <= 0) {
        console.log(Number(bet.value).toFixed(2) > user.wallet.toFixed(2));
        console.log(bet.value <= 0);
        console.log(user.wallet, user.wallet.toFixed(2));
        bet.classList.toggle("error", true);
        return true;
    } else {
        bet.classList.toggle("error", false);
        return false;
    }
}

function rendWallet() {
    get(`wallet1`).innerHTML = "$" + user.wallet.toFixed(2);
    get(`wallet2`).innerHTML = "$" + user.wallet.toFixed(2);
    get(`withdraw1`).innerHTML = "$" + user.wallet.toFixed(2);
}


//BETTING GAMES

let session = {
    on: false,
    history: [],
    mult: 1.00,
    bet: 0
}

function resetBetting() {
    get("bet-field").value = 0;
    get("bet-field-container").classList.toggle("hide", false);
    get("bet-field").disabled = false;
    get("event-btn").classList.toggle("hide", false);
    get("event-btn").innerHTML = "Play";
    get("heads-btn").classList.toggle("hide", true);
    get("tails-btn").classList.toggle("hide", true);
    get("profit-label").innerHTML = "Total Profit (1.00x)";
    get("profit-field").innerHTML = 0;
    get("profit-area").classList.toggle("hidden", true);
    get("win-popup").classList.toggle("visible", false);

    session.on = false
}
function coinflipPlay() {
    let btns = document.getElementsByClassName("coinside-btn");
    let eventBtn = get("event-btn");
    
    if(session.on == false) {
        let invalid = checkInvalidBet();
        if(invalid) {return;}
        for(let i = 0; i < btns.length; i++) {
            get(btns[i].id).classList.toggle("hide", false);
        }
        eventBtn.classList.toggle("hide", true);
        eventBtn.innerHTML = "Cashout";

        get("bet-field-container").classList.toggle("hide", true);
        get("bet-field-container").disabled = true;

        get("profit-area").classList.toggle("hidden", false);
        get("profit-field").innerHTML = "0.00";
        get("profit-label").innerHTML = "Total Profit (1.00x):";
        
        session.history = [];
        session.on = true;
        session.mult = 1.00;
        session.bet = get("bet-field").value;

        user.wallet -= session.bet;
        rendWallet();
        get("coin-history").innerHTML = "";
        get("win-popup").classList.toggle("visible", false);
    } else {
        let profit = (session.bet * session.mult).toFixed(2);
        user.wallet += parseFloat(profit);
        rendWallet();

        checkInvalidBet();

        get("event-btn").innerHTML = "Play";
        get("heads-btn").classList.toggle("hide", true);
        get("tails-btn").classList.toggle("hide", true);
        get("profit-area").classList.toggle("hidden", true);

        get("bet-field-container").classList.toggle("hide", false);
        get("bet-field-container").disabled = false;

        get("win-mult").innerHTML = "" + session.mult + "x";
        get("win-amount").innerHTML = "$" + profit;
        get("win-popup").classList.toggle("visible", true);
        //$("face-btns-overlay").classList.toggle("hidden", false);

        session.on = false;
    }
}



function coinflip(pick) {
    get("heads-btn").classList.toggle("hide", true);
    get("tails-btn").classList.toggle("hide", true);
    get("event-btn").classList.toggle("hide", true);

    get("coin-img").classList.remove("flipToH", "flipToT");

    let r = Math.ceil( Math.random()*2);
    let side;
    switch(r) {
        case 1:
            side = "heads";
            void get("coin-img").offsetWidth;
            get("coin-img").classList.add("flipToH");
            setTimeout(function() {
                get("coin-img").style.backgroundImage = "url('https://waffold.github.io/casino/images/headsface.png')";
            }, 500);
            break;
        case 2:
            side = "tails";
            void get("coin-img").offsetWidth;
            get("coin-img").classList.add("flipToT");
            setTimeout(function() {
                get("coin-img").style.backgroundImage = "url('https://waffold.github.io/casino/images/tailsface.png')";
            }, 500);
            //$("coin-img").classList.toggle("flipToT", true);
            break;
    }
    setTimeout(function() {
        let img = document.createElement("img");
        img.src = "https://waffold.github.io/casino/images/" + side + ".png"
        img.className = "icon"
        get("coin-history").appendChild(img);
        session.history.push(side);
        if(side == pick) {
            if(session.mult == 1) {
                session.mult = 1.96;
            } else {
                session.mult *= 2;
            }
            get("profit-label").innerHTML = "Total Profit (" + session.mult + "x):";
            get("profit-field").innerHTML = ((session.bet * session.mult) - session.bet).toFixed(2);
        } else {
            session.on = false;
            get("profit-area").classList.toggle("hidden", true);
            get("event-btn").innerHTML = "Play";
            get("bet-field-container").disabled = false;
            get("bet-field-container").classList.toggle("hide", false);
            checkInvalidBet();
            //$("face-btns-overlay").classList.toggle("hidden", false);
        }
        if(session.on) {
            get("heads-btn").classList.toggle("hide", false);
            get("tails-btn").classList.toggle("hide", false);
        }
        get("event-btn").classList.toggle("hide", false);
    }, 500);
}

function rendUpgrades() {
    for(let path in updb) {
        get("path" + path).innerHTML = "";
        for(let upg in updb[path]) {
            const data = updb[path][upg];
            let wrap = document.createElement("div");
            wrap.className = "upgrade-wrap";
            let div = document.createElement("div");
            div.className = "upgrade container base-border";

            let inner = document.createElement("div");
            inner.className = "upgrade-inner";
            inner.innerHTML = data.desc;
            let lower = document.createElement("div");
            lower.className = "upgrade-lower";
            lower.innerHTML = data.name;
            let price = document.createElement("span");
            price.className = "inv-price";
            price.innerHTML = "$" + data.price;

            if(user[data.type].count < upg) {
                div.classList.add("hide");
                
            }
            if(user[data.type].count > upg) {
                div.classList.add("bought");
            }

            div.addEventListener("click", function() {
                if(buy(data.price)) {
                    console.log(data.type, user[data.type]);
                    user[data.type].num += data.add;
                    user[data.type].count ++;
                    rendUpgrades();
                    rendCash();
                }
            })
            console.log("path" + path);
            div.appendChild(inner);
            div.appendChild(lower);
            div.appendChild(price);
            wrap.appendChild(div);

            let arrow = document.createElement("img");
            arrow.className = "icon";
            arrow.src = "https://raw.githubusercontent.com/stocknt/csgo/main/icons/down.png";

            get("path" + path).appendChild(wrap);
            console.log(updb[path], updb[path].length, Number(upg)+1);
            if(updb[path].length != Number(upg)+1) {
                get("path" + path).appendChild(arrow);
            }
        }
    }
}

function buy(cost) {
    if(user.cash < cost) {
        return false;
    } else {
        user.cash -= cost;
        return true;
    }
}


window.loadPage = loadPage;
window.coinflipPlay = coinflipPlay();
