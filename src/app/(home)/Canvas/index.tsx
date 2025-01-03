"use client";

import { useEffect, useRef, useState, memo } from "react";
import s from "./style.module.css";
import HTMLCanvas from "@/utils/html-canvas";

function Canvas() {
	const [loaded, setLoaded] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const renderer = new HTMLCanvas(canvas);
		setLoaded(true);

		return () => renderer.destroy();
	}, []);

	return (
		<div className={s.wrapper} data-loaded={loaded}>
			<canvas ref={canvasRef} className={s.canvas} />
		</div>
	);
}

export default memo(Canvas);
