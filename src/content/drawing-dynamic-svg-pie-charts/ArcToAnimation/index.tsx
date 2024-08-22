"use client";

import { useEffect, useRef, useState } from "react";
import { DemoWrapper } from "@/components/Blog";
import { Play, Pause } from "@/components/Icons/20";
import s from "../shared.module.css";
import Button from "@/components/Button";

export default function ArcToAnimation() {
	const svgRef = useRef<SVGSVGElement>(null);
	const [isPlaying, setIsPlaying] = useState(true);

	useEffect(() => {
		const ref = svgRef.current;
		if (!ref) return;
		if (!isPlaying) ref.pauseAnimations();
		else ref.unpauseAnimations();
	}, [isPlaying]);

	return (
		<DemoWrapper grid={false}>
			<svg ref={svgRef} viewBox="0 0 160 90" fill="none">
				<path
					d="M 80 22 A 37 37 0 1 0 80 68"
					stroke="var(--elevation-1)"
					strokeWidth="0.5"
				/>
				<path
					d="M 80 22 A 37 37 0 0 0 80 68"
					stroke="var(--elevation-1)"
					strokeWidth="0.5"
				/>
				<path
					d="M 80 22 A 37 37 0 0 1 80 68"
					stroke="var(--elevation-1)"
					strokeWidth="0.5"
				/>
				<path
					d="M 80 22 A 37 37 0 1 1 80 68"
					stroke="var(--elevation-1)"
					strokeWidth="0.5"
				/>
				<circle r="1.5" fill="var(--color-primary)">
					<animateMotion
						dur="3s"
						repeatCount="indefinite"
						path="M 80 22 A 37 37 0 1 0 80 68"
					/>
				</circle>
				<circle r="1.5" fill="var(--color-primary)">
					<animateMotion
						dur="3s"
						repeatCount="indefinite"
						path="M 80 22 A 37 37 0 0 0 80 68"
					/>
				</circle>
				<circle r="1.5" fill="var(--color-primary)">
					<animateMotion
						dur="3s"
						repeatCount="indefinite"
						path="M 80 22 A 37 37 0 0 1 80 68"
					/>
				</circle>
				<circle r="1.5" fill="var(--color-primary)">
					<animateMotion
						dur="3s"
						repeatCount="indefinite"
						path="M 80 22 A 37 37 0 1 1 80 68"
					/>
				</circle>
				<circle cx="80" cy="22" r="3" fill="var(--color-primary" />
				<circle cx="80" cy="68" r="3" fill="var(--color-primary" />
			</svg>
			<Button
				className={s.btn}
				onClick={() => setIsPlaying(!isPlaying)}
				label={isPlaying ? "Pause" : "Play"}
			>
				{isPlaying ? <Pause /> : <Play />}
			</Button>
		</DemoWrapper>
	);
}
