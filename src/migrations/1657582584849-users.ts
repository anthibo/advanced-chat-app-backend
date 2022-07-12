import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1657582584849 implements MigrationInterface {
  name = 'users1657582584849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user\`
        `);
  }
}
