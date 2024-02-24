const axios = require("axios");

async function fetchData(req, res, next) {
  try {
    const response = await axios.get(
      "https://caleg.zakiego.com/api/dpd/dapil/list"
    );
    res.locals.dataApi = response.data; // Simpan data di objek locals untuk mengaksesnya di rute-rute berikutnya
    next();
  } catch (error) {
    res.locals.dataApi = []; // Atau lakukan sesuatu jika pengambilan data gagal
    next(error);
  }
}

module.exports = fetchData;
