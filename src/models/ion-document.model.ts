import IonPublicKeyModel from "./ion-public-key.model"
import IonServiceModel from "./ion-service.model"

/**
 * Defines the document structure used by ION.
 */
export default interface IonDocumentModel {
    publicKeys?: IonPublicKeyModel[]
    services?: IonServiceModel[]
}
