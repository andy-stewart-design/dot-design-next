import s from "./component.module.css";

export default function VisuallyHidden({ children }: { children: React.ReactNode }) {
	return <span className={s.hidden}>{children}</span>;
}
