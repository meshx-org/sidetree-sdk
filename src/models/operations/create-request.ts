import Document from "../document"
import OperationType from "../../enums/operation-type"

/**
 * Data model representing a public key in the DID Document.
 */
export default interface CreateRequest {
    type: OperationType
    suffixData: {
        deltaHash: string
        recoveryCommitment: string
    }
    delta: {
        updateCommitment: string
        patches: {
            action: string
            document: Document
        }[]
    }
}
