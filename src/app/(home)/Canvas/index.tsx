"use client";

import { useEffect, useRef, useState, memo } from "react";
import { createNoise3D } from "simplex-noise";
import s from "./style.module.css";

const TWO_PI = Math.PI * 2;
const START_POINT = TWO_PI * 0.75;

function Canvas() {
	const [loaded, setLoaded] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		function updateCanvasSize() {
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		const noise = createNoise3D();
		let prevTimestamp = performance.now();
		let timeOffset = 0;

		function draw(timestamp = 0) {
			if (!ctx || !canvas) return;

			const deltaTime = timestamp - prevTimestamp;
			prevTimestamp = timestamp;

			const midX = canvas.width / 2;
			const midY = canvas.height / 2;
			const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i <= 8; i++) {
				ctx.save();
				gradient.addColorStop(0, "#a139f5");
				gradient.addColorStop(1, "#36e1ff");
				ctx.strokeStyle = gradient;
				ctx.lineWidth = 2;
				ctx.globalAlpha = 1 - 0.1 * (8 - i);

				const anchorPoints = generateAnchorPoints(
					noise,
					10,
					Math.max(canvas.width * 1.25, canvas.height * 1.25),
					timeOffset + i * 0.005
				);
				const bezierPoints = generateBezierPoints(anchorPoints);

				ctx.beginPath();
				ctx.moveTo(anchorPoints[1].x + midX, anchorPoints[1].y + midY);

				bezierPoints.forEach((point) => {
					ctx.bezierCurveTo(
						point.cp1.x + midX,
						point.cp1.y + midY,
						point.cp2.x + midX,
						point.cp2.y + midY,
						point.a.x + midX,
						point.a.y + midY
					);
				});
				ctx.closePath();
				ctx.stroke();
				ctx.restore();
			}

			timeOffset += deltaTime * 0.0001;

			requestAnimationFrame(draw);
		}

		updateCanvasSize();
		draw();

		setLoaded(true);

		window.addEventListener("resize", updateCanvasSize);

		return () => window.removeEventListener("resize", updateCanvasSize);
	}, []);

	return (
		<div className={s.wrapper} data-loaded={loaded}>
			<canvas ref={canvasRef} className={s.canvas} />
		</div>
	);
}

function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
	return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

function generateAnchorPoints(
	noise: ReturnType<typeof createNoise3D>,
	numPoints = 6,
	radius = 100,
	zOff = 0
) {
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

export default memo(Canvas);
