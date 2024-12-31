import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "@/styles/main.css";

export const metadata: Metadata = {
	title: "Andy Stewart | Design Engineer",
	description: "The portfolio of Andy Stewart, a Brooklyn-based designer and engineer.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={GeistMono.className}>
			<body>{children}</body>
		</html>
	);
}
