import axios from "axios";

const HOST = "http://localhost:8081";

const STOCK_REST_API_URL = "/stock/articles/min-price";
//const STOCK_REST_API_URL = '/stock/articles/expansion/name/Amonkhet'
const EXPANSION_NAMES = "/product/expansion/name";
const STOCK_BY_EXPANSION_NAME = "/stock/articles/expansion/name/";
const CHANGE_ARTICLE_REST_API_URL = "/stock/articles";
const ACCOUNT = "/account/";

const RELOAD = "/reload";
const EXPANSIONS = RELOAD + "/expansions";
const PRICE = RELOAD + "/prices/";
const PRODUCTS = RELOAD + "/products/file";
const STOCK = RELOAD + "/stock";

const SELLER_NAMES = "/manage/price/seller/all";
const MANAGE_PRICER = "/manage/price/"; //{seller-name}
const REMOVE_SELLER = "/manage/price/delete/"; //{seller-name}

//List new Articles
const EXPANSION = "/listing/expansion/name";
const PRODUCTS_BY_EXPANSION_NAME = "/listing/expansion/product/"; //{expansionCode}

const LOGGING_PATH = "/actuator/logfile";

const axiosApiCallWithErrorHandlingWithoutResult = async (apiCallFunction) => {
  let apiResponse;
  try {
    await axios.get(apiCallFunction);
  } catch (err) {
    apiResponse = err.response;
  } finally {
    console.log(apiResponse); // Could be success or error
  }
};

const axiosApiCallWithErrorHandlingWithResult = async (apiCallFunction) => {
  return axios.get(apiCallFunction).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return [];
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      return [];
    }
    console.log("Error", error.message);
    return [];
  });
};

class ApiService {
  reloadExpansions() {
    axiosApiCallWithErrorHandlingWithoutResult(HOST + EXPANSIONS);
  }

  reloadProducts() {
    axiosApiCallWithErrorHandlingWithoutResult(HOST + PRODUCTS);
  }

  reloadStock() {
    axiosApiCallWithErrorHandlingWithoutResult(HOST + STOCK);
  }

  reloadPrice(name) {
    axiosApiCallWithErrorHandlingWithoutResult(HOST + PRICE + name);
  }

  getStockExpansionNames() {
    return axios.get(HOST + EXPANSION_NAMES);
  }

  getStockByExpansionName(expansionName) {
    return axios.get(HOST + STOCK_BY_EXPANSION_NAME + expansionName);
  }

  getStockInformation() {
    return axios.get(HOST + STOCK_REST_API_URL);
  }

  postArticles(articles) {
    return axios.post(HOST + CHANGE_ARTICLE_REST_API_URL, articles);
  }

  getAccountInformation() {
    return axiosApiCallWithErrorHandlingWithResult(HOST + ACCOUNT);
  }

  getSellerNames() {
    return axios.get(HOST + SELLER_NAMES);
  }

  addSeller(sellerNames) {
    axiosApiCallWithErrorHandlingWithoutResult(
      HOST + MANAGE_PRICER + sellerNames
    );
  }

  removeSeller(sellerNames) {
    axiosApiCallWithErrorHandlingWithoutResult(
      HOST + REMOVE_SELLER + sellerNames
    );
  }

  allExpansionNames() {
    return axiosApiCallWithErrorHandlingWithResult(HOST + EXPANSION);
  }

  findProductsByExpansion(expansionCode) {
    return axiosApiCallWithErrorHandlingWithResult(
      HOST + PRODUCTS_BY_EXPANSION_NAME + expansionCode
    );
  }

  getAccountManagerLog() {
    return axiosApiCallWithErrorHandlingWithResult(HOST + LOGGING_PATH);
  }

  getPricerLog() {
    return axiosApiCallWithErrorHandlingWithResult(
      HOST + MANAGE_PRICER + LOGGING_PATH
    );
  }
}

export default new ApiService();
