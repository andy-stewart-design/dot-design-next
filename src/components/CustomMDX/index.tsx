import * as SVGPieChartComponents from "@/content/drawing-dynamic-svg-pie-charts";
import CodeSnippet from "../CodeSnippet";
import { MDXRemote } from "next-mdx-remote/rsc";
import Video from "@/components/Video";
import { Image } from "@/components/Blog";

const components = {
	pre: CodeSnippet,
	img: Image,
	Video,
	...SVGPieChartComponents,
};

export default function CustomMDX({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} />;
}
