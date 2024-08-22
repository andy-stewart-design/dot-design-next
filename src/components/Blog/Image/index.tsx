import NextImage from "next/image";
import s from "./component.module.css";

const regex = /\/([^\/]+)\.[^\/]+$/;

interface Props {
	src?: string;
	alt?: string;
}

function Image({ src: _src, alt: _alt }: Props) {
	const src = _src ?? "";
	const alt = _alt ?? "";

	const fileName = src.match(regex);
	const dimensions = fileName?.[1].split("_")?.[1];

	const [_width, _height] = dimensions?.split("x") ?? [];
	const width = _width ? Number(_width) : 1920;
	const height = _height ? Number(_height) : 1080;

	return <NextImage className={s.img} src={src} alt={alt} width={width} height={height} />;
}

export default Image;
