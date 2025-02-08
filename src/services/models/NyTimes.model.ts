interface ArticlesResponse {
  status: string
  copyright: string
  responseTime: number
  numResults: number
  articles: Article[]
}

interface Article {
  '@context': string
  '@type': string
  web_url: string
  snippet: string
  lead_paragraph: string
  pub_date: string
  document_type: string
  news_desk: string
  section_name: string
  subsection_name: string
  geo_facet: string
  multimedia: Multimedia[]
  headline: Headline
  byline: Byline[]
  source: string
  keywords: Keyword[]
}

interface Multimedia {
  '@type': string
  url: string
  format: string
  height: number
  width: number
  type: string
  subtype: string
  caption: string
}

interface Headline {
  '@type': string
  main: string
  print_headline: string
  name: string
  kicker: string
  content_kicker: string
}

interface Byline {
  '@type': string
  original: string
  organization: string
  person: Person
}

interface Person {
  '@type': string
  name: string
}

interface Keyword {
  '@type': string
  name: string
  rank: number
}

export type {
  ArticlesResponse,
  Article,
  Multimedia,
  Headline,
  Byline,
  Person,
  Keyword,
}
