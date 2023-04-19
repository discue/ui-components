export const createThrottleFn = () => {
    return function (callback, limit) {
        let blocked = false
        let unblockTimeoutId = 0
        let finalCallbackTimeoutId = 0

        /**
         * Calls the throttle function. Callbacks will be throttled according limit
         * given to constructor function
         * @returns 
         */
        function f() {
            if (blocked) {
                return
            }

            blocked = true
            clearTimeout(finalCallbackTimeoutId)
            callback.call()

            unblockTimeoutId = setTimeout(() => { blocked = false }, limit)
            finalCallbackTimeoutId = setTimeout(callback, limit + 5)
        }

        /**
         * Clears internal timeouts and intervals to prevent further calls
         */
        f.clear = function () {
            clearTimeout(unblockTimeoutId)
            clearTimeout(finalCallbackTimeoutId)
        }

        return f
    }
}