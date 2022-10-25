import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createTasks1666658606942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          { name: "id", type: "bigint", isPrimary: true, isGenerated: true },
          { name: "title", type: "varchar", isNullable: false },
          { name: "description", type: "varchar", isNullable: true },
          { name: "completed", type: "boolean", default: false },
          { name: "user_id", type: "bigint", isNullable: false },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "tasks",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks");
  }
}
