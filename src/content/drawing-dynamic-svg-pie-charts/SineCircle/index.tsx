"use client";

import { useState } from "react";
import RangeInput from "@/components/RangeInput";
import {
	DemoCanvas,
	DemoWrapper,
	DemoContent,
	DemoControls,
	DemoCode,
} from "@/components/Blog";

export default function SineCircle() {
	const [percent, setPercent] = useState<number>(0);

	return (
		<DemoWrapper>
			<DemoContent>
				<DemoControls>
					<RangeInput
						label="Progress"
						value={percent}
						onChange={setPercent}
						min={0}
						max={100}
						step={0.1}
						outputRenderProp={(v) => Math.round(v)}
					/>
				</DemoControls>
				<DemoCode>
					<p>{`const { PI, sin, cos } = Math`}</p>
					<p>const percent = progress / 100</p>
					<p data-comment>{`// Percent: ${(percent / 100).toFixed(2)}`}</p>
					<p>const radians = percent * PI * 2</p>
					<p data-comment>{`// Radians: ${((percent / 100) * Math.PI * 2).toFixed(2)}`}</p>
					<p>const x = centerCoordinate +</p>
					<p data-indent="5">sin(radians) * radius</p>
					<p data-comment>
						{`// x: ${(50 + Math.sin((percent / 100) * Math.PI * 2) * 30).toFixed(2)}`}
					</p>
					<p>const y = centerCoordinate -</p>
					<p data-indent="5">cos(radians) * radius</p>
					<p data-comment>
						{`// y: ${(50 - Math.cos((percent / 100) * Math.PI * 2) * 30).toFixed(2)}`}
					</p>
				</DemoCode>
			</DemoContent>
			<DemoCanvas>
				<CircleChart progress={percent} />
			</DemoCanvas>
		</DemoWrapper>
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
