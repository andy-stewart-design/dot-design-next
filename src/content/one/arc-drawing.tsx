"use client";

import { type MouseEvent, useState } from "react";
import Switch from "@/components/Switch";
import RangeInput from "@/components/RangeInput";
import { map } from "@/utils/math";
import { Refresh } from "@/components/Icons/20";
import cn from "clsx/lite";
import s from "./shared.module.css";

const size = 100;
const frameCenter = size / 2;
const initDiameter = 30;
const offset = (size - initDiameter * 2) / 2;
const defaultPoints = [
	{ x: frameCenter, y: offset },
	{ x: offset, y: frameCenter },
];

export default function ArcDrawing() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [radius, setRadius] = useState<number>(initDiameter);
	const [points, setPoints] = useState(defaultPoints);
	const [isLarge, setIsLarge] = useState(true);
	const [isClockwise, setIsClockwise] = useState(true);
	const [interactiveIndices, setInteractiveIndices] = useState<number[]>([]);

	const dist = distance(points[0], points[1]);
	if (radius * 2 < dist) setRadius(dist / 2);

	const largeArc = isLarge ? 1 : 0;
	const sweep = isClockwise ? 1 : 0;
	const { x, y } = points[1];
	const wedgePath = `M ${points[0].x} ${points[0].y}
                       A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x} ${y}`;

	function handleClick() {
		if (activeIndex === null) return;
		setActiveIndex(null);
	}

	function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
		const clickPos = getClickPosition(e);

		const clickedPoint = points.filter((p) => {
			const dist = distance(clickPos, p);
			return dist < 5;
		});

		if (clickedPoint.length > 0) {
			const index = points.indexOf(clickedPoint[0]);
			setActiveIndex(index);
			if (!interactiveIndices.includes(index)) {
				setInteractiveIndices((c) => [...c, index]);
			}
		}
	}

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		if (activeIndex === null) return;

		const clickPos = getClickPosition(e);
		const nextPoints = [...points];
		nextPoints[activeIndex] = { x: Math.floor(clickPos.x), y: Math.floor(clickPos.y) };
		setPoints(nextPoints);
	}

	function handleRangeChange(v: number) {
		setRadius(v);
		if (!interactiveIndices.includes(1)) setInteractiveIndices((c) => [...c, 1]);
	}

	function reset() {
		setPoints(defaultPoints);
		setRadius(initDiameter);
		setIsLarge(true);
		setIsClockwise(true);
		setInteractiveIndices([]);
	}

	return (
		<div className={s.container} data-elevation="1">
			<div className={s.content} data-rows="2">
				<div>
					<RangeInput
						label="Arc Radius"
						value={radius}
						onChange={handleRangeChange}
						min={dist / 2}
						max={dist / 2 + 40}
						step={0.01}
						outputRenderProp={(v) => Math.round(v)}
					/>
					<Switch
						checked={isLarge}
						onChange={(v) => {
							setIsLarge(v);
							if (!interactiveIndices.includes(1)) setInteractiveIndices((c) => [...c, 1]);
						}}
					>
						Large Arc
					</Switch>
					<Switch
						checked={isClockwise}
						onChange={(v) => {
							setIsClockwise(v);
							if (!interactiveIndices.includes(1)) setInteractiveIndices((c) => [...c, 1]);
						}}
					>
						Sweep Direction
					</Switch>
				</div>
				<div className={s.code}>
					<p>{`<svg viewBox="0 0 100 100">`}</p>
					<p className={s.indent_1}>{`<path`}</p>
					<p
						key={JSON.stringify([points[0]])}
						className={cn(s.indent_2, s.highlight_line)}
						data-interactive={interactiveIndices.includes(0) ? "" : undefined}
					>{`d="M ${points[0].x} ${points[0].y}`}</p>
					<p
						key={JSON.stringify([radius, points[1], isLarge, isClockwise])}
						className={cn(s.indent_3_5, s.highlight_line)}
						data-interactive={interactiveIndices.includes(1) ? "" : undefined}
					>{`A ${Math.round(radius)} ${Math.round(
						radius
					)} 0 ${largeArc} ${sweep} ${x} ${y}"`}</p>
					<p className={s.indent_1}>{`></path>`}</p>
					<p>{`</svg>`}</p>
				</div>
			</div>
			<div className={s.canvas} data-elevation="0">
				<div
					className={s.wrapper}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onClick={handleClick}
				>
					<svg viewBox="0 0 100 100">
						<path
							d={wedgePath}
							fill="none"
							stroke="var(--foreground)"
							strokeLinecap="round"
						/>
						{points.map((point, index) => (
							<circle
								key={index}
								cx={point.x}
								cy={point.y}
								r={2}
								fill="var(--color-primary)"
							/>
						))}
					</svg>
				</div>
				<button className={s.btn} onClick={reset}>
					<Refresh />
				</button>
			</div>
		</div>
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

function distance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
	return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}
