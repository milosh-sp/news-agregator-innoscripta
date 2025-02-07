import { AggregatorService } from './AgregatorService'
import { AxiosHttpClient } from './axios-client'

const httpClient = new AxiosHttpClient()
const aggregatorService = new AggregatorService(httpClient)

export { aggregatorService }
