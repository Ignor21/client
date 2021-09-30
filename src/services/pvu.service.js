import http from "../http-common";

class PvuDataService {
  getHomePageData() {
    return http.get("/getHomePageData");
  }

  getNews() {
    return http.get("/getNews");
  }

  getWorldTreeData() {
    return http.get("/getWorldTreeData");
  }
}

export default new PvuDataService();