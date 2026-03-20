const gameList = document.getElementById('gameList');
const searchInput = document.getElementById('search');

let data = { games: [] };

function displayGames(games) {
  gameList.innerHTML = '';

  if (!games || games.length === 0) {
    gameList.innerHTML = '<p>No games found.</p>';
    return;
  }

  games.forEach(game => {
    const div = document.createElement('a');
    div.className = 'game';
    div.href = game.path;

    div.innerHTML = `
      <img class="gameThumbnail" src="${game.thumbnail}"></img>
      <div class="gameInfo">
        <div class="gameTitle">${game.title}</div>
        <div class="gameDescription">${game.description}</div>
      </div>
    `;

    gameList.appendChild(div);
  });
}

function filterGames(query) {
  const filtered = data.games.filter(game =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  displayGames(filtered);
}

async function loadGames() {
  try {
    const response = await fetch('data/games.json');
    data = await response.json();
    displayGames(data.games);
  } catch (err) {
    gameList.innerHTML = '<p>Failed to load games.</p>';
    console.error(err);
  }
}

// Attach events
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    filterGames(e.target.value);
  });
}

// Initialize
loadGames();