export function string (len = 1) {
  let char = '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
  let length = char.length
  let result = ''

  for (let i = 0; i < len; i++) {
    result += char[integer(0, length - 1)]
  }

  return result
}

export function integer (min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min) + min)
}
