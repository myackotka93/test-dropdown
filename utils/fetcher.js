import axios from 'axios';

function getOptions(ctx) {
  const host = process.env.BACKEND_API ?? process.env.NEXT_PUBLIC_BACKEND_API ?? '/';
  const cookies = ctx?.req?.cookies ?? {};
  const headersCtx = ctx?.req?.headers ?? {};

  let headers = {
    Cookie: Object.keys(cookies).map(key => key + '=' + cookies[key]).join(';'),
    'User-Agent': headersCtx['user-agent'],
    'X-Forwarded-Proto': headersCtx['x-forwarded-proto'],
    'X-Forwarded-For': headersCtx['x-forwarded-for'],
    'X-Real-IP': headersCtx['x-real-ip'],
    'X-SSR': true
  };

  headers = Object.keys(headers)
    .filter(key => Boolean(headers[key]))
    .reduce((object, key) => {
      object[key] = headers[key];
      return object;
    }, {})

  return { host, headers };
}

function getData(res) {
  if (res.status !== 200) {
    return null
  }

  const { data } = res;

  if (!data) {
    return null;
  }

  return data;
}

export default async function fetcher(url, ctx, method = 'get') {
  const { host, headers } = getOptions(ctx);

  const res = await axios[method](host + url, {
    headers,
  });
  return getData(res);
}