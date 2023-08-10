const cards_elmt = document.querySelectorAll("button");
var cards_sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const cards_content = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"];

var has_flipped_card = false;
var flipped_card_id;

function IsPair(cid1, cid2) {
    console.log(cards_content[cards_sequence[cid1]]);
    console.log(cards_content[cards_sequence[cid2]]);
    return cards_content[cards_sequence[cid1]][0] == cards_content[cards_sequence[cid2]][0];
}

function onClick(e) {
    if (e.target.style.backgroundColor == "white")
        return;

    const cid = Number(e.target.id[5]) * 10 + Number(e.target.id[6]);
    e.target.innerText = cards_content[cards_sequence[cid]];
    e.target.style.backgroundColor = "white";

    if (has_flipped_card) {
        if (!IsPair(flipped_card_id, cid)) {
            setTimeout(() => {
                if (!IsPair(flipped_card_id, cid)) {
                    cards_elmt[flipped_card_id].innerHTML = "";
                    cards_elmt[flipped_card_id].style.backgroundColor = "darkgray";

                    cards_elmt[cid].innerHTML = "";
                    cards_elmt[cid].style.backgroundColor = "darkgray";
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
}

for (let card of cards_elmt) {
    card.addEventListener("click", onClick);
}
