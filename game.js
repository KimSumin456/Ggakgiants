const cards_elmt = document.querySelectorAll("button");
var cards_sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var cards_content = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"];

function onClick(e) {
    console.log(e);
    console.log(e.target);
    e.target.style.backgroundColor = "white";
    e.target.innerText = cards_content[e.target.id[5]];
}

for (let card of cards_elmt) {
    card.addEventListener("click", onClick);
}