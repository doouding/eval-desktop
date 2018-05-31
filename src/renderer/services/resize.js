import eventBus from '@/util/event'

eventBus.$on('resize', () => {
  let resizeEvent = new Event('resize')
  window.dispatchEvent(resizeEvent)
})
