import Rx from 'rxjs/Rx'
import root$ from './root'

const trunk$ = new Rx.Subject()

export default trunk$
  .skipUntil(root$)
