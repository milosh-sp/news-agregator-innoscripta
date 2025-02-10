import { endpoints } from '../../services/endpoints'

function ApiCount() {
  return <header>Sourced API count:{Object.entries(endpoints).length}</header>
}

export { ApiCount }
