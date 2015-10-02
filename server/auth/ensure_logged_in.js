
export default function ensureLoggedInMiddleware(req, res, next) {
  console.log('login check: ', req.isAuthenticated(), req.user)
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.redirect(302, '/login')
  next()
}
