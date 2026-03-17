const DEFAULT_VOLUME = 30;
const POSITION_STORAGE_KEY = "warzone_radio_position_v1";
const VOLUME_STORAGE_KEY = "warzone_radio_volume_v1";

let player;
let playing = false;
let order = [];
let pos = 0;

const eq = document.getElementById("eq");
const cover = document.getElementById("cover");
const eqGlow = document.getElementById("eqGlow");
const vol = document.getElementById("vol");
const tube = document.querySelector(".tube");
const versionedAsset = window.versionedAsset || ((path) => path);
const logo = document.querySelector(".logo");

const TUBE_PAD = 6;
const BAR_MIN_WIDTH = 3;
const BAR_GAP = 3;
const BAR_PATTERN = [34, 42, 38, 52, 46, 64, 76, 66, 54, 46, 40, 38];

if (logo && logo.dataset.assetPath) {
  logo.src = versionedAsset(logo.dataset.assetPath);
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function readStoredVolume() {
  try {
    const stored = parseInt(localStorage.getItem(VOLUME_STORAGE_KEY), 10);
    if (Number.isFinite(stored)) {
      return clampNumber(stored, 0, 100);
    }
  } catch (error) {}
  return DEFAULT_VOLUME;
}

function writeStoredVolume(value) {
  try {
    localStorage.setItem(VOLUME_STORAGE_KEY, String(value));
  } catch (error) {}
}

function activeFillWidth(value) {
  return Math.max(0, Math.round(tube.clientWidth * value / 100));
}

function activeEqWidth(value) {
  return Math.max(0, activeFillWidth(value) - TUBE_PAD);
}

function buildBars() {
  const count = Math.max(6, Math.floor((eq.clientWidth + BAR_GAP) / (BAR_MIN_WIDTH + BAR_GAP)));
  if (eq.childElementCount === count) {
    return;
  }

  eq.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${20 + Math.random() * 60}%`;
    eq.appendChild(bar);
  }
}

function syncEq(value) {
  const width = activeEqWidth(value);
  const fillWidth = activeFillWidth(value);
  eq.style.width = `${width}px`;
  cover.style.left = `${fillWidth}px`;
  eqGlow.style.width = `${fillWidth}px`;
  buildBars();
}

function animateBars() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    const base = BAR_PATTERN[index % BAR_PATTERN.length];
    const motion = playing ? ((Math.sin(Date.now() / 180 + index * 0.75) + 1) * 7 + Math.random() * 4) : 0;
    bar.style.height = `${Math.min(96, Math.max(22, base + motion))}%`;
    bar.style.opacity = playing ? "1" : "0.45";
  });
}

function setVol(nextValue) {
  const value = clampNumber(parseInt(nextValue, 10) || 0, 0, 100);
  vol.value = String(value);
  syncEq(value);
  writeStoredVolume(value);
  if (player) {
    player.setVolume(value);
  }
}

function shuffle(count) {
  order = [...Array(count).keys()].sort(() => Math.random() - 0.5);
  pos = 0;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    playerVars: {
      listType: "playlist",
      list: "PLBjhKnTGZP1Bwc4UL1sTF7j1gUR8bh2y5",
      autoplay: 1,
      mute: 1,
      controls: 0,
      rel: 0,
      playsinline: 1
    },
    events: {
      onReady: () => {
        setVol(vol.value);
        const list = player.getPlaylist();
        shuffle(list.length);
        player.playVideoAt(order[pos]);
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          playing = true;
          updateIcon();
        }
        if (event.data === YT.PlayerState.PAUSED) {
          playing = false;
          updateIcon();
        }
        if (event.data === YT.PlayerState.ENDED) {
          playing = false;
          updateIcon();
          nextTrack();
        }
      }
    }
  });
}

function updateIcon() {
  document.getElementById("pp").innerHTML = playing
    ? '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>'
    : '<svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg>';
}

function playPause() {
  if (!player) {
    return;
  }

  if (playing) {
    player.pauseVideo();
    playing = false;
  } else {
    player.playVideo();
    playing = true;
  }

  updateIcon();
}

function nextTrack() {
  if (!player) {
    return;
  }

  pos += 1;
  player.playVideoAt(order[pos % order.length]);
}

function prevTrack() {
  if (!player) {
    return;
  }

  pos = (pos - 1 + order.length) % order.length;
  player.playVideoAt(order[pos]);
}

document.addEventListener("click", () => {
  setTimeout(() => {
    if (player) {
      try {
        player.unMute();
        player.playVideo();
      } catch (error) {}
    }
  }, 1000);
}, { once: true });

(function initDragPosition() {
  const wrap = document.getElementById("radioWrap");
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  function getWrapRect() {
    return wrap.getBoundingClientRect();
  }

  function savePosition(left, top) {
    try {
      localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify({ left, top }));
    } catch (error) {}
  }

  try {
    const saved = JSON.parse(localStorage.getItem(POSITION_STORAGE_KEY) || "null");
    if (saved && typeof saved.left === "number" && typeof saved.top === "number") {
      wrap.style.left = `${saved.left}px`;
      wrap.style.top = `${saved.top}px`;
      wrap.style.right = "auto";
    }
  } catch (error) {}

  function onPointerDown(event) {
    if (event.target.closest(".btn, .tube, input, button")) {
      return;
    }

    const rect = getWrapRect();
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startLeft = rect.left;
    startTop = rect.top;

    wrap.style.right = "auto";
    wrap.style.left = `${startLeft}px`;
    wrap.style.top = `${startTop}px`;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(event) {
    if (!dragging) {
      return;
    }

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const maxLeft = window.innerWidth - wrap.offsetWidth;
    const maxTop = window.innerHeight - wrap.offsetHeight;
    const newLeft = clampNumber(startLeft + dx, 0, Math.max(0, maxLeft));
    const newTop = clampNumber(startTop + dy, 0, Math.max(0, maxTop));

    wrap.style.left = `${newLeft}px`;
    wrap.style.top = `${newTop}px`;
  }

  function onPointerUp() {
    if (!dragging) {
      return;
    }

    dragging = false;

    const left = parseFloat(wrap.style.left) || 0;
    const top = parseFloat(wrap.style.top) || 0;
    savePosition(left, top);

    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  }

  wrap.addEventListener("pointerdown", onPointerDown);

  window.addEventListener("resize", () => {
    const rect = getWrapRect();
    const maxLeft = Math.max(0, window.innerWidth - wrap.offsetWidth);
    const maxTop = Math.max(0, window.innerHeight - wrap.offsetHeight);
    const left = clampNumber(rect.left, 0, maxLeft);
    const top = clampNumber(rect.top, 0, maxTop);
    wrap.style.left = `${left}px`;
    wrap.style.top = `${top}px`;
    wrap.style.right = "auto";
    savePosition(left, top);
  });
}());

vol.value = String(readStoredVolume());
setVol(vol.value);
animateBars();
setInterval(animateBars, 120);
window.addEventListener("resize", () => syncEq(parseInt(vol.value, 10) || 0));
