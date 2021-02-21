import chalkTable from 'chalk-table'
import Draftlog from 'draftlog'
import readline from 'readline'

import config from '../config/terminal.config.js'

import { Music } from '../models/music.model.js'
import { Playlist } from '../models/playlist.model.js'

export class TerminalDisplay {
  constructor(data = []) {
    this.table = {}
    this.playlist = {}
    this.display = () => {}
    this.terminal = {}

    this.data = data
  }

  setup() {
    Draftlog(console).addLineListener(process.stdin)

    this.display = console.draft
    this.playlist = new Playlist(this.data)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    })

    return this.update().print()
  }

  update() {
    this.table = chalkTable(config.tableOptions, this.playlist.formatted())
    return this
  }

  print() {
    this.display(this.table)
    return this
  }

  input() {
    return new Promise((resolve, reject) => {
      this.terminal.question(config.displayOptions.prompt, (input) => {
        if (!input) resolve(this.playlist)

        try {
          this.playlist.add(Music.make(input))
          this.update().print()
        } catch (ex) {
          reject(ex)
        }

        resolve(this.playlist)
      })
    })
  }
}
