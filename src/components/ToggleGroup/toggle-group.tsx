import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import s from "./component.module.css";

interface ToggleProps {
	value: string;
	label: string;
	name?: string;
	elevation?: number;
}

interface Props {
	type?: RadixToggleGroup.ToggleGroupSingleProps["type"];
	value?: RadixToggleGroup.ToggleGroupSingleProps["value"];
	onValueChange?: RadixToggleGroup.ToggleGroupSingleProps["onValueChange"];
	defaultValue?: RadixToggleGroup.ToggleGroupSingleProps["defaultValue"];
	items: Array<ToggleProps>;
	name?: string;
	elevation?: number;
}

function ToggleGroup({
	type = "single",
	name,
	items,
	value,
	onValueChange,
	defaultValue,
	elevation = 1,
}: Props) {
	return (
		<RadixToggleGroup.Root
			type={type}
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
	);
}

function Toggle({ value, label, name, elevation = 1 }: ToggleProps) {
	return (
		<RadixToggleGroup.Item
			name={name}
			value={value}
			className={s.toggle}
			data-elevation={elevation}
		>
			{label}
		</RadixToggleGroup.Item>
	);
}

export default ToggleGroup;
