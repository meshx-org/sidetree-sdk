import * as randomBytes from "randombytes"
import { JsonWebKey2020, Secp256k1KeyPair } from "@transmute/secp256k1-key-pair"
import { Ed25519KeyPair } from "@transmute/ed25519-key-pair"
import InputValidator from "./input-validator"
import IonPublicKeyModel from "./models/public-key"
import JwkEd25519 from "./models/jwk-ed25519"
import JwkEs256k from "./models/jwk-es256k"
import PublicKeyPurpose from "./enums/public-key-purpose"
import SidetreeKeyJwk from "./models/sidetree-key-jwk"

/**
 * Class containing operations related to keys used in ION.
 */
export default class SidetreeKey {
    /**
     * Generates SECP256K1 key pair to be used in an operation.
     * Mainly used for testing.
     * @returns [publicKey, privateKey]
     */
    public static async generateEs256kDidDocumentKeyPair(input: {
        id: string
        purposes?: PublicKeyPurpose[]
    }): Promise<[IonPublicKeyModel, JwkEs256k]> {
        const id = input.id
        const purposes = input.purposes

        InputValidator.validateId(id)
        InputValidator.validatePublicKeyPurposes(purposes)

        const [publicKey, privateKey] = await SidetreeKey.generateEs256kKeyPair()
        const publicKeyModel: IonPublicKeyModel = {
            id,
            type: "EcdsaSecp256k1VerificationKey2019",
            publicKeyJwk: publicKey,
        }

        // Only add the `purposes` property If given `purposes` array has at least an entry.
        if (purposes !== undefined && purposes.length > 0) {
            publicKeyModel.purposes = purposes
        }

        return [publicKeyModel, privateKey]
    }

    /**
     * Generates SECP256K1 key pair for ION operation use.
     * @returns [publicKey, privateKey]
     */
    public static async generateEs256kOperationKeyPair(): Promise<[JwkEs256k, JwkEs256k]> {
        const keyPair = await SidetreeKey.generateEs256kKeyPair()
        return keyPair
    }

    private static async generateEs256kKeyPair(): Promise<[JwkEs256k, JwkEs256k]> {
        const keyPair = await Secp256k1KeyPair.generate({
            secureRandom: () => randomBytes(32),
        })
        const exportedKeypair = await keyPair.export({
            type: "JsonWebKey2020",
            privateKey: true,
        })
        const { publicKeyJwk, privateKeyJwk } = exportedKeypair as JsonWebKey2020
        return [publicKeyJwk, privateKeyJwk]
    }

    /**
     * Generates Ed25519 key pair to be used in an operation.
     * Mainly used for testing.
     * @returns [publicKey, privateKey]
     */
    public static async generateEd25519DidDocumentKeyPair(input: {
        id: string
        purposes?: PublicKeyPurpose[]
    }): Promise<[IonPublicKeyModel, JwkEd25519]> {
        const id = input.id
        const purposes = input.purposes

        InputValidator.validateId(id)
        InputValidator.validatePublicKeyPurposes(purposes)

        const [publicKey, privateKey] = await SidetreeKey.generateEd25519KeyPair()
        const publicKeyModel: IonPublicKeyModel = {
            id,
            type: "JsonWebKey2020",
            publicKeyJwk: publicKey,
        }

        // Only add the `purposes` property If given `purposes` array has at least an entry.
        if (purposes !== undefined && purposes.length > 0) {
            publicKeyModel.purposes = purposes
        }

        return [publicKeyModel, privateKey]
    }

    /**
     * Generates Ed25519 key pair for ION operation use.
     * @returns [publicKey, privateKey]
     */
    public static async generateEd25519OperationKeyPair(): Promise<[JwkEd25519, JwkEd25519]> {
        const keyPair = await SidetreeKey.generateEd25519KeyPair()
        return keyPair
    }

    private static async generateEd25519KeyPair(): Promise<[JwkEd25519, JwkEd25519]> {
        const keyPair = await Ed25519KeyPair.generate({
            secureRandom: () => randomBytes(32),
        })
        const exportedKeypair = await keyPair.export({
            type: "JsonWebKey2020",
            privateKey: true,
        })
        const { publicKeyJwk, privateKeyJwk } = exportedKeypair as JsonWebKey2020
        return [publicKeyJwk, privateKeyJwk]
    }

    public static isJwkEs256k(key: SidetreeKeyJwk): key is JwkEs256k {
        return key.crv === "secp256k1" && key.kty === "EC"
    }

    public static isJwkEd25519(key: SidetreeKeyJwk): key is JwkEd25519 {
        return key.crv === "Ed25519" && key.kty === "OKP"
    }
}
