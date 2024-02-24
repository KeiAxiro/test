var express = require("express");
var router = express.Router();
var app = express();
const axios = require("axios");

const handleAPIRequests = require("../middleware/fetchAPI");
router.use(handleAPIRequests);

function paginate(items, itemsPerPage, currentPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
}

// // Contoh penggunaan:
// const data = [...]; // array data yang ingin dipaginasi
// const itemsPerPage = 10; // jumlah item per halaman
// const currentPage = 2; // halaman saat ini

// const currentPageData = paginate(data, itemsPerPage, currentPage);
// console.log(currentPageData); // Output: data untuk halaman 2

/* GET home page. */
router.get("/", function (req, res, next) {
  const listDapil = res.locals.dataApi;
  res.render("index", {
    title: "List Caleg",
    nav: "partials/nav",
    main_content: "landingpage",
    footer: "partials/footer",
    data: listDapil,
  });
});

router.get("/dpd", (req, res) => {
  res.redirect("/dpd/1");
});

router.get("/dpd/:id", async function (req, res) {
  const dataApi = res.locals.dataApi.data;
  const idpage = req.params.id;

  const itemsPerPage = 10;
  const currentPage = idpage;
  const maxPage = Math.ceil(dataApi.length / itemsPerPage);
  console.log(maxPage);
  var paginateddata = paginate(dataApi, itemsPerPage, currentPage);

  const pagebutton = req.body.pagebutton;
  res.render("index", {
    title: "List DPD",
    url: "dpd/",
    nav: "partials/navfilter",
    main_content: "content/dpd/dpdpage",
    footer: "partials/footerpagination",
    dataApi: paginateddata,
    currentPage: currentPage,
    maxPage: maxPage,
  });
});

router.get("/dpd/search", (req, res) => {
  res.redirect("/dpd/search/1");
});
router.get("/dpd/search/:id", (req, res) => {
  const searchFilter = req.body.searchFilter;
  var dataApi = res.locals.dataApi.data;

  var dataApiFiltered = dataApi.filter((item) => {
    return (
      item.namaDapil &&
      item.namaDapil.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });
  console.log(dataApiFiltered);
  const idpage = req.params.id;

  const itemsPerPage = 5;
  const currentPage = idpage;
  var paginateddata = paginate(dataApiFiltered, itemsPerPage, currentPage);
  const maxPage = Math.ceil(dataApiFiltered.length / itemsPerPage);
  const jumlahData = dataApiFiltered.length;
  console.log(maxPage);

  res.render("index", {
    title: "Pencarian Ditemukan",
    url: "dpd/search/",
    nav: "partials/navfilter",
    main_content: "content/dpd/dpdpage",
    footer: "partials/footerpagination",
    dataApi: paginateddata,
    keyword: searchFilter,
    currentPage: currentPage,
    maxPage: maxPage,
    jumlahData: jumlahData,
  });
});

router.get("/dpd/dapil/:id", (req, res) => {
  const id = req.params.id;
  res.render("index", {
    title: "List Caleg ",
    url: "dpd/dapil/",
    nav: "partials/navfilter",
    main_content: "content/dpd/dpdlist",
    footer: "partials/footerpagination",
    id: id,
  });
});

module.exports = router;
