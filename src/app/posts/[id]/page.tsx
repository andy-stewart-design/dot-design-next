import CustomMDX from "@/components/CustomMDX";
import { getPostBySlug } from "@/utils/blog";
import s from "./page.module.css";
import { PageProps } from "../../../../.next/types/app/posts/[id]/page";

export const dynamic = "force-static";

export default async function Post({ params }: PageProps) {
	console.log(typeof params);

	const { id } = await params;
	const post = await getPostBySlug(id);

	return (
		<article className={s.article}>
			<CustomMDX source={post.content} />
		</article>
	);
}
