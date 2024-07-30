import { Code } from "bright";
import theme from "./theme";
import type { ComponentPropsWithoutRef } from "react";
import s from "./component.module.css";

function CodeSnippet({ children, ...delegated }: ComponentPropsWithoutRef<typeof Code>) {
	return (
		<Code {...delegated} theme="one-dark-pro" className={s.code} lineNumbers>
			{children}
		</Code>
	);
}

export default CodeSnippet;
