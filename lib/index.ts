// NOTE: Aliases to classes and interfaces are used for external consumption.

// SDK exports.
import ISigner from "./interfaces/signer"
import IonDid from "./ion-did"
import IonDocumentModel from "./models/ion-document.model"
import IonKey from "./ion-key"
import IonNetwork from "./enums/ion-network"
import IonPublicKeyModel from "./models/ion-public-key.model"
import IonPublicKeyPurpose from "./enums/public-key-purpose"
import IonRequest from "./ion-request"
import IonSdkConfig from "./ion-sdk-config"
import IonServiceModel from "./models/ion-service.model"
import JwkEd25519 from "./models/jwk-ed25519"
import JwkEs256k from "./models/jwk-es256k"
import LocalSigner from "./local-signer"

export {
    ISigner,
    IonDid,
    IonDocumentModel,
    IonKey,
    IonNetwork,
    IonPublicKeyModel,
    IonPublicKeyPurpose,
    IonRequest,
    IonSdkConfig,
    IonServiceModel,
    JwkEd25519,
    JwkEs256k,
    LocalSigner,
}
