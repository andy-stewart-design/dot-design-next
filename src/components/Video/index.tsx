"use client";

import { ComponentPropsWithoutRef, useEffect } from "react";
import s from "./component.module.css";
import VisuallyHidden from "../VisuallyHidden";
import { useInView } from "@/utils/useInView";

interface Props extends ComponentPropsWithoutRef<"video"> {
	alt?: string;
	caption?: string;
	aspectRatio?: `${string}/${string}`;
}

export default function Video({
	src,
	alt,
	caption,
	autoPlay,
	muted,
	loop,
	aspectRatio,
	...delegated
}: Props) {
	const [isInView, inViewRef] = useInView<HTMLVideoElement>();

	useEffect(() => {
		if (!autoPlay) return;

		if (isInView) inViewRef.current?.play();
		else inViewRef.current?.pause();
	}, [isInView]);

	const _muted = autoPlay === true ? autoPlay : muted;
	const _loop = loop ?? autoPlay;
	const width = aspectRatio?.split("/")[0] ?? "16";
	const height = aspectRatio?.split("/")[1] ?? "9";
	const style = { "--width": width, "--height": height };

	return (
		<div>
			<div className={s.wrapper} style={style}>
				<video
					{...delegated}
					ref={inViewRef}
					autoPlay={autoPlay}
					muted={_muted}
					loop={_loop}
					playsInline
				>
					<source src={src} type="video/mp4" />
					{alt && <VisuallyHidden>{alt}</VisuallyHidden>}
				</video>
			</div>
			{caption && <p className={s.caption}>{caption}</p>}
		</div>
	);
}
