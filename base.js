const mod = (value, denominator) => ((value % denominator) + denominator) % denominator;
const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;

const random = (min, max) => Math.floor(Math.random() * max) + min

function Point2D(x, y)
{
	return {
		x: x,
		y: y,
		
		Equals: other => x === other.x && y === other.y,
		Add: other => Point2D(x + other.x, y + other.y)
	}
}