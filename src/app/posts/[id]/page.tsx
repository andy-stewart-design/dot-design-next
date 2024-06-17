import CustomMDX from "@/components/CustomMDX";
import { getPostBySlug } from "@/utils/blog";
import s from "./page.module.css";

export default async function Post({ params }: { params: { id: string } }) {
	const { id } = params;
	const post = await getPostBySlug(id);

	return (
		<article className={s.article}>
			<CustomMDX source={post.content} />
		</article>
	);
}
