const ORIGIN = Point2D( 0,  0)

const NORTH  = Point2D( 0, -1)
const SOUTH  = Point2D( 0,  1)
const EAST   = Point2D( 1,  0)
const WEST   = Point2D(-1,  0)

const APPLE  = Point2D(10,  2)
const SNAKE  = [
	Point2D(2, 2),
	Point2D(3, 2),
	Point2D(4, 2),
	Point2D(5, 2),
	Point2D(6, 2)]

function SnakeGame(grid, direction)
{
	var apple, snake
	
	const initialize = () =>
	{
		apple = APPLE
		snake = SNAKE
		
		direction.Reset()
	};
	
	const isValid = (direction, move) => !direction.Add(move).Equals(ORIGIN);

	initialize();
	
	return {
		GetApple: () => apple,
		GetSnake: () => snake,
		
		GetWidth: grid.GetWidth,
		GetHeight: grid.GetHeight,
		
		Up: () => direction.Set(NORTH),
		Left: () => direction.Set(WEST),
		Right: () => direction.Set(EAST),
		Down: () => direction.Set(SOUTH),
		
		MoveSnake: () => {
			var nextHead = snake[snake.length -1].Add(direction.Get());
			nextHead = grid.InGridCoordinate(nextHead);
			
			// eat apple
			if(nextHead.Equals(apple))
			{
				snake.push(nextHead);
				apple = Point2D(random(0, grid.GetWidth()), random(0, grid.GetHeight()))
			}
			
			// eat snake (die)
			else if(snake.find(point => point.Equals(nextHead)) != undefined)
				initialize();
			
			// just move
			else
				snake = snake.concat(nextHead).slice(1);
		},
		
		Restart: () => initialize()
	}
}

function WrapGrid(height, width)
{
	return {
		GetHeight: () => height,
		GetWidth: () => width,
		
		InGridCoordinate: point =>
			Point2D(
				mod(point.x, width),
				mod(point.y, height))
	}
}

function BufferedMoves(initialDirection)
{
	var moves = []
	var direction = initialDirection
	
	return {
		Set: move => moves.push(move),
		
		Get: () => {
			if(moves.length == 0)
				return direction

			else
			{
				direction = moves.shift()
				return direction
			}
		},
		
		Reset: () =>
		{
			direction = initialDirection
			moves = []
		}
	}
}

// below this point are extra implementations for some moving parts

function StopGrid(height, width)
{
	return {
		GetHeight: () => height,
		GetWidth: () => width,
		
		InGridCoordinate: point =>
			Point2D(
				max(0, min(point.x, width)),
				max(0, min(point.y, height)))
	}
}

function DirectMoves(initialDirection)
{
	var direction = initialDirection
	
	return {
		Set: move => direction = move,
		Get: () => direction,
		Reset: () => direction = initialDirection
	}
}