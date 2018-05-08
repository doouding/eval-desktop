export function approxi (name) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.cdnjs.com/libraries?search=${name}&fields=version`)
      .then((res) => {
        if (res.ok) {
          resolve(res.json())
        }
      })
      .catch(reject)
  })
}

export function precise (name) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.cdnjs.com/libraries/${name}?fields=name,filename,assets`)
      .then((res) => {
        if (res.ok) {
          resolve(res.json())
        }
      })
      .catch(reject)
  })
}
