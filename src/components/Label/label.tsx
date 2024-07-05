import React from "react";
import { Label as AriaLabel } from "react-aria-components";
import cn from "clsx";
import s from "./component.module.css";

type BaseProps = React.ComponentProps<"label">;

interface HTMLLabelProps extends BaseProps {
	as?: "html";
	htmlFor?: string;
}

interface AriaLabelProps extends BaseProps {
	as?: "aria";
	id?: string;
}

type LabelProps = HTMLLabelProps | AriaLabelProps;

function PolymorphicLabel({ as = "html", ...props }: LabelProps) {
	if (as === "aria") {
		const { children, className, ...rest } = props as AriaLabelProps;
		return (
			<AriaLabel {...rest} className={cn(s.label, className)}>
				{children}
			</AriaLabel>
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

// import { ComponentPropsWithoutRef } from "react";
// import s from "./component.module.css";

// type Props = ComponentPropsWithoutRef<"label">;

// export default function Label({ children, ...delegated }: Props) {
// 	return (
// 		<label {...delegated} className={s.label}>
// 			{children}
// 		</label>
// 	);
// }
