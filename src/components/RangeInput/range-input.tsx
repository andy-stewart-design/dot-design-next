"use client";

import { CSSProperties, ReactNode, useContext, memo } from "react";
import {
	// Label,
	Slider,
	SliderOutput as Output,
	SliderThumb as Thumb,
	SliderTrack,
	SliderStateContext,
} from "react-aria-components";
import Label from "@/components/Label";
import s from "./component.module.css";

interface Props {
	name?: string;
	label?: string;
	value?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	outputRenderProp?: (value: number) => ReactNode;
}

export function RangeInput({
	value = 30,
	min = 0,
	max = 100,
	onChange,
	name: _name,
	label,
	step = 1,
	outputRenderProp,
}: Props) {
	const name = _name ?? label?.split(" ").join("_").toLocaleLowerCase();

	function formatOutput(value: number) {
		if (outputRenderProp) {
			return outputRenderProp(value);
		}

		return value;
	}

	return (
		<Slider
			className={s.range}
			value={onChange ? value : undefined}
			defaultValue={value}
			onChange={onChange}
			minValue={min}
			maxValue={max}
			step={step}
		>
			{label && (
				<Label as="aria" className={s.label}>
					{label}
				</Label>
			)}
			<Output className={s.output}>{(state) => formatOutput(state.state.values[0])}</Output>
			<Track min={min} max={max}>
				<Thumb name={name} className={s.thumb} />
			</Track>
		</Slider>
	);
}

interface TrackProps {
	children: ReactNode;
	min: number;
	max: number;
}

function Track({ children, min, max }: TrackProps) {
	let state = useContext(SliderStateContext);
	const value = state.values.at(0) ?? 0;
	const progress = ((value - min) / (max - min)) * 100;
	return (
		<SliderTrack
			className={s.track}
			style={{ "--progress": `${progress}%` } as CSSProperties}
		>
			{children}
		</SliderTrack>
	);
}

export default memo(RangeInput);
