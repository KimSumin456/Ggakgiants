// stopwatch
var min = 0, sec = 0;

const StopwatchIntervalId = setInterval(() => {
    {
        sec += 1;

        if (sec >= 60) {
            min += 1;
            sec = 0;
        }

        document.getElementById("stopwatch").innerText = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
}, 1000);

// card
const cards_elmt = document.querySelectorAll("button");
var cards_sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const cards_key = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"];
const cards_value = {
    "A1": "황성빈",
    "A2": "https://file.giantsclub.com/upload2014/Player/50500_s.jpg",
    "B1": "손성빈",
    "B2": "https://file.giantsclub.com/upload2014/Player/51528_s.jpg",
    "C1": "정훈",
    "C2": "https://file.giantsclub.com/upload2014/Player/60523_s.jpg",
    "D1": "구승민",
    "D2": "https://file.giantsclub.com/upload2014/Player/63543_s.jpg",
    "E1": "한동희",
    "E2": "https://file.giantsclub.com/upload2014/Player/68525_s.jpg",
    "F1": "이정훈",
    "F2": "https://file.giantsclub.com/upload2014/Player/67644_s.jpg",
    "G1": "고승민",
    "G2": "https://file.giantsclub.com/upload2014/Player/69517_s.jpg",
    "H1": "윤동희",
    "H2": "https://file.giantsclub.com/upload2014/Player/52591_s.jpg",
};

function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; --i) {
        let j = Math.floor(Math.random() * 10);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

shuffle(cards_sequence);


var has_flipped_card = false;
var flipped_card_id;

var num_flipped_card = 0;

function IsPair(cid1, cid2) {
    return cards_key[cards_sequence[cid1]][0] == cards_key[cards_sequence[cid2]][0];
}

function onClick(e) {
    if (e.target.getAttribute("clicked") == "true")
        return;

    e.target.setAttribute("clicked", "true");

    num_flipped_card += 1;

    const cid = Number(e.target.id[5]) * 10 + Number(e.target.id[6]);
    const cseq = cards_sequence[cid];
    const ckey = cards_key[cseq];
    const cvalue = cards_value[ckey];

    if (cvalue[0] != 'h') { //https의 h
        e.target.innerText = cvalue;
        e.target.style.backgroundColor = "white";
    }
    else {
        e.target.style.backgroundImage = `url(${cvalue})`;
    }

    document.getElementById("name").innerText = cards_value[ckey[0] + '1'];
    document.getElementById("picture").style.backgroundImage = `url(${cards_value[ckey[0] + '2'].replace('s.jpg', 'm.png')})`;

    if (has_flipped_card) {
        if (!IsPair(flipped_card_id, cid)) {
            setTimeout(() => {
                if (!IsPair(flipped_card_id, cid)) {
                    num_flipped_card -= 2;

                    cards_elmt[flipped_card_id].innerHTML = "";
                    cards_elmt[flipped_card_id].style.backgroundImage = "";
                    cards_elmt[flipped_card_id].style.backgroundColor = "darkgray";
                    cards_elmt[flipped_card_id].setAttribute("clicked", false);

                    e.target.innerHTML = "";
                    e.target.style.backgroundImage = "";
                    e.target.style.backgroundColor = "darkgray";
                    e.target.setAttribute("clicked", false);
                }

                has_flipped_card = false;
            }, 500);
        }

        has_flipped_card = false;
    }
    else {
        flipped_card_id = cid;
        has_flipped_card = true;
    }

    if (num_flipped_card == 16) {
        clearInterval(StopwatchIntervalId);
        setTimeout(() => {
            var userTime = document.getElementById("stopwatch").innerText;
            var userName = window.prompt("Win! What's your name?");

            window.alert(`${userName} won the game in ${userTime}.`);
        }, 100);
    }
}

for (let card of cards_elmt) {
    card.addEventListener("click", onClick);
}