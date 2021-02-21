import $date from './date.util'

describe('Date Util', () => {
  describe('parse', () => {
    it('should return a date', () => {
      const received = $date.parse('2020-10-10')
      expect(received).toBeInstanceOf(Date)
    })

    it("should throw an 'Invalid Date' if receives a non-date value", () => {
      try {
        $date.parse('non-date value')
      } catch (ex) {
        expect(ex).toBeInstanceOf(Error)
        expect(ex).toEqual(new Error('Invalid Date'))
      }
    })
  })
})
