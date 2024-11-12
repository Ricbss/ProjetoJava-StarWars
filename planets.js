let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
  try {
    await loadPlanets(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar os planetas');
  }

  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  nextButton.addEventListener('click', loadNextPage);
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadPlanets(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((planet) => {
      const planetId = planet.url.replace(/\D/g, ""); // Extrai o ID da URL

      const card = document.createElement("div");
      card.className = "cards";
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg')`; // Usa o ID para acessar a imagem

      const planetNameBG = document.createElement("div");
      planetNameBG.className = "planet-name-bg";

      const planetName = document.createElement("span");
      planetName.className = "planet-name";
      planetName.innerText = `${planet.name}`;

      planetNameBG.appendChild(planetName);
      card.appendChild(planetNameBG);

      // Configuração do modal para detalhes do planeta
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const planetImage = document.createElement("div");
        planetImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg')`; // Usa o ID para acessar a imagem
        planetImage.className = "planet-image";

        const name = document.createElement("span");
        name.className = "planet-details";
        name.innerText = `Nome: ${planet.name}`;

        const rotationPeriod = document.createElement("span");
        rotationPeriod.className = "planet-details";
        rotationPeriod.innerText = `Período de Rotação: ${planet.rotation_period} horas`;

        const orbitalPeriod = document.createElement("span");
        orbitalPeriod.className = "planet-details";
        orbitalPeriod.innerText = `Período Orbital: ${planet.orbital_period} dias`;

        const diameter = document.createElement("span");
        diameter.className = "planet-details";
        diameter.innerText = `Diâmetro: ${planet.diameter} km`;

        const climate = document.createElement("span");
        climate.className = "planet-details";
        climate.innerText = `Clima: ${planet.climate}`;

        const gravity = document.createElement("span");
        gravity.className = "planet-details";
        gravity.innerText = `Gravidade: ${planet.gravity}`;

        modalContent.appendChild(planetImage);
        modalContent.appendChild(name);
        modalContent.appendChild(rotationPeriod);
        modalContent.appendChild(orbitalPeriod);
        modalContent.appendChild(diameter);
        modalContent.appendChild(climate);
        modalContent.appendChild(gravity);
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
    alert('Erro ao carregar os planetas');
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
      await loadPlanets(responseJson.next);
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
      await loadPlanets(responseJson.previous);
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
