"use client";

import { useEffect, useRef, useState } from "react";
import { DemoWrapper } from "@/components/Blog";
import { Play, Pause } from "@/components/Icons/20";
import Button from "@/components/Button";
import s from "./component.module.css";

export default function ArcToAnimation() {
	const lineRef = useRef<SVGPathElement>(null);
	const arcRef = useRef<SVGPathElement>(null);
	const [lineLength, setLineLength] = useState("350.72");
	const [arcLength, setArcLength] = useState("427.68");
	const [isPlaying, setIsPlaying] = useState(true);

	useEffect(() => {
		if (!lineRef.current || !arcRef.current) return;
		setLineLength(lineRef.current.getTotalLength().toFixed(2));
		setArcLength(arcRef.current.getTotalLength().toFixed(2));
	}, []);

	return (
		<DemoWrapper aspectRatio="auto" grid={false}>
			<div className={s.grid} style={{ "--play-state": isPlaying ? "running" : "paused" }}>
				<div className={s.move}>
					<svg viewBox="0 0 568 568" fill="none">
						<circle cx="160" cy="160" r="28" fill="#0AF" />
						<circle cx="408" cy="408" r="28" stroke="#0AF" strokeWidth="2" />
						<circle className={s.circle} cx="160" cy="160" r="28" fill="#0AF"></circle>
					</svg>
					<p>Move To</p>
				</div>
				<div className={s.line} style={{ "--line-length": lineLength }}>
					<svg viewBox="0 0 568 568" fill="none">
						<circle cx="160" cy="160" r="28" fill="#0AF" />
						<circle cx="408" cy="408" r="28" stroke="#0AF" strokeWidth="2" />
						<path
							ref={lineRef}
							className={s.path}
							d="M 160 160 L 408 408"
							stroke="#0AF"
							strokeWidth="12"
						/>
						<circle className={s.circle} cx="160" cy="160" r="28" fill="#0AF"></circle>
					</svg>
					<p>Line To</p>
				</div>
				<div className={s.arc} style={{ "--line-length": arcLength }}>
					<svg viewBox="0 0 568 568" fill="none">
						<circle cx="160" cy="160" r="28" fill="#0AF" />
						<circle cx="408" cy="408" r="28" stroke="#0AF" strokeWidth="2" />
						<path
							ref={arcRef}
							className={s.path}
							d="M 160 160 A 200 200 0 0 0 408 408"
							stroke="#0AF"
							strokeWidth="12"
						/>
						<circle className={s.circle} r="28" fill="#0AF"></circle>
					</svg>
					<p>Arc To</p>
				</div>
			</div>
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
