import Taro from "@tarojs/taro";
import BASE_URL from "./config";
import interceptors from "./interceptors";

interceptors.forEach(i => Taro.addInterceptor(i));

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseOptions(params: { contentType?: string; url: string; data?: any }, method = "GET") {
    const { url, data } = params;
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: url.indexOf("http") !== -1 ? url : BASE_URL + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType,
        Authorization: Taro.getStorageSync("Authorization")
      }
    };
    return Taro.request(option);
  },
  get(url: string, data = "") {
    const option = { url, data };
    return this.baseOptions(option);
  },
  post: function(url: string, data: string, contentType: string) {
    const params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  },
  put(url: string, data = "") {
    const option = { url, data };
    return this.baseOptions(option, "PUT");
  },
  delete(url: string, data = "") {
    const option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
};
