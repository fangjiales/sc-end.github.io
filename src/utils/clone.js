export default function clone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const res = Array.isArray(obj) ? [] : {}
  Object.setPrototypeOf(res, Object.getPrototypeOf(obj))
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = clone(obj[key])
    }
  }
  return res
}