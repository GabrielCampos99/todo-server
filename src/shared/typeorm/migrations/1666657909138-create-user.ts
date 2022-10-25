import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1666657909138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "bigint", isPrimary: true, isGenerated: true },
          { name: "name", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "password", type: "varchar" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
