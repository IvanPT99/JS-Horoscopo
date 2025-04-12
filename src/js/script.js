window.addEventListener("DOMContentLoaded", () => {
    let app = document.getElementById("app");

    let introContainer = document.createElement("div");
    introContainer.id = "introContainer";
    introContainer.style.display = "flex";
    introContainer.style.flexDirection = "column";
    introContainer.style.alignItems = "center";
    introContainer.style.justifyContent = "center";
    introContainer.style.height = "100vh";
    introContainer.style.textAlign = "center";
    introContainer.style.padding = "20px";
    introContainer.style.boxSizing = "border-box";

    let title = document.createElement("h2");
    title.textContent = "¿Eres una loquita que le gusta el horóscopo o la chica que te gusta te ha preguntado tu horóscopo?";
    title.style.maxWidth = "600px";
    title.style.marginBottom = "40px";

    let buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.gap = "30px";

    let btnYes = document.createElement("button");
    btnYes.textContent = "Sí";
    btnYes.style.backgroundColor = "green";
    btnYes.style.color = "white";
    btnYes.style.fontSize = "24px";
    btnYes.style.padding = "20px 40px";
    btnYes.style.border = "none";
    btnYes.style.borderRadius = "10px";
    btnYes.style.cursor = "pointer";

    let noWrapper = document.createElement("div");
    noWrapper.style.display = "flex";
    noWrapper.style.flexDirection = "column";
    noWrapper.style.alignItems = "center";

    let btnNo = document.createElement("button");
    btnNo.textContent = "No";
    btnNo.style.backgroundColor = "red";
    btnNo.style.color = "white";
    btnNo.style.fontSize = "24px";
    btnNo.style.padding = "20px 40px";
    btnNo.style.border = "none";
    btnNo.style.borderRadius = "10px";
    btnNo.style.cursor = "pointer";

    noWrapper.appendChild(btnNo);

    buttonsContainer.appendChild(btnYes);
    buttonsContainer.appendChild(noWrapper);

    introContainer.appendChild(title);
    introContainer.appendChild(buttonsContainer);

    app.appendChild(introContainer);

    btnYes.addEventListener("click", () => {
        introContainer.style.display = "none";
        loadXMLDoc();
    });

    btnNo.addEventListener("click", () => {
        alert("¡Salvado por los astros! Huye de esta locura.");
        introContainer.style.display = "none";
    });
});


function loadXMLDoc() {
    fetch('src/data.xml')
        .then(res => res.text())
        .then(xmlString => {

            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlString, "text/xml");

            let signs = [...xmlDoc.getElementsByTagName("sign")].map(sign => ({
                name: sign.getAttribute("name"),
                start: sign.getAttribute("start"),
                end: sign.getAttribute("end"),
                src: sign.getAttribute("src"),
                eng: sign.getAttribute("eng"),
                description: sign.getAttribute("description"),
            }));

            let animals = [...xmlDoc.getElementsByTagName("animal")].map(animal => ({
                name: animal.getAttribute("name"),
                years: animal.getAttribute("years").split(',').map(Number),
                src: animal.getAttribute("src"),
            }));
            startApp(signs, animals);
        });
}

function startApp(signs, animals) {
    let signsContainer = document.createElement("div");
    signsContainer.id = "signsContainer";
    signsContainer.style.display = "flex";

    let title = document.createElement("h2");
    title.textContent = "Horóscopo y signos zodiacales";
    app.appendChild(title);

    let grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gap = "20px";
    grid.style.width = "50%";

    signs.forEach(sign => {
        let card = document.createElement("div");
        card.style.textAlign = "center";

        let img = document.createElement("img");
        img.src = `src/media/${sign.src}`;
        img.alt = sign.name;
        img.style.width = "60px";

        let name = document.createElement("div");
        name.textContent = sign.name;
        name.style.fontWeight = "bold";

        let range = document.createElement("div");
        range.textContent = `${sign.start} - ${sign.end}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(range);

        grid.appendChild(card);
    });

    let selectedSign = document.createElement("div");
    selectedSign.id = "selectedSign";
    selectedSign.style.width = "50%";
    selectedSign.style.minHeight = "200px";
    selectedSign.style.borderLeft = "2px solid #ddd";
    selectedSign.style.paddingLeft = "20px";

    signsContainer.appendChild(grid);
    signsContainer.appendChild(selectedSign);
    signsContainer.style.marginBottom = "40px";

    let selectContainer = document.createElement("div");
    selectContainer.id = "selectContainer";

    let question = document.createElement("h2");
    question.textContent = "¿Cuál es mi signo del zodíaco? ¿Y mi horóscopo chino?";
    selectContainer.appendChild(question);

    let label = document.createElement("label");
    label.textContent = "Introduce tu fecha de nacimiento: ";
    let inputFecha = document.createElement("input");
    inputFecha.type = "date";
    inputFecha.addEventListener("change", () => {
        console.log("Fecha introducida:", inputFecha.value); 
        let dateStr = inputFecha.value;
        if (!dateStr) return;

        let [year, month, day] = dateStr.split("-").map(num => parseInt(num));

        let signo = getSignByDate(signs, day, month);
        let animal = getChineseAnimalByYear(animals, year);

        if (!signo || !animal) return;

        selectedSign.innerHTML = `
           <div style="text-align: left;">
                <div style="display: flex; flex-direction: column; align-items: center; width: max-content; margin-left: 0;">
                    <img src="src/media/${signo.src}" alt="${signo.name}" style="width: 60px; margin-bottom: 8px;">
                    <div style="font-weight: bold;">${signo.name}</div>
                    <div>${signo.start} - ${signo.end}</div>
                </div>
                <h2>PREDICCIÓN DE HOY</h2>
                    <p id="todaysText">Cargando predicción...</p>
                    <h2>CARACTERÍSTICAS DEL SIGNO</h2>
                    <p id="signProperties">${signo.description}</p>
                </div>
        `;

        fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo.eng}&day=TODAY`)
        .then(response => response.json())
        .then(data => {
            let horoscopeText = data.data.horoscope_data || "No hay predicción disponible para hoy.";
            document.getElementById("todaysText").innerText = horoscopeText;
        })
        .catch(error => {
            console.error('Error al obtener el horóscopo:', error);
            document.getElementById("todaysText").innerText = "Error al obtener la predicción.";
        });

        responsiveAnswerContainer.innerHTML = `
            <p>Tu signo zodiacal es: <strong>${signo.name}</strong></p>
            <p>Tu horóscopo chino es: <strong>${animal.name}</strong></p>
        `;
    });

    label.appendChild(inputFecha);
    selectContainer.appendChild(label);

    let responsiveAnswerContainer = document.createElement("div");
    responsiveAnswerContainer.id = "responsiveAnswerContainer";
    selectContainer.appendChild(responsiveAnswerContainer);

    let chineseSignContainer = document.createElement("div");
    chineseSignContainer.id = "chineseSignContainer";
    chineseSignContainer.style.marginTop = "60px";

    let chineseTitle = document.createElement("h2");
    chineseTitle.textContent = "El Horóscopo chino";
    chineseTitle.style.marginBottom = "20px";
    chineseSignContainer.appendChild(chineseTitle);

    let table = document.createElement("table");
    table.style.borderCollapse = "collapse";

    let tbody = document.createElement("tbody");

    for (let i = 0; i < animals.length; i += 3) {
        let row = document.createElement("tr");

        for (let j = i; j < i + 3; j++) {
            let animal = animals[j];
            let cell = document.createElement("td");
            cell.style.textAlign = "center";
            cell.style.padding = "10px 20px";
            cell.style.border = "1px solid #ddd";

            let img = document.createElement("img");
            img.src = `src/media/${animal.src}`;
            img.alt = animal.name;
            img.style.width = "60px";
            img.style.marginBottom = "10px";
            img.style.display = "block";
            img.style.marginInline = "auto";

            let name = document.createElement("div");
            name.textContent = animal.name;
            name.style.fontWeight = "bold";
            name.style.marginTop = "5px";

            cell.appendChild(img);
            cell.appendChild(name);
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    chineseSignContainer.appendChild(table);

    app.appendChild(signsContainer);
    app.appendChild(selectContainer);
    app.appendChild(chineseSignContainer);

}

function getSignByDate(signs, day, month) {
    const date = month * 100 + day;

    for (let sign of signs) {
        const [startDay, startMonth] = sign.start.split("/").map(Number);
        const [endDay, endMonth] = sign.end.split("/").map(Number);
        const start = startMonth * 100 + startDay;
        const end = endMonth * 100 + endDay;

        if (start <= end) {
            if (date >= start && date <= end) {
                return sign;
            }
        } else {
            if (date >= start || date <= end) {
                return sign;
            }
        }
    }

    return null;
}


function getChineseAnimalByYear(animals, year) {
    return animals.find(animal => animal.years.includes(year)) || null;
}