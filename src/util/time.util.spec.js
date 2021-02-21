import $time from './time.util'

describe('Time Util', () => {
  describe('secToMin', () => {
    it('should convert seconds to a formatted min:sec string', () => {
      const received = $time.secToMin(300)
      expect(received).toEqual('05:00')
    })

    it('should throw Invalid Value error if receives a non-number', () => {
      expect(() => $time.secToMin('non-number')).toThrow()

      try {
        $time.secToMin('non-number')
      } catch (ex) {
        expect(ex).toBeInstanceOf(Error)
        expect(ex).toEqual(new Error('Invalid Value'))
      }
    })
  })
})
