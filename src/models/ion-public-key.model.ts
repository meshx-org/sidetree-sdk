import IonPublicKeyPurpose from "../enums/public-key-purpose"

/**
 * Data model representing a public key in the DID Document.
 */
export default interface IonPublicKeyModel {
    id: string
    type: string
    publicKeyJwk: object
    purposes?: IonPublicKeyPurpose[]
}
