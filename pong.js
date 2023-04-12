const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const vitesseIA = 3;

class Raquette {
    constructor(x, y, largeur, hauteur) {
        this.x = x;
        this.y = y;
        this.largeur = largeur;
        this.hauteur = hauteur;
    }

    dessiner() {
        ctx.fillRect(this.x, this.y, this.largeur, this.hauteur);
    }
}

class Balle {
    constructor(x, y, rayon) {
        this.x = x;
        this.y = y;
        this.rayon = rayon;
        this.vx = 4;
        this.vy = 4;
    }

    dessiner() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2);
        ctx.fill();
    }

    deplacer() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

const joueur = new Raquette(20, canvas.height / 2 - 50, 20, 100);
const ia = new Raquette(canvas.width - 40, canvas.height / 2 - 50, 20, 100);
const balle = new Balle(canvas.width / 2, canvas.height / 2, 10);



canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    joueur.y = mouseY - joueur.hauteur / 2;
});

function dessinerLigne() {
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
}

function afficherScore(joueurScore, iaScore) {
    ctx.font = "48px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(joueurScore, canvas.width / 4, 60);
    ctx.fillText(iaScore, (canvas.width / 4) * 3, 60);
}

let joueurScore = 0;
let iaScore = 0;

// ...

function verifierScore() {
    if (balle.x - balle.rayon < 0) {
        iaScore++;
        resetBalle();
    } else if (balle.x + balle.rayon > canvas.width) {
        joueurScore++;
        resetBalle();
    }
}

function resetBalle() {
    balle.x = canvas.width / 2;
    balle.y = canvas.height / 2;
    balle.vx = -balle.vx;
    balle.vy = Math.random() * 6 - 3;
}

function animer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dessinerLigne();
    afficherScore(joueurScore, iaScore);
    verifierScore();

    joueur.dessiner();
    ia.dessiner();
    balle.dessiner();
    balle.deplacer();

    if ((balle.x - balle.rayon <= joueur.x + joueur.largeur && balle.y >= joueur.y && balle.y <= joueur.y + joueur.hauteur) ||
    (balle.x + balle.rayon >= ia.x && balle.y >= ia.y && balle.y <= ia.y + ia.hauteur)) {

    // Calculez la position relative de la balle sur la raquette (entre -0.5 et 0.5)
    const raquetteTouchee = balle.x < canvas.width / 2 ? joueur : ia;
    const positionRelative = (balle.y - (raquetteTouchee.y + raquetteTouchee.hauteur / 2)) / (raquetteTouchee.hauteur / 2);

    // Ajustez la vitesse verticale de la balle en fonction de la position relative
    const angleMax = Math.PI / 4; // Angle maximal de 45 degrés
    const ajustementVy = Math.sin(positionRelative * angleMax) * 5;
    balle.vy = Math.min(Math.max(balle.vy + ajustementVy, -8), 8); // Limitez la vitesse verticale entre -8 et 8

    // Inversez la direction horizontale de la balle
    balle.vx = -balle.vx;

}

     // Ajoutez cette condition pour gérer les rebonds sur les bords supérieur et inférieur du canvas
     if (balle.y - balle.rayon <= 0 || balle.y + balle.rayon >= canvas.height) {
        balle.vy = -balle.vy;
    }


    const deltaY = balle.y - (ia.y + ia.hauteur / 2);
    ia.y += Math.sign(deltaY) * vitesseIA;

    requestAnimationFrame(animer);
}



animer();


