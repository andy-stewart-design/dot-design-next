import { ComponentPropsWithoutRef } from "react";
import s from "./component.module.css";

export default function DemoControls({ children }: ComponentPropsWithoutRef<"div">) {
	return <div className={s.controls}>{children}</div>;
}
