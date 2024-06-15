import CustomMDX from "@/components/CustomMDX";
import { getPostBySlug } from "@/utils/blog";

export default async function Post({ params }: { params: { id: string } }) {
	const { id } = params;
	const post = await getPostBySlug(id);

	return (
		<div>
			<CustomMDX source={post.content} />
		</div>
	);
}
