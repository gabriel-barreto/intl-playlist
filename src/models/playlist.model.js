import { Music } from './music.model.js'

export class Playlist {
  constructor(items) {
    this.items = []

    items.map((each) => this.add(each))
  }

  add(music) {
    let newItem = music
    if (!(music instanceof Music)) newItem = new Music(music)

    this.items.push(newItem)
    return this.items
  }

  formatted() {
    return this.items.map((music, index) => ({
      ...music.formatted(),
      index: index + 1,
    }))
  }
}
