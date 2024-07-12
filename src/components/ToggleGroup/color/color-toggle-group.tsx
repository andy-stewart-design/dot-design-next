import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import Label from "@/components/Label";
import s from "./component.module.css";
import { CSSProperties } from "react";

interface ToggleProps {
	value: string;
	label: string;
	name?: string;
	elevation?: number;
}

interface Props {
	value?: RadixToggleGroup.ToggleGroupSingleProps["value"];
	onValueChange?: RadixToggleGroup.ToggleGroupSingleProps["onValueChange"];
	defaultValue?: RadixToggleGroup.ToggleGroupSingleProps["defaultValue"];
	items: Array<ToggleProps>;
	name?: string;
	elevation?: number;
}

function ToggleGroup({
	name,
	items,
	value,
	onValueChange,
	defaultValue,
	elevation = 1,
}: Props) {
	return (
		<div className={s.wrapper}>
			<Label as="p">{name ?? "kajefvk"}</Label>
			<RadixToggleGroup.Root
				type="single"
				value={value}
				onValueChange={onValueChange}
				defaultValue={defaultValue}
				className={s.group}
			>
				{items.map((item) => (
					<Toggle
						key={item.value}
						name={name}
						value={item.value}
						label={item.label}
						elevation={elevation}
					/>
				))}
			</RadixToggleGroup.Root>
		</div>
	);
}

function Toggle({ value, label, name, elevation = 1 }: ToggleProps) {
	return (
		<RadixToggleGroup.Item
			name={name}
			value={value}
			className={s.toggle}
			data-elevation={elevation}
			style={{ "--background": value } as CSSProperties}
		>
			<span>{label}</span>
		</RadixToggleGroup.Item>
	);
}

export default ToggleGroup;
