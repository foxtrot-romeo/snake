const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Mutable state
var state = SnakeGame(
	WrapGrid(20,20),
	BufferedMoves(EAST))

function drawSquare(ctx, rows, columns, position)
{
	width = canvas.width / columns
	height = canvas.height / rows
	
	ctx.fillRect(
		position.x * width,
		position.y * height,
		width,
		height
	)
}

// Game loop draw
const draw = () => {
  var snake = state.GetSnake();
  // clear
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // draw snake body
  ctx.fillStyle = 'rgb(0,100,50)'
  for(var i = 0; i < snake.length; i++)
	  drawSquare(ctx, state.GetHeight(), state.GetWidth(), snake[i])
  
  // fancy color for the head
  ctx.fillStyle = 'rgb(0,200,50)'
  drawSquare(ctx, state.GetHeight(), state.GetWidth(), snake[snake.length - 1])

  // draw apples
  ctx.fillStyle = 'rgb(255,50,0)'
  drawSquare(ctx, state.GetHeight(), state.GetWidth(), state.GetApple())

  // add crash
  if (state.GetSnake().length == 0) {
    ctx.fillStyle = 'rgb(255,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

// Game loop update
const step = t1 => t2 => {
  if (t2 - t1 > 100) {
	  state.MoveSnake()
    draw()
    window.requestAnimationFrame(step(t2))
  } else {
    window.requestAnimationFrame(step(t1))
  }
}

// Key events
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'h': case 'ArrowUp':    state.Up();    break
    case 's': case 'k': case 'ArrowDown':  state.Down();  break
    case 'a': case 'j': case 'ArrowLeft':  state.Left();  break
    case 'd': case 'l': case 'ArrowRight': state.Right(); break
  }
})

// Main
draw(); window.requestAnimationFrame(step(0))