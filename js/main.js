'use strict'

// Global Variables
var gBoard
var gCount = 1
var gSeconds = 0
var gLength

// DOM Elements
var elBoard = document.querySelector('.board')
var elTime = document.querySelector('.time');
var elNextNumber = document.querySelector('.next')
var elModal = document.querySelector('.modal')

function init(len) {
    gLength = len
    checkBoardSizeFromUser(len)
}

function checkBoardSizeFromUser(len) {
    if (len === 16) {
        document.getElementById("4X4").checked = true
        gBoard = createBoard(len);
        renderBoard(gBoard, len)
    } else document.getElementById("4X4").checked = false
    if (len === 25) {
        document.getElementById("5X5").checked = true
        gBoard = createBoard(len);
        renderBoard(gBoard, len)
    } else document.getElementById("5X5").checked = false
    if (len === 36) {
        document.getElementById("6X6").checked = true
        gBoard = createBoard(len);
        renderBoard(gBoard, len)
    } else document.getElementById("6X6").checked = false
}

function createBoard(len) {
    var board = [];
    while (board.length < len) {
        var r = getRandomIntInclusive(1, len)
        if (board.indexOf(r) === -1) board.push(r);
    }
    return board;
}

function renderBoard(board, len) {
    var strHtml = ''
    var boardIdx = 0
    var boardLength = Math.sqrt(len)
    for (var i = 0; i < boardLength; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < boardLength; j++) {
            var dataName = `class="cell" data-i="${board[boardIdx]}"`
            strHtml += `<td ${dataName} onclick="cellClicked(this)">
            ${board[boardIdx]}
            </td> `
            boardIdx++
        }
        strHtml += '</tr>'
    }
    elBoard.innerHTML = strHtml
}

function cellClicked(elCell) {
    if (parseInt(elCell.innerText) === 1) setInterval(showTime, 1000)
    if (parseInt(elCell.innerText) === gCount) {
        elCell.classList += ' selected'
        checkIfFinish()
        showNextNumber()
        showTime()
        gCount++
    } else return
}

function showTime() {
    gSeconds++
    elTime.innerText = gSeconds
}

function showNextNumber() {
    elNextNumber.innerText = gCount + 1
}

function checkIfFinish() {
    if (gLength === gCount) {
        restartGame()
        openModal()
    }
}

function restartGame() {
    document.getElementById("4X4").checked = false
    document.getElementById("5X5").checked = false
    document.getElementById("6X6").checked = false
}

function openModal() {
    elModal.style.display = 'block'
    var elModalH3 = document.querySelector('.modal h3')
    elModalH3.innerText = 'You Win!'
    var elModalH2 = document.querySelector('.modal h2')
    elModalH2.innerText = 'Your Time: ' + gSeconds + ' Seconds'
}

function closeModal() {
    elModal.style.display = 'none'
    location.reload();
}