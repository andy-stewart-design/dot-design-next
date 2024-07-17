import { CSSProperties, ComponentPropsWithoutRef } from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import Label from "@/components/Label";
import VisuallyHidden from "@/components/VisuallyHidden";
import s from "./component.module.css";

interface ToggleProps {
	value: string;
	label: string;
	name?: string;
	elevation?: number;
}

interface Props {
	variant?: "default" | "color";
	groupLabel?: string;
	groupOrientation?: "horizontal" | "vertical";
	orientation?: RadixToggleGroup.ToggleGroupSingleProps["orientation"];
	type?: RadixToggleGroup.ToggleGroupSingleProps["type"];
	value?: RadixToggleGroup.ToggleGroupSingleProps["value"];
	onValueChange?: RadixToggleGroup.ToggleGroupSingleProps["onValueChange"];
	defaultValue?: RadixToggleGroup.ToggleGroupSingleProps["defaultValue"];
	items: Array<ToggleProps>;
	name?: string;
	elevation?: number;
}

function ToggleGroup({
	variant = "default",
	groupLabel,
	groupOrientation = "vertical",
	orientation = "horizontal",
	type = "single",
	name,
	items,
	value,
	onValueChange,
	defaultValue,
	elevation = 1,
}: Props) {
	return (
		<div className={s.group} data-variant={variant} data-orientation={groupOrientation}>
			{groupLabel && <Label as="p">{groupLabel}</Label>}
			<RadixToggleGroup.Root
				type={type}
				value={value}
				orientation={orientation}
				onValueChange={onValueChange}
				defaultValue={defaultValue}
				className={s.root}
			>
				{items.map((item) => (
					<Toggle
						key={item.value}
						name={name}
						value={item.value}
						variant={variant}
						label={item.label}
						elevation={elevation}
						style={{ "--background": item.value } as CSSProperties}
					/>
				))}
			</RadixToggleGroup.Root>
		</div>
	);
}

type ToggleComponentProps = ToggleProps &
	ComponentPropsWithoutRef<typeof RadixToggleGroup.Item> & {
		variant: "default" | "color";
	};

function Toggle({ label, variant, elevation = 1, ...delegated }: ToggleComponentProps) {
	return (
		<RadixToggleGroup.Item {...delegated} className={s.toggle} data-elevation={elevation}>
			{variant === "color" ? <VisuallyHidden>{label}</VisuallyHidden> : label}
		</RadixToggleGroup.Item>
	);
}

export default ToggleGroup;
