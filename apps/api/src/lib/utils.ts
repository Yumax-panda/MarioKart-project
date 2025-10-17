export const randomString = (len: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  let array = crypto.getRandomValues(new Uint32Array(len));
  array = array.map((val) => characters.charCodeAt(val % charactersLength));
  return String.fromCharCode(...array);
};
