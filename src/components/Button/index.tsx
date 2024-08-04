import { ComponentPropsWithoutRef } from "react";
import s from "./component.module.css";
import VisuallyHidden from "../VisuallyHidden";
import cn from "clsx";

type Props = ComponentPropsWithoutRef<"button"> & {
	label?: string;
};

export default function Button({ children, label, className, ...delegated }: Props) {
	return (
		<button {...delegated} className={cn(s.btn, className)}>
			{children}
			{label && <VisuallyHidden>{label}</VisuallyHidden>}
		</button>
	);
}
