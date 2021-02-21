import faker from 'faker'
import jest from 'jest-mock'

import config from '../config/app.config.js'

import $date from '../util/date.util'
import $time from '../util/time.util'

import { Music } from './music.model.js'

function genFakeMusic({
  addedAt = faker.date.past(2).toISOString().split('T')[0],
  duration = faker.random.number({ min: 120, max: 540 }),
} = {}) {
  const artistsCount = faker.random.number({ min: 1, max: 4 })
  return {
    addedAt,
    artists: Array.from({ length: artistsCount }, faker.name.findName),
    duration,
    title: faker.lorem.words(),
  }
}

function genFakeMusicString(
  { title, artists, addedAt, duration } = genFakeMusic(),
) {
  return [title, artists.join(';'), duration, addedAt].join(', ')
}

describe('Music', () => {
  describe('make - read a string and convert it into Music instance', () => {
    it('should return a Music instance', () => {
      const music = Music.make(genFakeMusicString())
      expect(music).toBeInstanceOf(Music)
    })

    it('should NOT modify values', () => {
      const payload = genFakeMusic()
      const str = genFakeMusicString(payload)
      const music = Music.make(str)
      expect(music).toEqual(payload)
    })
  })

  describe('formatted - format instance data to readable values', () => {
    it('should NOT return the raw values', () => {
      const payload = genFakeMusic({ duration: 300, addedAt: '2020-10-10' })
      const music = new Music(payload).formatted()

      expect(music.addedAt).not.toEqual(payload.addedAt)
      expect(music.artists).not.toEqual(payload.artists)
      expect(music.duration).not.toEqual(payload.duration)
    })

    it('should respect de APP_LANG env var', () => {
      const payload = genFakeMusic()
      const music = new Music(payload).formatted()

      const formattedDate = new Intl.DateTimeFormat(config.lang, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format($date.parse(payload.addedAt))
      const formattedArtists = new Intl.ListFormat(config.lang, {
        style: 'long',
        type: 'conjunction',
      }).format(payload.artists)

      expect(music.addedAt).toEqual(formattedDate)
      expect(music.artists).toEqual(formattedArtists)
    })

    it('should call $date.parse to transform date', () => {
      const stub = jest.fn().mockReturnValueOnce(new Date(2020, 9, 10))
      Object.assign($date, { parse: stub })

      const payload = genFakeMusic()
      new Music(payload).formatted()

      expect(stub).toHaveBeenCalled()
      expect(stub).toHaveBeenCalledWith(payload.addedAt)
    })

    it('should call $time.secToMin to transform duration', () => {
      const stub = jest.fn().mockReturnValueOnce('05:00')
      Object.assign($time, { secToMin: stub })

      const payload = genFakeMusic()
      new Music(payload).formatted()

      expect(stub).toHaveBeenCalled()
      expect(stub).toHaveBeenCalledWith(payload.duration)
    })
  })
})
