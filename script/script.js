const motsPossibles = ["CHAT", "CHIIEN", "MAISON", "VOITURE"];
const lettreUsee = document.querySelector(".lettreUse");
const imageVictoire = document.querySelector("#imageVictoire");
const imageDefaite = document.querySelector("#imageDefaite");
const boutonProposer = document.querySelector(".btn");
const inputProposerMot = document.querySelector("#proposerMot");
const disabledInput = document.querySelector("#disabledInput");
const boutonNouvellePartie = document.querySelector("#nouvellePartie");
const feu1 = document.querySelector(".feu1");
const feu2 = document.querySelector(".feu2");
const feu3 = document.querySelector(".feu3");
const homer = document.querySelector(".homer");

let motADeviner = "";
let viesRestantes = 5;
let lettresProposees = [];
let jeuEnCours = true;

function choisirMotAleatoire() {
    motADeviner = motsPossibles[Math.floor(Math.random() * motsPossibles.length)];
    document.getElementById("spanMot").textContent = "_ ".repeat(motADeviner.length);
}

document.addEventListener("keydown", (event) => {
    const targetElement = event.target;
    if (jeuEnCours) {
        if (targetElement !== document.querySelector("#proposerMot")) {
            if (/^[a-zA-Z]$/.test(event.key)) {
                const lettreProposee = event.key.toUpperCase();
                LettreClavier(lettreProposee);
            }
        }
    }
});

function LettreClavier(lettre) {
    if (!lettresProposees.includes(lettre)) {
        lettresProposees.push(lettre);
        if (motADeviner.includes(lettre)) {
            const motCache = motADeviner.split('').map(char => lettresProposees.includes(char) ? char : "_").join(' ');
            document.getElementById("spanMot").textContent = motCache;
        } 
        else {
            viesRestantes--;

            const coeurACacher = document.querySelector(`#coeur${viesRestantes + 1}`);
                if (coeurACacher) {
                    coeurACacher.style.display = "none";
                }
        }

        document.querySelector(".lettreUse").textContent = lettresProposees.join(' ');
        
        if (motADeviner === document.getElementById("spanMot").textContent.replace(/ /g, '')) {

            jeuEnCours = false;
            const motComplet = motADeviner.split('').join('');
            document.getElementById("spanMot").textContent = motComplet;
            imageVictoire.style.display = "block"; 
            feu1.style.display = "block"; 
            feu2.style.display = "block";
            feu3.style.display = "block";   
            disabledInput.setAttribute("disabled", "true");
           
        } 
        else if (viesRestantes === 0) {

            jeuEnCours = false;
            const motComplet = motADeviner.split('').join('');
            document.getElementById("spanMot").textContent = motComplet;
            imageDefaite.style.display = "block";
            homer.style.display = "block";
            disabledInput.setAttribute("disabled", "true");
            
        }
    }
}

boutonProposer.addEventListener("click", () => {
    const motPropose = inputProposerMot.value.trim();
    

    if (motPropose.toUpperCase() === motADeviner.toUpperCase()) {

        jeuEnCours = false;
        const motComplet = motADeviner.split('').join('');
        document.getElementById("spanMot").textContent = motComplet;
        imageVictoire.style.display = "block";
        feu1.style.display = "block"; 
        feu2.style.display = "block";
        feu3.style.display = "block";
        disabledInput.setAttribute("disabled", "true");
    } 
    else {

        jeuEnCours = false;
        const motComplet = motADeviner.split('').join('');
        document.getElementById("spanMot").textContent = motComplet;
        imageDefaite.style.display = "block";
        homer.style.display = "block";
        disabledInput.setAttribute("disabled", "true");

        for (let i = 1; i <= 5; i++) {
            const coeur = document.querySelector(`#coeur${i}`);
            coeur.style.display = "none";
        }
    }
});

function openModal() {
    inputProposerMot.value = "";
    
    document.getElementById("arrierePlan").style.display = "block";
    document.getElementById("premierPlan").style.display = "block";
};

let cancelButtons = document.querySelectorAll(".close, .btn, .containerBgOpacity");
    cancelButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            document.getElementById("arrierePlan").style.display = "none";
            document.getElementById("premierPlan").style.display = "none";
        });
    }
);

function nouvellePartie() {

    motADeviner = "";
    viesRestantes = 5;
    lettresProposees = [];
    jeuEnCours = true;

    imageVictoire.style.display = "none";
    imageDefaite.style.display = "none";
    inputProposerMot.value = ""
    lettreUsee.textContent = "";
    disabledInput.removeAttribute("disabled");

    feu1.style.display = "none"; 
    feu2.style.display = "none";
    feu3.style.display = "none";
    homer.style.display = "none";
    
    for (let i = 1; i <= 5; i++) {
        const coeur = document.querySelector(`#coeur${i}`);
        coeur.style.display = "flex";
    }
    
    choisirMotAleatoire();
}

boutonNouvellePartie.addEventListener("click", () => {
    nouvellePartie();
});

choisirMotAleatoire();