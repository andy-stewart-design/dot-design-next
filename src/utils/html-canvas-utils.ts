function resizeCanvas(
	canvas: HTMLCanvasElement,
	width: number,
	height: number,
	scale: number
) {
	canvas.width = width * scale;
	canvas.height = height * scale;
	canvas.style.width = `100%`;
	canvas.style.height = `100%`;
	get2dContext(canvas).scale(scale, scale);
}

function get2dContext(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not get canvas rendering context");
	return ctx;
}

export { resizeCanvas, get2dContext };
