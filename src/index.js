import database from '../database.json'

import { TerminalDisplay } from './UI/terminal.ui.js'

function main() {
  new TerminalDisplay(database).setup().print()
}

main()
