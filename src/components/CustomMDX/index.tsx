import * as SVGPieChartComponents from "@/content/one";
import CodeSnippet from "../CodeSnippet";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import Video from "@/components/Video";

const SecondCounter = dynamic(() => import("@/content/two/SecondCounter"));

const components = {
	pre: CodeSnippet,
	Video,
	SecondCounter,
	...SVGPieChartComponents,
};

export default function CustomMDX({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} />;
}
