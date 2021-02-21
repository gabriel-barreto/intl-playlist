import chalk from 'chalk'
import database from '../database.json'

import { TerminalDisplay } from './UI/terminal.ui.js'

async function main() {
  const terminal = new TerminalDisplay(database).setup()

  try {
    await terminal.input()
  } catch (ex) {
    console.log(chalk.red('Ooops...'), '\n', chalk.gray(ex.message))
  } finally {
    return terminal.input()
  }
}

await main()
