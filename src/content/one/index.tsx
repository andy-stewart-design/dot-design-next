import dynamic from "next/dynamic";

export const ProgressIndicator = dynamic(() => import("@/content/one/ProgressIndicator"), {
	loading: Skeleton,
});

export const SVGGrid = dynamic(() => import("@/content/one/SVGGrid"), {
	loading: Skeleton,
});

export const PathDrawing = dynamic(() => import("@/content/one/PathDrawing"), {
	loading: Skeleton,
});

export const ArcDrawing = dynamic(() => import("@/content/one/ArcDrawing"), {
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
				backgroundColor: "var(--color-background-1)",
			}}
		/>
	);
}
