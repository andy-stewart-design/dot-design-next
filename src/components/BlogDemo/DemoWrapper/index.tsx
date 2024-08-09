import s from "./component.module.css";

interface Props {
	children: React.ReactNode;
	aspectRatio?: `${number}/${number}` | "auto";
}

export default function DemoWrapper({ children, aspectRatio = "16/9" }: Props) {
	return (
		<div className={s.wrapper} data-elevation="1" style={{ "--aspect-ratio": aspectRatio }}>
			{children}
		</div>
	);
}
