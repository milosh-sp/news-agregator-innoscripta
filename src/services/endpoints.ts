declare global {
  interface ImportMeta {
    env: {
      VITE_NEWS_ORG_API_KEY: string
      VITE_GUARDIAN_API_KEY: string
      VITE_NY_TIMES_API_KEY: string
    }
  }
}

const endpoints = {
  newsOrg: {
    url: 'https://newsapi.org/v2/everything',
    apiKey: import.meta.env.VITE_NEWS_ORG_API_KEY,
    /**
     * Contains the actual articles, used to extract them from the response
     */
    responseKey: 'articles',
  },
  guardian: {
    url: 'https://content.guardianapis.com/search',
    apiKey: import.meta.env.VITE_GUARDIAN_API_KEY,
    /**
     * Contains the actual articles, used to extract them from the response
     */
    responseKey: 'results',
  },
  nyTimes: {
    url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    apiKey: import.meta.env.VITE_NY_TIMES_API_KEY,
    /**
     * Contains the actual articles, used to extract them from the response
     */
    responseKey: 'docs',
  },
}

export { endpoints }
