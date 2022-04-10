import PublicKey from "../public-key"

export default interface AddPublicKeysAction {
    action: string
    publicKeys: PublicKey[]
}
