import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import s from "./component.module.css";

interface ToggleProps {
	name?: string;
	value: string;
	label: string;
}

interface Props {
	type?: RadixToggleGroup.ToggleGroupSingleProps["type"];
	value?: RadixToggleGroup.ToggleGroupSingleProps["value"];
	onValueChange?: RadixToggleGroup.ToggleGroupSingleProps["onValueChange"];
	defaultValue?: RadixToggleGroup.ToggleGroupSingleProps["defaultValue"];
	items: Array<ToggleProps>;
	name?: string;
}

function ToggleGroup({
	type = "single",
	name,
	items,
	value,
	onValueChange,
	defaultValue,
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
				<Toggle key={item.value} name={name} value={item.value} label={item.label} />
			))}
		</RadixToggleGroup.Root>
	);
}

function Toggle({ value, label, name }: ToggleProps) {
	return (
		<RadixToggleGroup.Item name={name} value={value} className={s.toggle}>
			{label}
		</RadixToggleGroup.Item>
	);
}

export default ToggleGroup;
