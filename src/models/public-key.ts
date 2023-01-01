import PublicKeyPurpose from "../enums/public-key-purpose"

/** Data model representing a public key in the DID Document. */
export default interface PublicKey {
    id: string
    type: "JsonWebKey2020"
    publicKeyJwk: object
    purposes?: PublicKeyPurpose[]
}
