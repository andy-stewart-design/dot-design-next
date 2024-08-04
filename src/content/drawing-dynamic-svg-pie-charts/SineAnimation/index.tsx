"use client";

import { useEffect, useRef, useState } from "react";
import { DemoWrapper } from "@/components/BlogDemo";
import { Play, Pause } from "@/components/Icons/20";
import s from "../shared.module.css";

export default function SineAnimation() {
	const svgRef = useRef<SVGSVGElement>(null);
	const wavePathRef = useRef<SVGPathElement>(null);
	const [pathLength, setPathLength] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);

	useEffect(() => {
		const pathRef = wavePathRef.current;
		if (!pathRef) return;
		setPathLength(wavePathRef.current.getTotalLength());
		// parentRef.pauseAnimations();
	}, []);

	useEffect(() => {
		const ref = svgRef.current;
		if (!ref) return;
		if (!isPlaying) ref.pauseAnimations();
		else ref.unpauseAnimations();
	}, [isPlaying]);

	return (
		<DemoWrapper>
			<svg ref={svgRef} viewBox="0 0 1920 1080" fill="none">
				<line
					x1="400"
					y1="300"
					x2="1760"
					y2="300"
					stroke="var(--elevation-1)"
					strokeWidth="6"
					strokeLinecap="round"
					strokeDasharray="0 16"
				/>
				<line
					x1="640"
					y1="540"
					x2="1760"
					y2="540"
					stroke="var(--elevation-1)"
					strokeWidth="6"
					strokeLinecap="round"
					strokeDasharray="0 16"
				/>
				<line
					x1="400"
					y1="780"
					x2="1760"
					y2="780"
					stroke="var(--elevation-1)"
					strokeWidth="6"
					strokeLinecap="round"
					strokeDasharray="0 16"
				/>
				<g clipPath="url(#wave-mask)">
					<g>
						<path
							ref={wavePathRef}
							d="M768 300C883.353 300 970.65 780 1086 780C1201.35 780 1288.65 300 1404 300C1519.35 300 1606.65 780 1722 780C1837.35 780 1924.65 300 2040 300C2155.35 300 2242.65 780 2358 780C2473.35 780 2560.65 300 2676 300C2791.35 300 2878.65 780 2994 780C3109.35 780 3196.65 300 3312 300"
							stroke={pathLength > 0 ? "var(--color-primary)" : "transparent"}
							strokeWidth="10"
							strokeLinecap="round"
							strokeDasharray={pathLength * 0.375}
						>
							<animate
								attributeName="stroke-dasharray"
								from={`${pathLength * 0.625} ${pathLength}`}
								to={`${pathLength * 0.375} ${pathLength}`}
								dur="3000ms"
								repeatCount="indefinite"
							/>
						</path>
						<animateTransform
							attributeName="transform"
							attributeType="XML"
							type="translate"
							from="-636 0"
							to="0 0"
							dur="3000ms"
							repeatCount="indefinite"
						/>
					</g>
				</g>
				<line
					x1="400"
					y1="300"
					x2="400"
					y2="780"
					stroke="var(--elevation-1)"
					strokeWidth="4"
				/>
				<line
					x1="160"
					y1="540"
					x2="640"
					y2="540"
					stroke="var(--elevation-1)"
					strokeWidth="4"
				/>
				<circle cx="400" cy="540" r="240" stroke="var(--elevation-1)" strokeWidth="6" />
				<g clipPath="url(#circle-mask)">
					<line
						x1="160"
						y1="300"
						x2="400"
						y2="300"
						stroke="var(--color-primary)"
						strokeWidth="9"
						strokeLinecap="round"
						strokeDasharray="0 16"
					>
						<animateTransform
							attributeName="transform"
							attributeType="XML"
							type="scale"
							values="1 1; 1 1; 0 1; 0 1"
							keyTimes="0; 0.4999; 0.5; 1"
							dur="3000ms"
							repeatCount="indefinite"
							additive="sum"
						/>
						<animateTransform
							attributeName="transform"
							attributeType="XML"
							type="translate"
							values="0 0; 0 480; 0 0"
							dur="3000ms"
							calcMode="spline"
							keySplines="0.37 0 0.63 1;0.37 0 0.63 1;"
							repeatCount="indefinite"
							additive="sum"
						/>
					</line>
				</g>
				<g>
					<line
						x1="400"
						y1="300"
						x2="760"
						y2="300"
						stroke="var(--color-primary)"
						strokeWidth="9"
						strokeLinecap="round"
						strokeDasharray="0 16"
					/>
					<circle cx="760" cy="300" r="16" fill="var(--color-primary)" />
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="translate"
						values="0 0; 0 480; 0 0"
						dur="3000ms"
						calcMode="spline"
						keySplines="0.37 0 0.63 1;0.37 0 0.63 1;"
						repeatCount="indefinite"
					/>
				</g>
				<line
					x1="400"
					y1="300"
					x2="400"
					y2="540"
					stroke="var(--color-primary)"
					strokeWidth="10"
					strokeLinecap="round"
				>
					<animate
						attributeName="y1"
						values="300;780;300"
						dur="3000ms"
						calcMode="spline"
						keySplines="0.37 0 0.63 1;0.37 0 0.63 1;"
						repeatCount="indefinite"
					/>
				</line>
				<g style={{ transformOrigin: "400px 540px" }}>
					<line
						x1="400"
						y1="300"
						x2="400"
						y2="540"
						stroke="var(--color-primary)"
						strokeWidth="10"
						strokeLinecap="round"
					/>
					<circle cx="400" cy="300" r="16" fill="var(--color-primary)" />
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						from="0 0 0"
						to="-360 0 0"
						dur="3000ms"
						repeatCount="indefinite"
					/>
				</g>
				<defs>
					<clipPath id="circle-mask">
						<circle cx="400" cy="540" r="240" fill="white" />
					</clipPath>
					<clipPath id="wave-mask">
						<rect x="766" y="250" width="1160" height="580" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<button className={s.btn} onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? <Pause /> : <Play />}
			</button>
		</DemoWrapper>
	);
}
