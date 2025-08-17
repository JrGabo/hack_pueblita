// Definición del árbol de decisiones
const careerTree = {
    questions: [
        {
            id: 1,
            text: "¿Qué tipo de actividades te gustan más?",
            options: [
                { text: "Resolver problemas matemáticos o lógicos", value: "analiticas" },
                { text: "Crear cosas nuevas (arte, diseño, música)", value: "creativas" },
                { text: "Ayudar a los demás", value: "sociales" },
                { text: "Experimentar y descubrir cosas nuevas", value: "cientificas" },
                { text: "Organizar y planificar", value: "organizativas" }
            ],
            next: 2
        },
        {
            id: 2,
            text: "De estas habilidades, ¿cuál es tu mayor fortaleza?",
            options: [
                { text: "Pensamiento crítico y análisis", value: "pensamiento_critico" },
                { text: "Creatividad e innovación", value: "creatividad" },
                { text: "Comunicación y relaciones interpersonales", value: "comunicacion" },
                { text: "Paciencia y atención al detalle", value: "detalle" },
                { text: "Liderazgo y toma de decisiones", value: "liderazgo" }
            ],
            next: 3
        },
        {
            id: 3,
            text: "¿Qué tipo de ambiente de trabajo prefieres?",
            options: [
                { text: "Oficina tradicional", value: "oficina" },
                { text: "Laboratorio o campo", value: "laboratorio" },
                { text: "En movimiento o viajando", value: "movimiento" },
                { text: "Desde casa o flexible", value: "remoto" },
                { text: "Ambientes creativos o artísticos", value: "creativo" }
            ],
            next: 4
        },
        {
            id: 4,
            text: "¿Qué área de conocimiento te interesa más?",
            options: [
                { text: "Ciencias exactas (matemáticas, física)", value: "exactas" },
                { text: "Ciencias sociales (psicología, economía)", value: "sociales" },
                { text: "Salud y medicina", value: "salud" },
                { text: "Tecnología e informática", value: "tecnologia" },
                { text: "Artes y humanidades", value: "artes" }
            ],
            next: 5
        },
        {
            id: 5,
            text: "¿Qué habilidad te gustaría desarrollar más?",
            options: [
                { text: "Programación", value: "programacion" },
                { text: "Diseño", value: "diseno" },
                { text: "Investigación", value: "investigacion" },
                { text: "Comunicación", value: "comunicacion" },
                { text: "Gestión", value: "gestion" }
            ],
            next: null // Última pregunta
        }
    ],
    careers: [
        {
            name: "Ingeniería de Software",
            description: "Diseña y desarrolla sistemas y aplicaciones informáticas para resolver problemas complejos.",
            skills: ["programacion", "analiticas", "tecnologia", "pensamiento_critico"],
            environment: ["oficina", "remoto"]
        },
        {
            name: "Medicina",
            description: "Diagnostica y trata enfermedades en pacientes, promoviendo la salud y el bienestar.",
            skills: ["salud", "comunicacion", "detalle", "investigacion"],
            environment: ["laboratorio", "movimiento"]
        },
        {
            name: "Arquitectura",
            description: "Diseña edificios y espacios funcionales que combinan arte y funcionalidad.",
            skills: ["diseno", "creatividad", "organizativas", "gestion"],
            environment: ["oficina", "creativo"]
        },
        {
            name: "Psicología",
            description: "Estudia el comportamiento humano y ayuda a las personas a superar desafíos mentales y emocionales.",
            skills: ["sociales", "comunicacion", "investigacion"],
            environment: ["oficina", "remoto"]
        },
        {
            name: "Matemáticas Aplicadas",
            description: "Aplica teorías matemáticas para resolver problemas en negocios, ingeniería y ciencias.",
            skills: ["exactas", "pensamiento_critico", "analiticas"],
            environment: ["oficina", "laboratorio"]
        },
        {
            name: "Diseño Gráfico",
            description: "Crea comunicaciones visuales efectivas usando tipografía, imágenes y color.",
            skills: ["diseno", "creatividad", "artes"],
            environment: ["creativo", "remoto"]
        },
        {
            name: "Economía",
            description: "Analiza producción, distribución y consumo de bienes y servicios en la sociedad.",
            skills: ["sociales", "pensamiento_critico", "analiticas"],
            environment: ["oficina"]
        },
        {
            name: "Biología",
            description: "Estudia organismos vivos y sus relaciones con el medio ambiente.",
            skills: ["cientificas", "investigacion", "detalle"],
            environment: ["laboratorio"]
        }
    ]
};

// Variables de estado
let currentQuestion = 0;
let userAnswers = {};
const totalQuestions = careerTree.questions.length;

// Elementos del DOM
const questionContainer = document.getElementById('questionContainer');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultContainer = document.getElementById('resultContainer');
const careerResults = document.getElementById('careerResults');
const restartBtn = document.getElementById('restartBtn');

// Función para mostrar la pregunta actual
function showQuestion(index) {
    // Limpiar el contenedor de preguntas
    questionContainer.innerHTML = '';
    
    // Obtener la pregunta actual
    const question = careerTree.questions[index];
    
    // Crear elementos DOM para la pregunta
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-container active';
    questionDiv.id = `question-${question.id}`;
    
    const questionText = document.createElement('h3');
    questionText.className = 'question';
    questionText.textContent = question.text;
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    
    // Crear botones de opciones
    question.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.type = 'button';
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option.text;
        optionBtn.dataset.value = option.value;
        
        // Marcar como seleccionado si ya fue respondido
        if (userAnswers[question.id] === option.value) {
            optionBtn.classList.add('selected');
        }
        
        optionBtn.addEventListener('click', () => {
            // Deseleccionar todas las opciones primero
            const allOptions = optionsDiv.querySelectorAll('.option-btn');
            allOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Seleccionar esta opción
            optionBtn.classList.add('selected');
            userAnswers[question.id] = option.value;
            
            // Habilitar el botón "Siguiente"
            nextBtn.disabled = false;
        });
        
        optionsDiv.appendChild(optionBtn);
    });
    
    // Construir la pregunta
    questionDiv.appendChild(questionText);
    questionDiv.appendChild(optionsDiv);
    questionContainer.appendChild(questionDiv);
    
    // Actualizar la barra de progreso
    progressBar.style.width = `${((index + 1) / totalQuestions) * 100}%`;
    
    // Manejar botones de navegación
    prevBtn.disabled = index === 0;
    
    // Deshabilitar "Siguiente" hasta que se seleccione una opción
    nextBtn.disabled = !userAnswers[question.id];
}

// Función para calcular las carreras recomendadas
function calculateCareers() {
    const recommendedCareers = [];
    
    // Contestar todas las preguntas para obtener mejores resultados
    if (Object.keys(userAnswers).length < totalQuestions) {
        return null;
    }
    
    // Calcular puntaje para cada carrera
    careerTree.careers.forEach(career => {
        let score = 0;
        const totalPossible = career.skills.length + career.environment.length;
        
        // Comparar habilidades
        career.skills.forEach(skill => {
            if (Object.values(userAnswers).includes(skill)) {
                score += 1;
            }
        });
        
        // Comparar ambiente de trabajo
        career.environment.forEach(env => {
            if (Object.values(userAnswers).includes(env)) {
                score += 1;
            }
        });
        
        // Calcular porcentaje de coincidencia
        const matchPercentage = Math.round((score / totalPossible) * 100);
        
        // Solo mostrar carreras con al menos 40% de coincidencia
        if (matchPercentage >= 40) {
            recommendedCareers.push({
                ...career,
                matchPercentage: matchPercentage
            });
        }
    });
    
    // Ordenar por mayor porcentaje de coincidencia
    return recommendedCareers.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// Función para mostrar resultados
function showResults() {
    const careers = calculateCareers();
    
    if (!careers || careers.length === 0) {
        careerResults.innerHTML = '<p>No encontramos carreras que coincidan con tus respuestas. Inténtalo de nuevo.</p>';
        resultContainer.style.display = 'block';
        return;
    }
    
    // Mostrar las 3 mejores coincidencias
    careerResults.innerHTML = '';
    careers.slice(0, 3).forEach(career => {
        const careerCard = document.createElement('div');
        careerCard.className = 'career-card';
        
        const matchBadge = document.createElement('div');
        matchBadge.className = 'match-percentage';
        matchBadge.textContent = `${career.matchPercentage}% Match`;
        
        const title = document.createElement('h3');
        title.textContent = career.name;
        
        const desc = document.createElement('p');
        desc.className = 'career-description';
        desc.textContent = career.description;
        
        const skills = document.createElement('p');
        skills.className = 'career-skills';
        skills.textContent = `Habilidades principales: ${career.skills.join(', ').replace(/_/g, ' ')}`;
        
        careerCard.appendChild(matchBadge);
        careerCard.appendChild(title);
        careerCard.appendChild(desc);
        careerCard.appendChild(skills);
        
        careerResults.appendChild(careerCard);
    });
    
    // Mostrar el contenedor de resultados
    questionContainer.style.display = 'none';
    document.querySelector('.navigation').style.display = 'none';
    resultContainer.style.display = 'block';
}

// Manejar clic en siguiente
nextBtn.addEventListener('click', () => {
    const currentQuestionObj = careerTree.questions[currentQuestion];
    
    // Guardar respuesta
    if (!userAnswers[currentQuestionObj.id]) {
        const selectedOption = document.querySelector(`#question-${currentQuestionObj.id} .option-btn.selected`);
        if (selectedOption) {
            userAnswers[currentQuestionObj.id] = selectedOption.dataset.value;
        }
    }
    
    // Verificar si es la última pregunta
    if (currentQuestionObj.next === null) {
        showResults();
        return;
    }
    
    // Ir a la siguiente pregunta
    currentQuestion++;
    showQuestion(currentQuestion);
});

// Manejar clic en anterior
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

// Manejar reinicio
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = {};
    questionContainer.style.display = 'block';
    document.querySelector('.navigation').style.display = 'flex';
    resultContainer.style.display = 'none';
    showQuestion(currentQuestion);
});

// Inicializar
showQuestion(currentQuestion);



// Todo el código anterior se mantiene igual hasta el final...

// Función para mostrar resultados (actualizada)
function showResults() {
    const careers = calculateCareers();
    
    if (!careers || careers.length === 0) {
        careerResults.innerHTML = '<p>No encontramos carreras que coincidan con tus respuestas. Inténtalo de nuevo.</p>';
        resultContainer.style.display = 'block';
        return;
    }
    
    // Mostrar las 3 mejores coincidencias
    careerResults.innerHTML = '';
    careers.slice(0, 3).forEach(career => {
        const careerCard = document.createElement('div');
        careerCard.className = 'career-card';
        careerCard.dataset.career = encodeURIComponent(JSON.stringify(career));
        
        const matchBadge = document.createElement('div');
        matchBadge.className = 'match-percentage';
        matchBadge.textContent = `${career.matchPercentage}% Match`;
        
        const title = document.createElement('h3');
        title.textContent = career.name;
        
        const desc = document.createElement('p');
        desc.className = 'career-description';
        desc.textContent = career.description;
        
        const skills = document.createElement('p');
        skills.className = 'career-skills';
        skills.textContent = `Habilidades principales: ${career.skills.join(', ').replace(/_/g, ' ')}`;
        
        careerCard.appendChild(matchBadge);
        careerCard.appendChild(title);
        careerCard.appendChild(desc);
        careerCard.appendChild(skills);
        
        careerResults.appendChild(careerCard);
    });
    
    // Mostrar el contenedor de resultados
    questionContainer.style.display = 'none';
    document.querySelector('.navigation').style.display = 'none';
    resultContainer.style.display = 'block';
}

// Elementos del DOM nuevos
const exploreBtn = document.getElementById('exploreBtn');
const exploreModal = document.getElementById('exploreModal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');

// Función para obtener recursos de carrera
function getCareerResources(careerName) {
    const resources = {
        "Ingeniería de Software": [
            {
                title: "Guía de estudio para Ingeniería de Software",
                content: "Recursos recomendados para comenzar en esta carrera.",
                links: [
                    "https://www.coursera.org/courses?query=software%20engineering",
                    "https://www.edx.org/learn/software-engineering"
                ]
            },
            {
                title: "Universidades destacadas en México",
                content: "Instituciones con los mejores programas académicos.",
                links: [
                    "https://www.unam.mx/",
                    "https://www.tecmilenio.mx/es"
                ]
            }
        ],
        "Medicina": [
            {
                title: "Cómo prepararte para Medicina",
                content: "Consejos y pasos para ingresar a esta carrera.",
                links: [
                    "https://www.medigraphic.com/pdfs/medicinaunam/nem-2006/nem064c.pdf",
                    "https://www.facmed.unam.mx/"
                ]
            }
        ],
        // Agregar recursos para las demás carreras
        "default": [
            {
                title: "Orientación vocacional",
                content: "Más información sobre esta carrera y opciones relacionadas.",
                links: [
                    "https://www.orientacionvocacional.org/",
                    "https://www.mi-carrera.com/"
                ]
            }
        ]
    };
    
    return resources[careerName] || resources["default"];
}

// Función para mostrar modal con recursos
function showExploreModal() {
    const careers = calculateCareers();
    if (!careers || careers.length === 0) return;
    
    const topCareer = careers[0];
    modalTitle.textContent = `Explorar ${topCareer.name}`;
    
    const resources = getCareerResources(topCareer.name);
    
    let resourcesHTML = `
        <div class="career-info">
            <h3>${topCareer.name}</h3>
            <p>${topCareer.description}</p>
            <p><strong>Porcentaje de coincidencia:</strong> ${topCareer.matchPercentage}%</p>
        </div>
        <div class="career-resources">
            <h4>Recursos útiles:</h4>
    `;
    
    resources.forEach(resource => {
        resourcesHTML += `
            <div class="resource-card">
                <h4>${resource.title}</h4>
                <p>${resource.content}</p>
                <ul>
        `;
        
        resource.links.forEach(link => {
            resourcesHTML += `<li><a href="${link}" target="_blank">${link}</a></li>`;
        });
        
        resourcesHTML += `
                </ul>
            </div>
        `;
    });
    
    resourcesHTML += `</div>`;
    modalContent.innerHTML = resourcesHTML;
    
    exploreModal.style.display = "block";
}

// Event Listeners nuevos
exploreBtn.addEventListener('click', showExploreModal);

closeBtn.addEventListener('click', () => {
    exploreModal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === exploreModal) {
        exploreModal.style.display = "none";
    }
});

// Inicializar (se mantiene igual)
showQuestion(currentQuestion);



