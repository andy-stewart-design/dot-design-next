import { createNoise3D } from "simplex-noise";
import { get2dContext, resizeCanvas } from "./html-canvas-utils";
import { map } from "./math";

class HTMLCanvas {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private scale: number;
	private width: number;
	private height: number;

	private prevTimestamp = performance.now();
	private timeOffset = 0;
	private colorOffset = 280;
	private framerate = 0;

	private controller = new AbortController();

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = get2dContext(this.canvas);

		this.width = this.canvas.parentElement?.clientWidth ?? window.innerWidth;
		this.height = this.canvas.parentElement?.clientHeight ?? window.innerHeight;
		this.scale = Math.min(window.devicePixelRatio, 2);

		this.addEventListeners();
		this.handleResize();
		requestAnimationFrame(this.draw);
	}

	private draw(timestamp = 0) {
		const deltaTime = timestamp - this.prevTimestamp;

		const midX = this.width / 2;
		const midY = this.height / 2;
		const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
		this.ctx.fillRect(0, 0, this.width, this.height);

		for (let i = 0; i <= 8; i++) {
			this.ctx.save();
			gradient.addColorStop(0, `hsl(${this.colorOffset}, 100%, 50%)`);
			gradient.addColorStop(1, `hsl(${this.colorOffset + 60}, 100%, 50%)`);
			this.ctx.strokeStyle = gradient;
			this.ctx.lineWidth = 2;
			this.ctx.globalAlpha = 1 - 0.1 * (8 - i);

			const anchorPoints = generateAnchorPoints(
				10,
				Math.max(this.width * 1.5, this.height * 1.5),
				this.timeOffset + i * 0.005
			);
			const bezierPoints = generateBezierPoints(anchorPoints);

			this.ctx.beginPath();
			this.ctx.moveTo(anchorPoints[1].x + midX, anchorPoints[1].y + midY);

			bezierPoints.forEach((point) => {
				this.ctx.bezierCurveTo(
					point.cp1.x + midX,
					point.cp1.y + midY,
					point.cp2.x + midX,
					point.cp2.y + midY,
					point.a.x + midX,
					point.a.y + midY
				);
			});
			this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.restore();
		}

		const prevDec = (this.prevTimestamp / 1000).toString().split(".")[1] ?? 0;
		const currDec = (timestamp / 1000).toString().split(".")[1] ?? 0;
		if (currDec < prevDec) {
			this.framerate = 1000 / deltaTime > 0 ? Math.floor(1000 / deltaTime) : 0;
		}

		this.ctx.save();
		this.ctx.font = "12px monospace";
		this.ctx.fillStyle = "white";
		const padInline = window.innerWidth > 880 ? 32 : 16;
		this.framerate &&
			this.ctx.fillText(`Framerate: ${this.framerate}`, padInline, this.height - 24);
		this.ctx.restore();

		this.prevTimestamp = timestamp;
		this.timeOffset += deltaTime * 0.00005;
		this.colorOffset = 280 + Math.sin(this.timeOffset * 2) * 60;

		requestAnimationFrame(this.draw);
	}

	private handleResize(e?: UIEvent) {
		this.width = this.canvas.parentElement?.clientWidth ?? window.innerWidth;
		this.height = this.canvas.parentElement?.clientHeight ?? window.innerHeight;
		resizeCanvas(this.canvas, this.width, this.height, this.scale);
	}

	private addEventListeners() {
		const { signal } = this.controller;
		window.addEventListener("resize", this.handleResize, { signal });
	}

	public destroy() {
		this.controller.abort();
	}
}

export default HTMLCanvas;

// -----------------------------------------------------------------
// MARK: HELPER FUNCTIONS

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
