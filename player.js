const DEFAULT_VOLUME = 30;
const POSITION_STORAGE_KEY = "warzone_radio_position_v1";
const VOLUME_STORAGE_KEY = "warzone_radio_volume_v1";
const ACTIVE_PLAYLIST_STORAGE_KEY = "warzone_radio_playlist_v1";
const PLAYLISTS = [
  {
    key: "ost",
    title: "Warzone 2100 OST",
    playlistId: "PLBjhKnTGZP1Bwc4UL1sTF7j1gUR8bh2y5",
    tracks: [
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
      { id: "USmw4wgv9as", title: "Warzone 2100 OST - AlexTheDacian - Geiger Ghost Extended v2", length: "8:08" }
    ]
  },
  {
    key: "legacy",
    title: "Warzone 2100 - Legacy Soundtrack",
    playlistId: "PL-Qt8zXK51N-9dePu7NYvO9B8ffzS5_kz",
    tracks: [
      { id: "rV3jD-XpHQk", title: "Warzone 2100 - Legacy Soundtrack - Track 4 - Uncertain Future", length: "10:59" },
      { id: "bs_fpYuRW2U", title: "Warzone 2100 - Legacy Soundtrack - Track 5 - Recovery Ops", length: "6:59" },
      { id: "AAmyIgEjGGY", title: "Warzone 2100 - Legacy Soundtrack - Track 6 - Incoming Transmission", length: "5:13" },
      { id: "qB1TF77rlNs", title: "Warzone 2100 - Legacy Soundtrack - Track 7 - My Kind of Wasteland", length: "7:49" },
      { id: "OwlhObtvdQM", title: "Warzone 2100 - Legacy Soundtrack - Track 8 - Advanced Manufacturing", length: "6:37" },
      { id: "neQ43B7RCTM", title: "Warzone 2100 - Legacy Soundtrack - Track 9 - The Project", length: "8:13" },
      { id: "uw4hHN0hUbk", title: "Warzone 2100 - Legacy Soundtrack - Track 10 - The Collective", length: "12:37" },
      { id: "PC3AmvtA3bw", title: "Warzone 2100 - Legacy Soundtrack - Track 11 - Awakened", length: "6:16" },
      { id: "HqTOP8KJnGg", title: "Warzone 2100 - Legacy Soundtrack - Track 12 - New Dawn", length: "6:32" },
      { id: "7ZnRs3KMlfA", title: "Warzone 2100 - Legacy Soundtrack - Track 13 - Broken Dreams", length: "7:06" },
      { id: "lvXpOsdEwks", title: "Warzone 2100 - Legacy Soundtrack - Track 14 - Artifact Beacon", length: "6:06" },
      { id: "2Bqi1JmAotg", title: "Warzone 2100 - Legacy Soundtrack - Track 15 - Unexpected Outcome", length: "6:13" }
    ]
  },
  {
    key: "aftermath",
    title: "Warzone 2100 - Aftermath Soundtrack",
    playlistId: "PL-Qt8zXK51N_2LsxsL7VA4VRoFPAe3v_Z",
    tracks: [
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
    ]
  }
];

let player;
let playing = false;
let order = [];
let pos = 0;
let playerInitialized = false;
let audioUnlocked = false;
let settingsOpen = false;
let currentPlaylistKey = readStoredPlaylistKey();
let loadedPlaylistKey = "";

const eq = document.getElementById("eq");
const cover = document.getElementById("cover");
const eqGlow = document.getElementById("eqGlow");
const vol = document.getElementById("vol");
const tube = document.querySelector(".tube");
const settingsPanel = document.getElementById("settingsPanel");
const settingsButton = document.getElementById("settingsButton");
const settingsTitle = document.getElementById("settingsTitle");
const playlistTabs = document.getElementById("playlistTabs");
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

function buildShuffledOrder(count) {
  const nextOrder = [...Array(count).keys()];

  for (let index = nextOrder.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const swapValue = nextOrder[index];
    nextOrder[index] = nextOrder[swapIndex];
    nextOrder[swapIndex] = swapValue;
  }

  return nextOrder;
}

function hasPlayerMethod(methodName) {
  return !!player && typeof player[methodName] === "function";
}

function getPlaylistByKey(key) {
  return PLAYLISTS.find((playlist) => playlist.key === key) || PLAYLISTS[0];
}

function getActivePlaylist() {
  return getPlaylistByKey(currentPlaylistKey);
}

function getTrackCount() {
  return getActivePlaylist().tracks.length;
}

function readStoredPlaylistKey() {
  try {
    const stored = localStorage.getItem(ACTIVE_PLAYLIST_STORAGE_KEY);
    if (PLAYLISTS.some((playlist) => playlist.key === stored)) {
      return stored;
    }
  } catch (error) {}

  return PLAYLISTS[0].key;
}

function writeStoredPlaylistKey(key) {
  try {
    localStorage.setItem(ACTIVE_PLAYLIST_STORAGE_KEY, key);
  } catch (error) {}
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

function formatTrack(item, playlistTitle) {
  const playlistParts = playlistTitle
    .split(/\s*-\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  const parts = item.title
    .split(/\s*-\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  const filtered = parts.filter((part) => {
    return !playlistParts.some((playlistPart) => playlistPart.toLowerCase() === part.toLowerCase()) &&
      !/^Track \d+$/i.test(part);
  });

  if (!filtered.length) {
    return { name: item.title, artist: playlistTitle };
  }

  if (filtered.length === 1) {
    return { name: filtered[0], artist: playlistTitle };
  }

  return {
    artist: filtered[0],
    name: filtered.slice(1).join(" - ")
  };
}

function ensureOrderForActivePlaylist() {
  if (!order.length || order.length !== getTrackCount()) {
    order = buildShuffledOrder(getTrackCount());
    pos = 0;
  }
}

function setOrderPosition(trackIndex) {
  ensureOrderForActivePlaylist();

  const shuffledPosition = order.indexOf(trackIndex);
  pos = shuffledPosition >= 0 ? shuffledPosition : 0;
}

function getCurrentPlaylistIndex() {
  if (loadedPlaylistKey === currentPlaylistKey && hasPlayerMethod("getPlaylistIndex")) {
    const currentIndex = player.getPlaylistIndex();
    if (Number.isInteger(currentIndex) && currentIndex >= 0) {
      return currentIndex;
    }
  }

  if (order.length && Number.isInteger(pos) && pos >= 0 && pos < order.length) {
    return order[pos];
  }

  return 0;
}

function renderPlaylistTabs() {
  playlistTabs.innerHTML = "";

  PLAYLISTS.forEach((playlist) => {
    const tab = document.createElement("button");

    tab.type = "button";
    tab.className = "playlist-tab";
    tab.dataset.key = playlist.key;
    tab.textContent = playlist.title;
    tab.addEventListener("click", () => activatePlaylist(playlist.key));

    playlistTabs.appendChild(tab);
  });
}

function renderPlaylist() {
  const activePlaylist = getActivePlaylist();

  settingsTitle.textContent = activePlaylist.title;
  playlistList.innerHTML = "";

  activePlaylist.tracks.forEach((track, index) => {
    const item = document.createElement("button");
    const trackCopy = document.createElement("span");
    const indexLabel = document.createElement("span");
    const name = document.createElement("span");
    const artist = document.createElement("span");
    const length = document.createElement("span");
    const formatted = formatTrack(track, activePlaylist.title);

    item.type = "button";
    item.className = "playlist-item";
    item.dataset.index = String(index);
    item.addEventListener("click", () => playTrack(index));

    indexLabel.className = "playlist-index";
    indexLabel.textContent = String(index + 1).padStart(2, "0");

    trackCopy.className = "playlist-copy";

    name.className = "playlist-name";
    name.textContent = formatted.name;

    artist.className = "playlist-artist";
    artist.textContent = formatted.artist;

    length.className = "playlist-length";
    length.textContent = track.length;

    trackCopy.append(name, artist);
    item.append(indexLabel, trackCopy, length);
    playlistList.appendChild(item);
  });

  syncPlaylistSelection();
}

function renderSettingsUi() {
  renderPlaylistTabs();
  renderPlaylist();
}

function syncPlaylistSelection() {
  const currentIndex = getCurrentPlaylistIndex();

  playlistTabs.querySelectorAll(".playlist-tab").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.key === currentPlaylistKey);
  });

  playlistList.querySelectorAll(".playlist-item").forEach((item) => {
    const index = parseInt(item.dataset.index, 10);
    item.classList.toggle("is-active", index === currentIndex);
  });
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

function loadCurrentPlaylist(startIndex) {
  const activePlaylist = getActivePlaylist();
  const trackIndex = clampNumber(startIndex, 0, activePlaylist.tracks.length - 1);

  if (!hasPlayerMethod("loadPlaylist")) {
    return false;
  }

  loadedPlaylistKey = activePlaylist.key;
  player.loadPlaylist({
    listType: "playlist",
    list: activePlaylist.playlistId,
    index: trackIndex,
    startSeconds: 0
  });

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

function activatePlaylist(key) {
  const nextPlaylist = getPlaylistByKey(key);
  const isNewPlaylist = nextPlaylist.key !== currentPlaylistKey;

  currentPlaylistKey = nextPlaylist.key;
  writeStoredPlaylistKey(currentPlaylistKey);

  if (isNewPlaylist) {
    order = buildShuffledOrder(nextPlaylist.tracks.length);
    pos = 0;
    loadedPlaylistKey = "";
  }

  renderSettingsUi();

  if (isNewPlaylist && hasPlayerMethod("loadPlaylist")) {
    loadCurrentPlaylist(order[pos] || 0);
    return;
  }

  syncPlaylistSelection();
}

function playTrack(index) {
  const activePlaylist = getActivePlaylist();
  const trackIndex = clampNumber(index, 0, activePlaylist.tracks.length - 1);

  setOrderPosition(trackIndex);

  if (loadedPlaylistKey === currentPlaylistKey && hasPlayerMethod("playVideoAt")) {
    player.playVideoAt(trackIndex);
  } else {
    loadCurrentPlaylist(trackIndex);
  }

  if (audioUnlocked && hasPlayerMethod("unMute")) {
    try {
      player.unMute();
    } catch (error) {}
  }

  playing = true;
  updateIcon();
  syncPlaylistSelection();
}

function initYouTubePlayer() {
  if (playerInitialized || !window.YT || !window.YT.Player) {
    return;
  }

  playerInitialized = true;
  player = new YT.Player("player", {
    playerVars: {
      listType: "playlist",
      list: getActivePlaylist().playlistId,
      autoplay: 1,
      mute: 1,
      controls: 0,
      rel: 0,
      playsinline: 1
    },
    events: {
      onReady: () => {
        setVol(vol.value);
        ensureOrderForActivePlaylist();
        loadCurrentPlaylist(order[pos] || 0);
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
  if (!hasPlayerMethod("playVideoAt")) {
    return;
  }

  ensureOrderForActivePlaylist();
  pos = (pos + 1) % order.length;

  if (loadedPlaylistKey !== currentPlaylistKey) {
    loadCurrentPlaylist(order[pos]);
  } else {
    player.playVideoAt(order[pos]);
    syncPlaylistSelection();
  }
}

function prevTrack() {
  if (!hasPlayerMethod("playVideoAt")) {
    return;
  }

  ensureOrderForActivePlaylist();
  pos = (pos - 1 + order.length) % order.length;

  if (loadedPlaylistKey !== currentPlaylistKey) {
    loadCurrentPlaylist(order[pos]);
  } else {
    player.playVideoAt(order[pos]);
    syncPlaylistSelection();
  }
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

renderSettingsUi();
vol.value = String(readStoredVolume());
setVol(vol.value);
animateBars();
setInterval(animateBars, 120);
window.addEventListener("resize", () => syncEq(parseInt(vol.value, 10) || 0));
window.toggleSettingsPanel = toggleSettingsPanel;
window.closeSettingsPanel = closeSettingsPanel;
window.playPause = playPause;
window.nextTrack = nextTrack;
window.prevTrack = prevTrack;
window.setVol = setVol;
