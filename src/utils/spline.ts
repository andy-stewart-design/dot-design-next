import { createNoise3D } from "simplex-noise";
import { map } from "./math";

const TWO_PI = Math.PI * 2;
const START_POINT = TWO_PI * 0.75;
const noise = createNoise3D();

function generateAnchorPoints(numPoints = 6, radius = 100, zOff = 0) {
	const points = Array.from({ length: numPoints }).map((_, i) => {
		const a = START_POINT + (i * TWO_PI) / numPoints;
		const xOff = map(Math.cos(a), -1, 1, 0, 100);
		const yOff = map(Math.sin(a), -1, 1, 0, 100);
		let r = map(noise(xOff, yOff, zOff), -1, 1, -radius, radius);
		const x = Math.cos(a) * r;
		const y = Math.sin(a) * r;
		return { x, y };
	});

	// Duplicate first and last points for wrapping
	return [points[points.length - 1], ...points, points[0], points[1]];
}

function generateBezierPoints(anchorPoints: { x: number; y: number }[]) {
	let points = [];

	for (let i = 1; i < anchorPoints.length - 2; i++) {
		const p0 = anchorPoints[i - 1];
		const p1 = anchorPoints[i];
		const p2 = anchorPoints[i + 1];
		const p3 = anchorPoints[i + 2];

		// Calculate control points for the Bezier curve
		const cp1 = {
			x: p1.x + ((p2.x - p0.x) / 6) * 1,
			y: p1.y + ((p2.y - p0.y) / 6) * 1,
		};
		const cp2 = {
			x: p2.x - ((p3.x - p1.x) / 6) * 1,
			y: p2.y - ((p3.y - p1.y) / 6) * 1,
		};

		points.push({ a: p2, cp1, cp2 });
	}

	return points;
}

export { generateAnchorPoints, generateBezierPoints };
