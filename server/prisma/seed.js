const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'securepassword'
    }
  });

  await prisma.task.create({
    data: {
      title: 'Welcome Task',
      status: 'open',
      createdBy: admin.id,
      assignedToId: admin.id
    }
  });

  console.log('Seeding complete.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });