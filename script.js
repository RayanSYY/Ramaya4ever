const app = document.getElementById("app");
const topbar = document.querySelector(".topbar");
const music = document.getElementById("bgMusic");

/* ---------------- MUSIC (start on first interaction) ---------------- */

music.volume = 0.25;

function startMusic(){
  music.play().catch(()=>{});
  window.removeEventListener("click", startMusic);
  window.removeEventListener("touchstart", startMusic);
}
window.addEventListener("click", startMusic);
window.addEventListener("touchstart", startMusic);

/* ---------------- FADE HELPERS ---------------- */

function mountWithFade(html) {
  app.innerHTML = `<div class="fadeWrap fadeOut" id="fadeWrap">${html}</div>`;
  requestAnimationFrame(() => {
    const w = document.getElementById("fadeWrap");
    if (w) w.classList.remove("fadeOut");
  });
}

function fadeTo(next) {
  const w = document.getElementById("fadeWrap");
  if (!w) return next();
  w.classList.add("fadeOut");
  setTimeout(next, 450);
}

/* ---------------- FLOATING HEARTS ---------------- */

const heartsLayer = document.createElement("div");
heartsLayer.className = "heartsLayer";
document.body.appendChild(heartsLayer);

const heartEmojis = ["💖","💗","💘","💕","❤️","💓","💞"];

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];

  h.style.left = Math.random()*100 + "vw";
  h.style.fontSize = 18 + Math.random()*28 + "px";
  h.style.animationDuration = 4 + Math.random()*4 + "s";
  h.style.setProperty("--drift", (-40 + Math.random()*80) + "px");
  h.style.setProperty("--spin", (-60 + Math.random()*120) + "deg");

  heartsLayer.appendChild(h);
  setTimeout(()=>h.remove(), 9000);
}

setInterval(spawnHeart, 260);

/* ---------------- SCREENS ---------------- */

// NEW INTRO SCREEN (first)
function introScreen(){
  if (topbar) topbar.style.display = ""; // show topbar

  mountWithFade(`
    <div class="card">
      <div class="title pinkText" style="margin-bottom:18px;">
        been a while since i did this so im a bit rusty but i did my best
      </div>

      <div class="btnRow" style="margin-top:18px;">
        <div class="squareBtn pinkText" id="readyBtn">
          ARE YOU READY TO BE MY FIRST ? 😘
        </div>
      </div>
    </div>
  `);

  document.getElementById("readyBtn").onclick = () => {
    // Start music exactly here (perfect timing)
    startMusic();
    fadeTo(firstScreen);
  };
}

// OLD first screen (your original)
function firstScreen(){
  if (topbar) topbar.style.display = ""; // show topbar

  mountWithFade(`
    <div class="card">
      <div class="title">Would you do me the honors and be my valentine</div>
      <img class="centerImg" src="images/poem.jpg" alt="poem">
      <div class="btnRow">
        <div class="squareBtn pinkText" id="yes1">you love me too</div>
        <div class="squareBtn redText" id="no1">you don’t (you better not dare)</div>
      </div>
    </div>
  `);

  document.getElementById("yes1").onclick = () => fadeTo(secondScreen);

  document.getElementById("no1").onclick = () => {
    const b = document.getElementById("no1");
    b.textContent = "ill act like i didn’t see that and say you i clicked yes 😊";
    b.classList.add("disabled");
  };
}

function secondScreen(){
  if (topbar) topbar.style.display = ""; // show topbar

  mountWithFade(`
    <div class="card">
      <div class="title">Would you do me the honors and be my valentine</div>
      <img class="centerImg" src="images/banner.png" alt="banner">
      <div class="btnRow">
        <div class="squareBtn pinkText" id="yes2">yes 😍🥰😘</div>
        <div class="squareBtn redText" id="no2">No 🥺😢</div>
      </div>
    </div>
  `);

  document.getElementById("yes2").onclick = () => fadeTo(finalScreen);
  document.getElementById("no2").onclick = () => fadeTo(guiltyScreen);
}

function guiltyScreen(){
  if (topbar) topbar.style.display = ""; // keep title + background

  mountWithFade(`
    <div class="guiltyText">
      Guilty, You don't have a choice KIR KIR KIR KIR
    </div>
  `);

  setTimeout(()=>fadeTo(finalScreen), 5000);
}

// FINAL SCREEN (no body wipe, keeps music + hearts background)
function finalScreen(){
  if (topbar) topbar.style.display = "none"; // hide the top title for final grid

  // Clear app and mount full-screen grid (music continues because audio tag stays)
  app.innerHTML = `
    <div class="fullscreenGrid">
      <div class="gridCell"><img src="images/grid1.png" alt="1"></div>
      <div class="gridCell"><img src="images/grid2.png" alt="2"></div>
      <div class="gridCell"><img src="images/grid3.png" alt="3"></div>
      <div class="gridCell"><img src="images/grid4.png" alt="4"></div>
    </div>
  `;
}

/* ---------------- START ---------------- */

introScreen();