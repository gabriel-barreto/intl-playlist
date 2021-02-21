import faker from 'faker'

import { Music } from './music.model.js'
import { Playlist } from './playlist.model.js'

function genFakeMusic() {
  const artistsCount = faker.random.number({ min: 1, max: 4 })
  const [addedAt] = faker.date.past(2).toISOString().split('T')
  return {
    addedAt,
    artists: Array.from({ length: artistsCount }, faker.name.findName),
    duration: faker.random.number({ min: 120, max: 540 }),
    title: faker.lorem.words(),
  }
}

function genFakePlaylist(length = 3) {
  return Array.from({ length: 3 }, genFakeMusic)
}

describe('Playlist Model', () => {
  it('should convert items to Music when create an instance', () => {
    const items = genFakePlaylist()
    const playlist = new Playlist(items)
    expect(playlist.items).toEqual(expect.arrayContaining([expect.any(Music)]))
  })

  describe('.formatted - format and return added items', () => {
    it('should add index to returned items', () => {
      const items = new Playlist(genFakePlaylist()).formatted()
      expect(items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ index: expect.any(Number) }),
        ]),
      )
    })
  })
})
