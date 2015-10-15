
// Usage: parseAuthHeader(req, 'Bearer')
export function parseAuthHeader(req, name) {
  if (!req.headers.authorization) return null

  const parts = req.headers.authorization.split(' ')
  if (parts.length !== 2) return null

  const scheme = parts[0]
  const credentials = parts[1]
  let auth = null
  if (new RegExp(`^${name}$`, 'i').test(scheme)) auth = credentials
  return auth
}
