interface NewsOrgArticle {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

//TODO: Verify if these are true
interface GuardianArticle {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  fields?: {
    headline?: string
    bodyText?: string
    thumbnail?: string
  }
}

//TODO: Verify if these are true
interface NewYorkTimesArticle {
  section: string
  subsection: string
  title: string
  abstract: string
  url: string
  byline: string
  item_type: string
  updated_date: string
  created_date: string
  published_date: string
  material_type_facet: string
  kicker: string
  des_facet: Array<string>
  org_facet: Array<string>
  per_facet: Array<string>
  geo_facet: Array<string>
  multimedia: Array<{
    url: string
    format: string
    height: number
    width: number
    type: string
    subtype: string
    caption: string
    copyright: string
  }>
  short_url: string
}

export type { NewsOrgArticle, GuardianArticle, NewYorkTimesArticle }
