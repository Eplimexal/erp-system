export const apiClient = {
  request: (endpoint, payload = {}, method = "GET") => {
    console.log(
      `[apiClient] ${method} ${endpoint}`,
      payload ? JSON.stringify(payload) : ""
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: payload || null,
        });
      }, 500 + Math.random() * 400); // random delay to mimic network latency
    });
  },

  get(endpoint, params) {
    return this.request(endpoint, params, "GET");
  },

  post(endpoint, body) {
    return this.request(endpoint, body, "POST");
  },

  put(endpoint, body) {
    return this.request(endpoint, body, "PUT");
  },

  delete(endpoint, body) {
    return this.request(endpoint, body, "DELETE");
  },
};