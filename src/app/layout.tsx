import type { Metadata } from "next";
import "@/styles/main.css";

export const metadata: Metadata = {
	title: "Andy Stewart | Design Engineer",
	description:
		"The portfolio of Andy Stewart, a Brooklyn-based designer and engineer based.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
