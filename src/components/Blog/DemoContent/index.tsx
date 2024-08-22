import { ComponentPropsWithRef } from "react";
import s from "./component.module.css";

function DemoContent({ children, ...delegated }: ComponentPropsWithRef<"div">) {
	return (
		<div {...delegated} className={s.content}>
			{children}
		</div>
	);
}

export default DemoContent;
