import Link from "next/link";
import { getPosts } from "@/utils/blog";
import s from "./page.module.css";
import Image from "next/image";

// app/page.js
export default async function Home() {
	const posts = await getPosts();

	return (
		<main className={s.main}>
			<header className={s.header}>
				<div>
					<h1>Andy Stewart</h1>
					<h2>Design Engineer</h2>
				</div>
				<Image src="/andy-crop.jpeg" width={100} height={100} alt="" />
			</header>
			<div className={s.hr} />
			<section className={s.bio}>
				<p>
					Hey there, internet friend. I use design and code to help bring life to brands
					through compelling experiences and clear interfaces. Currently, I work as a{" "}
					<strong>Staff Design Technologist at eBay</strong> and live in Boerum Hill,
					Brooklyn.
				</p>
				<p>
					I enjoy working at the intersection of design and technology. I combine
					interaction design, systems thinking, and front-end development into an
					integrated, holistic approach to building digital products.
				</p>
			</section>
			<section className={s.links}>
				<ul>
					<li>
						<a href="https://codepen.io/andystewartdesign">
							Codepen <span className={s.arrow}>↗</span>
						</a>
					</li>
					<li>
						<a href="https://github.com/andy-stewart-design">
							Github <span className={s.arrow}>↗</span>
						</a>
					</li>
					<li>
						<a href="https://twitter.com/spinbutton">
							Twitter <span className={s.arrow}>↗</span>
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/andystewartdesign/">
							LinkedIn <span className={s.arrow}>↗</span>
						</a>
					</li>
				</ul>
			</section>
			<div className={s.hr} />
			<section className={s.posts}>
				<h3>Posts</h3>
				{posts.map((post) => (
					<Link
						key={post.id}
						href={`/posts/${post.slug}`}
						prefetch={true}
						className={s.post}
						data-elevation="1"
					>
						<h3>{post.title}</h3>
					</Link>
				))}
			</section>
		</main>
	);
}
