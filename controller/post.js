export const getKrDate = (date) => {
  const utcDate = Date.parse(JSON.parse(date));
  const krDate = utcDate + 32400 * 1000;
  const fotmatDate = new Date(krDate).toISOString().split("T")[0];
  return fotmatDate;
};
