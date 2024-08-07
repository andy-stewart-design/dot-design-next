import { Code } from "bright";
import theme from "./theme";
import type { ComponentPropsWithoutRef } from "react";
import s from "./component.module.css";

function CodeSnippet({ children, ...delegated }: ComponentPropsWithoutRef<typeof Code>) {
	return (
		<Code
			{...delegated}
			theme={theme}
			className={s.code}
			style={{ borderRadius: "0.5rem" }}
			lineNumbers
		>
			{children}
		</Code>
	);
}

export default CodeSnippet;
