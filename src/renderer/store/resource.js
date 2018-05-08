import Rx from 'rxjs/Rx'

const crudSignal$ = new Rx.Subject()

function add (data) {
  pack({
    type: 'add',
    ...data
  })
}

function sort (from, to) {
  pack({
    type: 'sort',
    from,
    to
  })
}

function del (index) {
  pack({
    type: 'del',
    index
  })
}

function pack (data) {
  crudSignal$.next({
    ...data
  })
}

let resourceList = []
const resourceObserver = Rx.Observable.empty()
  .startWith([])
  .merge(crudSignal$)
  .map((data) => {
    switch (data.type) {
      case 'add':
        resourceList.push({
          name: data.name,
          version: data.version,
          address: data.address
        })
        break
      case 'sort':
        let moveItem = resourceList.splice(data.from, 1)
        resourceList.splice(data.to, 0, moveItem[0])
        break
      case 'del':
        resourceList.splice(data.index, 1)
        break
    }

    return JSON.parse(JSON.stringify(resourceList))
  })

const cache = new Rx.BehaviorSubject()

resourceObserver.subscribe(cache)

export {
  cache as data,
  add,
  sort,
  del
}
