import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { glob } from "glob";

interface Frontmatter {
	id: string;
	slug: string;
	title: string;
	abstract: string;
	published: string;
	draft: boolean | string;
}

interface Post extends Frontmatter {
	content: string;
}

export async function getPostBySlug(slug: string) {
	const id = crypto.randomUUID();
	const source = await fs.readFile(
		path.join(process.cwd(), "src", "content", slug, `post.mdx`),
		"utf8"
	);

	const { data: frontmatter, content } = matter(source);

	return { ...frontmatter, id, slug, content } as Post;
}

export async function getPosts() {
	const paths = await glob(path.join(process.cwd(), "src", "content", "**", "*.mdx"));

	const AllPosts = (await Promise.all(
		paths.map(async (p) => {
			const id = crypto.randomUUID();
			const slug = path.basename(path.dirname(p));

			const source = await fs.readFile(p, "utf8");
			const { data: frontmatter } = matter(source);
			return { ...frontmatter, slug, id } as Record<string, any>;
		})
	)) as Array<Frontmatter>;

	const publishedPosts = AllPosts.filter((post) => {
		const isDraft = typeof post.draft === "boolean" ? post.draft : JSON.parse(post.draft);
		return !isDraft;
	});

	return publishedPosts.sort((a, b) => {
		return new Date(b.published).valueOf() - new Date(a.published).valueOf();
	}) as Array<Frontmatter>;
}
