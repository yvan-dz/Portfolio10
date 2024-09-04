window.onload = function() {
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");
    const canvas = document.getElementById("starsCanvas");
    const ctx = canvas.getContext("2d");
    const nameElement = document.getElementById("preloader-name");
    const name = "Michael Johnson"; // Nom à afficher lettre par lettre
    let index = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let starsArray = [];
    const numberOfStars = 100;

    class Star {
        constructor(x, y, radius, speed) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.speed = speed;
            this.opacity = Math.random();
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.opacity += this.speed;
            if (this.opacity > 1 || this.opacity < 0) {
                this.speed = -this.speed;
            }
            this.draw();
        }
    }

    function createStars() {
        starsArray = [];
        for (let i = 0; i < numberOfStars; i++) {
            let radius = Math.random() * 1.5 + 0.5;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let speed = (Math.random() * 0.02) + 0.01;
            starsArray.push(new Star(x, y, radius, speed));
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        starsArray.forEach(star => star.update());
        requestAnimationFrame(animateStars);
    }

    createStars();
    animateStars();

    // Fonction pour afficher les lettres du nom une par une
    function typeWriter() {
        if (index < name.length) {
            nameElement.textContent += name.charAt(index);
            nameElement.style.opacity = 1;  // S'assurer que le texte est visible
            index++;
            setTimeout(typeWriter, 200); // Délai entre chaque lettre (200ms)
        } else {
            // Une fois le nom affiché, attendre un peu, puis faire disparaître le préloader
            setTimeout(function() {
                preloader.style.transition = "opacity 1s ease";  // Transition douce pour le préloader
                preloader.style.opacity = 0;
                setTimeout(() => {
                    preloader.style.display = "none"; // Cacher le préloader
                    mainContent.style.display = "block"; // Afficher le contenu principal
                    mainContent.style.opacity = 1; // Apparition fluide du contenu
                    AOS.refresh(); // Réinitialiser AOS après l'affichage du contenu principal
                }, 1000); // Délai pour permettre la transition d'opacité
            }, 1000); // Attendre 1 seconde après que tout le nom soit affiché
        }
    }

    // Lancer l'animation du nom après 1 seconde de préchargement
    setTimeout(typeWriter, 1000);
};





const canvas = document.getElementById("meteors"); // Canvas pour étoiles et météorites
    const ctx = canvas.getContext("2d");
    let meteorArray = [];
    let starsArray = [];
    const numberOfMeteors = 10; // Nombre de météorites
    const numberOfStars = 100;  // Nombre d'étoiles

    // Ajuster la taille du canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Classe pour créer une étoile scintillante
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 0.5; // Taille de l'étoile
            this.opacity = Math.random();
            this.speed = Math.random() * 0.02 + 0.01; // Vitesse de scintillement
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.opacity += this.speed;
            if (this.opacity > 1 || this.opacity < 0) {
                this.speed = -this.speed;
            }
            this.draw();
        }
    }

    // Classe pour créer une météorite
    class Meteor {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = 0; // Part du haut de l'écran
            this.size = Math.random() * 4 + 2; // Taille de la météorite
            this.length = this.size * 20; // Longueur de la traînée lumineuse
            this.speed = Math.random() * 4 + 4; // Vitesse de la météorite
            this.angle = Math.PI / 4; // Angle de chute (diagonale)
            this.opacity = Math.random() * 0.5 + 0.5; // Opacité pour un effet réaliste
        }

        draw() {
            // Traînée de la météorite
            let gradient = ctx.createLinearGradient(
                this.x, this.y,
                this.x - this.length * Math.cos(this.angle),
                this.y - this.length * Math.sin(this.angle)
            );
            gradient.addColorStop(0, `rgba(255, 165, 0, ${this.opacity})`); // Couleur orange
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`); // Disparition de la traînée

            // Traînée lumineuse
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.size;
            ctx.stroke();
            ctx.closePath();

            // Météorite
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 140, 0, ${this.opacity})`; // Couleur orange vif
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);

            // Si la météorite atteint le bas ou sort de l'écran, elle disparaît
            if (this.x < 0 || this.y > canvas.height) {
                this.reset();
            }

            this.draw();
        }
    }

    // Créer des étoiles scintillantes
    function createStars() {
        starsArray = [];
        for (let i = 0; i < numberOfStars; i++) {
            starsArray.push(new Star());
        }
    }

    // Créer un tableau de météorites
    function createMeteors() {
        meteorArray = [];
        for (let i = 0; i < numberOfMeteors; i++) {
            meteorArray.push(new Meteor());
        }
    }

    // Anime les étoiles et les météorites
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas à chaque frame
        starsArray.forEach(star => star.update()); // Met à jour les étoiles
        meteorArray.forEach(meteor => meteor.update()); // Met à jour les météorites
        requestAnimationFrame(animate); // Boucle d'animation
    }

    // Initialisation
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Redimensionne le canvas à la taille de la fenêtre
    createStars();  // Crée les étoiles
    createMeteors(); // Crée les météorites
    animate(); // Lancer l'animation des étoiles et des météorites
