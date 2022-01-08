// export function parseCookies(req) {
//   const token = req.cookies.auth || req.body.token;
//   return token;
// }

export function getTokenCookie(req) {
  const token = req.cookies.auth || req.body.token;
  return token;
}
