import { BaseRepository } from 'src/common/repository/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-postgres';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, sql } from 'drizzle-orm';
import { user } from '../../db/schema';
import { User } from './type/user-repository.type';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectDrizzle() protected readonly db: PostgresJsDatabase) {
    super(db, user);
  }

  async findByTelegramId(telegramId: number): Promise<User | null> {
    const result = await this.db
      .select()
      .from(user)
      .where(eq(user.telegramId, telegramId));

    return result[0] as User | null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(user)
      .where(eq(user.email, email));

    return result[0] as User | null;
  }

  async updateTelegramId(userId: number, telegramId: number): Promise<void> {
    await this.db
      .update(user)
      .set({ telegramId, updatedAt: sql`NOW()` })
      .where(eq(user.id, userId));
  }

  async findByOne(where: Partial<User>): Promise<User | null> {
    const result = await this.db
      .select()
      .from(user)
      .where(
        sql.raw(
          Object.entries(where)
            .map(
              ([key, value]) =>
                `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
            )
            .join(' AND '),
        ),
      );

    return result[0] as User | null;
  }
}
