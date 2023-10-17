const imgFields = [
  '',
  'small',
  'medium',
  'large'
];

const imagePathReplacer = (data) => {
  for (let key of Object.keys(data)) {
    getObject(data, key);
  }

  return data;
};

function changePath(elem) {
  if (Array.isArray(elem)) {
    elem = elem.map(img => (process.env.NEXT_PUBLIC_BACKEND_IMAGES ?? '/') + img);
  } else {
    elem = (process.env.NEXT_PUBLIC_BACKEND_IMAGES ?? '/') + elem;
  }

  return elem
}

const getObject = (obj, key) => {
  if (!obj[key]) return;

  if (imgFields.includes(key)) {
    obj[key] = changePath(obj[key]);
  }

  if (Array.isArray(obj[key])) {
    obj[key].forEach(arrayObject => {
      if (typeof arrayObject !== 'string') {
        Object.keys(arrayObject).forEach(k => getObject(arrayObject, k))
      }
    });
  } else if (typeof obj[key] !== 'string') {
    for (let k of Object.keys(obj[key])) {
      getObject(obj[key], k);
    }
  }
};


export default imagePathReplacer;