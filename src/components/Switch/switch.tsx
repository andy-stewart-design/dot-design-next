import { ComponentPropsWithoutRef, useId } from "react";
import s from "./component.module.css";
import Label from "../Label";

type PartialInputProps = Omit<ComponentPropsWithoutRef<"input">, "onChange">;

interface Props extends PartialInputProps {
	["switch-position"]?: "left" | "right";
	onChange?(val: boolean): void;
}

export default function Switch({
	children,
	"switch-position": switchPosition = "right",
	onChange,
	...delegated
}: Props) {
	const id = useId();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const val = e.target.checked;
		onChange?.(val);
	}

	return (
		<div className={s.switch} data-switch-position={switchPosition}>
			<Label htmlFor={id}>{children}</Label>
			<input {...delegated} id={id} type="checkbox" role="switch" onChange={handleChange} />
		</div>
	);
}
