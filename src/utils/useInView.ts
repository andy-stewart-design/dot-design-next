import { RefObject, useEffect, useRef, useState } from "react";

// ----------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------

type MarginValue = `${number}${"px" | "%"}`;

type InViewMargin =
	| MarginValue
	| `${MarginValue} ${MarginValue}`
	| `${MarginValue} ${MarginValue} ${MarginValue}`
	| `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

export type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;

export interface InViewOptions {
	root?: Element | Document;
	margin?: InViewMargin;
	amount?: "some" | "all" | number;
}

export interface UseInViewOptions {
	root?: RefObject<HTMLElement>;
	once?: boolean;
	margin?: InViewMargin;
	amount?: "some" | "all" | number;
}

// ----------------------------------------------------------------
// USE IN VIEW HOOK
// ----------------------------------------------------------------

export function useInView<T extends HTMLElement>({
	root,
	margin,
	amount,
	once = false,
}: UseInViewOptions = {}): [boolean, RefObject<T>] {
	const element = useRef<T>(null);
	const [isInView, setInView] = useState(false);

	useEffect(() => {
		if (!element.current || (once && isInView)) return;

		const onEnter = () => {
			setInView(true);

			return once ? undefined : () => setInView(false);
		};

		const options: InViewOptions = {
			root: (root && root.current) || undefined,
			margin,
			amount,
		};

		return inView(element.current, onEnter, options);
	}, [root, margin, once, amount]);

	return [isInView, element];
}

// ----------------------------------------------------------------
// IN VIEW UTILITY FUNCTION
// ----------------------------------------------------------------

const thresholds = {
	some: 0,
	all: 1,
};

export function inView(
	target: HTMLElement | HTMLElement[],
	onStart: ViewChangeHandler,
	{ root, margin: rootMargin, amount = "some" }: InViewOptions = {}
): VoidFunction {
	const activeIntersections = new WeakMap<Element, ViewChangeHandler>();

	const onIntersectionChange: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			const onEnd = activeIntersections.get(entry.target);

			if (entry.isIntersecting === Boolean(onEnd)) return;

			if (entry.isIntersecting) {
				const newOnEnd = onStart(entry);
				if (typeof newOnEnd === "function") {
					activeIntersections.set(entry.target, newOnEnd);
				} else {
					observer.unobserve(entry.target);
				}
			} else if (onEnd) {
				onEnd(entry);
				activeIntersections.delete(entry.target);
			}
		});
	};

	const observer = new IntersectionObserver(onIntersectionChange, {
		root,
		rootMargin,
		threshold: typeof amount === "number" ? amount : thresholds[amount],
	});

	if (target instanceof Array) {
		target.forEach((element) => observer.observe(element));
	} else {
		observer.observe(target);
	}

	return () => observer.disconnect();
}
