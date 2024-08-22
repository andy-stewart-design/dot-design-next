import { type ComponentPropsWithoutRef } from "react";
import s from "./component.module.css";

export default function DemoCode({ children }: ComponentPropsWithoutRef<"div">) {
	return <div className={s.code}>{children}</div>;
}
