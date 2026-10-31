const db = require('../config/database');

const BukuModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM buku ORDER BY id DESC');
        return rows;
        
    },

    // Mengambil 1 record spesifik berdasarkan Primary Key (id)
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM buku WHERE id = ?', [id]);
        return rows[0]; 
    },

    // Memperbarui record buku berdasarkan id
    update: async (id, data) => {
        const sql = `UPDATE buku SET judul = ?, penulis = ?, kategori = ?, tahun_terbit = ?, stok = ?, tanggal_masuk = ? WHERE id = ?`;
        const [result] = await db.query(sql, [
            data.judul,
            data.penulis,
            data.kategori,
            data.tahun_terbit,
            data.stok,
            data.tanggal_masuk,
            id
        ]);
        return result;
    },

    create: async (data) => {
        const sql = `INSERT INTO buku (judul, penulis, kategori, tahun_terbit, stok, tanggal_masuk) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(sql, [
            data.judul,
            data.penulis,
            data.kategori,
            data.tahun_terbit,
            data.stok,
            data.tanggal_masuk
        ]);
        return result;
    },
    // Menghapus data buku berdasarkan id
    delete: async (id) => {
        const sql = 'DELETE FROM buku WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },
    // METODE TIDAK AMAN UNTUK EKSPERIMEN KEAMANAN LABORATORIUM
    getByKategoriInsecure: async (kategoriInput) => {
        // Konkatenasi langsung (SANGAT RENTAN!)
        const rawSql = `SELECT * FROM buku WHERE kategori = '${kategoriInput}'`;
        console.log('\n[RAW VULNERABLE SQL QUERY]:', rawSql);
        const [rows] = await db.query(rawSql);
        return rows;
    },

    // METODE AMAN MENGGUNAKAN PREPARED STATEMENT
    getByKategoriSecure: async (kategoriInput) => {
        const secureSql = 'SELECT * FROM buku WHERE kategori = ?';
        console.log('\n[PREPARED STATEMENT QUERY]:', secureSql, 'WITH VALUE:', [kategoriInput]);
        const [rows] = await db.query(secureSql, [kategoriInput]);
        return rows;
    }
};

module.exports = BukuModel;