import { expect } from 'chai';
import { createThrottleFn } from '../../../src/utils/throttle.js';

describe('throttle', () => {

    it('executes the first callback immediately', () => {
        const throttle = createThrottleFn()
        let throttledCallbacks = 0
        throttle(() => {
            throttledCallbacks++
        }, 1000)()
        expect(throttledCallbacks).to.equal(1)
    })

    it('executes the final callback after the elimit', async () => {
        const throttle = createThrottleFn(100)
        let throttledCallbacks = 0
        throttle(() => {
            throttledCallbacks++
        }, 100)()
        await new Promise((resolve) => setTimeout(resolve, 250))
        expect(throttledCallbacks).to.equal(2)
    })

    it('does not execute the final if the timeouts were cleared', async () => {
        const throttle = createThrottleFn(100)
        let throttledCallbacks = 0
        const fn = throttle(() => {
            throttledCallbacks++
        }, 100)
        fn()
        fn.clear()
        await new Promise((resolve) => setTimeout(resolve, 250))
        expect(throttledCallbacks).to.equal(1)
    })

    it('throttles callbacks according to given limit', async () => {
        const throttle = createThrottleFn()
        const fn = throttle(() => {
            throttledCallbacks++
        }, 500)
        let throttledCallbacks = 0
        for (let i = 0, n = 10; i < n; i++) {
            fn()
            await new Promise((resolve) => setTimeout(resolve, 30))
        }
        await new Promise((resolve) => setTimeout(resolve, 750))
        expect(throttledCallbacks).to.equal(2)
    })
})