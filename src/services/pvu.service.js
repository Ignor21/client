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

  getWeatherHistory() {
    return http.get("/getWeatherHistory");
  }

  getMarketplace() {
    return http.get("/getMarketplace?limit=100");
  }
}

export default new PvuDataService();