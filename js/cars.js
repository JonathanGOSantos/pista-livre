const searchInput = document.getElementById('cars-search-input');
const searchContainer = document.querySelector('.c-cars .c-search');
const displayField = document.querySelector('.c-cars__content');
let cars = [];

// Função para verificar se o input tem valor
function checkInput() {
  if (searchInput.value.trim() !== '') {
    searchContainer.classList.add('has-value');
  } else {
    searchContainer.classList.remove('has-value');
  }
}

// Função para exibir os carros (pode ser usada novamente após o filtro)
function displayCars(carsToDisplay) {
  displayField.innerHTML = ''; // Limpa a área de exibição antes de adicionar novos carros
  carsToDisplay.forEach((car) => {
    const carElement = document.createElement('article');
    carElement.classList.add('c-cars__card');

    const tags = car.tags
      .map((tag) => `<li class="c-card__tag">${tag}</li>`)
      .join('');

    carElement.innerHTML = `
                <header class="c-card__header">
                <h3 class="c-card__title">${car.model}</h3>
                
                  <ul class="c-card__tags">
                    ${tags}
                  </ul>
                </header>
                <section class="c-card__content">
                  <ul class="c-card__infos">
                    <li class="c-card__info">
                      <h4 class="c-card__info--title">Motor:</h4>
                      <span class="c-card__info--value">${car.horsepower} cv</span>
                    </li>
                    <li class="c-card__info">
                      <h4 class="c-card__info--title">0-100 km/h:</h4>
                      <span class="c-card__info--value">${car.acceleration} s</span>
                    </li>
                    <li class="c-card__info">
                      <h4 class="c-card__info--title">Velocidade máxima:</h4>
                      <span class="c-card__info--value">${car.topSpeed} km/h</span>
                    </li>
                  </ul>
                </section>
                <footer class="c-card__footer">
                  <a class="c-card__button" href="${car.link}" target="_blank"> Saiba mais </a>
                </footer>
            `;
    displayField.appendChild(carElement);
  });
}

// Função de pesquisa
function searchCars() {
  const query = searchInput.value.toLowerCase().trim();
  const filteredCars = cars.filter((car) => {
    return (
      car.model.toLowerCase().includes(query) || // Filtra pelo modelo
      car.tags.some((tag) => tag.toLowerCase().includes(query)) // Filtra pelas tags
    );
  });

  // Exibe os carros filtrados
  displayCars(filteredCars);
}

// Verificar quando o input tem valor (ao digitar ou perder foco)
searchInput.addEventListener('input', () => {
  checkInput();
  searchCars(); // Realiza a pesquisa sempre que o input mudar
});

searchInput.addEventListener('blur', checkInput);

// Verificar o estado inicial caso o input já tenha valor
checkInput();

// Carregar os dados dos carros
fetch('data/database.json')
  .then((response) => response.json())
  .then((data) => {
    // Obter os carros
    cars = data.cars;

    // Ordenar os carros por modelo
    cars.sort((a, b) => a.model.localeCompare(b.model));

    // Exibir todos os carros inicialmente
    displayCars(cars);
  })
  .catch((error) => console.error('Erro ao carregar os carros:', error));
