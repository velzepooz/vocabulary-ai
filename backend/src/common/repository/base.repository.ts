import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { and, eq, SQL } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

export abstract class BaseRepository<T> {
  constructor(
    protected readonly db: PostgresJsDatabase,
    protected readonly table: PgTableWithColumns<any>,
  ) {}

  async findAll(where: Partial<T> = {}): Promise<T[]> {
    const query = this.db.select().from(this.table);

    if (Object.keys(where).length > 0) {
      const conditions = Object.entries(where).map(([key, value]) =>
        eq(this.table[key], value),
      );

      query.where(and(...conditions));
    }

    return query.execute();
  }

  async findById(id: number | string): Promise<T | null> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1);

    return result[0] || null;
  }

  async create(data: Partial<T>): Promise<T> {
    const result = await this.db.insert(this.table).values(data).returning();

    return result[0] as T;
  }

  async bulkCreate(data: Partial<T>[]): Promise<T[]> {
    const result = await this.db.insert(this.table).values(data).returning();

    return result as T[];
  }

  async update(id: number | string, data: Partial<T>): Promise<T | null> {
    const result = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return result[0] || null;
  }

  async delete(id: number | string): Promise<boolean> {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();

    return result.length > 0;
  }
}
