const wordsToFind = ["STINK", "SQUISH", "LEMONADE", "PIZZA", "PASTA", "LOVE", "HOME"];
let foundWords = [];
let selectedLetters = [];
const gridSize = 10;
let grid = [];

// Generate the game board
function generateBoard() {
    const board = document.getElementById("word-search-board");

    // Clear previous board
    board.innerHTML = "";

    // Initialize empty grid
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));

    // Place the words in the grid
    placeWordsInGrid();

    // Fill in the remaining empty spaces with random letters
    fillRandomLetters();

    // Create grid elements on the page
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const span = document.createElement("span");
            span.textContent = grid[i][j];
            span.addEventListener("click", () => handleClick(i, j, span));
            board.appendChild(span);
        }
    }
}

// Function to place words in the grid
function placeWordsInGrid() {
    wordsToFind.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Randomize direction
            const startRow = Math.floor(Math.random() * gridSize);
            const startCol = Math.floor(Math.random() * gridSize);
            
            if (canPlaceWord(word, startRow, startCol, direction)) {
                for (let i = 0; i < word.length; i++) {
                    if (direction === 'horizontal') {
                        grid[startRow][startCol + i] = word[i];
                    } else {
                        grid[startRow + i][startCol] = word[i];
                    }
                }
                placed = true;
            }
        }
    });
}

// Check if the word can be placed
function canPlaceWord(word, row, col, direction) {
    if (direction === 'horizontal') {
        if (col + word.length > gridSize) return false; // Out of bounds check
        for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
                return false;
            }
        }
    } else {
        if (row + word.length > gridSize) return false; // Out of bounds check
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
                return false;
            }
        }
    }
    return true;
}

// Fill empty spaces with random letters
function fillRandomLetters() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
    }
}

// Handle letter clicks
function handleClick(row, col, span) {
    const letter = span.textContent;

    if (selectedLetters.includes(letter)) return; // Prevent re-selecting the same letter

    selectedLetters.push(letter);
    span.style.backgroundColor = "#f1c40f"; // Highlight selected letter

    // Check if any word is completed
    wordsToFind.forEach(word => {
        if (!foundWords.includes(word) && isWordFound(word)) {
            foundWords.push(word);
            document.getElementById("found-words").innerHTML = foundWords.map(word => `<li>${word}</li>`).join("");
        }
    });
}

// Check if a word is found
function isWordFound(word) {
    return word.split('').every(letter => selectedLetters.includes(letter));
}

generateBoard();
