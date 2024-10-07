import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/actions';

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    const createdPost = await createPost({ title, content });

    return NextResponse.json({ data: createdPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while creating the post.', error },
      { status: 500 }
    );
  }
}
