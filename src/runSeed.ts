import { AppDataSource } from '../orm'; 
import { seedUsers } from './seeders/users.seeder';

async function runSeeder() {
  const dataSource = await AppDataSource.initialize();
  console.log('Database connected. Running seeders...');

  try {
    await seedUsers(dataSource);
    console.log('User seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeder();
