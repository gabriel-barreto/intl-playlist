import config from '../config/app.config.js'

import $date from '../util/date.util.js'
import $time from '../util/time.util.js'

export class Music {
  constructor({ title, artists, duration, addedAt }) {
    this.addedAt = addedAt
    this.artists = artists
    this.duration = duration
    this.title = title
  }

  static make(input) {
    try {
      const [title, rawArtists, rawDuration, addedAt] = input
        .split(',')
        .map((each) => each.trim())

      const artists = rawArtists.split(';').map((each) => each.trim())
      const duration = parseInt(rawDuration, 10)

      return new Music({ addedAt, artists, duration, title })
    } catch (ex) {
      throw new Error('Invalid Input')
    }
  }

  formatted(language = config.lang) {
    return {
      title: this.title,
      artists: new Intl.ListFormat(language, {
        style: 'long',
        type: 'conjunction',
      }).format(this.artists),
      duration: $time.secToMin(this.duration),
      addedAt: new Intl.DateTimeFormat(language, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format($date.parse(this.addedAt)),
    }
  }
}
