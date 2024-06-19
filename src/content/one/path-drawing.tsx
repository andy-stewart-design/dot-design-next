"use client";

import { MouseEvent, useState } from "react";
import s from "./path-drawing.module.css";
import { map } from "@/utils/math";

export default function PathDrawing() {
	const [points, setPoints] = useState([
		{ x: 20, y: 30 },
		{ x: 60, y: 80 },
	]);
	const [isClosed, setIsClosed] = useState(true);

	const path = points.map(({ x, y }, i) => {
		if (i === 0) return `M ${x} ${y}`;
		return `L ${x} ${y}`;
	});
	const code = path.map(
		(p, i) => `<span class="${s.point}" style="--hue: ${i * 30}">${p}</span>`
	);

	function handleClick(e: MouseEvent<HTMLDivElement>) {
		const div = e.currentTarget.getBoundingClientRect();
		const xPos = e.clientX - div.left;
		const yPos = e.clientY - div.top;
		const x = map(xPos, 0, div.width, 0, 100);
		const y = map(yPos, 0, div.height, 0, 100);

		const clickedPoint = points.filter((p) => {
			const distance = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2);
			return distance < 5;
		});

		if (clickedPoint.length > 0) {
			const nextPoints = [...points];
			const index = points.indexOf(clickedPoint[0]);
			nextPoints[index] = { x: Math.floor(x), y: Math.floor(y) };

			setPoints(nextPoints);
		} else {
			setPoints([...points, { x: Math.floor(x), y: Math.floor(y) }]);
		}
	}

	return (
		<div className={s.container} data-elevation="1">
			<div className={s.code}>
				<label>
					<input
						type="checkbox"
						checked={isClosed}
						onChange={(e) => setIsClosed(e.target.checked)}
					/>
					<span>Close path</span>
				</label>
				<p>{`<svg viewBox="0 0 100 100">`}</p>
				<p className={s["indent-1"]}>{`<path`}</p>
				<div
					dangerouslySetInnerHTML={{
						__html: `<p class="${s["indent-2"]}">d="${code.join(" ")}${
							isClosed ? " Z" : ""
						}"</p>`,
					}}
				></div>
				<p className={s["indent-1"]}>{`></path>`}</p>
				<p>{`</svg>`}</p>
			</div>
			<div className={s.canvas} data-elevation="0" onClick={handleClick}>
				<svg viewBox="0 0 100 100">
					<path
						d={path.join(" ") + (isClosed && " Z")}
						fill="none"
						strokeWidth={0.5}
						stroke="var(--foreground-md)"
					/>
					{points.map(({ x, y }, i) => (
						<circle key={i} cx={x} cy={y} r="2" fill={`oklch(62% 0.15 ${i * 30})`} />
					))}
				</svg>
			</div>
		</div>
	);
}
