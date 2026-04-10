const dbPaises = [
    {
        pais: "Sudáfrica",
        pistas: ["Llegó a 3 Copas del Mundo.", "Nunca logró superar la fase de grupos."]
    },
    {
        pais: "Corea del Sur",
        pistas: ["Se les conoce como los 'Tigres del Oriente'.", "Llevan desde 1982 clasificando al mundial."]
    },
    {
        pais: "Túnez",
        pistas: ["Ganó la Copa Africana de Naciones en 2004."]
    },
    {
        pais: "Japón",
        pistas: ["Su primer Mundial fue en 1998.", "Fueron finalistas en la Copa Confederaciones de 2001."]
    },
    {
        pais: "Uzbekistán",
        pistas: ["Se les apoda el 'Gigante Dormido'."]
    },
    {
        pais: "Colombia",
        pistas: ["Son apodados 'Los Cafeteros'."]
    },
    {
        pais: "Uruguay",
        pistas: ["Fue sede de la primera Copa del Mundo.", "Tiene el mejor himno oficial de fútbol."]
    },
    {
        pais: "España",
        pistas: ["Sus jugadores tienen de pasatiempo jugar a las cartas."]
    }
];

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

window.onload = cargarPreguntaAleatoria;