// Buscar Digimon
async function buscarDigimon(nomeDigitado) {
  const nome = nomeDigitado || document.getElementById("digimonInput").value.toLowerCase();

  const url = `https://digimon-api.vercel.app/api/digimon/name/${nome}`;

  try {
    document.getElementById("resultado").innerHTML = "🔄 Carregando...";

    const res = await fetch(url);
    const data = await res.json();

    const d = data[0];

    document.getElementById("resultado").innerHTML = `
      <h2>${d.name}</h2>
      <img src="${d.img}" alt="${d.name}">
      <p>Nível: ${d.level}</p>
      <button onclick="salvarFavorito('${d.name}')">⭐ Favoritar</button>
    `;
  } catch {
    document.getElementById("resultado").innerHTML = "Não encontrado 😢";
  }
}

// Favoritos
function salvarFavorito(nome) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favoritos.includes(nome)) {
    favoritos.push(nome);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("⭐ Salvo!");
  }
}

function mostrarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  document.getElementById("resultado").innerHTML =
    favoritos.map(f => `<p>⭐ ${f}</p>`).join("");
}

// Tema
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Geolocalização
function obterLocalizacao() {
  navigator.geolocation.getCurrentPosition(pos => {
    alert(`Lat: ${pos.coords.latitude} | Lon: ${pos.coords.longitude}`);
  });
}

// Autocomplete
async function autocomplete() {
  const res = await fetch("https://digimon-api.vercel.app/api/digimon");
  const data = await res.json();

  const input = document.getElementById("digimonInput");

  input.addEventListener("input", () => {
    const valor = input.value.toLowerCase();

    const sugestoes = data
      .filter(d => d.name.toLowerCase().includes(valor))
      .slice(0, 5);

    document.getElementById("resultado").innerHTML =
      sugestoes.map(s => `<p onclick="buscarDigimon('${s.name}')">${s.name}</p>`).join("");
  });
}

autocomplete();

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}