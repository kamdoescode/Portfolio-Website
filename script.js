
// --- CONFIG ---
const cellSize = 20;
const characters = 'KH+/';
const animationDuration = 1.2; // seconds per update
const neighborInfluence = 0.09;
const randomness = 0.01;
const introDuration = 3000; // 3 seconds animation

let phase = "intro";

const gridContainer = document.getElementById('grid');

let gridCols = Math.ceil(window.innerWidth / cellSize);
let gridRows = Math.ceil(window.innerHeight / cellSize);

gridContainer.style.gridTemplateColumns = `repeat(${gridCols}, ${cellSize}px)`;
gridContainer.style.gridTemplateRows = `repeat(${gridRows}, ${cellSize}px)`;

// --- CREATE GRID ---
const grid = [];
  for (let y = 0; y < gridRows; y++) {
    const row = [];
    for (let x = 0; x < gridCols; x++) {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      const charIndex = Math.random() * characters.length;
      cellDiv.textContent = characters[Math.floor(charIndex)];
      gridContainer.appendChild(cellDiv);

      row.push({
        element: cellDiv,
        charIndex,
        velocity: Math.random() * 0.3
      });
    }
    grid.push(row);
  }

  // --- UPDATE GRID FUNCTION ---
  function updateGrid() {
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const cell = grid[y][x];

        // --- Neighbor influence ---
        const neighbors = [];
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < gridRows && nx >= 0 && nx < gridCols) {
              neighbors.push(grid[ny][nx]);
            }
          }
        }
        const avgVelocity = neighbors.reduce((sum, n) => sum + n.velocity, 0) / neighbors.length;
        cell.velocity += (avgVelocity - cell.velocity) * neighborInfluence + (Math.random() - 0.5) * randomness;

        // --- Update char ---
        cell.charIndex = (cell.charIndex + cell.velocity) % characters.length;
        const newChar = characters[Math.floor(cell.charIndex)];

        // --- Animate with GSAP ---
        gsap.to(cell.element, {
          duration: animationDuration,
          textContent: newChar,
          ease: "power1.inOut"
        });
      }
    }
  }


  // --- SLOW DOWN ---
  function slowDown() {
    grid.forEach(row =>
      row.forEach(cell => {
        cell.velocity *= 0.9;
      })
    );
  }

  // --- TRANSITION TO WORDS ---
function transitionToWords(lines) {
  phase = "freeze";

  const blockX = 10; // distance from left edge
  const startY = Math.floor(gridRows / 2) - Math.floor(lines.length / 2);

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      // blank spaces above and below
        const blockWidth = Math.max(...lines.map(l => l.length));
        const blockHeight = lines.length;   

        let targetChar = cell.element.textContent;

        // top and bottom borders
        if (
            (y === startY - 1 || y === startY + blockHeight) &&
            x >= blockX - 1 &&
            x <= blockX + blockWidth
        ) {
            targetChar = '';
        }

        // left and right borders
        if (
            y >= startY &&
            y < startY + blockHeight &&
        (x === blockX - 1 || x === blockX + blockWidth)
        )  {
            targetChar = '';
        }

      // main word lines
      lines.forEach((line, i) => {
        if (y === startY + i && x >= blockX && x < blockX + line.length) {
          targetChar = line[x - blockX];
        }
      });

      gsap.to(cell.element, {
        duration: 2,
        textContent: targetChar,
        ease: "power2.out"
      });
    });
  });
}

  // --- LOOP ---
  gsap.ticker.add(() => {
    if (phase === "intro") updateGrid();
  });

  // --- TIMING ---
  setTimeout(() => {
    gsap.ticker.add(slowDown);
  }, introDuration - 1000);

  setTimeout(() => {
    transitionToWords([
      "ABOUT  ",
      "WORK   ",
      "CONTACT"
    ]);
  }, introDuration);


