import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMessagesTable1659885377995 implements MigrationInterface {
  name = 'createMessagesTable1659885377995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`message\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`message\` varchar(255) NOT NULL,
                \`time\` varchar(255) NOT NULL,
                \`sender_id\` int NULL,
                \`room_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_c0ab99d9dfc61172871277b52f6\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_a9edf3bbd4fc17c42ee8677b9ce\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_a9edf3bbd4fc17c42ee8677b9ce\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_c0ab99d9dfc61172871277b52f6\`
        `);
    await queryRunner.query(`
            DROP TABLE \`message\`
        `);
  }
}
