import { ProgressIndicator, PathDrawing } from "@/content/one";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";

const Counter = dynamic(() => import("@/content/one/counter"));

const SecondCounter = dynamic(() => import("@/content/two/SecondCounter"));

const components = {
	Counter,
	SecondCounter,
	ProgressIndicator,
	PathDrawing,
};

export default function CustomMDX({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} />;
}
