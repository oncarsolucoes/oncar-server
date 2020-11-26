import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class users1606239843257 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'active',
          type: 'boolean',
          default: true
        },
        {
          name: "createdAt",
          type: "datetime",
          default: `now()`
        },
        {
          name: "updatedAt",
          type: "datetime",
          default: `now()`
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
