import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class fixTasksTable1666785942319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("tasks", [
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      }),
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("tasks", [
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      }),
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      }),
    ]);
  }
}
