const dbPaises = [
    {
        pais: "Sudáfrica",
        pistas: [
            "Llegó a 3 Copas del Mundo.",
            "Nunca logró superar la fase de grupos.",
            "Fue anfitrión del Mundial 2010.",
            "Su estadio más famoso es el Soccer City.",
            "Su selección es conocida como 'Bafana Bafana'."
        ]
    },
    {
        pais: "Corea del Sur",
        pistas: [
            "Se les conoce como los 'Tigres del Oriente'.",
            "Llevan desde 1982 clasificando al mundial.",
            "Fueron semifinalistas en el Mundial 2002.",
            "Organizaron el Mundial 2002 junto con Japón.",
            "Son uno de los equipos más fuertes de Asia."
        ]
    },
    {
        pais: "Túnez",
        pistas: [
            "Ganó la Copa Africana de Naciones en 2004.",
            "Su selección es conocida como 'Las Águilas de Cartago'.",
            "Fue el primer país africano en ganar un partido mundialista (1978).",
            "Clasifica frecuentemente a la Copa del Mundo.",
            "Se encuentra al norte de África"
        ]
    },
    {
        pais: "Japón",
        pistas: [
            "Su primer Mundial fue en 1998.",
            "Fueron finalistas en la Copa Confederaciones de 2001.",
            "Organizó el Mundial 2002 junto a Corea del Sur.",
            "Su selección es conocida como los 'Samuráis Azules'.",
            "Es uno de los equipos más fuertes de Asia."
        ]
    },
    {
        pais: "Uzbekistán",
        pistas: [
            "Se les apoda el 'Gigante Dormido'.",
            "Nunca ha clasificado a un Mundial.",
            "Pertenece a la Confederación Asiática.",
            "Su capital es Taskent.",
            "Ha estado cerca de clasificar en varias eliminatorias."
        ]
    },
    {
        pais: "Colombia",
        pistas: [
            "Son apodados 'Los Cafeteros'.",
            "Su mejor participación fue en 2014 (cuartos de final).",
            "James Rodríguez fue goleador del Mundial 2014.",
            "Su uniforme principal es amarillo.",
            "Tiene una gran rivalidad con Argentina y Brasil."
        ]
    },
    {
        pais: "Uruguay",
        pistas: [
            "Fue sede de la primera Copa del Mundo.",
            "Ganó los Mundiales de 1930 y 1950.",
            "Protagonizó el famoso 'Maracanazo'.",
            "Su selección es conocida como 'La Celeste'.",
            "Tiene más Copas América que muchos países."
        ]
    },
    {
        pais: "España",
        pistas: [
            "Ganó el Mundial en 2010.",
            "Su apodo es 'La Roja'.",
            "Dominaron el fútbol entre 2008 y 2012.",
            "Ganaron la Eurocopa en 2008 y 2012.",
            "Su estilo de juego es el 'tiki-taka'."
        ]
    }
];
let flashcards = [];
let currentCardIndex = 0;
let respuestaActual = "";
let indicePreguntaAnterior = -1;

function cargarPreguntaAleatoria() {
    let indiceCorrecto;

    do {
        indiceCorrecto = Math.floor(Math.random() * dbPaises.length);
    } while (indiceCorrecto === indicePreguntaAnterior);

    indicePreguntaAnterior = indiceCorrecto;

    const objetoPregunta = dbPaises[indiceCorrecto];
    respuestaActual = objetoPregunta.pais;

    const questionElement = document.getElementById('questionText');
    if (questionElement) {
        const indicePista = Math.floor(Math.random() * objetoPregunta.pistas.length);
        questionElement.innerHTML = objetoPregunta.pistas[indicePista];
    }

    let otrosPaises = dbPaises.filter(item => item.pais !== respuestaActual);

    otrosPaises.sort(() => Math.random() - 0.5);
    let opciones = [respuestaActual, otrosPaises[0].pais, otrosPaises[1].pais, otrosPaises[2].pais];

    opciones.sort(() => Math.random() - 0.5);

    document.getElementById('opt0').innerText = opciones[0];
    document.getElementById('opt1').innerText = opciones[1];
    document.getElementById('opt2').innerText = opciones[2];
    document.getElementById('opt3').innerText = opciones[3];
}

function checkAnswer(boton) {
    const seleccion = boton.querySelector('span').textContent.trim();

    const modalElement = document.getElementById('resultModal');
    const modal = new bootstrap.Modal(modalElement);
    const icono = document.getElementById('modalIcon');
    const titulo = document.getElementById('modalTitle');
    const texto = document.getElementById('modalText');

    console.log("Seleccionó:", seleccion, "| Correcta:", respuestaActual);

    if (seleccion === respuestaActual) {
        icono.innerText = '✧⁺⸜(･ ᗜ ･ )⸝⁺✧';
        titulo.innerText = '¡CORRECTO!';
        titulo.className = "fw-bold text-success";
        texto.innerText = `Muy bien, es ${respuestaActual}`;
    } else {
        icono.innerText = '(－‸ლ)';
        titulo.innerText = 'INCORRECTO';
        titulo.className = "fw-bold text-danger";
        texto.innerText = `La respuesta correcta era: ${respuestaActual}`;
    }

    modal.show();
}

function cargarModoEstudio() {
    const contenedor = document.getElementById("studyList");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    dbPaises.forEach(paisObj => {
        const item = document.createElement("div");
        item.className = "mb-3";

        const titulo = document.createElement("h6");
        titulo.innerText = paisObj.pais;

        const lista = document.createElement("ul");

        paisObj.pistas.forEach(pista => {
            const li = document.createElement("li");
            li.innerText = pista;
            lista.appendChild(li);
        });

        item.appendChild(titulo);
        item.appendChild(lista);
        contenedor.appendChild(item);
    });
}

function toggleEstudio() {
    const estudio = document.getElementById("studyList");
    estudio.style.display = (estudio.style.display === "none") ? "block" : "none";
}

function generarFlashcards() {
    flashcards = [];

    dbPaises.forEach(paisObj => {
        paisObj.pistas.forEach(pista => {
            flashcards.push({
                pregunta: pista,
                respuesta: paisObj.pais
            });
        });
    });

    flashcards.sort(() => Math.random() - 0.5);
}


function flipCard() {
    mostrandoRespuesta = !mostrandoRespuesta;
    mostrarCard();
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    mostrandoRespuesta = false;
    mostrarCard();
}

function prevCard() {
    currentCardIndex =
        (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    mostrandoRespuesta = false;
    mostrarCard();
}

function mostrarCard() {
    const card = flashcards[currentCardIndex];

    document.getElementById("flashcardQuestion").innerText = card.pregunta;
    document.getElementById("flashcardAnswer").innerText = card.respuesta;

    document.getElementById("cardCounter").innerText =
        `${currentCardIndex + 1} / ${flashcards.length}`;

    document.querySelector(".flashcard-container").classList.remove("flipped");
}

function flipCard() {
    document.querySelector(".flashcard-container").classList.toggle("flipped");
}

studyModal.addEventListener('show.bs.modal', () => {
    generarFlashcards();
    currentCardIndex = 0;
    mostrandoRespuesta = false;
    mostrarCard();
});

function mostrarLista() {
    document.getElementById("studyList").style.display = "block";
    document.getElementById("flashcardsContainer").style.display = "none";
}

function mostrarFlashcards() {
    document.getElementById("studyList").style.display = "none";
    document.getElementById("flashcardsContainer").style.display = "block";
}



window.onload = () => {
    const studyModal = document.getElementById('studyModal');

    studyModal.addEventListener('show.bs.modal', () => {
        cargarModoEstudio();
        generarFlashcards();
        currentCardIndex = 0;
        mostrarCard();
        mostrarLista();
    });

    cargarPreguntaAleatoria();
};

