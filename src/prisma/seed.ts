import { PrismaClient } from '@prisma/client';
import { readFileSeedertoJSON } from 'src/common/helpers/seeder.helper';

const prisma = new PrismaClient();

async function main() {
  const roles = ['Admin', 'Guest'];
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: {
        name: role,
      },
    });
  }

  const province = await readFileSeedertoJSON('merge-province.csv');
  const regency = await readFileSeedertoJSON('merge-regency.csv');
  const district = await readFileSeedertoJSON('merge-district.csv');
  const village = await readFileSeedertoJSON('merge-village.csv');

  for (const d of province) {
    await prisma.province.upsert({
      where: { kodeBps: d.kodeBps },
      update: {},
      create: d,
    });
  }
  console.log('Successefully seeding provincies data');
  for (const d of regency) {
    await prisma.regency.upsert({
      where: { kodeBps: d.kodeBps },
      update: {},
      create: d,
    });
  }
  console.log('Successefully seeding regencies data');
  for (const d of district) {
    await prisma.district.upsert({
      where: { kodeBps: d.kodeBps },
      update: {},
      create: d,
    });
  }
  console.log('Successefully seeding districts data');
  for (const d of village) {
    await prisma.village.upsert({
      where: { kodeBps: d.kodeBps },
      update: {},
      create: d,
    });
  }
  console.log('Successefully seeding villages data');
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
