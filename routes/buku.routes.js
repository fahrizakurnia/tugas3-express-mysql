const express = require('express');
const router = express.Router();
const BukuModel = require('../models/buku.model');
const bukuController = require('../controllers/buku.controller');


router.get('/uji-keamanan', async (req, res) => {
    const inputPayload = req.query.kategori;

    const hasil = await BukuModel.getByKategoriSecure(inputPayload);

    res.json({
        input: inputPayload,
        totalDataDitemukan: hasil.length,
        data: hasil
    });
});

// Rute READ (menampilkan tabel buku)
router.get('/buku', bukuController.getDaftarBuku);

// Rute CREATE (menampilkan form dan menyimpan data baru)
router.get('/buku/tambah', bukuController.getFormTambah);
router.post('/buku/tambah', bukuController.postTambahBuku);

// Rute UPDATE (menampilkan form edit dan memproses pembaruan data)
router.get('/buku/edit/:id', bukuController.getFormEdit);
router.post('/buku/edit/:id', bukuController.postUpdateBuku);

// Rute DELETE (memproses penghapusan data)
router.post('/buku/hapus/:id', bukuController.postHapusBuku);

module.exports = router;