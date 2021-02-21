function secToMin(seconds) {
  function format(val) {
    return val.toString().padStart(2, '0')
  }

  if (isNaN(seconds)) throw new Error('Invalid Value')

  const rawM = Math.floor(seconds / 60)
  const rawS = seconds % 60

  const [min, sec] = [rawM, rawS].map(format)
  return `${min}:${sec}`
}

export default { secToMin }
