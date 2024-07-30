import * as SVGPieChartComponents from "@/content/one";
import CodeSnippet from "../CodeSnippet";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";

const SecondCounter = dynamic(() => import("@/content/two/SecondCounter"));

const components = {
	pre: CodeSnippet,
	SecondCounter,
	...SVGPieChartComponents,
};

export default function CustomMDX({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} />;
}
