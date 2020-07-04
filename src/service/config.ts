const devURL = "https://service-2olziced-1253439746.ap-shanghai.apigateway.myqcloud.com/api/feeds/";
const prodURL = "https://service-2olziced-1253439746.ap-shanghai.apigateway.myqcloud.com/api/feeds/";

const BASE_URL = process.env.NODE_ENV === "development" ? devURL : prodURL;

export default BASE_URL;
