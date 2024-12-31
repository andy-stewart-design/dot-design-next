"use client";

import { useEffect, useRef, useState } from "react";
import s from "./style.module.css";

export default function Canvas() {
	const [loaded, setLoaded] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.style.display = "block";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		ctx.fillStyle = "#060709";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "blue";
		ctx.fillRect(80, 80, canvas.width - 160, canvas.height - 160);

		setLoaded(true);
	}, []);

	return (
		<div className={s.wrapper} data-loaded={loaded}>
			<canvas ref={canvasRef} />
		</div>
	);
}
