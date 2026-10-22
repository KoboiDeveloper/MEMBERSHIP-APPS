// sisaClaim "-" berarti stok tidak terbatas
const canClaimByStock = (sisaClaim: string | number | null) => {
  if (sisaClaim === "-") return true;
  const stock = Number(sisaClaim);
  return Number.isFinite(stock) && stock > 0;
};

export default canClaimByStock;
