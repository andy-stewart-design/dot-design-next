"use client";

import { type MouseEvent, useState } from "react";
import Switch from "@/components/Switch";
import { DemoCanvas, DemoWrapper, DemoContent } from "@/components/BlogDemo";
import { Refresh } from "@/components/Icons/20";
import { map } from "@/utils/math";
import clsx from "clsx";
import s from "./component.module.css";
import c from "../shared.module.css";

function PathDrawing() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [points, setPoints] = useState([
		{ x: 20, y: 30 },
		{ x: 60, y: 80 },
	]);
	const [isClosed, setIsClosed] = useState(false);

	const radius = 2;
	const pathArray = formatPoints(points);
	const html = formatHTML(pathArray, isClosed);

	function handleClick(e: MouseEvent<HTMLDivElement>) {
		if (activeIndex === null) {
			const clickPos = getClickPosition(e);
			setPoints([...points, { x: Math.floor(clickPos.x), y: Math.floor(clickPos.y) }]);
		} else {
			setActiveIndex(null);
		}
	}

	function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
		const clickPos = getClickPosition(e);

		const clickedPoint = points.filter((p) => {
			const distance = Math.sqrt((clickPos.x - p.x) ** 2 + (clickPos.y - p.y) ** 2);
			return distance < 5;
		});

		if (clickedPoint.length > 0) {
			const index = points.indexOf(clickedPoint[0]);
			setActiveIndex(index);
		}
	}

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		if (activeIndex === null) return;

		const clickPos = getClickPosition(e);
		const nextPoints = [...points];
		nextPoints[activeIndex] = { x: Math.floor(clickPos.x), y: Math.floor(clickPos.y) };
		setPoints(nextPoints);
	}

	function reset(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();

		setPoints([
			{ x: 20, y: 30 },
			{ x: 60, y: 80 },
		]);
		setIsClosed(false);
	}

	return (
		<DemoWrapper>
			<DemoContent>
				<div className={s.controls}>
					<Switch checked={isClosed} onChange={setIsClosed}>
						Close path (Z)
					</Switch>
				</div>
				<div className={clsx(c.code, s.code)}>
					<p>{`<svg viewBox="0 0 100 100">`}</p>
					<p className={c.indent_1}>{`<path`}</p>
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<p className={c.indent_1}>{`></path>`}</p>
					<p>{`</svg>`}</p>
				</div>
			</DemoContent>
			<DemoCanvas
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onClick={handleClick}
			>
				<svg viewBox="0 0 100 100">
					<path
						d={pathArray.join(" ") + (isClosed ? " Z" : "")}
						fill="none"
						strokeWidth={0.5}
						stroke="var(--foreground-md)"
					/>
					{points.map(({ x, y }, i) => (
						<circle key={i} cx={x} cy={y} r={radius} fill={`oklch(62% 0.15 ${i * 30})`} />
					))}
				</svg>
				<button className={c.btn} onClick={reset} disabled={points.length <= 2}>
					<Refresh />
				</button>
			</DemoCanvas>
		</DemoWrapper>
	);
}

// ------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------
function getClickPosition(e: MouseEvent<Element>) {
	const div = e.currentTarget.getBoundingClientRect();
	const xPos = e.clientX - div.left;
	const yPos = e.clientY - div.top;
	const x = map(xPos, 0, div.width, 0, 100);
	const y = map(yPos, 0, div.height, 0, 100);
	return { x, y };
}

function formatPoints(points: { x: number; y: number }[]) {
	return points.map(({ x, y }, i) => {
		if (i === 0) return `M ${x} ${y}`;
		return `L ${x} ${y}`;
	});
}

function formatHTML(points: string[], isClosed: boolean) {
	const spans = points.map(
		(p, i) => `<span class="${s.point}" style="--hue: ${i * 30}">${p}</span>`
	);

	const html = `<p class="${c.indent_2}">d="${spans.join(" ")}${isClosed ? " Z" : ""}"</p>`;

	return html;
}

export default PathDrawing;
