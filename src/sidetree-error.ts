/**
 * A class that represents an Sidetree error.
 */
export default class SidetreeError extends Error {
    constructor(public code: string, message: string) {
        super(`${code}: ${message}`)

        // NOTE: Extending 'Error' breaks prototype chain since TypeScript 2.1.
        // The following line restores prototype chain.
        Object.setPrototypeOf(this, new.target.prototype)
    }
}
