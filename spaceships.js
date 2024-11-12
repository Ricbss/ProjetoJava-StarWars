let currentPageUrl = 'https://swapi.dev/api/starships/';

window.onload = async () => {
    try {
        await loadStarships(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar as espaçonaves');
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadStarships(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starship) => {
            const starshipId = starship.url.replace(/\D/g, ""); // Extrai o ID da URL

            const card = document.createElement("div");
            card.className = "cards";
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg')`; // Usa o ID para acessar a imagem

            const starshipNameBG = document.createElement("div");
            starshipNameBG.className = "starship-name-bg";

            const starshipName = document.createElement("span");
            starshipName.className = "starship-name";
            starshipName.innerText = `${starship.name}`;

            starshipNameBG.appendChild(starshipName);
            card.appendChild(starshipNameBG);

            // Configuração do modal para detalhes da espaçonave
            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = '';

                const starshipImage = document.createElement("div");
                starshipImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg')`; // Usa o ID para acessar a imagem
                starshipImage.className = "starship-image";

                const name = document.createElement("span");
                name.className = "starship-details";
                name.innerText = `Nome: ${starship.name}`;

                const model = document.createElement("span");
                model.className = "starship-details";
                model.innerText = `Modelo: ${starship.model}`;

                const manufacturer = document.createElement("span");
                manufacturer.className = "starship-details";
                manufacturer.innerText = `Fabricante: ${starship.manufacturer}`;

                const costInCredits = document.createElement("span");
                costInCredits.className = "starship-details";
                costInCredits.innerText = `Custo: ${starship.cost_in_credits} créditos`;

                const length = document.createElement("span");
                length.className = "starship-details";
                length.innerText = `Comprimento: ${starship.length} m`;

                const crew = document.createElement("span");
                crew.className = "starship-details";
                crew.innerText = `Tripulação: ${starship.crew}`;

                const passengers = document.createElement("span");
                passengers.className = "starship-details";
                passengers.innerText = `Passageiros: ${starship.passengers}`;

                modalContent.appendChild(starshipImage);
                modalContent.appendChild(name);
                modalContent.appendChild(model);
                modalContent.appendChild(manufacturer);
                modalContent.appendChild(costInCredits);
                modalContent.appendChild(length);
                modalContent.appendChild(crew);
                modalContent.appendChild(passengers);
            };

            mainContent.appendChild(card);
        });

        // Configuração dos botões de navegação
        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        currentPageUrl = url;

    } catch (error) {
        alert('Erro ao carregar as espaçonaves');
        console.log(error);
    }
}

// Funções de navegação entre as páginas
async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        if (responseJson.next) {
            await loadStarships(responseJson.next);
        }

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        if (responseJson.previous) {
            await loadStarships(responseJson.previous);
        }

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}
