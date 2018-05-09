export default function (event, key) {
  return event.code === 'Key' + key.toUpperCase()
}
