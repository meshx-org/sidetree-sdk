import PublicKey from "./public-key"
import Service from "./service"

/** Defines the document structure used by Sidetree. */
export default interface Document {
    publicKeys?: PublicKey[]
    services?: Service[]
}
