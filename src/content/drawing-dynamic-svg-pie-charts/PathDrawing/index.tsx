"use client";

import { useState, type MouseEvent, type TouchEvent } from "react";
import Switch from "@/components/Switch";
import {
	DemoCanvas,
	DemoWrapper,
	DemoContent,
	DemoControls,
	DemoCode,
} from "@/components/Blog";
import { Refresh } from "@/components/Icons/20";
import { map } from "@/utils/math";
import c from "./component.module.css";
import s from "../shared.module.css";
import Button from "@/components/Button";

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

	function handlePressEnd(e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
		if (activeIndex === null && "clientX" in e) {
			const clickPos = getRelativeEventCoords(e);
			setPoints([...points, { x: Math.floor(clickPos.x), y: Math.floor(clickPos.y) }]);
		} else {
			setActiveIndex(null);
		}
	}

	function handlePressStart(e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
		const clickPos = getRelativeEventCoords(e);

		const clickedPoint = points.filter((p) => {
			const distance = Math.sqrt((clickPos.x - p.x) ** 2 + (clickPos.y - p.y) ** 2);
			return distance < 5;
		});

		if (clickedPoint.length > 0) {
			const index = points.indexOf(clickedPoint[0]);
			setActiveIndex(index);
		}
	}

	function handlePressMove(e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
		if (activeIndex === null) return;

		const clickPos = getRelativeEventCoords(e);
		const nextPoints = [...points];
		nextPoints[activeIndex] = { x: Math.floor(clickPos.x), y: Math.floor(clickPos.y) };
		setPoints(nextPoints);
	}

	function reset(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();

		setActiveIndex(null);
		setPoints([
			{ x: 20, y: 30 },
			{ x: 60, y: 80 },
		]);
		setIsClosed(false);
	}

	return (
		<DemoWrapper>
			<DemoContent>
				<DemoControls>
					<Switch checked={isClosed} onChange={setIsClosed}>
						Close path (Z)
					</Switch>
				</DemoControls>
				<DemoCode>
					<p>{`<svg viewBox="0 0 100 100">`}</p>
					<p data-indent="1">{`<path`}</p>
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<p data-indent="1">{`></path>`}</p>
					<p>{`</svg>`}</p>
				</DemoCode>
			</DemoContent>
			<DemoCanvas
				onMouseDown={handlePressStart}
				onTouchStart={handlePressStart}
				onMouseMove={handlePressMove}
				onTouchMove={handlePressMove}
				onClick={handlePressEnd}
				onTouchEnd={handlePressEnd}
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
				<Button
					className={s.btn}
					onClick={reset}
					label="Reset demo"
					disabled={points.length <= 2}
				>
					<Refresh />
				</Button>
			</DemoCanvas>
		</DemoWrapper>
	);
}

// ------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------
function getRelativeEventCoords(e: MouseEvent<Element> | TouchEvent<Element>) {
	const div = e.currentTarget.getBoundingClientRect();
	const [clientX, clientY] = getEventCoords(e);

	const xPos = clientX - div.left;
	const yPos = clientY - div.top;
	const x = map(xPos, 0, div.width, 0, 100);
	const y = map(yPos, 0, div.height, 0, 100);
	return { x, y };
}

function getEventCoords(e: MouseEvent<Element> | TouchEvent<Element>) {
	if ("clientX" in e) {
		return [e.clientX, e.clientY];
	} else {
		return [e.touches[0].clientX, e.touches[0].clientY];
	}
}

function formatPoints(points: { x: number; y: number }[]) {
	return points.map(({ x, y }, i) => {
		if (i === 0) return `M ${x} ${y}`;
		return `L ${x} ${y}`;
	});
}

function formatHTML(points: string[], isClosed: boolean) {
	const spans = points.map(
		(p, i) => `<span class="${c.point}" style="--hue: ${i * 30}">${p}</span>`
	);

	const html = `<p data-indent="2">d="${spans.join(" ")}${isClosed ? " Z" : ""}"</p>`;

	return html;
}

export default PathDrawing;
