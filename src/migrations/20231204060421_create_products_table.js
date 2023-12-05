/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
        CREATE TABLE productos (
            id bigint UNSIGNED NOT NULL AUTO_INCREMENT,
            nombre varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            descripcion mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            id_categoria int UNSIGNED NOT NULL,
            precio decimal(10, 3) NOT NULL,
            cantidad_disponible smallint UNSIGNED NOT NULL,
            url_img mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            rating float UNSIGNED NOT NULL,
            id_color int UNSIGNED NOT NULL,
            talla char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            deleted int UNSIGNED NOT NULL DEFAULT 0,
            deleted_at datetime NULL DEFAULT NULL,
            updated_at datetime NULL DEFAULT NULL,
            PRIMARY KEY (id) USING BTREE,
            UNIQUE INDEX id_producto(id ASC) USING BTREE,
            INDEX id_color(id_color ASC) USING BTREE,
            INDEX category(id_categoria ASC) USING BTREE,
            CONSTRAINT category FOREIGN KEY (id_categoria) REFERENCES categorias (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT id_color FOREIGN KEY (id_color) REFERENCES colores (id) ON DELETE RESTRICT ON UPDATE RESTRICT
        );
        DROP TRIGGER IF EXISTS update_productos;
        delimiter ;;
        CREATE TRIGGER update_productos BEFORE UPDATE ON productos FOR EACH ROW SET NEW.updated_at = NOW()
        ;;
        delimiter ;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw(`
            DROP TABLE productos;
        `);
};
