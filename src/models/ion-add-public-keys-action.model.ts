import IonPublicKeyModel from "./ion-public-key.model"

export default interface IonAddPublicKeysActionModel {
    action: string
    publicKeys: IonPublicKeyModel[]
}
