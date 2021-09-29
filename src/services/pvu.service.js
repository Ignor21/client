import http from "../http-common";

class PvuDataService {
  getHomePageData() {
    return http.get("/getHomePageData");
  }

  getNews() {
    return http.get("/getNews");
  }
}

export default new PvuDataService();