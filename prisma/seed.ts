import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
  {
    email: 'mock.user@example.com',
    name: 'Mock User',
    encryptedPassword: 'XXXXXXXXXXX',
    posts: {
      create: {
        title: 'The Brown Fox',
        slug: 'the-brown-fox',
        content: 'The quick brown fox jumps over the lazy dog.',
        published: true,
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const user of users) {
    const u = await prisma.user.create({
      data: user,
    });

    console.log(`Created user with id: ${u.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
