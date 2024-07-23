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

export const SineCos = dynamic(() => import("@/content/one/sine-cos"), {
	loading: Skeleton,
});

export const SineCircle = dynamic(() => import("@/content/one/sine-circle"), {
	loading: Skeleton,
});

export const SineAnimation = dynamic(() => import("@/content/one/sine-animation"), {
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
