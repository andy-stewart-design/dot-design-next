import s from "./component.module.css";

interface Props {
	children: React.ReactNode;
	aspectRatio?: `${number}/${number}` | "auto";
	grid?: boolean;
}

export default function DemoWrapper({
	children,
	grid = true,
	aspectRatio = "16/9",
}: Props) {
	return (
		<div
			className={s.wrapper}
			data-elevation="1"
			data-grid={grid}
			style={{ "--aspect-ratio": aspectRatio }}
		>
			{children}
		</div>
	);
}
