const db = require("../configs/db.config");

class Contacto {
    constructor({
        id,
        numero_tel,
        direccion,
        created_at,
        updated_at,
    }) {
        this.id = id;
        this.numero_tel = numero_tel;
        this.direccion = direccion;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static async savewithTransaction(connection) {
        const createdAt = new Date();
        const [result] = await connection.execute(
            "INSERT INTO contacto (numero_tel, direccion, created_at) VALUES (?, ?, ?)",
            [this.numero_tel, this.direccion, createdAt]
        );

        if (result.insertId == 0) {
            throw new Error("no se creó el contacto");
        }

        return result.insertId;
    }
}

module.exports = Contacto;