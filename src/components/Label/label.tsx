import { Label as AriaLabel } from "react-aria-components";
import cn from "clsx";
import type { ComponentProps } from "react";
import s from "./component.module.css";

interface HTMLLabelProps extends ComponentProps<"label"> {
	as?: "label";
	htmlFor?: string;
}

interface HTMLParagraphProps extends ComponentProps<"p"> {
	as?: "p";
}

interface AriaLabelProps extends ComponentProps<"label"> {
	as?: "aria";
	id?: string;
}

type LabelProps = HTMLLabelProps | AriaLabelProps | HTMLParagraphProps;

function PolymorphicLabel({ as = "label", ...props }: LabelProps) {
	if (as === "aria") {
		const { children, className, ...rest } = props as AriaLabelProps;
		return (
			<AriaLabel {...rest} className={cn(s.label, className)}>
				{children}
			</AriaLabel>
		);
	} else if (as === "p") {
		const { children, className, ...rest } = props as HTMLParagraphProps;
		return (
			<p {...rest} className={cn(s.label, className)}>
				{children}
			</p>
		);
	} else {
		const { children, className, ...rest } = props as HTMLLabelProps;
		return (
			<label {...rest} className={cn(s.label, className)}>
				{children}
			</label>
		);
	}
}

export default PolymorphicLabel;
