const BukuModel = require('../models/buku.model');

exports.getDaftarBuku = async (req, res) => {
    try {
        const bukuList = await BukuModel.getAll();
        res.render('pages/buku-list', { pageTitle: 'Daftar Buku Perpustakaan', bukuList: bukuList });
    } catch (error) {
        console.error('[ERROR getDaftarBuku]:', error);
        res.status(500).send('Terjadi galat internal saat mengambil data buku.');
    }
};

exports.getFormTambah = (req, res) => {
    res.render('pages/buku-form-tambah', { pageTitle: 'Form Tambah Buku Baru' });
};

exports.postTambahBuku = async (req, res) => {
    try {
        const { judul, penulis, kategori, tahun_terbit, stok, tanggal_masuk } = req.body;
        if (!judul || !penulis || !kategori || !tahun_terbit || !stok || !tanggal_masuk) {
            return res.status(400).send('Seluruh field formulir wajib diisi.');
        }
        await BukuModel.create({ judul, penulis, kategori, tahun_terbit, stok, tanggal_masuk });
        console.log(`[DATABASE] Data "${judul}" berhasil di-insert.`);
        res.redirect('/buku');
    } catch (error) {
        console.error('[ERROR postTambahBuku]:', error);
        res.status(500).send('Gagal menyimpan data ke basis data.');
    }
};

exports.getFormEdit = async (req, res) => {
    try {
        const { id } = req.params; 
        const buku = await BukuModel.getById(id);
        
        if (!buku) return res.status(404).send('Data Buku tidak ditemukan.');

        const formattedDate = new Date(buku.tanggal_masuk).toISOString().split('T')[0];

        res.render('pages/buku-form-edit', { 
            pageTitle: 'Edit Data Buku', 
            buku: buku,
            formattedDate: formattedDate
        });
    } catch (error) {
        console.error('[ERROR getFormEdit]:', error);
        res.status(500).send('Galat internal saat memuat form edit.');
    }
};

exports.postUpdateBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, penulis, kategori, tahun_terbit, stok, tanggal_masuk } = req.body;
        
        await BukuModel.update(id, { judul, penulis, kategori, tahun_terbit, stok, tanggal_masuk });
        console.log(`[DATABASE] Record ID ${id} berhasil diperbarui.`);
        res.redirect('/buku');
    } catch (error) {
        console.error('[ERROR postUpdateBuku]:', error);
        res.status(500).send('Gagal memperbarui record data.');
    }
};
    exports.postHapusBuku = async (req, res) => {
    try {
        const { id } = req.params;
        await BukuModel.delete(id);
        console.log(`[DATABASE] Data Buku dengan ID ${id} berhasil dihapus.`);
        res.redirect('/buku');
    } catch (error) {
        console.error('[ERROR postHapusBuku]:', error);
        res.status(500).send('Gagal menghapus data buku.');
    }
};