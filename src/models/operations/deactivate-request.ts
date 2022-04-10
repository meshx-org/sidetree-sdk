import OperationType from "../../enums/operation-type"

/**
 * Data model representing a public key in the DID Document.
 */
export default interface DeactivateRequest {
    type: OperationType
    didSuffix: string
    revealValue: string
    signedData: string
}
