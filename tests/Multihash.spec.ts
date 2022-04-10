import ErrorCode from "../lib/error-code"
import JasmineIonErrorValidator from "./JasmineIonErrorValidator"
import Multihash from "../lib/multihash"

describe("Multihash", async () => {
    describe("hashAsNonMultihashBuffer()", async () => {
        it("should throw error if hash algorithm given is unsupported.", async () => {
            JasmineIonErrorValidator.expectIonErrorToBeThrown(
                () => Multihash.hashAsNonMultihashBuffer(Buffer.from("anyThing"), 999),
                ErrorCode.MultihashUnsupportedHashAlgorithm
            )
        })
    })
})
