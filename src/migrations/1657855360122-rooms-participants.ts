import { MigrationInterface, QueryRunner } from 'typeorm';

export class roomsParticipants1657855360122 implements MigrationInterface {
  name = 'roomsParticipants1657855360122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`room\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`type\` enum ('private', 'group') NOT NULL DEFAULT 'private',
                UNIQUE INDEX \`IDX_535c742a3606d2e3122f441b26\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`room_participant\` (
                \`room_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                PRIMARY KEY (\`room_id\`, \`user_id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`room_participant\`
            ADD CONSTRAINT \`FK_e2fdb65131fd5bf286f19c0f333\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`room_participant\`
            ADD CONSTRAINT \`FK_97ace299842b63901959fab1adc\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`room_participant\` DROP FOREIGN KEY \`FK_97ace299842b63901959fab1adc\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`room_participant\` DROP FOREIGN KEY \`FK_e2fdb65131fd5bf286f19c0f333\`
        `);
    await queryRunner.query(`
            DROP TABLE \`room_participant\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_535c742a3606d2e3122f441b26\` ON \`room\`
        `);
    await queryRunner.query(`
            DROP TABLE \`room\`
        `);
  }
}
