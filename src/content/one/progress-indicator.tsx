"use client";

import { useCallback, useId, useState } from "react";
import RangeInput from "@/components/RangeInput";
import s from "./progress-indicator.module.css";
import ToggleGroup from "@/components/ToggleGroup";

export default function ProgressIndicatorSandbox() {
	const [chartStyle, setChartStyle] = useState<"donut" | "pie">("donut");
	const [percent, setPercent] = useState(60);
	const [outerDiameter, setOuterDiameter] = useState(100);
	const [innerOffset, setInnerOffset] = useState(0.75);

	const formatProgress = useCallback((state: number) => {
		return `${Math.floor(state)}%`;
	}, []);

	const formatOuterDiameter = useCallback((state: number) => {
		return `${Math.floor(state)}px`;
	}, []);

	const formatInnerDiameter = useCallback(() => {
		return `${Math.floor(outerDiameter * innerOffset)}px`;
	}, [outerDiameter, innerOffset]);

	return (
		<div className={s.container} data-elevation="1">
			<div className={s.controls}>
				<ToggleGroup
					name="chart-style"
					items={[
						{ value: "donut", label: "Donut" },
						{ value: "pie", label: "Pie" },
					]}
					value={chartStyle}
					onValueChange={(e: "donut" | "pie") => setChartStyle(e)}
					elevation={1}
				/>
				<div className={s.inputs}>
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
						label="Outer Diameter"
						value={outerDiameter}
						onChange={setOuterDiameter}
						min={38}
						max={158}
						step={1}
						outputRenderProp={formatOuterDiameter}
					/>
					<RangeInput
						label="Inner Diameter"
						value={innerOffset}
						onChange={setInnerOffset}
						min={0.1}
						max={0.9}
						step={0.001}
						outputRenderProp={formatInnerDiameter}
					/>
				</div>
			</div>
			<div className={s.canvas} data-elevation="0">
				<ProgressIndicator
					percent={percent}
					outerDiameter={outerDiameter}
					innerDiameter={outerDiameter * innerOffset}
					donut={chartStyle === "donut"}
				/>
			</div>
		</div>
	);
}

interface ProgressIndicatorProps {
	percent: number;
	outerDiameter?: number;
	innerDiameter?: number;
	donut?: boolean;
}

function ProgressIndicator({
	percent,
	outerDiameter: outDia = 30,
	innerDiameter: inDia = 24,
	donut = true,
}: ProgressIndicatorProps) {
	const size = outDia + 2;
	const center = size / 2;
	const fill = 100 - percent;
	const largeArc = fill < 50 ? 1 : 0;

	const maskURL = useId();
	const radians = (fill / 100) * 2 * Math.PI;
	const x = center - center * Math.sin(radians);
	const y = center - center * Math.cos(radians);

	const circlePath = `M ${center} 0
                        A ${center} ${center} 0 ${largeArc} 1 ${center} ${outDia}
                        A ${center} ${center} 0 ${largeArc} 1 ${center} 0`;

	const wedgePath =
		percent === 100
			? circlePath
			: `M ${center} 0
               A ${center} ${center} 0 ${largeArc} 1 ${x} ${y} 
               L ${center} ${center} z`;

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fillRule="evenodd"
			data-filled={percent === 100 ? "" : undefined}
		>
			<g mask={`url(#${maskURL})`}>
				<circle className={s.background} cx={center} cy={center} r={outDia / 2} />
				<path className={s.foreground} d={wedgePath} />
			</g>
			<defs>
				<mask id={maskURL}>
					<circle cx={center} cy={center} r={outDia / 2} fill="white" />
					{donut && <circle cx={center} cy={center} r={inDia / 2} fill="black" />}
				</mask>
			</defs>
		</svg>
	);
}
