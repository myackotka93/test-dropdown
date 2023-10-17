export function words(word, count) {
  return 0 === +count % 10 || +count % 100 > 10 && 20 > +count % 100 || +count % 10 > 4 ? word[2] : 1 === +count % 10 ? word[0] : word[1];
}