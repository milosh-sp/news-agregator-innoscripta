interface Multimedia {
  url: string
  format: string
  height: number
  width: number
  type: string
  subtype: string
  caption: string
}

interface Headline {
  main: string
  print_headline: string
  name: string
  kicker: string
  content_kicker: string
}

interface Byline {
  original: string
  organization: string
  person: Person
}

interface Person {
  name: string
}

interface Keyword {
  name: string
  rank: number
}
interface ArticlesResponse {
  status: string
  copyright: string
  responseTime: number
  numResults: number
  articles: Array<NyTimesArticle>
}

interface NyTimesArticle {
  web_url: string
  snippet: string
  lead_paragraph: string
  pub_date: string
  document_type: string
  news_desk: string
  section_name: string
  subsection_name: string
  geo_facet: string
  multimedia: Array<Multimedia>
  headline: Headline
  byline: Array<Byline>
  source: string
  keywords: Array<Keyword>
}

export type {
  ArticlesResponse,
  NyTimesArticle,
  Multimedia,
  Headline,
  Byline,
  Person,
  Keyword,
}
