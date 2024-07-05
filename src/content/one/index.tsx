import dynamic from "next/dynamic";

export const ProgressIndicator = dynamic(() => import("@/content/one/progress-indicator"), {
	loading: () => (
		<div
			style={{
				aspectRatio: "16 / 9 ",
				maxWidth: "640px",
				backgroundColor: "var(--color-background-1)",
			}}
		/>
	),
});

export const SVGGrid = dynamic(() => import("@/content/one/svg-grid"), {
	loading: () => (
		<div
			style={{
				aspectRatio: "16 / 9 ",
				maxWidth: "640px",
				backgroundColor: "var(--color-background-1)",
			}}
		/>
	),
});

export const PathDrawing = dynamic(() => import("@/content/one/path-drawing"), {
	loading: () => (
		<div
			style={{
				aspectRatio: "16 / 9 ",
				maxWidth: "640px",
				backgroundColor: "var(--color-background-1)",
			}}
		/>
	),
});

export const ArcDrawing = dynamic(() => import("@/content/one/arc-drawing"), {
	loading: () => (
		<div
			style={{
				aspectRatio: "16 / 9 ",
				maxWidth: "640px",
				backgroundColor: "var(--color-background-1)",
			}}
		/>
	),
});
