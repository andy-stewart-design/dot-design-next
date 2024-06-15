"use client";

import { useId, useState } from "react";
import s from "./progress-indicator.module.css";
import RangeInput from "@/components/RangeInput";

export default function ProgressIndicatorSandbox() {
	const [percent, setPercent] = useState(60);
	const [size, setSize] = useState(100);
	const [density, setDensity] = useState(0.25);

	function formatProgress(state: number) {
		return `${Math.round(state)}%`;
	}

	function formatSize(state: number) {
		return `${Math.round(state)}px`;
	}

	function formatDensity(state: number) {
		return `${Math.round(size * density)}px`;
	}

	return (
		<div className={s.container}>
			<div className={s.controls}>
				<RangeInput
					label="Progress"
					value={percent}
					onChange={setPercent}
					min={0}
					max={100}
					step={0.01}
					outputRenderProp={formatProgress}
				/>
				<RangeInput
					label="Chart Diameter"
					value={size}
					onChange={setSize}
					min={40}
					max={160}
					step={1}
					outputRenderProp={formatSize}
				/>
				<RangeInput
					label="Width"
					value={density}
					onChange={setDensity}
					min={0.1}
					max={0.4}
					step={0.001}
					outputRenderProp={formatDensity}
				/>
			</div>
			<div className={s.canvas}>
				<ProgressIndicator
					key={`${percent}`}
					percent={percent}
					size={size}
					density={size * density}
				/>
			</div>
		</div>
	);
}

interface ProgressIndicatorProps {
	percent: number;
	size?: number;
	density?: number;
}

function ProgressIndicator({ percent, density = 4, size = 32 }: ProgressIndicatorProps) {
	const center = size / 2;
	const frameRadius = center;
	const lgOffset = 1;
	const lgRadius = size / 2 - lgOffset * 2;
	const smOffset = density;
	const smRadius = size / 2 - smOffset;
	const fill = 100 - percent;
	const largeArc = fill < 50 ? 1 : 0;

	const maskURL = useId();
	const radians = (fill / 100) * 2 * Math.PI;
	const x = frameRadius - frameRadius * Math.sin(radians);
	const y = frameRadius - frameRadius * Math.cos(radians);

	const bgPath = `M ${center} 0
                    A ${center} ${center} 0 ${largeArc} 1 ${center} ${size}
                    A ${center} ${center} 0 ${largeArc} 1 ${center} 0`;

	const fgPath = `M ${center} 0
                    A ${center} ${center} 0 ${largeArc} 1 ${x} ${y} 
                    L ${center} ${center} z`;

	const maskPath = `M ${center} ${lgOffset}
                    A ${lgRadius} ${lgRadius} 0 ${largeArc} 1 ${center} ${size - lgOffset}
                    A ${lgRadius} ${lgRadius} 0 ${largeArc} 1 ${center} ${lgOffset}
                    M ${center} ${smOffset}
                    A ${smRadius} ${smRadius} 0 ${largeArc} 1 ${center} ${size - smOffset}
                    A ${smRadius} ${smRadius} 0 ${largeArc} 1 ${center} ${smOffset}`;

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fillRule="evenodd"
			data-filled={percent === 100 ? "" : undefined}
		>
			<path className={s.background} d={bgPath} mask={`url(#${maskURL})`} />
			<path className={s.foreground} d={fgPath} mask={`url(#${maskURL})`} />
			<defs>
				<mask id={maskURL}>
					<path d={maskPath} fill="white" strokeWidth="2" />
				</mask>
			</defs>
		</svg>
	);
}
