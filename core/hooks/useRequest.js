import { HTTP_STATUSES } from "services/http/api";

const { useState } = require("react")

const useRequest = (requestFn) => {
  const [response, setResponse] = useState();
  const [status, setStatus] = useState();

  async function send(...params) {
    setStatus(HTTP_STATUSES.LOADING);
    try {
      const res = await requestFn(...params);
      setResponse(res);
      setStatus(HTTP_STATUSES.SUCCESS);
      return res;
    } catch(e) {
      setResponse(e);
      setStatus(HTTP_STATUSES.ERROR);
      return Promise.reject(e);
    }
  }

  return {
    response,
    isLoading: status === HTTP_STATUSES.LOADING,
    isError: HTTP_STATUSES.ERROR === status,
    isSuccess: HTTP_STATUSES.SUCCESS,
    status,
    send
  }
}

export default useRequest;