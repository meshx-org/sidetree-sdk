import IonAddPublicKeysActionModel from "./ion-add-public-keys-action.model"
import IonAddServicesActionModel from "./ion-add-services-action.model"
import IonRemovePublicKeysActionModel from "./ion-remove-public-keys-action.model"
import IonRemoveServicesActionModel from "./ion-remove-services-action.model"
import OperationType from "../enums/operation-type"

/**
 * Data model representing a public key in the DID Document.
 */
export default interface IonUpdateRequestModel {
    type: OperationType
    didSuffix: string
    revealValue: string
    delta: {
        updateCommitment: string
        patches: (
            | IonAddServicesActionModel
            | IonAddPublicKeysActionModel
            | IonRemoveServicesActionModel
            | IonRemovePublicKeysActionModel
        )[]
    }
    signedData: string
}
