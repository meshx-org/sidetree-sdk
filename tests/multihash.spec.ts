import ErrorCode from "../src/error-code"
import JasmineSidetreeErrorValidator from "./jasmine-error-validator"
import Multihash from "../src/multihash"

describe("Multihash", async () => {
    describe("hashAsNonMultihashBuffer()", async () => {
        it("should throw error if hash algorithm given is unsupported.", async () => {
            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () => Multihash.hashAsNonMultihashBuffer(Buffer.from("anyThing"), 999),
                ErrorCode.MultihashUnsupportedHashAlgorithm
            )
        })
    })
})
