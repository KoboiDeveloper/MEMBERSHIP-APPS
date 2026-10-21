// expiryDate berformat dd/mm/yyyy.
// True jika hari ini sudah lewat 1 bulan setelah tanggal expired.
const isVoucherTooOld = (expiryDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(expiryDate.split("/").reverse().join("-"));
  const oneMonthAfterExpiry = new Date(expiry);
  oneMonthAfterExpiry.setMonth(oneMonthAfterExpiry.getMonth() + 1);

  return today.getTime() > oneMonthAfterExpiry.getTime();
};

export default isVoucherTooOld;
