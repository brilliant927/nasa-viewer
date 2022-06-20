const apiUrl = (url: string): string => `https://images-api.nasa.gov/${url}`;

/**
 * Request URL data with POST method
 * @param url
 * @param payload
 * @param isFormData
 * @param header
 *
 * @return
 *    resolves response object
 *    rejects { statusCode: "number", message: "string" }
 */
export function doPost<T>({ url, payload, isFormData = false, header }: { url: string, payload?: any, isFormData?: boolean, header?: any }): Promise<T> {
  return doFetch<T>({ url, method: 'POST', payload, isFormData, header });
}

/**
 * Request URL data with PUT method
 * @param url
 * @param payload
 * @param header
 *
 * @return
 *    resolves response object
 *    rejects { statusCode: "number", message: "string" }
 */
export function doPut<T>({ url, payload, header }: { url: string, payload: any, header?: any }): Promise<T> {
  return doFetch<T>({ url, method: 'PUT', payload, header });
}

/**
 * Request URL data with GET method
 * @param url
 * @param header
 *
 * @return
 *    resolves response object
 *    rejects { statusCode: "number", message: "string" }
 */
export function doGet<T>({ url, header }: { url: string, header?: any }): Promise<T> {
  return doFetch<T>({ url, header });
}

function doFetch<T>({
  url,
  method = 'GET',
  payload = undefined,
  isFormData = false,
  header,
}: {
  url: string;
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
  payload?: any;
  isFormData?: boolean;
  header?: any;
}): Promise<T> {
  let headers = isFormData ? undefined : { 'Content-Type': 'application/json' };
  if (header) {
    headers = { ...headers, ...header };
  }
  let body: any;
  if (isFormData) {
    body = payload;
  } else {
    body = payload ? JSON.stringify(payload) : null;
  }
  return new Promise((resolve, reject) => {
    fetch(apiUrl(url), { body, headers, method })
      .then(async res => {
        const result = await res.json();
        if (res.ok) {
          resolve({ ...result, statusCode: res.status });
        } else {
          reject({ ...result, statusCode: res.status });
        }
      })
      .catch(e => {
        console.log('api call failed on ', url, e);
        reject([]);
      });
  });
}

