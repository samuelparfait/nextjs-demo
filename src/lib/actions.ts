'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import type { FormData } from '@/components/custom/form';

export async function createPost(formData: FormData) {
  try {
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
        published: true,
        author: { connect: { email: 'mock.user@example.com' } },
      },
    });

    revalidatePath('/posts');

    return {
      message: 'Post created successfully.',
      data: createdPost,
      status: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('Post with the same title already exists.');
      }
    }

    console.error('An error occurred while creating the post.', error);

    return {
      message: 'An error occurred while creating the post.',
      data: null,
      status: false,
    };
  }
}
