import Link from 'next/link';
import { Metadata } from 'next';
import { DateTime } from 'luxon';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'DETL Blog | Posts',
  description: 'Generated by Next.js',
};

export default async function Posts() {
  let posts = [];

  const user = await prisma.user.findUnique({
    where: { email: 'mock.user@example.com' },
    select: {
      email: true,
      posts: { where: { published: true }, orderBy: { createdAt: 'desc' } },
    },
  });

  if (!user) {
    posts = [];
  }

  posts = user?.posts ?? [];

  return (
    <main>
      <div className='max-w-[1200px] mx-auto py-10 px-4'>
        <h1 className='text-4xl font-semibold mb-4'>
          All posts ({posts.length})
        </h1>
        {posts.length ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className='mb-2'>
                <Link href={`/posts/${post.slug}`}>
                  {post.title} |{' '}
                  <span className='font-semibold'>
                    {DateTime.fromISO(
                      post.createdAt.toISOString()
                    ).toRelative()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className='leading-8'>There are no posts.</p>
        )}
      </div>
    </main>
  );
}
