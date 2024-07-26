"use client";

import { useState } from "react";
import RangeInput from "@/components/RangeInput";
import s from "./shared.module.css";

export default function SineCircle() {
	const [percent, setPercent] = useState<number>(0);

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
				</div>
				<div className={s.code}>
					<p>{`const { PI, sin, cos } = Math`}</p>
					<p>const percent = progress / 100</p>
					<p className={s.comment}>{`// Percent: ${(percent / 100).toFixed(2)}`}</p>
					<p>const radians = percent * PI * 2</p>
					<p className={s.comment}>
						{`// Radians: ${((percent / 100) * Math.PI * 2).toFixed(2)}`}
					</p>
					<p>const x = center +</p>
					<p className={s.indent_5}>sin(radians) * radius</p>
					<p className={s.comment}>
						{`// x: ${(50 + Math.sin((percent / 100) * Math.PI * 2) * 30).toFixed(2)}`}
					</p>
					<p>const y = center -</p>
					<p className={s.indent_5}>cos(radians) * radius</p>
					<p className={s.comment}>
						{`// y: ${(50 - Math.cos((percent / 100) * Math.PI * 2) * 30).toFixed(2)}`}
					</p>
				</div>
			</div>
			<div className={s.canvas} data-elevation="0">
				<div className={s.wrapper}>
					<CircleChart progress={percent} />
				</div>
			</div>
		</div>
	);
}

function CircleChart({ progress }: { progress: number }) {
	const center = 50;
	const radius = 30;
	const radians = (progress / 100) * Math.PI * 2;
	const x = 50 + Math.sin(radians) * radius;
	const y = 50 - Math.cos(radians) * radius;
	const largeArc = radians > Math.PI ? 1 : 0;
	const wedge =
		progress < 100
			? `M ${center} ${center - radius} 
			   A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y} 
			   L ${center} ${center} Z`
			: `M ${center} ${center - radius} 
			   A ${radius} ${radius} 0 0 1 ${center} ${center + radius} 
			   A ${radius} ${radius} 0 0 1 ${center} ${center - radius}`;

	return (
		<svg viewBox="0 0 100 100" fill="none">
			<path d={wedge} fill="var(--elevation-1)" opacity="0.375" />
			<circle
				cx={center}
				cy={center}
				r={radius}
				stroke="var(--elevation-1)"
				strokeWidth="0.5"
				fill="none"
			/>
			<circle cx={x} cy={y} r="3" fill="var(--foreground)" />
			<circle
				cx={x}
				cy={center}
				r="3"
				stroke="var(--color-primary)"
				strokeWidth="0.5"
				fill="none"
			/>
			<circle
				cx={center}
				cy={y}
				r="3"
				stroke="var(--color-primary)"
				strokeWidth="0.5"
				fill="none"
			/>
			<line
				x1={x}
				y1={center}
				x2={x}
				y2={y}
				stroke="var(--color-primary)"
				strokeWidth="0.375"
				strokeLinecap="round"
			/>
			<line
				x1={x}
				y1={y}
				x2={center}
				y2={y}
				stroke="var(--color-primary)"
				strokeWidth="0.375"
				strokeLinecap="round"
			/>
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
