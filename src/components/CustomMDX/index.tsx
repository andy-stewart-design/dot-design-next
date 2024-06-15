import { ProgressIndicator } from "@/content/one";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";

const Counter = dynamic(() => import("@/content/one/counter"));

const SecondCounter = dynamic(() => import("@/content/two/SecondCounter"));

const components = {
	Counter,
	ProgressIndicator,
	SecondCounter,
};

export default function CustomMDX({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} />;
}
