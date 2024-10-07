import prisma from '@/lib/prisma';

export async function createPost(postData: { title: string; content: string }) {
  const { title, content } = postData;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

  const createdPost = await prisma.post.create({
    data: {
      title,
      content,
      slug,
      published: true,
      author: { connect: { email: 'mock.user@example.com' } },
    },
  });

  return createdPost;
}
