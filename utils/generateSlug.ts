// "Toko Celcius Mall!" -> "toko-celcius-mall"
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Hapus karakter spesial
    .replace(/\s+/g, "-"); // Ganti spasi dengan "-"
};

export default generateSlug;
