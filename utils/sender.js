import CONFIG from './config';


export default function sender(url, form) {
  return new Promise(async (resolve, reject) => {
    let endpoint;

    try {
      if (typeof url === 'string') endpoint = CONFIG.API + url;
      else if (typeof url === 'function') endpoint = url();

      let headers = {};
      if (form.headers) {
        headers = form.headers;
        delete form.headers;
      }

      const formData = new FormData();

      if (form instanceof FormData) {
        for (const [key, value] of form.entries()) {
          formData.append(key, value);
        }
      } else {
        Object.entries(Object.entries(form).reduce((newForm, [key, value]) => {
          if (value) {
            newForm[key] = value;
          }
          return newForm;
        }, {})).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }


      const { data } = await CONFIG.axios.post(endpoint, formData, { headers });

      if (data.status !== 200) {
        reject({ message: data.statusMeans, messages: data.messages, code: data.status });
      } else {
        resolve(data);
      }
    } catch (e) {
      reject(e)
    }
  })
}

export async function senderExternal(endpoint, form) {
  try {
    let headers = {};

    if (form.headers) {
      headers = form.headers;
      delete form.headers;
    }

    const { data } = await CONFIG.axios.post(endpoint, form, { headers });

    return data;
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function senderObject(url, form) {
  return new Promise(async (resolve, reject) => {
    let endpoint;

    try {
      if (typeof url === 'string') endpoint = CONFIG.API + url;
      else if (typeof url === 'function') endpoint = url();

      let headers = {};
      if (form.headers) {
        headers = form.headers;
        delete form.headers;
      }

      const { data } = await CONFIG.axios.post(endpoint, form, { headers });

      if (data.status !== 200) {
        reject({ message: data.statusMeans, messages: data.messages });
      } else {
        resolve(data);
      }
    } catch (e) {
      reject(e)
    }
  })
}

export async function getter(url) {
  return new Promise(async (resolve, reject) => {
    let endpoint;

    try {
      if (typeof url === 'string') endpoint = CONFIG.API + url;
      else if (typeof url === 'function') endpoint = url();
      const { data } = await CONFIG.axios.get(endpoint);

      resolve(data);
    } catch (e) {
      reject(e)
    }
  });
}