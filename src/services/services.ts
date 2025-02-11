import { AggregatorService } from './AgregatorService'
import { AxiosHttpClient } from './axiosClient'

// Main HTTP client
const httpClient = new AxiosHttpClient()

const aggregatorService = new AggregatorService(httpClient)

export { aggregatorService }
