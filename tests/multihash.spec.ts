import ErrorCode from "../lib/error-code"
import JasmineSidetreeErrorValidator from "./jasmine-ion-error-validator"
import Multihash from "../lib/multihash"

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
