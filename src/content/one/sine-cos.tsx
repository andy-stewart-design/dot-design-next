"use client";

import { useState } from "react";
import Switch from "@/components/Switch";
import RangeInput from "@/components/RangeInput";
import { map } from "@/utils/math";
import cn from "clsx/lite";
import s from "./shared.module.css";

export default function ArcDrawing() {
	const [percent, setPercent] = useState<number>(0.1);

	return (
		<div className={s.container} data-elevation="1">
			<div className={s.content} data-rows="2">
				<div>
					<RangeInput
						label="Progress"
						value={percent}
						onChange={setPercent}
						min={0}
						max={100}
						step={0.1}
						outputRenderProp={(v) => Math.round(v)}
					/>
					{/* <Switch
						checked={isLarge}
						onChange={(v) => {
							setIsLarge(v);
							if (!interactiveIndices.includes(1)) setInteractiveIndices((c) => [...c, 1]);
						}}
					>
						Large Arc
					</Switch> */}
				</div>
				<div className={s.code}>
					<p>{`const { PI, sin, cos } = Math`}</p>
					<p>const percent = progress / 100</p>
					<p className={s.comment}>{`// Percent: ${(percent / 100).toFixed(2)}`}</p>
					<p>const radians = percent * PI * 2</p>
					<p className={s.comment}>
						{`// Radians: ${((percent / 100) * Math.PI * 2).toFixed(2)}`}
					</p>
					<p>const x1 = sin(radians)</p>
					<p className={s.comment}>
						{`// x1: ${Math.sin((percent / 100) * Math.PI * 2).toFixed(2)}`}
					</p>
					<p>const x2 = cos(radians)</p>
					<p className={s.comment}>
						{`// x2: ${Math.cos((percent / 100) * Math.PI * 2).toFixed(2)}`}
					</p>
				</div>
			</div>
			<div className={s.canvas} data-elevation="0">
				<div className={s.wrapper}>
					<svg viewBox="0 0 100 100">
						<g>
							<WaveChart type="sin" progress={percent} />
						</g>
						<line
							x1={0}
							y1={50}
							x2={100}
							y2={50}
							stroke="var(--elevation-1)"
							strokeWidth={0.25}
						/>
						<g transform="translate(0, 50)">
							<WaveChart type="cos" progress={percent} />
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
}

function WaveChart({ type = "sin", progress }: { type?: "sin" | "cos"; progress: number }) {
	const r = 7;
	const radians = (progress / 100) * Math.PI * 2;

	const c1 = {
		x: type === "cos" ? 23 + Math.sin(radians) * r : 23 - Math.cos(radians) * r,
		y: type === "cos" ? 17 - Math.cos(radians) * r : 17 - Math.sin(radians) * r,
	};

	const nCos = map(Math.cos(radians), 1, -1, 0, 1);
	const c2 = {
		x: 40 + (44 * progress) / 100,
		y: type === "cos" ? 10 + nCos * r * 2 : 17 - Math.sin(radians) * r,
	};

	const c3 = {
		x: type === "cos" ? 50 + Math.cos(radians) * 30 : 50 + Math.sin(radians) * 30,
	};

	const wavePath =
		type === "cos"
			? "M40 10C47.9804 10 54.0196 24 62 24C69.9804 24 76.0196 10 84 10"
			: "M40 17C43.4869 13.5 47.0098 10 51 10C58.9804 10 65.0196 24 73 24C76.9902 24 80.4951 20.5 84 17";

	return (
		<svg width="100" height="50" viewBox="0 0 100 50" fill="none">
			<text x="3" y="5" fill="var(--foreground)" fontSize="2.75" fontFamily="monospace">
				{type}: {formatNumber(Math[type](radians))}
			</text>
			<text x="8" y="37.5" fill="var(--foreground)" fontSize="2.75" fontFamily="monospace">
				-1
			</text>
			<text x="88" y="37.5" fill="var(--foreground)" fontSize="2.75" fontFamily="monospace">
				+1
			</text>
			<circle
				cx="23"
				cy="17"
				r={r}
				stroke="var(--elevation-1)"
				strokeWidth="0.5"
				strokeLinecap="round"
			/>
			<line
				x1={14}
				y1={17}
				x2={86}
				y2={17}
				stroke="var(--elevation-1)"
				strokeWidth={0.5}
				strokeLinecap="round"
				strokeDasharray="1 2"
				opacity={0.5}
			/>
			<circle cx={c1.x} cy={c1.y} r="2" fill="var(--color-primary)" />
			<path
				d={wavePath}
				stroke="var(--elevation-1)"
				strokeWidth="0.5"
				strokeLinecap="round"
			/>
			<circle cx={c2.x} cy={c2.y} r="2" fill="var(--color-primary)" />
			<line
				x1={c1.x}
				y1={c1.y}
				x2={c2.x}
				y2={c2.y}
				stroke="var(--foreground)"
				strokeWidth={0.375}
				strokeLinecap="round"
			/>
			<circle cx={c1.x} cy={c1.y} r="0.5" fill="var(--foreground)" />
			<circle cx={c2.x} cy={c2.y} r="0.5" fill="var(--foreground)" />
			<rect x="14" y="30" width="72" height="12" rx="2" fill="var(--elevation-1)" />
			<circle cx={c3.x} cy="36" r="4" fill="var(--foreground)" />
		</svg>
	);
}

// ------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------
function formatNumber(num: number) {
	const sign = Number(num.toFixed(2)) < 0 ? "-" : "+";
	const number = Math.abs(num).toFixed(2);
	return sign + number;
}
