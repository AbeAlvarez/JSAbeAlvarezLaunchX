const pokeCard = document.querySelector('[poke-card]');
const pokeNombre = document.querySelector('[poke-nombre]');
const pokeImg = document.querySelector('[poke-img]');
const pokeCont = document.querySelector('[poke-cont]');
const pokeId = document.querySelector('[poke-id]');
const pokeTipo = document.querySelector('[poke-tipo]');
const pokeStats = document.querySelector('[poke-stats]');

const buscaPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeNombre.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const renderPokemonTypes = types => {
    pokeTipo.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTipo.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeNombre.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './images/fail.jpg');
    pokeImg.style.background =  '#fff';
    pokeTipo.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}