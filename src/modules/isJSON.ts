export function isJson(item: string) {
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  return typeof item === 'object' && item !== null;
}
