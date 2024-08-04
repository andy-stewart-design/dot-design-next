"use client";

import { useState, type SVGProps, type MouseEvent } from "react";
import Switch from "@/components/Switch";
import ToggleGroup from "@/components/ToggleGroup";
import {
	DemoCanvas,
	DemoWrapper,
	DemoContent,
	DemoControls,
	DemoCode,
} from "@/components/BlogDemo";
import { Refresh } from "@/components/Icons/20";
import { map } from "@/utils/math";
import s from "../shared.module.css";

type SVGShape = "circle" | "rect";
type SVGShapeData = {
	type: SVGShape;
	x: number;
	y: number;
	r: number;
	fill: string;
};
type SVGShapes = Array<SVGShapeData>;
type Vec2 = { x: number; y: number };

const defaultOffset = { x: 0, y: 0 };
const defaultShapes: SVGShapes = [
	{ type: "rect", x: 20, y: 20, r: 40, fill: "#FFF" },
	{ type: "circle", x: 40, y: 40, r: 44, fill: "#666" },
];

export default function ArcDrawing() {
	const [isMasked, setIsMasked] = useState(true);
	const [shapes, setShapes] = useState<SVGShapes>(defaultShapes);
	const [activeShape, setActiveShape] = useState<SVGShape | null>(null);
	const [activeOffset, setActiveOffset] = useState<Vec2>(defaultOffset);

	function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
		if (!isElement(e.target)) return;

		if (e.target.tagName === "rect" || e.target.tagName === "circle") {
			const nextActiveShape = shapes.find((s) => s.type === element(e.target)?.tagName);
			if (!nextActiveShape) return;
			const clickPos = getClickPosition(e);
			const posOffsetX = clickPos.x - nextActiveShape.x;
			const posOffsetY = clickPos.y - nextActiveShape.y;
			setActiveShape(e.target.tagName);
			setActiveOffset({ x: posOffsetX, y: posOffsetY });
			setShapes(updateShapes(shapes, e.target.tagName, {}));
		}
	}

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		if (activeShape === null) return;
		const clickPos = getClickPosition(e);
		setShapes(
			updateShapes(shapes, activeShape, {
				x: clickPos.x - activeOffset.x,
				y: clickPos.y - activeOffset.y,
			})
		);
	}

	function handleMouseUp() {
		setActiveShape(null);
		setActiveOffset(defaultOffset);
	}

	function reset() {
		setShapes(defaultShapes);
		setActiveOffset(defaultOffset);
		setActiveShape(null);
	}

	return (
		<DemoWrapper>
			<DemoContent>
				<DemoControls>
					<Switch checked={isMasked} onChange={setIsMasked}>
						Apply Mask
					</Switch>
					<ToggleGroup
						variant="color"
						groupLabel="Rect Fill Color"
						groupOrientation="horizontal"
						name="rect-fill-color"
						defaultValue="#FFF"
						items={[
							{ label: "#FFF", value: "#FFF" },
							{ label: "#666", value: "#666" },
							{ label: "#000", value: "#000" },
						]}
						onValueChange={(value) =>
							setShapes(updateShapes(shapes, "rect", { fill: value }))
						}
					/>
					<ToggleGroup
						variant="color"
						groupLabel="Circle Fill Color"
						groupOrientation="horizontal"
						name="circle-fill-color"
						defaultValue="#666"
						items={[
							{ label: "#FFF", value: "#FFF" },
							{ label: "#666", value: "#666" },
							{ label: "#000", value: "#000" },
						]}
						onValueChange={(value) =>
							setShapes(updateShapes(shapes, "circle", { fill: value }))
						}
					/>
				</DemoControls>
				<DemoCode>
					<CodeBlock shapes={shapes} isMasked={isMasked} />
				</DemoCode>
			</DemoContent>
			<DemoCanvas
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				<svg viewBox="0 0 100 100">
					<image
						x="10"
						y="10"
						width="80"
						height="80"
						href="/svg-mask.jpg"
						mask="url(#mask)"
					/>
					{shapes.map((shape, i) => (
						<SVGShape
							key={i}
							{...shape}
							fill={isMasked ? "transparent" : shape.fill}
							stroke={activeShape === shape.type ? "var(--color-primary)" : "none"}
							strokeWidth={0.75}
						/>
					))}
					{isMasked && (
						<defs>
							<mask id="mask">
								{shapes.map((shape, i) => (
									<SVGShape key={i} {...shape} />
								))}
							</mask>
						</defs>
					)}
				</svg>

				<button className={s.btn} onClick={reset}>
					<Refresh />
				</button>
			</DemoCanvas>
		</DemoWrapper>
	);
}

type SVGShapeProps = SVGShapeData & SVGProps<SVGCircleElement | SVGRectElement>;

function SVGShape({ type: TagName, x, y, r, fill, ...delegated }: SVGShapeProps) {
	if (TagName === "circle") {
		const rest = { ...delegated } as SVGProps<SVGCircleElement>;
		return <TagName {...rest} cx={x + r / 2} cy={y + r / 2} r={r / 2} fill={fill} />;
	} else {
		const rest = { ...delegated } as SVGProps<SVGRectElement>;
		return <TagName {...rest} x={x} y={y} width={r} height={r} rx="6" fill={fill} />;
	}
}

interface CodeBlockProps {
	shapes: SVGShapeData[];
	isMasked: boolean;
}

function CodeBlock({ shapes, isMasked }: CodeBlockProps) {
	return (
		<>
			<p>{`<svg viewBox="0 0 100 100">`}</p>
			<p data-indent="1">
				{`<image ${isMasked ? `mask="url(#mask)"` : ""} 
                  x="10" y="10" width="80" height="80" href="...">`}
			</p>
			{!isMasked ? (
				shapes.map((shape, i) => {
					return <SVGShapeCode key={i} {...shape} />;
				})
			) : (
				<>
					<p data-indent="1">{`<defs>`}</p>
					<p data-indent="2">{`<mask id="mask">`}</p>
					{shapes.map((shape) => {
						return <SVGShapeCode key={shape.type} {...shape} indent={3} />;
					})}
					<p data-indent="2">{`</mask>`}</p>
					<p data-indent="1">{`</defs>`}</p>
				</>
			)}
			<p>{`</svg>`}</p>
		</>
	);
}

interface SVGShapeCodeProps extends SVGShapeData {
	indent?: number;
}

function SVGShapeCode({ type, x, y, r, fill, indent = 1 }: SVGShapeCodeProps) {
	if (type === "circle") {
		return (
			<p
				key={JSON.stringify([x, y, r, fill])}
				data-indent={indent}
				data-highlight
				data-interactive
			>
				{`<circle fill="${fill}" cx="${(x + r / 2).toFixed(1)}" 
                  cy="${(y + r / 2).toFixed(1)}" r="${r / 2}" />`}
			</p>
		);
	} else {
		return (
			<p
				key={JSON.stringify([x, y, r, fill])}
				data-indent={indent}
				data-highlight
				data-interactive
			>
				{`<rect fill="${fill}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" 
                  width="${r}" height="${r}" rx="6"  />`}
			</p>
		);
	}
}

// ------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------
function getClickPosition(e: MouseEvent<Element>) {
	const div = e.currentTarget.getBoundingClientRect();
	const xPos = e.clientX - div.left;
	const yPos = e.clientY - div.top;
	const x = map(xPos, 0, div.width, 0, 100);
	const y = map(yPos, 0, div.height, 0, 100);
	return { x, y };
}

function isElement(target: EventTarget): target is SVGElement {
	return target instanceof SVGElement;
}

function element(target: EventTarget) {
	if (isElement(target)) return target;
}

type SVGShapeDataUpdate = {
	x?: number;
	y?: number;
	r?: number;
	fill?: string;
};

function updateShapes(shapes: SVGShapeData[], type: SVGShape, next: SVGShapeDataUpdate) {
	if (Object.keys(next).includes("fill")) {
		return shapes.map((shape) => {
			if (shape.type === type) {
				return { ...shape, ...next };
			} else {
				return shape;
			}
		});
	} else {
		const nextActiveShape = shapes.find((s) => s.type === type);
		const otherShape = shapes.find((s) => s.type !== type);
		if (!nextActiveShape || !otherShape) return shapes;
		return [
			otherShape,
			{
				...nextActiveShape,
				...next,
			},
		];
	}
}
