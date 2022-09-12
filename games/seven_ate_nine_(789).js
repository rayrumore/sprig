/*
@title: Seven Ate Nine (789)
@author: Arjun V


A fun, fast-paced, 2-player game.

In Seven Ate Nine, one player plays as the 7,
and the other player plays as the 9.

Controls for 7 are WASD, controls for 9 are IJKL

The goal for the 7 is to eat the 9.
However, if the 9 get past the black line,
the 8 will start chasing the 7, getting faster and faster.

If the 7 catches the 9, 7 8 9! (7 wins)
If the 8 catches the 7, nine is saved! (9 wins)


*/

const seven = "s"
const eight = "e"
const nine = "n"
const line = "l"

const one = "a"
const two = "b"
const three = "c"

const underline = "z"
const rocket = "r"
const warning = "w"

let sevenScore = 0
let nineScore = 0

let eightSpeed = 1000
const eightAccel = 0.8
let eightStart = false

const sound789 = tune`
153.84615384615384: g5^153.84615384615384,
153.84615384615384: e5^153.84615384615384,
153.84615384615384: f5^153.84615384615384,
153.84615384615384: d5^153.84615384615384,
153.84615384615384: e5^153.84615384615384,
153.84615384615384: c5^153.84615384615384,
153.84615384615384: d5^153.84615384615384,
153.84615384615384,
153.84615384615384: d5^153.84615384615384,
153.84615384615384: b4^153.84615384615384,
153.84615384615384: c5^153.84615384615384,
153.84615384615384: a4^153.84615384615384,
153.84615384615384: b4^153.84615384615384,
153.84615384615384: g4^153.84615384615384,
153.84615384615384: a4^153.84615384615384,
153.84615384615384,
153.84615384615384: a4^153.84615384615384,
153.84615384615384: c5^153.84615384615384,
153.84615384615384: b4^153.84615384615384,
153.84615384615384: d5^153.84615384615384,
153.84615384615384: c5^153.84615384615384,
153.84615384615384: d5^153.84615384615384,
153.84615384615384: e5^153.84615384615384,
1384.6153846153845`
const sound9Saved = tune`
150: f4^150,
150: g4^150,
150: b4^150,
150: c5^150,
150: e5^150,
150: f5^150,
150,
150: f5^150,
150: g5^150,
150: f5^150,
150: g5^150,
150: a5^150,
3000`
const soundStart = tune`
150,
150: d5^150 + c5^150,
150: c5^150 + b4^150,
150: d5^150 + c5^150,
150: e5^150 + d5^150,
4050`

let onW, onA, onS, onD, onI, onJ, onK, onL

function setControlsMovement () {
  onW = () => getFirst(seven).y -= 1
  onA = () => getFirst(seven).x -= 1
  onS = () => getFirst(seven).y += 1
  onD = () => getFirst(seven).x += 1

  onI = () => getFirst(nine).y -= 1
  onJ = () => getFirst(nine).x -= 1
  onK = () => getFirst(nine).y += 1
  onL = () => getFirst(nine).x += 1
} setControlsMovement()

function countDown () {
  setMap(screens[1])
  const moveUnderline = () => getFirst(underline).x += 1
  const playStartSound = () => playTune(soundStart)
  setTimeout(moveUnderline, 1000)
  setTimeout(moveUnderline, 2000)
  setTimeout(moveUnderline, 3000)

  
  setTimeout(playStartSound, 3200)
}

function startGame () {
  eightStart = false
  const changeMap = () => setMap(screens[0])
  
  countDown()
  setTimeout(changeMap, 3500)
}

function sevenAteNine () {
  eightStart = false
  setMap(screens[2])
  playTune(sound789)
  setTimeout(startGame, 2000)
}

function moveEight () {
  if (eightStart === false) return
  const direction = eightDirection()
  if (eightDirection() === "right") getFirst(eight).x += 1
  if (eightDirection() === "left") getFirst(eight).x += -1
  if (eightDirection() === "up") getFirst(eight).y += -1
  if (eightDirection() === "down") getFirst(eight).y += 1
  if (tilesWith(seven, eight).length === 1) return nineSaved()
  setTimeout(moveEight, eightSpeed)
  eightSpeed *= eightAccel
}

function eightDirection () {
  const difX = getFirst(seven).x - getFirst(eight).x
  const difY = getFirst(seven).y - getFirst(eight).y

  if ((Math.abs(difX) >= Math.abs(difY)) && difX > 0) return "right"
  if ((Math.abs(difX) >= Math.abs(difY)) && difX < 0) return "left"
  if ((Math.abs(difX) < Math.abs(difY)) && difY > 0) return "down"
  if ((Math.abs(difX) < Math.abs(difY)) && difY < 0) return "up"
}

function nineSaved () {
  eightStart = false
  eightSpeed = 1000
  setMap(screens[3])
  setTimeout(startGame, 2000)
  playTune(sound9Saved)
}

onInput("w", onW)
onInput("a", onA)
onInput("s", onS)
onInput("d", onD)
onInput("i", onI)
onInput("j", onJ)
onInput("k", onK)
onInput("l", onL)

setLegend(
  [ seven, bitmap`
................
................
....33333333....
...........3....
...........3....
..........3.....
..........3.....
.........3......
.........3......
........3.......
........3.......
........3.......
........3.......
........3.......
................
................` ],
  [ eight, bitmap`
................
.....555555.....
....5......5....
....5......5....
....5......5....
....5......5....
....5......5....
.....555555.....
....5......5....
....5......5....
....5......5....
....5......5....
....5......5....
....5......5....
.....555555.....
................` ],
  [ nine, bitmap`
................
.....4444444....
....4.......4...
....4.......4...
....4.......4...
....4.......4...
....4.......4...
.....44444444...
............4...
............4...
............4...
............4...
............4...
............4...
.....4444444....
................` ],
  [ line, bitmap`
................
................
..............0.
..............0.
..............0.
..............0.
..............0.
..............0.
..............0.
..............0.
..............0.
..............0.
..............0.
..............0.
................
................` ],
  [ one, bitmap`
................
................
......6666......
.........6......
.........6......
.........6......
.........6......
.........6......
.........6......
.........6......
.........6......
.........6......
.........6......
....666666666...
................
................` ],
  [ two, bitmap`
................
................
....66666666....
...........6....
...........6....
...........6....
...........6....
...........6....
....66666666....
....6...........
....6...........
....6...........
....6...........
....66666666....
................
................` ],
  [ three, bitmap`
................
................
......666666....
...........6....
...........6....
...........6....
...........6....
...........6....
.......66666....
...........6....
...........6....
...........6....
...........6....
......666666....
................
................` ],
  [ underline, bitmap`
................
...8888888888...
................
................
................
................
................
................
................
................
................
................
................
................
................
................` ],
  [ rocket, bitmap`
................
........0.......
........0.......
.......000......
......00000.....
......01010.....
......01010.....
......01010.....
......01010.....
....000000000...
......63336.....
......63336.....
......66366.....
.......666......
........6.......
................` ],
  [ warning, bitmap`
................
................
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
................
................
.......66.......
.......66.......
................
................` ],
)

const screens = [
  map`
.l........
.l.....s..
.l........
el........
.l........
.l........
.l.....n..
.l........`,
  map`
..........
..........
..........
...cbar...
...z......
..........
..........
..........`,
  map`
..........
..........
..........
...senw...
..........
..........
..........
..........`,
  map`
..........
..........
..........
....nw....
..........
..........
..........
..........`,
]

startGame()

afterInput(() => {
  if (tilesWith(seven, nine).length === 1) sevenAteNine()
  if (tilesWith(seven, eight).length === 1) nineSaved()
  if ((getFirst(nine).x < 2) && (eightStart == false))  {
    eightStart = true
    moveEight()
  }
})