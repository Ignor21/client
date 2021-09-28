import http from "../http-common";

class PvuDataService {
  getHomePageData() {
    return http.get("/getHomePageData");
  }
}

export default new PvuDataService();