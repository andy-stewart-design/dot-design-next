// import Link from "next/link";
// import Image from "next/image";
// import { getPosts } from "@/utils/blog";
import Canvas from "./Canvas";
import s from "./page.module.css";

// app/page.js
export default async function Home() {
	// const posts = await getPosts();

	return (
		<main className={s.main}>
			<Canvas />
			<section>
				<h1 className={s.headline}>
					<span>
						<span className={s.highlight}>Hello, internet friend</span>, my name’s Andy. I
						use design and code to help bring life to brands through compelling experiences
						and clear interfaces.
					</span>
					<span>
						Currently, I work as a{" "}
						<span className={s.highlight}>Staff Design Technologist at ebay</span> and live
						in Brooklyn.
					</span>
					<span>
						I enjoy exploring the{" "}
						<span className={s.highlight}>intersection of creativity and technology</span>.
						My work combines interaction design, animation, and front-end development to
						shape the look, feel, and behavior of digital products.
					</span>
				</h1>
				<ul className={s.links}>
					<li>
						<a href="https://codepen.io/andystewartdesign" target="_blank">
							<LinkLogo type="codepen" />
							Codepen
						</a>
					</li>
					<li>
						<a href="https://bsky.app/profile/andystew.art" target="_blank">
							<LinkLogo type="bluesky" />
							Bluesky
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/andystewartdesign/" target="_blank">
							<LinkLogo type="linkedin" />
							Linkedin
						</a>
					</li>
				</ul>
			</section>
			{/* <header className={s.header}>
				<div>
					<h1>Andy Stewart</h1>
					<h2>Design Engineer</h2>
				</div>
				<Image src="/home/andy-crop.jpeg" width={100} height={100} alt="" />
			</header>
			<div className={s.hr} />
			<section className={s.content}>
				<section className={s.bio}>
					<p>
						Hey there, internet friend. I use design and code to help bring life to brands
						through effective experiences and clear interfaces. Currently, I work as a{" "}
						<strong>Staff Design Technologist at eBay</strong> and live in Boerum Hill,
						Brooklyn.
					</p>
					<p>
						I enjoy exploring the intersection of design and technology. My work combines
						interaction design, systems thinking, and front-end development to shape the
						look, feel, and behavior of digital products.
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
						<p>{post.abstract}</p>
					</Link>
				))}
			</section> */}
		</main>
	);
}

function LinkLogo({ type }: { type: "codepen" | "bluesky" | "linkedin" }) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
			{type === "codepen" ? (
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11.447 1.16679C11.7821 0.944405 12.2179 0.944405 12.553 1.16679L22.553 7.80315C22.8322 7.98844 23 8.30127 23 8.63636V15.3636C23 15.6987 22.8322 16.0116 22.553 16.1969L12.553 22.8332C12.2179 23.0556 11.7821 23.0556 11.447 22.8332L1.44705 16.1969C1.16784 16.0116 1 15.6987 1 15.3636V8.63636C1 8.30127 1.16784 7.98844 1.44705 7.80315L11.447 1.16679ZM3 10.5143L5.20845 12L3 13.4857V10.5143ZM3.79996 15.358L11 20.1362V15.8961L7 13.2052L3.79996 15.358ZM8.79155 12L12 14.1584L15.2085 12L12 9.84159L8.79155 12ZM13 8.10387L17 10.7948L20.2 8.64202L13 3.86381V8.10387ZM11 3.86381V8.10387L7 10.7948L3.79996 8.64202L11 3.86381ZM21 10.5143L18.7915 12L21 13.4857V10.5143ZM20.2 15.358L17 13.2052L13 15.8961V20.1362L20.2 15.358Z"
					fill="white"
				/>
			) : type === "bluesky" ? (
				<path
					d="M5.76884 3.77886C8.29094 5.63641 11.0042 9.40225 12 11.4231V16.7608C12 16.6472 11.9553 16.7756 11.8591 17.0522C11.3393 18.5498 9.30912 24.3947 4.66678 19.7221C2.22237 17.2619 3.354 14.8018 7.8035 14.0591C5.25803 14.4839 2.39631 13.7818 1.61119 11.0292C1.385 10.2374 1 5.36014 1 4.70142C1 1.40173 3.94903 2.43889 5.76884 3.77886ZM18.2312 3.77886C15.7091 5.63641 12.9958 9.40225 12 11.4231V16.7608C12 16.6472 12.0447 16.7756 12.1409 17.0522C12.6607 18.5498 14.6909 24.3947 19.3332 19.7221C21.7776 17.2619 20.646 14.8018 16.1965 14.0591C18.742 14.4839 21.6037 13.7818 22.3888 11.0292C22.615 10.2374 23 5.36014 23 4.70142C23 1.40173 20.0513 2.43889 18.2312 3.77886Z"
					fill="white"
				/>
			) : (
				<path
					d="M20.5 2H3.5C3.10218 2 2.72064 2.15804 2.43934 2.43934C2.15804 2.72064 2 3.10218 2 3.5V20.5C2 20.8978 2.15804 21.2794 2.43934 21.5607C2.72064 21.842 3.10218 22 3.5 22H20.5C20.8978 22 21.2794 21.842 21.5607 21.5607C21.842 21.2794 22 20.8978 22 20.5V3.5C22 3.10218 21.842 2.72064 21.5607 2.43934C21.2794 2.15804 20.8978 2 20.5 2ZM8 19H5V10H8V19ZM6.5 8.25C6.15618 8.24017 5.82288 8.12924 5.54175 7.93108C5.26062 7.73291 5.04411 7.45629 4.9193 7.13578C4.79448 6.81527 4.76687 6.46508 4.83994 6.12897C4.913 5.79286 5.0835 5.48574 5.33011 5.24597C5.57673 5.00621 5.88853 4.84443 6.22656 4.78086C6.5646 4.71729 6.91387 4.75475 7.23074 4.88854C7.5476 5.02234 7.81802 5.24655 8.00819 5.53315C8.19836 5.81975 8.29986 6.15604 8.3 6.5C8.2921 6.97035 8.09834 7.41845 7.76105 7.74637C7.42376 8.07428 6.97039 8.25535 6.5 8.25ZM19 19H16V14.26C16 12.84 15.4 12.33 14.62 12.33C14.3913 12.3452 14.1679 12.4055 13.9625 12.5073C13.7572 12.6091 13.574 12.7505 13.4235 12.9234C13.273 13.0962 13.1581 13.2971 13.0854 13.5144C13.0127 13.7318 12.9837 13.9614 13 14.19C12.995 14.2365 12.995 14.2835 13 14.33V19H10V10H12.9V11.3C13.1925 10.855 13.5944 10.4926 14.0672 10.2474C14.54 10.0023 15.0677 9.88267 15.6 9.9C17.15 9.9 18.96 10.76 18.96 13.56L19 19Z"
					fill="white"
				/>
			)}
		</svg>
	);
}
