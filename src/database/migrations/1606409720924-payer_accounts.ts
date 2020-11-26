import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class payerAccounts1606409720924 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "payer_accounts",
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
            name: "payer_id",
            type: "integer",
          },
          {
            name: "bankCode",
            type: "integer",
          },
          {
            name: "agency",
            type: "integer",
          },
          {
            name: "agencyDigit",
            type: "integer",
          },
          {
            name: "accountNumber",
            type: "integer",
          },
          {
            name: "accountNumberDigit",
            type: "integer",
          },
          {
            name: "accountDac",
            type: "integer",
          },
          {
            name: "convenioNumber",
            type: "integer",
          },
          {
            name: "remessaSequential",
            type: "integer",
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
        foreignKeys: [
          {
            name: "payer_id",
            referencedTableName: "payers",
            referencedColumnNames: ["id"],
            columnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("payer_accounts");
  }

}
