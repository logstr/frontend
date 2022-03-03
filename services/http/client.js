import storage from "../../utils/storage";
export default class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.maxAuthRetries = 0;
    this.maxFailedFetchRetries = 3;
  }

  onUnauthorized() {
    return Promise.resolve();
  }

  get(url, params, options) {
    return this.sendForJson(this.formUrl(url, params), undefined, options);
  }

  post(url, body, options) {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "POST",
    });
  }

  put(url, body, options) {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "PUT",
    });
  }

  patch(url, body, options) {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "PATCH",
    });
  }

  delete(url, body, options) {
    return this.sendForJson(this.absoluteUrl(url), body, {
      ...options,
      method: "DELETE",
    });
  }

  get authToken() {
    const {token} = storage.get("token") || {};
    return token;
  }

  get trailingSlash() {
    return "";
  }

  formUrl(url, query) {
    const params = query || {};
    return Object.keys(params).reduce((acc, key) => {
      acc.searchParams.set(key, params[key]);
      return acc;
    }, new URL(this.absoluteUrl(url))).href;
  }

  absoluteUrl(url) {
    return `${this.baseUrl}/${url}${this.trailingSlash}`.replace(
      /([^:]\/)\/+/g,
      "$1"
    );
  }

  send(url, body, options) {
    let requestObject = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        'auth-token': this.authToken
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      ...(options || {}),
      body: (() => {
        if (!body) {
          return null;
        } else if (typeof body === "object") {
          return JSON.stringify(body);
        } else {
          return body;
        }
      })(),
    };
    return fetch(url, requestObject);
  }

  sendForJson(url, body, options, authRetries = 0, fetchFailedRetries = 0) {
    return this.send(url, body, options)
      .then((res) => {
        // Handling no content success response from backend
        if (res.status === 204) {
          return {
            res,
            data: {},
          };
        }
        return res
          .json()
          .then((data) => {
            return {
              res,
              data,
            };
          })
          .catch((err) => {
            console.error(err);
            throw new Error("Invalid api response! Expected parsable json!");
          });
      })
      .then(({ res, data }) => {
        if (res.ok) {
          return {
            statusCode: res.status,
            statusText: res.statusText,
            data,
          };
        } else if (res.status === 401) {
          if (authRetries < this.maxAuthRetries) {
            return this.onUnauthorized().then(() => {
              return this.sendForJson(url, body, options, authRetries + 1);
            });
          } else {
            return Promise.reject({
              statusCode: res.status,
              statusText: res.statusText,
              data,
            });
          }
        } else {
          return Promise.reject({
            statusCode: res.status,
            statusText: res.statusText,
            data,
          });
        }
      })
      .catch((err) => {
        if (err instanceof TypeError && err.message === "Failed to fetch") {
          console.error(`Problem in fetching ${url}! Retrying in 5sec`);
          console.error("Detailed error: ", err);
          if (fetchFailedRetries < 2) {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(
                  this.sendForJson(
                    url,
                    body,
                    options,
                    authRetries,
                    fetchFailedRetries + 1
                  )
                );
              }, 5000);
            });
          } else {
            throw new Error(
              `Retried fetching ${fetchFailedRetries} times! Bailing!`
            );
          }
        } else {
          console.error("CLient Error", err);
          throw err;
        }
      });
  }
}
