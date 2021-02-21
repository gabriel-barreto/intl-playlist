function parse(rawDate) {
  const [year, month, day] = rawDate.split('-').map((e) => parseInt(e, 10))

  const date = new Date(year, month - 1, day)
  if (isNaN(date.getTime())) throw new Error(date)

  return date
}

export default { parse }
