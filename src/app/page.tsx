import Link from "next/link";
import { getPosts } from "@/utils/blog";

// app/page.js
export default async function Home() {
	const posts = await getPosts();

	return (
		<div>
			{posts.map((post) => (
				<div key={post.id}>
					<Link href={`/posts/${post.slug}`}>{post.title}</Link>
				</div>
			))}
		</div>
	);
}
