import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class payers1606393071635 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "payers",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "cpfCnpj",
            type: "varchar"
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "addressNumber",
            type: "integer",
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "zipcode",
            type: "integer",
          },
          {
            name: "token",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "datetime",
            default: `now()`,
          },
          {
            name: "updatedAt",
            type: "datetime",
            default: `now()`,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payers')
  }

}
