import dynamic from "next/dynamic";

export const ProgressIndicator = dynamic(() => import("@/content/one/progress-indicator"), {
	loading: Skeleton,
});

export const SVGGrid = dynamic(() => import("@/content/one/svg-grid"), {
	loading: Skeleton,
});

export const PathDrawing = dynamic(() => import("@/content/one/path-drawing"), {
	loading: Skeleton,
});

export const ArcDrawing = dynamic(() => import("@/content/one/arc-drawing"), {
	loading: Skeleton,
});

export const SVGMask = dynamic(() => import("@/content/one/svg-mask"), {
	loading: Skeleton,
});

export const SinCos = dynamic(() => import("@/content/one/sin-cos"), {
	loading: Skeleton,
});

function Skeleton() {
	return (
		<div
			style={{
				aspectRatio: "16 / 9 ",
				maxWidth: "640px",
				backgroundColor: "var(--color-background-1)",
			}}
		/>
	);
}
