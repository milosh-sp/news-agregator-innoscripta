import './style/_normalize.scss'
import { aggregatorService } from './services/services'

function App() {
  return (
    <button
      onClick={() => {
        aggregatorService.getArticlesFromAllSources({
          searchWord: 'bitcoin finance',
        })
      }}
    >
      test
    </button>
  )
}

export default App
