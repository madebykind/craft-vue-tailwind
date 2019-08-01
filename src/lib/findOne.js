export default function findOne(haystack, arr) {
  return arr.some(function search(v) {
    return haystack.indexOf(v) >= 0;
  });
}
