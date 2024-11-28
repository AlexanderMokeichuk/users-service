import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getRandomBoolean = () => Math.random() > 0.5; // Для флага `hasProblems`

const generateRandomUser = () => {
  const firstName = ['John', 'Jane', 'Alex', 'Chris', 'Sam', 'Pat', 'Taylor', 'Jordan'];
  const lastName = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson'];
  const gender = ['Male', 'Female', 'Non-binary'];

  const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
  const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];
  const randomGender = gender[Math.floor(Math.random() * gender.length)];
  const randomAge = Math.floor(Math.random() * 50) + 18;
  const randomHasProblems = getRandomBoolean();

  return {
    firstName: randomFirstName,
    lastName: randomLastName,
    age: randomAge,
    gender: randomGender,
    hasProblems: randomHasProblems,
  };
};

const seedUsers = async () => {
  const batchSize = 1000;
  const totalUsers = 1000000;

  for (let i = 0; i < totalUsers; i += batchSize) {
    const users = Array.from({ length: batchSize }, generateRandomUser);

    await prisma.user.createMany({
      data: users,
    });

  }

};

seedUsers()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });