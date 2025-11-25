async function createKomik(database, komikData) {
  const { judul, deskripsi, penulis, author, imageType, imageName, ImageData } = komikData;

  if (!judul || !deskripsi || !author || !penulis) {
    throw new Error('judul, deskripsi, penulis, dan author wajib diisi');
  }

  const newKomik = await database.Komik.create({
    judul,
    deskripsi,
    penulis,
    author,
    imageType: imageType || null,
    imageName: imageName || null,
    ImageData: ImageData || null,
  });

  return newKomik;
}

async function getAllKomik(database) {
  const komiks = await database.Komik.findAll();

  return komiks.map(k => {
    if (k.ImageData) {
      k.ImageData = k.ImageData.toString('base64');
    }
    return k;
  });
}

async function getKomikById(database, id) {
  const komik = await database.Komik.findByPk(id);
  if (!komik) throw new Error('Komik tidak ditemukan');

  if (komik.ImageData) {
    komik.ImageData = komik.ImageData.toString('base64');
  }

  return komik;
}

async function updateKomik(database, id, komikData) {
  const komik = await database.Komik.findByPk(id);
  if (!komik) {
    throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
  }

  await komik.update(komikData);
  return komik;
}

async function deleteKomik(database, id) {
  const komik = await database.Komik.findByPk(id);
  if (!komik) {
    throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
  }

  await komik.destroy();
  return { message: `Komik dengan ID ${id} berhasil dihapus` };
}

module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};
