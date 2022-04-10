// NOTE: Aliases to classes and interfaces are used for external consumption.

// SDK exports.
import ISigner from "./interfaces/signer"
import IonDocumentModel from "./models/ion-document.model"
import IonPublicKeyModel from "./models/ion-public-key.model"
import IonServiceModel from "./models/ion-service.model"
import JwkEd25519 from "./models/jwk-ed25519"
import JwkEs256k from "./models/jwk-es256k"
import LocalSigner from "./local-signer"
import PublicKeyPurpose from "./enums/public-key-purpose"
import SidetreeDid from "./sidetree-did"
import SidetreeKey from "./sidetree-key"
import SidetreeRequest from "./sidetree-request"
import SidetreeSdkConfig from "./sidetree-sdk-config"

export {
    ISigner,
    IonDocumentModel,
    IonPublicKeyModel,
    PublicKeyPurpose,
    SidetreeKey,
    SidetreeDid,
    SidetreeRequest,
    SidetreeSdkConfig,
    IonServiceModel,
    JwkEd25519,
    JwkEs256k,
    LocalSigner,
}
