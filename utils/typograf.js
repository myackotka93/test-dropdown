import HTMLReactParser from 'html-react-parser';
import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru', 'en-US'] });



function typograf(text = '') {
  if (Array.isArray(text)) {
    return text.map(t => typeof t === 'string' ? tp.execute(t) : t)
  }

  return tp.execute((text ?? ''));
}

export function parser(text) {
  const html = HTMLReactParser(typograf(imageHtml(text ?? '')));

  if (Array.isArray(html)) {
    return html.filter(t => !t.match);
  }
  
  return html;
}

export function imageHtml(text) {
  return text?.replace(/<img[^>]* src=\"([^\"]*)\"[^>]*>/g, `<img src="${(process.env.NEXT_PUBLIC_BACKEND_API ?? '').slice(0, -1)}$1" />`) ?? '';
}

export default typograf