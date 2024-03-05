async function fetchPokemonSprite() {
  const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
  const pokemonSpriteContainer = document.getElementById('pokemonSpriteContainer');

  
  pokemonSpriteContainer.innerHTML = '';
  pokemonSpriteContainer.classList.remove('animated', 'bouncing');
  //remove the animated and bouncing classes to make sure we start from the initial animation state when a new sprite is loaded

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

   
    const spriteUrl = data.sprites.front_default;
    //this holds the front view sprite url for the pokemon

   
    const pokemonImage = document.createElement('img');
    pokemonImage.src = spriteUrl;
    pokemonImage.alt = `${pokemonName} sprite`;

    pokemonSpriteContainer.appendChild(pokemonImage);

    // Add the animated and bouncing classes
    pokemonSpriteContainer.classList.add('animated', 'bouncing');
  } catch (error) {
    console.error('Error fetching Pokémon sprite:', error);

   
    pokemonSpriteContainer.innerHTML = 'Pokémon not found. Please check the name and spelling also counts.';
    pokemonSpriteContainer.classList.add('error-message');
  }
}


//Change color scheme 

function getRandomColor() {
  const letters = '0123456789ABCDEF';

  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);

  const alpha = 0.2;
  
  const color = `rgba(${randomR}, ${randomG}, ${randomB}, ${alpha})`;

  return color;
}

const changeColorButton = document.getElementById('change-color-btn');
changeColorButton.addEventListener('click', changeColors);


function changeColors() {
  const inputElement = document.getElementById('pokemonName');

  const randomBackgroundColor = getRandomColor();

  inputElement.style.backgroundColor = randomBackgroundColor;
  
}
