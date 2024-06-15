import dynamic from "next/dynamic";

export const ProgressIndicator = dynamic(() => import("@/content/one/progress-indicator"), {
	loading: () => <div style={{ aspectRatio: "16 / 9 ", maxWidth: "640px" }} />,
});
