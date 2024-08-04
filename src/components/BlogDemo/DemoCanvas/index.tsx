import { ComponentPropsWithoutRef } from "react";
import s from "./component.module.css";

export default function DemoCanvas({
	children,
	...delegated
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div {...delegated} className={s.canvas} data-elevation="0">
			{children}
		</div>
	);
}
