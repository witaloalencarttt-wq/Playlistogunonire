
/*
  PROTOTIPO DE DEMONSTRACAO.
  A senha abaixo fica visivel no codigo publicado.
  Nao use esta versao para proteger conteudo confidencial.
*/

const SHARED_PASSWORD = "0000";

const playlists = [
  {
    title: "Defumação 🍃",
    category: "Defumação",
    description: "JUREMÊEEEE.",
    icon: "🍃",
    playlistId: "PLChfAxOjiDFo"
  },
  {
    title: "Abertura ❤️‍🔥",
    category: "Abertura",
    description: "Salve Tranca Ruas e Dama da Noite",
    icon: "❤️‍🔥",
    playlistId: "PLepdMMWdyUcY"
  },
  {
    title: "Exú 🔱",
    category: "Rap",
    description: "Odara, morador da encruzilhada",
    icon: "🔱",
    playlistId: "COLOQUE_O_ID_DA_PLAYLIST"
  },
  {
    title: "Lo-fi Focus",
    category: "Estudos",
    description: "Som para manter o foco.",
    icon: "🎧",
    playlistId: "COLOQUE_O_ID_DA_PLAYLIST"
  },
  {
    title: "Electronic Vibes",
    category: "Eletrônica",
    description: "Batidas para entrar no ritmo.",
    icon: "🔊",
    playlistId: "COLOQUE_O_ID_DA_PLAYLIST"
  }
];

const loginScreen = document.querySelector("#login-screen");
const appScreen = document.querySelector("#app-screen");
const loginForm = document.querySelector("#login-form");
const passwordInput = document.querySelector("#password");
const loginError = document.querySelector("#login-error");
const categoryList = document.querySelector("#category-list");
const playlistList = document.querySelector("#playlist-list");
const playerSection = document.querySelector("#player-section");
const playerTitle = document.querySelector("#player-title");
const youtubePlayer = document.querySelector("#youtube-player");

let selectedCategory = "Todas";

function login(event) {
  event.preventDefault();

  if (passwordInput.value !== SHARED_PASSWORD) {
    loginError.textContent = "Senha incorreta. Tente novamente.";
    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  loginError.textContent = "";
  loginScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
  renderCategories();
  renderPlaylists();
}

function renderCategories() {
  const categories = [
    "Todas",
    ...new Set(playlists.map(item => item.category))
  ];

  categoryList.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = category;

    if (category === selectedCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectedCategory = category;
      renderCategories();
      renderPlaylists();
    });

    categoryList.appendChild(button);
  });
}

function renderPlaylists() {
  playlistList.innerHTML = "";

  const filtered = selectedCategory === "Todas"
    ? playlists
    : playlists.filter(item => item.category === selectedCategory);

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "playlist-card";

    const cover = document.createElement("div");
    cover.className = "playlist-cover";
    cover.textContent = item.icon;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const button = document.createElement("button");
    button.className = "play-button";
    button.textContent = "▶ Reproduzir playlist";

    button.addEventListener("click", () => playPlaylist(item));

    card.append(cover, title, description, button);
    playlistList.appendChild(card);
  });
}

function playPlaylist(item) {
  // Evita tentar carregar os IDs de exemplo.
  if (!/^[A-Za-z0-9_-]+$/.test(item.playlistId) ||
      item.playlistId === "COLOQUE_O_ID_DA_PLAYLIST") {
    alert("Adicione o ID real desta playlist no arquivo script.js.");
    return;
  }

  playerTitle.textContent = item.title;
  youtubePlayer.src =
    "https://www.youtube-nocookie.com/embed/videoseries?list=" +
    encodeURIComponent(item.playlistId);

  playerSection.classList.remove("hidden");
  playerSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function closePlayer() {
  youtubePlayer.src = "about:blank";
  playerSection.classList.add("hidden");
}

function logout() {
  passwordInput.value = "";
  loginScreen.classList.remove("hidden");
  appScreen.classList.add("hidden");
  closePlayer();
}

loginForm.addEventListener("submit", login);

document.querySelector("#logout-button")
  .addEventListener("click", logout);

document.querySelector("#close-player")
  .addEventListener("click", closePlayer);
