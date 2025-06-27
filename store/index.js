import Vuex from "vuex";

import App from "./app";
import Pagination from "./pagination";
import Print from "./print";
import Setting from "./setting";

import ModuleApi from "./module-api";

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      app: App,
      moduleApi: ModuleApi,
      pagination: Pagination,
      print: Print,
      setting: Setting,
    },
  });
};

export default createStore;
