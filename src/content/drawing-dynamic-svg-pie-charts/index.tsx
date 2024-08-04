import dynamic from "next/dynamic";

export const ProgressIndicator = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/ProgressIndicator"),
	{
		loading: Skeleton,
	}
);

export const SVGGrid = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/SVGGrid"),
	{
		loading: Skeleton,
	}
);

export const PathDrawing = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/PathDrawing"),
	{
		loading: Skeleton,
	}
);

export const ArcDrawing = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/ArcDrawing"),
	{
		loading: Skeleton,
	}
);

export const SVGMask = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/SVGMask"),
	{
		loading: Skeleton,
	}
);

export const SineCos = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/SineCosine"),
	{
		loading: Skeleton,
	}
);

export const SineCircle = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/SineCircle"),
	{
		loading: Skeleton,
	}
);

export const SineAnimation = dynamic(
	() => import("@/content/drawing-dynamic-svg-pie-charts/SineAnimation"),
	{
		loading: Skeleton,
	}
);

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
