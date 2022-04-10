import { JwkEd25519, PublicKeyPurpose, SidetreeKey } from "../src/index"
import ErrorCode from "../src/error-code"
import JasmineSidetreeErrorValidator from "./jasmine-ion-error-validator"
import JwkEs256k from "../src/models/jwk-es256k"

describe("IonKey", async () => {
    describe("generateEs256kOperationKeyPair()", async () => {
        it("should create a key pair successfully.", async () => {
            const [publicKey, privateKey] = await SidetreeKey.generateEs256kOperationKeyPair()

            expect(Object.keys(publicKey).length).toEqual(4)
            expect(Object.keys(privateKey).length).toEqual(5)

            expect(publicKey.d).toBeUndefined()
            expect(privateKey.d).toBeDefined()
            expect(publicKey.crv).toEqual(privateKey.crv)
            expect(publicKey.kty).toEqual(privateKey.kty)
            expect(publicKey.x).toEqual(privateKey.x)
            expect(publicKey.y).toEqual(privateKey.y)
        })
    })

    describe("generateEs256kDidDocumentKeyPair()", async () => {
        it("should create a key pair successfully.", async () => {
            const keyId = "anyId"
            const [didDocumentPublicKey, privateKey] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: keyId,
                purposes: [PublicKeyPurpose.Authentication],
            })

            expect(didDocumentPublicKey.id).toEqual(keyId)
            expect(didDocumentPublicKey.purposes).toEqual([PublicKeyPurpose.Authentication])
            expect(didDocumentPublicKey.type).toEqual("EcdsaSecp256k1VerificationKey2019")

            expect(Object.keys(didDocumentPublicKey.publicKeyJwk).length).toEqual(4)
            expect(Object.keys(privateKey).length).toEqual(5)

            expect(privateKey.d).toBeDefined()

            const publicKey = didDocumentPublicKey.publicKeyJwk as JwkEs256k
            expect(publicKey.d).toBeUndefined()
            expect(publicKey.crv).toEqual(privateKey.crv)
            expect(publicKey.kty).toEqual(privateKey.kty)
            expect(publicKey.x).toEqual(privateKey.x)
            expect(publicKey.y).toEqual(privateKey.y)
        })

        it("should throw error if given DID Document key ID exceeds maximum length.", async () => {
            const id = "superDuperLongDidDocumentKeyIdentifierThatExceedsMaximumLength" // Overwrite with super long string.

            await JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrownAsync(
                async () =>
                    SidetreeKey.generateEs256kDidDocumentKeyPair({
                        id,
                        purposes: [PublicKeyPurpose.Authentication],
                    }),
                ErrorCode.IdTooLong
            )
        })

        it("should throw error if given DID Document key ID is not using base64URL character set. ", async () => {
            const id = "nonBase64urlString!"

            await JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrownAsync(
                async () =>
                    SidetreeKey.generateEs256kDidDocumentKeyPair({
                        id,
                        purposes: [PublicKeyPurpose.Authentication],
                    }),
                ErrorCode.IdNotUsingBase64UrlCharacterSet
            )
        })

        it("should allow DID Document key to not have a purpose defined.", async () => {
            const [publicKeyModel1] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "id1",
                purposes: [],
            })
            expect(publicKeyModel1.id).toEqual("id1")
            expect(publicKeyModel1.purposes).toBeUndefined()

            const [publicKeyModel2] = await SidetreeKey.generateEs256kDidDocumentKeyPair({ id: "id2" })
            expect(publicKeyModel2.id).toEqual("id2")
            expect(publicKeyModel2.purposes).toBeUndefined()
        })

        it("should throw error if given DID Document key has duplicated purposes.", async () => {
            await JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrownAsync(
                async () =>
                    SidetreeKey.generateEs256kDidDocumentKeyPair({
                        id: "anyId",
                        purposes: [PublicKeyPurpose.Authentication, PublicKeyPurpose.Authentication],
                    }),
                ErrorCode.PublicKeyPurposeDuplicated
            )
        })
    })

    describe("isJwkEs256k()", async () => {
        it("should return true for a JwkEs256K key", async () => {
            const [publicKey, privateKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            expect(SidetreeKey.isJwkEs256k(publicKey)).toBeTruthy()
            expect(SidetreeKey.isJwkEs256k(privateKey)).toBeTruthy()
        })

        it("should return false for a JwkEd25519 key", async () => {
            const [publicKey, privateKey] = await SidetreeKey.generateEd25519OperationKeyPair()
            expect(SidetreeKey.isJwkEs256k(publicKey)).toBeFalsy()
            expect(SidetreeKey.isJwkEs256k(privateKey)).toBeFalsy()
        })
    })

    describe("generateEd25519OperationKeyPair()", async () => {
        it("should create a key pair successfully.", async () => {
            const [publicKey, privateKey] = await SidetreeKey.generateEd25519OperationKeyPair()

            expect(Object.keys(publicKey).length).toEqual(3)
            expect(Object.keys(privateKey).length).toEqual(4)

            expect(publicKey.d).toBeUndefined()
            expect(privateKey.d).toBeDefined()
            expect(publicKey.crv).toEqual(privateKey.crv)
            expect(publicKey.kty).toEqual(privateKey.kty)
            expect(publicKey.x).toEqual(privateKey.x)
        })
    })

    describe("generateEd25519DidDocumentKeyPair()", async () => {
        it("should create a key pair successfully.", async () => {
            const keyId = "anyId"
            const [didDocumentPublicKey, privateKey] = await SidetreeKey.generateEd25519DidDocumentKeyPair({
                id: keyId,
                purposes: [PublicKeyPurpose.Authentication],
            })

            expect(didDocumentPublicKey.id).toEqual(keyId)
            expect(didDocumentPublicKey.purposes).toEqual([PublicKeyPurpose.Authentication])
            expect(didDocumentPublicKey.type).toEqual("JsonWebKey2020")

            expect(Object.keys(didDocumentPublicKey.publicKeyJwk).length).toEqual(3)
            expect(Object.keys(privateKey).length).toEqual(4)

            expect(privateKey.d).toBeDefined()

            const publicKey = didDocumentPublicKey.publicKeyJwk as JwkEd25519
            expect(publicKey.d).toBeUndefined()
            expect(publicKey.crv).toEqual(privateKey.crv)
            expect(publicKey.kty).toEqual(privateKey.kty)
            expect(publicKey.x).toEqual(privateKey.x)
        })

        it("should throw error if given DID Document key ID exceeds maximum length.", async () => {
            const id = "superDuperLongDidDocumentKeyIdentifierThatExceedsMaximumLength" // Overwrite with super long string.

            await JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrownAsync(
                async () =>
                    SidetreeKey.generateEd25519DidDocumentKeyPair({
                        id,
                        purposes: [PublicKeyPurpose.Authentication],
                    }),
                ErrorCode.IdTooLong
            )
        })

        it("should throw error if given DID Document key ID is not using base64URL character set. ", async () => {
            const id = "nonBase64urlString!"

            await JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrownAsync(
                async () =>
                    SidetreeKey.generateEd25519DidDocumentKeyPair({
                        id,
                        purposes: [PublicKeyPurpose.Authentication],
                    }),
                ErrorCode.IdNotUsingBase64UrlCharacterSet
            )
        })

        it("should allow DID Document key to not have a purpose defined.", async () => {
            const [publicKeyModel1] = await SidetreeKey.generateEd25519DidDocumentKeyPair({
                id: "id1",
                purposes: [],
            })
            expect(publicKeyModel1.id).toEqual("id1")
            expect(publicKeyModel1.purposes).toBeUndefined()

            const [publicKeyModel2] = await SidetreeKey.generateEd25519DidDocumentKeyPair({ id: "id2" })
            expect(publicKeyModel2.id).toEqual("id2")
            expect(publicKeyModel2.purposes).toBeUndefined()
        })

        it("should throw error if given DID Document key has duplicated purposes.", async () => {
            await JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrownAsync(
                async () =>
                    SidetreeKey.generateEd25519DidDocumentKeyPair({
                        id: "anyId",
                        purposes: [PublicKeyPurpose.Authentication, PublicKeyPurpose.Authentication],
                    }),
                ErrorCode.PublicKeyPurposeDuplicated
            )
        })
    })

    describe("isJwkEd25519()", async () => {
        it("should return false for a JwkEs256K key", async () => {
            const [publicKey, privateKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            expect(SidetreeKey.isJwkEd25519(publicKey)).toBeFalsy()
            expect(SidetreeKey.isJwkEd25519(privateKey)).toBeFalsy()
        })

        it("should return false for a JwkEd25519 key", async () => {
            const [publicKey, privateKey] = await SidetreeKey.generateEd25519OperationKeyPair()
            expect(SidetreeKey.isJwkEd25519(publicKey)).toBeTruthy()
            expect(SidetreeKey.isJwkEd25519(privateKey)).toBeTruthy()
        })
    })
})
