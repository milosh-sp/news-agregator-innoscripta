type Preference = {
  [key in 'categories' | 'authors' | 'sources']: Array<string>
}

type PrefKeys = keyof Preference

export type { Preference, PrefKeys }
