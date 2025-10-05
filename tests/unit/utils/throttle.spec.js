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

    it('executes the final callback after the limit', async () => {
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

    it('executes only the first and last callback when called rapidly', async () => {
        const throttle = createThrottleFn(100)
        let throttledCallbacks = 0
        const fn = throttle(() => {
            throttledCallbacks++
        }, 100)
        for (let i = 0; i < 10; i++) {
            fn()
        }
        await new Promise((resolve) => setTimeout(resolve, 250))
        expect(throttledCallbacks).to.equal(2)
    })
})