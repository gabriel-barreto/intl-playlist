import chalk from 'chalk'

const { TERMINAL_UI_PROMPT: prompt = '> ' } = process.env

export default Object.freeze({
  displayOptions: { prompt },
  tableOptions: {
    leftPad: 2,
    columns: [
      { field: 'index', name: chalk.dim('#') },
      { field: 'title', name: chalk.cyan('Track') },
      { field: 'artists', name: chalk.yellow('Artists') },
      { field: 'duration', name: chalk.green('Duration') },
      { field: 'addedAt', name: chalk.grey('Added At') },
    ],
  },
})
