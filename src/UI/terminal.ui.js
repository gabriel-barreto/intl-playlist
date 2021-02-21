import Draftlog from 'draftlog'
import chalkTable from 'chalk-table'

import config from '../config/terminal.config.js'

import { Playlist } from '../models/playlist.model.js'

export class TerminalDisplay {
  constructor(data = []) {
    this.table = {}
    this.playlist = {}

    this.data = data
  }

  setup() {
    Draftlog(console).addLineListener(process.stdin)
    this.playlist = new Playlist(this.data)
    this.update()

    return this
  }

  update() {
    this.table = chalkTable(config.tableOptions, this.playlist.formatted())
  }

  print() {
    console.draft(this.table)
  }
}
