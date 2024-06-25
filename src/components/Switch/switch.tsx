import { ComponentPropsWithoutRef, useId } from "react";
import s from "./component.module.css";

interface Props extends ComponentPropsWithoutRef<"input"> {
	["switch-position"]?: "left" | "right";
}

export default function Switch({
	children,
	"switch-position": switchPosition = "right",
	...delegated
}: Props) {
	const id = useId();
	return (
		<div className={s.switch} data-switch-position={switchPosition}>
			<label htmlFor={id}>{children}</label>
			<input {...delegated} id={id} type="checkbox" role="switch" />
		</div>
	);
}
