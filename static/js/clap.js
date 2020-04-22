let clap = document.getElementsByClassName("clap")[0];
let clapCounter = document.getElementsByClassName("clap-counter")[0];
let countNotificationWrapper = document.getElementsByClassName(
  "count-notification-wrapper"
)[0];
let countNotification = document.getElementsByClassName(
  "count-notification"
)[0];

let clapCount = 0;
let clapped = false;
let loading = true;

const db = firebase.firestore();
const article = clapCounter.dataset.article;
const clapsRef = db.collection(article);

// After the page is fully loaded
if (window.requestIdleCallback) {
  requestIdleCallback(() => {
    checkIfHasAlreadyClapped()
      .then(() => {
        getClaps();
      })
      .then(() => {
        giveGreenlight();
      });
  });
}

// Firestore
function getClaps() {
  return clapsRef.get().then((snap) => {
    renderClaps(snap.size);
  });
}
function addClap() {
  // Add a new message entry to the database.
  return clapsRef.add({
    fingerprint: new Fingerprint().get(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function checkIfHasAlreadyClapped() {
  let query = clapsRef.where("fingerprint", "==", new Fingerprint().get());
  return query.get().then(function (snap) {
    if (snap.size > 0) hasClapped();
  });
}

// Other functions
function giveGreenlight() {
  loading = false;
}
function renderClaps(count) {
  clapCount = count;
  correctWording = clapCount > 1 ? `aplausos` : `aplauso`;
  clapPhrase = `${clapCount} ${correctWording}`;
  if (clapped && clapCount > 1) clapPhrase += ` con el tuyo`;
  if (clapCount == 0) clapPhrase = `Dale el primer aplauso!`;
  clapCounter.innerHTML = clapPhrase;
}

function incrementClap() {
  renderClaps(clapCount + 1);
  addClap();
}

function hasClapped() {
  clapped = true;
  clap.classList.add("clapped-icon");
  clapCounter.classList.add("bold-and-blue");
  clap.classList.remove("clapGlow");
}

function notificationAnimation() {
  clap.classList.add("pumpItUp");
  countNotificationWrapper.classList.remove("hide");

  setTimeout(() => {
    countNotificationWrapper.classList.add("hide");
  }, 1250);

  setTimeout(() => {
    clap.classList.remove("pumpItUp");
  }, 500);
}

// Glow when hovering, if not clapped yet
clap.onmouseenter = () => {
  if (!clapped) {
    clap.classList.add("clapGlow");
  }
};
clap.onmouseleave = () => {
  if (!clapped) {
    clap.classList.remove("clapGlow");
  }
};

// Adding the trigger of explosion on click
clap.addEventListener("click", explode);

// Click to clap
clap.onclick = () => {
  if (clapped || loading) return;
  incrementClap();
  hasClapped();
};






// Decoration explosion on click
function explode(e) {
  if (clapped || loading) return;

  var x = e.pageX;
  var y = e.pageY;
  var c = document.createElement("canvas");
  var ctx = c.getContext("2d");
  var ratio = window.devicePixelRatio;
  var particles = [];

  document.body.appendChild(c);

  c.style.position = "absolute";
  c.style.zIndex = 220;
  c.style.left = x - 100 + "px";
  c.style.top = y - 100 + "px";
  c.style.pointerEvents = "none";
  c.style.width = 200 + "px";
  c.style.height = 200 + "px";
  c.width = 200 * ratio;
  c.height = 200 * ratio;

  function Particle() {
    return {
      x: c.width / 2,
      y: c.height / 2,
      radius: r(30, 30),
      rotation: r(0, 360, true),
      speed: r(8, 12),
      friction: 0.9,
      opacity: r(0, 0.5, true),
      yVel: 0,
      gravity: 0.1,
      color: "#62A4FF",
    };
  }

  for (var i = 0; ++i < 25; ) {
    particles.push(Particle());
  }

  function render() {
    ctx.clearRect(0, 0, c.width, c.height);

    particles.forEach(function (p, i) {
      angleTools.moveOnAngle(p, p.speed);

      p.opacity -= 0.01;
      p.speed *= p.friction;
      p.radius *= p.friction;

      p.yVel += p.gravity;
      p.y += p.yVel;

      if (p.opacity < 0) return;
      if (p.radius < 0) return;

      ctx.beginPath();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });
  }

  (function renderLoop() {
    requestAnimationFrame(renderLoop);
    render();
  })();

  setTimeout(function () {
    document.body.removeChild(c);
  }, 3000);
}

var angleTools = {
  getAngle: function (t, n) {
    var a = n.x - t.x,
      e = n.y - t.y;
    return (Math.atan2(e, a) / Math.PI) * 180;
  },
  getDistance: function (t, n) {
    var a = t.x - n.x,
      e = t.y - n.y;
    return Math.sqrt(a * a + e * e);
  },
  moveOnAngle: function (t, n) {
    var a = this.getOneFrameDistance(t, n);
    (t.x += a.x), (t.y += a.y);
  },
  getOneFrameDistance: function (t, n) {
    return {
      x: n * Math.cos((t.rotation * Math.PI) / 180),
      y: n * Math.sin((t.rotation * Math.PI) / 180),
    };
  },
};
function r(a, b, c) {
  return parseFloat(
    (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(
      c ? c : 0
    )
  );
}
