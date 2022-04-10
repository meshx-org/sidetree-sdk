import AddPublicKeysAction from "../actions/add-public-keys-action"
import AddServicesAction from "../actions/add-services-action"
import OperationType from "../../enums/operation-type"
import RemovePublicKeysAction from "../actions/remove-public-keys-action"
import RemoveServicesAction from "../actions/remove-services-action"

/**
 * Data model representing a public key in the DID Document.
 */
export default interface UpdateRequest {
    type: OperationType
    didSuffix: string
    revealValue: string
    delta: {
        updateCommitment: string
        patches: (AddServicesAction | AddPublicKeysAction | RemoveServicesAction | RemovePublicKeysAction)[]
    }
    signedData: string
}
