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
		return `${Math.round(state)}%`;
	}, []);

	const formatOuterDiameter = useCallback((state: number) => {
		return `${Math.round(state)}px`;
	}, []);

	const formatInnerDiameter = useCallback(() => {
		return `${Math.round(outerDiameter * innerOffset)}px`;
	}, [outerDiameter, innerOffset]);

	return (
		<div className={s.container}>
			<div className={s.controls}>
				<ToggleGroup
					name="chart-style"
					items={[
						{ value: "donut", label: "Donut" },
						{ value: "pie", label: "Pie" },
					]}
					value={chartStyle}
					onValueChange={(e: "donut" | "pie") => setChartStyle(e)}
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
						min={40}
						max={160}
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
			<div className={s.canvas}>
				<ProgressIndicator
					key={`${percent}`}
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
	outerDiameter: outDia = 32,
	innerDiameter: inDia = 24,
	donut = true,
}: ProgressIndicatorProps) {
	const center = outDia / 2;
	const frameRadius = center;
	const outOff = 1;
	const outRad = outDia / 2 - outOff * 2;
	const inRad = inDia / 2;
	const inOff = (outDia - inDia) / 2;
	const fill = 100 - percent;
	const largeArc = fill < 50 ? 1 : 0;

	const maskURL = useId();
	const radians = (fill / 100) * 2 * Math.PI;
	const x = frameRadius - frameRadius * Math.sin(radians);
	const y = frameRadius - frameRadius * Math.cos(radians);

	const bgPath = `M ${center} 0
                    A ${center} ${center} 0 ${largeArc} 1 ${center} ${outDia}
                    A ${center} ${center} 0 ${largeArc} 1 ${center} 0`;

	const fgPath =
		percent === 100
			? bgPath
			: `M ${center} 0
               A ${center} ${center} 0 ${largeArc} 1 ${x} ${y} 
               L ${center} ${center} z`;

	const outerMask = `M ${center} ${outOff}
                    A ${outRad} ${outRad} 0 ${largeArc} 1 ${center} ${outDia - outOff}
                    A ${outRad} ${outRad} 0 ${largeArc} 1 ${center} ${outOff}`;
	const innerMask = `M ${center} ${inOff}
					   A ${inRad} ${inRad} 0 ${largeArc} 1 ${center} ${outDia - inOff}
					   A ${inRad} ${inRad} 0 ${largeArc} 1 ${center} ${inOff}`;
	const maskPath = donut ? `${outerMask} ${innerMask}` : outerMask;

	return (
		<svg
			width={outDia}
			height={outDia}
			viewBox={`0 0 ${outDia} ${outDia}`}
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
