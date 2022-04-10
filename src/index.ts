// NOTE: Aliases to classes and interfaces are used for external consumption.

// SDK exports.
import Document from "./models/document"
import ISigner from "./interfaces/signer"
import JwkEd25519 from "./models/jwk-ed25519"
import JwkEs256k from "./models/jwk-es256k"
import LocalSigner from "./local-signer"
import PublicKey from "./models/public-key"
import PublicKeyPurpose from "./enums/public-key-purpose"
import Service from "./models/service"
import SidetreeDid from "./sidetree-did"
import SidetreeKey from "./sidetree-key"
import SidetreeRequest from "./sidetree-request"
import SidetreeSdkConfig from "./sidetree-sdk-config"

export {
    ISigner,
    Document,
    PublicKey,
    PublicKeyPurpose,
    SidetreeKey,
    SidetreeDid,
    SidetreeRequest,
    SidetreeSdkConfig,
    Service,
    JwkEd25519,
    JwkEs256k,
    LocalSigner,
}
