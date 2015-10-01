
export default function ensureLoggedInMiddleware(req, res, next) {
  console.log('login check: ', req.user, req.isAuthenticated())
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.redirect(302, '/login')
  next()
}
