// src/utils/fakeApi.js
export async function fakeApi(url, payload = {}, method = "GET") {
  console.log(`[FAKE API] ${method} ${url}`, payload);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        success: true,
        url,
        method,
        payload,
        timestamp: new Date().toISOString(),
      });
    }, 600);
  });
}
