document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const tiles = [];
    const tileCount = 16; // 4x4 grid

    // Create tiles
    for (let i = 0; i < tileCount - 1; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = i + 1;
        tile.dataset.index = i;
        gameContainer.appendChild(tile);
        tiles.push(tile);
    }

    // Create empty tile
    const emptyTile = document.createElement('div');
    emptyTile.classList.add('tile', 'empty');
    emptyTile.dataset.index = tileCount - 1;
    gameContainer.appendChild(emptyTile);
    tiles.push(emptyTile);

    // Shuffle tiles
    shuffle(tiles);

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            moveTile(tile);
        });
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        array.forEach((tile, index) => {
            gameContainer.appendChild(tile);
            tile.style.order = index;
        });
    }

    function moveTile(tile) {
        const emptyIndex = tiles.findIndex(t => t.classList.contains('empty'));
        const tileIndex = parseInt(tile.dataset.index);

        const isValidMove = (Math.abs(emptyIndex - tileIndex) === 1 || Math.abs(emptyIndex - tileIndex) === 4);

        if (isValidMove) {
            tiles[emptyIndex].style.order = tileIndex;
            tiles[tileIndex].style.order = emptyIndex;
            tiles[emptyIndex].dataset.index = tileIndex;
            tiles[tileIndex].dataset.index = emptyIndex;
        }
    }
});