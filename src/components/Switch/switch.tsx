import { ComponentPropsWithoutRef, useId } from "react";
import s from "./component.module.css";

export default function Switch({
	children,
	...delegated
}: ComponentPropsWithoutRef<"input">) {
	const id = useId();
	return (
		<div className={s.switch}>
			<label htmlFor={id}>{children}</label>
			<input {...delegated} id={id} type="checkbox" role="switch" />
		</div>
	);
}
