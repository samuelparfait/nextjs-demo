'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import type { FormData } from '@/components/custom/form';

export async function createPost(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { title, content } = formData;

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
      published: false,
      author: { connect: { email: 'mock.user@example.com' } },
    },
  });

  revalidatePath('/posts');

  console.log('Created post:', createdPost);
}
