import fs from "fs/promises";
import path from "path";
import CustomMDX from "@/components/CustomMDX";
import matter from "gray-matter";
import { glob } from "glob";

// app/page.js
export default async function Home() {
  const postPromise = getPostBySlug("one");
  const postsPromise = getPosts();
  const [post, posts] = await Promise.all([postPromise, postsPromise]);

  return (
    <div>
      <CustomMDX source={post.content} />
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
}

// ------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------
async function getPostBySlug(slug: string) {
  const source = await fs.readFile(
    path.join(process.cwd(), "src", "content", "one", `${slug}.mdx`),
    "utf8"
  );

  const { data: frontmatter, content } = matter(source);

  return { ...frontmatter, content };
}

async function getPosts() {
  const paths = await glob(
    path.join(process.cwd(), "src", "content", "**", "*.mdx")
  );

  const posts = await Promise.all(
    paths.map(async (p) => {
      const id = crypto.randomUUID();
      const ext = path.extname(p);
      const slug = path.basename(p, ext);

      const source = await fs.readFile(p, "utf8");
      const { data: frontmatter } = matter(source);
      return { ...frontmatter, slug, id } as Record<string, any>;
    })
  );

  return posts.sort((a, b) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });
}
