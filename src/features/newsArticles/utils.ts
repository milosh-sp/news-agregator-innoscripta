/**
 * Normalizes data to be array of objects from the `AggregatorService`
 */
function normalizeDataFromApi<T>(data: T) {
  if (!data) {
    throw new TypeError(`No params provided`)
  }

  const dataEntries = Object.entries(data)
  return dataEntries.reduce((acc: { [key: string]: unknown }[], [, value]) => {
    if (Array.isArray(value)) {
      return [
        ...acc,
        ...value.map((article: { [key: string]: unknown }) => ({
          ...article,
        })),
      ]
    } else {
      throw new Error('Expected value to be an array')
    }
  }, [])
}

export { normalizeDataFromApi }
