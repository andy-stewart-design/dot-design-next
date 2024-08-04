import s from "./component.module.css";

export default function DemoWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className={s.wrapper} data-elevation="1">
			{children}
		</div>
	);
}
