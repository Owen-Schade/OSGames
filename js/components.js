function loadComponent(id, path, attrs = {}) {
  fetch(path)
    .then(res => res.text())
    .then(html => {
      const el = document.getElementById(id);
      el.innerHTML = html;

      if (attrs.type === "ruffle") {
        initRuffle(el, attrs.swf);
      } else if (attrs.type === "iframe") {
        initIframe(el, attrs.src);
      }
    });
}

function initRuffle(container, swfPath) {
  if (!window.RufflePlayer) return;

  const ruffle = window.RufflePlayer.newest();
  const player = ruffle.createPlayer();

  const gameContainer = container.querySelector("#game-container");
  gameContainer.appendChild(player);

  player.load(swfPath);
}

function initIframe(container, src) {
  const gameContainer = container.querySelector("#game-container");

  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.width = "700";
  iframe.height = "500";
  iframe.frameBorder = "0";

  gameContainer.appendChild(iframe);
}