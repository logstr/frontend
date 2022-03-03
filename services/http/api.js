import ApiClient from "./client";

export const HTTP_STATUSES = Object.freeze({
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
})
const HttpClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL + '/api/');
export default HttpClient;