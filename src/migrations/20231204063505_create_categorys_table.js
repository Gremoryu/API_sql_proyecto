/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE categorias (
            id int UNSIGNED NOT NULL AUTO_INCREMENT,
            categoria varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime NULL DEFAULT NULL,
            deleted int UNSIGNED NOT NULL DEFAULT 0,
            deleted_at datetime NULL DEFAULT NULL,
            PRIMARY KEY (id) USING BTREE,
            UNIQUE INDEX id_categoria(id ASC) USING BTREE
        );
        DROP TRIGGER IF EXISTS update_categorias;
        DELIMITER ;;
        CREATE TRIGGER update_categorias BEFORE UPDATE ON categorias
        FOR EACH ROW
        BEGIN
        IF NEW.deleted = 1 THEN
            SET NEW.nombre = NULL;
        END IF;
        END;;
        DELIMITER ;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE categorias;
    `);
};
