import { DataSource } from 'typeorm';
import { User } from '../s/User.entity';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const users = [
    {
      email: 'user1@example.com',
      password: await bcrypt.hash('password123', 10),
      isActive: true,
    },
    {
      email: 'user2@example.com',
      password: await bcrypt.hash('password456', 10),
      isActive: true,
    },
  ];

  for (const user of users) {
    const existingUser = await userRepository.findOneBy({ email: user.email });
    if (!existingUser) {
      await userRepository.save(user);
      console.log(`Seeded user with email: ${user.email}`);
    }
  }
};
