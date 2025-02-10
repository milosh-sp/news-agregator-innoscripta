import { Button } from './Button'

function ScrollToTopButton() {
  return (
    <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      top
    </Button>
  )
}

export { ScrollToTopButton }
