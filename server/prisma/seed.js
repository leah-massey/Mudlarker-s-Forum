import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const benny = await prisma.user.create({ data: { name: "Benny" } });
  const sidney = await prisma.user.create({ data: { name: "Sidney" } });

  const post1 = await prisma.post.create({
    data: {
      body: "My star find on Monday morning's trip to the foreshore was this fabulous clay pipe bowl. With partial stem (it's not often one finds a complete, undamaged clay pipe these days though it does happen if you're lucky) and bowl showing the crest of the Prince of Wales, ostrich feathers with the motto 'Ich Dien', or 'I serve.'",
      title: "Clay Pipe",
    },
  });

  const post2 = await prisma.post.create({
    data: {
      body: "As the wash began to recede, I looked down and spotted a small pewter item at my feet. It definitely hadn't been there a few minutes before. My reflexes were clearly very slow that day and the soggy feet weren't helping. I remember standing on that spot, as if in a trance, while the wash continued to rush in and out again, carrying off the small item with it.",
      title: "Pilgrim Badge",
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      message: "Wow, that's such a beautiful find 😍",
      userId: benny.id,
      postId: post2.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "Isn't it?",
      userId: sidney.id,
      postId: post2.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      message: "I found on of those last year.",
      userId: sidney.id,
      postId: post1.id,
    },
  });

  console.log("data seeding completed");
}

seed();
