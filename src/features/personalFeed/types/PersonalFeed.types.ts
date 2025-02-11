type Preference = {
  [key in 'category' | 'author' | 'source']: Array<string>
}

type PrefKeys = keyof Preference

export type { Preference, PrefKeys }
