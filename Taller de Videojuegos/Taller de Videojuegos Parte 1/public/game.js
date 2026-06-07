const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

// Configuración
const LANES = 6;
const LANE_WIDTH = W / LANES;
const CAR_WIDTH = 32;
const CAR_HEIGHT = 56;
const ROAD_SPEED = 700; // píxeles por segundo
const DASH_HEIGHT = 28;
const DASH_GAP = 22;

// Helper: convierte un índice de carril (0..3) a la coordenada X del centro del auto
function laneToX(lane) {
  return lane * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2;
}

const player = {
  lane: 1,       // empieza en el segundo carril
  y: H - 80      // cerca del borde inferior
};

// Junto al state:
let roadOffset = 0;
const enemies = []; // array de { lane, y }
let spawnTimer = 0;
const SPAWN_INTERVAL = 0.9; // segundos entre spawns
let gameOver = false;
const ENEMY_SPAWN_DELAY = 150; // milisegundos entre cada enemigo
let score = 0;

function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// Estado del juego
const state = {
  testX: 0
};

// --- Input ---
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    player.lane = Math.max(0, player.lane - 1);
  }
  if (e.key === 'ArrowRight' || e.key === 'd') {
    player.lane = Math.min(LANES - 1, player.lane + 1);
  }
  if (e.key === ' ' && gameOver) {
    score = 0;
    enemies.length = 0;
    spawnTimer = 0;
    gameOver = false;
    player.lane = 1;
  }
});

function update(dt) {
  if (gameOver) return;
  score += dt * 100;
  roadOffset = (roadOffset + ROAD_SPEED * dt) % (DASH_HEIGHT + DASH_GAP);

  // Spawn de rivales
spawnTimer -= dt;

  if (spawnTimer <= 0) {
    spawnTimer = SPAWN_INTERVAL;

    const ENEMY_SPAWN_DELAY = 150; // ms

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        if (Math.random() < 0.65) {
          enemies.push({
            lane: Math.floor(Math.random() * LANES),
            y: -CAR_HEIGHT
          });
        }
      }, i * ENEMY_SPAWN_DELAY);
    }
  }

  // Mover rivales hacia abajo y descartar los que salieron
  for (const e of enemies) {
    e.y += ROAD_SPEED * dt;
  }
  // Eliminar enemigos fuera de pantalla (de atrás hacia adelante)
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].y > H) enemies.splice(i, 1);
  }

  if (!gameOver) {
    const px = laneToX(player.lane);
    for (const e of enemies) {
      const ex = laneToX(e.lane);
      if (rectsOverlap(px, player.y, CAR_WIDTH, CAR_HEIGHT, ex, e.y, CAR_WIDTH, CAR_HEIGHT)) {
        gameOver = true;
        break;
      }
    }
  }
}

function render() {
  // Fondo
  ctx.fillStyle = '#111122';
  ctx.fillRect(0, 0, W, H);

  // Líneas divisorias entre carriles
  ctx.fillStyle = '#3a3a5a';
  for (let lane = 1; lane < LANES; lane++) {
    const x = lane * LANE_WIDTH - 2;
    for (let y = -DASH_HEIGHT + roadOffset; y < H; y += DASH_HEIGHT + DASH_GAP) {
      ctx.fillRect(x, y, 4, DASH_HEIGHT);
    }
  }

  // Rivales — añadir antes del jugador para que el jugador quede encima
  ctx.fillStyle = '#ff66cc';
  for (const e of enemies) {
    ctx.fillRect(laneToX(e.lane), e.y, CAR_WIDTH, CAR_HEIGHT);
  }

  // Jugador
  ctx.fillStyle = '#00ffaa';
  ctx.fillRect(laneToX(player.lane), player.y, CAR_WIDTH, CAR_HEIGHT);

  // Score
  ctx.fillStyle = '#00ffaa';
  ctx.font = 'bold 16px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SCORE: ' + Math.floor(score), 10, 24);

  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ff66cc';
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', W / 2, H / 2 - 10);

    // score
    ctx.fillStyle = '#e0e0ff';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText('PUNTAJE: ' + Math.floor(score), W / 2, H / 2 + 20);

    ctx.fillStyle = '#e0e0ff';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText('Presiona ESPACIO para reiniciar', W / 2, H / 2 + 50);
  }
}

let lastTime = performance.now();

function loop(now) {
  const dt = (now - lastTime) / 1000; // milisegundos → segundos
  lastTime = now;

  update(dt);
  render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);