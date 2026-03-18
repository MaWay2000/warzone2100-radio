const DEFAULT_VOLUME = 30;
const POSITION_STORAGE_KEY = "warzone_radio_position_v1";
const VOLUME_STORAGE_KEY = "warzone_radio_volume_v1";
const SHUFFLE_STORAGE_KEY = "warzone_radio_shuffle_v1";
const TRACKS = [
  { id: "Py5lzGVtjAo", title: "Warzone 2100 OST -  Main Menu", length: "3:01" },
  { id: "bv9GzLEOZk4", title: "Warzone 2100 OST - Martin Severn - Nuclear Silence", length: "7:01" },
  { id: "HsgyEmLrNKE", title: "Warzone 2100 OST - Martin Severn - Radar Dish", length: "7:52" },
  { id: "d5kdmyseI9Q", title: "Warzone 2100 OST - Martin Severn - Enfeebling Emptiness", length: "5:00" },
  { id: "IA00X8OrmII", title: "Warzone 2100 OST - AlexTheDacian - Uncertain Future", length: "10:59" },
  { id: "kRyOXti5JrI", title: "Warzone 2100 OST - AlexTheDacian - Recovery Ops", length: "6:59" },
  { id: "dimG8S09UV8", title: "Warzone 2100 OST - AlexTheDacian - Incoming Transmission", length: "5:13" },
  { id: "ntjg7_rSUFI", title: "Warzone 2100 OST - AlexTheDacian - My Kind of Wasteland", length: "7:49" },
  { id: "fapSb205e48", title: "Warzone 2100 OST - AlexTheDacian - Advanced Manufacturing", length: "6:37" },
  { id: "VVFjtC1v_kI", title: "Warzone 2100 OST - AlexTheDacian - The Project", length: "8:13" },
  { id: "3JID8x2G0_o", title: "Warzone 2100 OST - AlexTheDacian - The Collective", length: "12:37" },
  { id: "wyufwpMkzRY", title: "Warzone 2100 OST - AlexTheDacian - Awakend", length: "6:16" },
  { id: "RR5OTGYxCk8", title: "Warzone 2100 OST - AlexTheDacian - New Dawn", length: "6:32" },
  { id: "3QutPACeqRg", title: "Warzone 2100 OST - AlexTheDacian - Broken Dreams", length: "7:06" },
  { id: "yrKdamkYKvk", title: "Warzone 2100 OST - AlexTheDacian - Artifact Beacon", length: "6:06" },
  { id: "PJ2wav5ERJQ", title: "Warzone 2100 OST  - AlexTheDacian - Unexpected Outcome", length: "6:13" },
  { id: "USmw4wgv9as", title: "Warzone 2100 OST - AlexTheDacian - Geiger Ghost Extended v2", length: "8:08" },
  { id: "MEpytWvLP5Q", title: "Warzone 2100 - Aftermath Soundtrack - Menu Theme [Enhanced]", length: "10:49" },
  { id: "sK0C42Q_MAk", title: "Warzone 2100 - Aftermath Soundtrack - Track 17 - Nuclear Heartbeat", length: "7:58" },
  { id: "OeKNXc55Iow", title: "Warzone 2100 - Aftermath Soundtrack - Track 18 - Moonlight Tactics", length: "10:22" },
  { id: "Q9xRuvG-XC4", title: "Warzone 2100 - Aftermath Soundtrack - Track 19 - Undisclosed Location", length: "6:02" },
  { id: "VG4K1b2FJrE", title: "Warzone 2100 - Aftermath Soundtrack - Track 20 - Shifting Realities", length: "9:46" },
  { id: "g76gc2GBeME", title: "Warzone 2100 - Aftermath Soundtrack - Track 21 - The Collapse", length: "10:55" },
  { id: "SF1Cdxw91Vw", title: "Warzone 2100 - Aftermath Soundtrack - Track 22 - Aftershocks", length: "9:49" },
  { id: "eK9QHcoDjHM", title: "Warzone 2100 - Aftermath Soundtrack - Track 23 - Blast Zone", length: "11:21" },
  { id: "d6jpvv8TE0U", title: "Warzone 2100 - Aftermath Soundtrack - Track 24 - Reclamation", length: "8:48" },
  { id: "OYIx649A_bY", title: "Warzone 2100 - Aftermath Soundtrack - Track 25 - Rainout", length: "9:55" },
  { id: "nb9kl8kVahE", title: "Warzone 2100 - Aftermath Soundtrack - Track 26 - Just Rewards", length: "14:08" },
  { id: "1JUDSwBRXOU", title: "Warzone 2100 - Aftermath Soundtrack - Track 27 - Launch Codes", length: "6:59" }
];

let player;
let playing = false;
let playerInitialized = false;
let audioUnlocked = false;
let settingsOpen = false;
let currentTrackIndex = 0;
let shuffleEnabled = readStoredShuffleState();
let shuffleOrder = [];
let shufflePosition = 0;

const eq = document.getElementById("eq");
const cover = document.getElementById("cover");
const eqGlow = document.getElementById("eqGlow");
const vol = document.getElementById("vol");
const tube = document.querySelector(".tube");
const settingsPanel = document.getElementById("settingsPanel");
const settingsButton = document.getElementById("settingsButton");
const settingsTitle = document.getElementById("settingsTitle");
const shuffleToggle = document.getElementById("shuffleToggle");
const shuffleToggleLabel = document.getElementById("shuffleToggleLabel");
const playlistList = document.getElementById("playlistList");
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

function hasPlayerMethod(methodName) {
  return !!player && typeof player[methodName] === "function";
}

function buildShuffledOrder(anchorIndex) {
  const allIndexes = [...Array(TRACKS.length).keys()].filter((index) => index !== anchorIndex);

  for (let index = allIndexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const swapValue = allIndexes[index];
    allIndexes[index] = allIndexes[swapIndex];
    allIndexes[swapIndex] = swapValue;
  }

  return [anchorIndex, ...allIndexes];
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

function readStoredShuffleState() {
  try {
    return localStorage.getItem(SHUFFLE_STORAGE_KEY) === "true";
  } catch (error) {}

  return false;
}

function writeStoredShuffleState(enabled) {
  try {
    localStorage.setItem(SHUFFLE_STORAGE_KEY, String(enabled));
  } catch (error) {}
}

function writeStoredVolume(value) {
  try {
    localStorage.setItem(VOLUME_STORAGE_KEY, String(value));
  } catch (error) {}
}

function formatTrackTitle(title) {
  return title
    .replace(/^Warzone 2100 OST\s*-\s*/i, "")
    .replace(/^Warzone 2100\s*-\s*Aftermath Soundtrack\s*-\s*/i, "")
    .replace(/^Track \d+\s*-\s*/i, "")
    .trim();
}

function updateShuffleUi() {
  if (!shuffleToggle || !shuffleToggleLabel) {
    return;
  }

  shuffleToggle.classList.toggle("is-active", shuffleEnabled);
  shuffleToggle.setAttribute("aria-pressed", String(shuffleEnabled));
  shuffleToggleLabel.textContent = shuffleEnabled ? "Shuffle On" : "Shuffle Off";
}

function resetShuffleOrder(anchorIndex = currentTrackIndex) {
  shuffleOrder = buildShuffledOrder(anchorIndex);
  shufflePosition = 0;
}

function syncShufflePosition(trackIndex) {
  if (!shuffleEnabled) {
    return;
  }

  if (shuffleOrder.length !== TRACKS.length) {
    resetShuffleOrder(trackIndex);
    return;
  }

  const indexInOrder = shuffleOrder.indexOf(trackIndex);
  if (indexInOrder === -1) {
    resetShuffleOrder(trackIndex);
    return;
  }

  shufflePosition = indexInOrder;
}

function syncPlaylistSelection() {
  playlistList.querySelectorAll(".playlist-item").forEach((item) => {
    const index = parseInt(item.dataset.index, 10);
    item.classList.toggle("is-active", index === currentTrackIndex);
  });
}

function renderPlaylist() {
  settingsTitle.textContent = "All Tracks";
  playlistList.innerHTML = "";

  TRACKS.forEach((track, index) => {
    const item = document.createElement("button");
    const trackCopy = document.createElement("span");
    const indexLabel = document.createElement("span");
    const name = document.createElement("span");
    const length = document.createElement("span");

    item.type = "button";
    item.className = "playlist-item";
    item.dataset.index = String(index);
    item.addEventListener("click", () => playTrack(index));

    indexLabel.className = "playlist-index";
    indexLabel.textContent = String(index + 1).padStart(2, "0");

    trackCopy.className = "playlist-copy";

    name.className = "playlist-name";
    name.textContent = formatTrackTitle(track.title);

    length.className = "playlist-length";
    length.textContent = track.length;

    trackCopy.append(name);
    item.append(indexLabel, trackCopy, length);
    playlistList.appendChild(item);
  });

  syncPlaylistSelection();
  updateShuffleUi();
}

function setSettingsOpen(nextState) {
  settingsOpen = nextState;
  settingsPanel.classList.toggle("is-open", settingsOpen);
  settingsButton.classList.toggle("is-open", settingsOpen);
  settingsPanel.setAttribute("aria-hidden", String(!settingsOpen));

  if (settingsOpen) {
    syncPlaylistSelection();
  }
}

function toggleSettingsPanel() {
  setSettingsOpen(!settingsOpen);
}

function closeSettingsPanel() {
  setSettingsOpen(false);
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

  if (hasPlayerMethod("setVolume")) {
    player.setVolume(value);
  }
}

function loadTrack(index, options = {}) {
  const trackIndex = clampNumber(index, 0, TRACKS.length - 1);

  currentTrackIndex = trackIndex;
  if (shuffleEnabled) {
    if (options.resetShuffleOrder) {
      resetShuffleOrder(trackIndex);
    } else {
      syncShufflePosition(trackIndex);
    }
  }

  if (!hasPlayerMethod("loadVideoById")) {
    return false;
  }

  player.loadVideoById(TRACKS[trackIndex].id);

  if (audioUnlocked && hasPlayerMethod("unMute")) {
    try {
      player.unMute();
    } catch (error) {}
  }

  playing = true;
  updateIcon();
  syncPlaylistSelection();
  return true;
}

function playTrack(index) {
  loadTrack(index, { resetShuffleOrder: shuffleEnabled });
}

function toggleShuffleMode() {
  shuffleEnabled = !shuffleEnabled;
  writeStoredShuffleState(shuffleEnabled);

  if (shuffleEnabled) {
    resetShuffleOrder(currentTrackIndex);
  } else {
    shuffleOrder = [];
    shufflePosition = 0;
  }

  updateShuffleUi();
}

function initYouTubePlayer() {
  if (playerInitialized || !window.YT || !window.YT.Player) {
    return;
  }

  playerInitialized = true;
  player = new YT.Player("player", {
    videoId: TRACKS[0].id,
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      rel: 0,
      playsinline: 1
    },
    events: {
      onReady: () => {
        setVol(vol.value);
        loadTrack(currentTrackIndex);
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          playing = true;
          updateIcon();
          syncPlaylistSelection();
        }

        if (event.data === YT.PlayerState.PAUSED) {
          playing = false;
          updateIcon();
          syncPlaylistSelection();
        }

        if (event.data === YT.PlayerState.ENDED) {
          playing = false;
          updateIcon();
          syncPlaylistSelection();
          nextTrack();
        }
      }
    }
  });
}

window.onYouTubeIframeAPIReady = initYouTubePlayer;

if (window.YT && window.YT.Player) {
  initYouTubePlayer();
}

function updateIcon() {
  document.getElementById("pp").innerHTML = playing
    ? '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>'
    : '<svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg>';
}

function unlockAudio() {
  if (audioUnlocked) {
    return;
  }

  audioUnlocked = true;
  document.removeEventListener("pointerdown", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);

  if (hasPlayerMethod("unMute")) {
    try {
      player.unMute();
    } catch (error) {}
  }
}

function playPause() {
  if (!hasPlayerMethod("playVideo") || !hasPlayerMethod("pauseVideo")) {
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
  if (!TRACKS.length) {
    return;
  }

  if (shuffleEnabled) {
    if (shuffleOrder.length !== TRACKS.length) {
      resetShuffleOrder(currentTrackIndex);
    }

    shufflePosition = (shufflePosition + 1) % shuffleOrder.length;
    loadTrack(shuffleOrder[shufflePosition]);
    return;
  }

  const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
  loadTrack(nextIndex);
}

function prevTrack() {
  if (!TRACKS.length) {
    return;
  }

  if (shuffleEnabled) {
    if (shuffleOrder.length !== TRACKS.length) {
      resetShuffleOrder(currentTrackIndex);
    }

    shufflePosition = (shufflePosition - 1 + shuffleOrder.length) % shuffleOrder.length;
    loadTrack(shuffleOrder[shufflePosition]);
    return;
  }

  const previousIndex = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
  loadTrack(previousIndex);
}

document.addEventListener("pointerdown", unlockAudio);
document.addEventListener("keydown", unlockAudio);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSettingsPanel();
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!settingsOpen) {
    return;
  }

  if (event.target.closest("#settingsPanel, #settingsButton")) {
    return;
  }

  closeSettingsPanel();
});

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
    if (event.target.closest(".btn, .tube, input, button, .settings-panel")) {
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

renderPlaylist();
vol.value = String(readStoredVolume());
setVol(vol.value);
animateBars();
setInterval(animateBars, 120);
window.addEventListener("resize", () => syncEq(parseInt(vol.value, 10) || 0));
window.toggleSettingsPanel = toggleSettingsPanel;
window.closeSettingsPanel = closeSettingsPanel;
window.toggleShuffleMode = toggleShuffleMode;
window.playPause = playPause;
window.nextTrack = nextTrack;
window.prevTrack = prevTrack;
window.setVol = setVol;
