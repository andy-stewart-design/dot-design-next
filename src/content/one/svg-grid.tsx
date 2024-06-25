"use client";

import { useRef, useState, type MouseEvent } from "react";
import { clamp, map } from "@/utils/math";
import cn from "clsx";
import s from "./svg-grid.module.css";

type ActiveElement = "left" | "right" | "circle" | undefined;
const radius = 4;

export default function SVGGrid() {
	const [width, setWidth] = useState(240);
	const [position, setPosition] = useState({ x: 12, y: 12 });
	const [activeElement, setActiveElement] = useState<ActiveElement | undefined>(undefined);
	const posOffset = useRef({ x: 0, y: 0 });
	const prevMousePos = useRef({ x: 0, y: 0 });

	function handleClick() {
		setActiveElement(undefined);
	}

	function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
		const clickPos = getClickPosition(e);

		const distance = Math.sqrt(
			(clickPos.x - position.x) ** 2 + (clickPos.y - position.y) ** 2
		);

		if (distance < radius) {
			const nextPos = { ...position };
			const offX = clickPos.x - nextPos.x;
			const offY = clickPos.y - nextPos.y;
			posOffset.current = { x: offX, y: offY };
			setActiveElement("circle");
		}

		if (detectHoverY(e)) {
			const div = e.currentTarget.getBoundingClientRect();
			const edgeRight = div.width / 2 + width / 2;
			const edgeLeft = div.width / 2 - width / 2;
			const mouseX = e.clientX - div.left;
			if (mouseX > edgeRight - 10 && mouseX < edgeRight + 10) {
				setActiveElement("right");
			} else if (mouseX > edgeLeft - 10 && mouseX < edgeLeft + 10) {
				setActiveElement("left");
			}
		}
	}

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		const mousePos = getClickPosition(e);

		if (activeElement === "circle") {
			const nextX = mousePos.x - posOffset.current.x;
			const nextY = mousePos.y - posOffset.current.y;
			setPosition({ x: nextX, y: nextY });
		} else if (activeElement === "right") {
			const dx = e.clientX - prevMousePos.current.x;
			setWidth(clamp(64, width + dx * 2, 360));
		} else if (activeElement === "left") {
			const dx = e.clientX - prevMousePos.current.x;
			setWidth(clamp(64, width - dx * 2, 360));
		}

		prevMousePos.current = { x: e.clientX, y: e.clientY };
	}

	return (
		<div className={s.container} data-elevation="1">
			<div className={s.content}>
				{/* <div className={s.controls}>
					<Switch checked={isClosed} onChange={(e) => setIsClosed(e.target.checked)}>
						Close path (Z)
					</Switch>
				</div>
				 */}
				<div className={s.code}>
					<p>{`<svg`}</p>
					<p className={s["indent-1"]}>{`viewBox="0 0 32 24"`}</p>
					<p className={s["indent-1"]}>{`width="${width}"`}</p>
					<p>{`>`}</p>
					<p className={s["indent-1"]}>{`<circle`}</p>
					<p className={s["indent-2"]}>{`cx="${position.x.toFixed(2)}"`}</p>
					<p className={s["indent-2"]}>{`cy="${position.y.toFixed(2)}"`}</p>
					<p className={s["indent-2"]}>{`r="${radius}"`}</p>
					<p className={s["indent-1"]}>{`/>`}</p>
					<p>{`</svg>`}</p>
				</div>
			</div>
			<div className={s.canvas} data-elevation="0">
				<div
					className={s.target}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onClick={handleClick}
				>
					<div className={s.wrapper} data-active-edge={activeElement}>
						<svg className={s.svg} viewBox="0 0 32 24" width={width}>
							<circle cx={position.x} cy={position.y} r={radius} />
						</svg>
						<div className={cn(s.edge, s.edgeRight)} />
						<div className={cn(s.edge, s.edgeLeft)} />
					</div>
				</div>
			</div>
		</div>
	);
}

// ------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------
function getClickPosition(e: MouseEvent<Element>) {
	const svg = e.currentTarget.querySelector("svg")?.getBoundingClientRect();

	if (!svg) return { x: 0, y: 0 };

	const xPos = e.clientX - svg.left;
	const yPos = e.clientY - svg.top;
	const x = map(xPos, 0, svg.width, 0, 32);
	const y = map(yPos, 0, svg.height, 0, 24);
	return { x, y };
}

function detectHoverY(e: MouseEvent<Element>) {
	const div = e.currentTarget.getBoundingClientRect();
	const svg = e.currentTarget.querySelector("svg")?.getBoundingClientRect();
	if (!svg) return false;

	const mouseY = e.clientY - div.top;

	if (mouseY > svg.top - div.top && mouseY < svg.bottom - div.top) return true;
	else return false;
}
