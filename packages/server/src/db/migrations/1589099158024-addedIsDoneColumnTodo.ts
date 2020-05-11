import {MigrationInterface, QueryRunner} from "typeorm";

export class addedIsDoneColumnTodo1589099158024 implements MigrationInterface {
    name = 'addedIsDoneColumnTodo1589099158024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "is_done" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "is_done"`, undefined);
    }

}
