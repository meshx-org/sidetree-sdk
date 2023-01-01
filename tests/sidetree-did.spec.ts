import * as jwkEd255191Public from "./vectors/inputs/jwkEd255191Public.json"
import * as jwkEd255192Public from "./vectors/inputs/jwkEd255192Public.json"
import * as jwkEs256k1Public from "./vectors/inputs/jwkEs256k1Public.json"
import * as jwkEs256k2Public from "./vectors/inputs/jwkEs256k2Public.json"
import * as publicKeyModel1 from "./vectors/inputs/publicKeyModel1.json"
import * as publicKeyModelEd25519 from "./vectors/inputs/publicKeyModelEd25519.json"
import * as service1 from "./vectors/inputs/service1.json"
import { PublicKeyPurpose, SidetreeDid, SidetreeKey, SidetreeSdkConfig } from "../src/index"
import ErrorCode from "../src/error-code"
import IonDocumentModel from "../src/models/document"
import JasmineSidetreeErrorValidator from "./jasmine-error-validator"
import { b64urlDecode } from "@waiting/base64"

describe("SidetreeDid", async () => {
    afterEach(() => {
        SidetreeSdkConfig.network = undefined
        SidetreeSdkConfig.didMethod = "sidetree"
    })

    describe("createLongFormDid()", async () => {
        it("vector test - should create a long-form DID correctly with ES256K keys.", async () => {
            const recoveryKey = jwkEs256k1Public
            const updateKey = jwkEs256k2Public
            const didDocumentKeys = [publicKeyModel1 as any]
            const services = [service1]

            const document = {
                publicKeys: didDocumentKeys,
                services,
            }

            const longFormDid = SidetreeDid.createLongFormDid({
                recoveryKey,
                updateKey,
                document,
            })

            const expectedMethodSpecificId =
                "did:sidetree:EiAZiRRvoqWyITTw-vxD5AAnyewJbFjNL5O2-uGft99I5Q:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJwdWJsaWNLZXlNb2RlbDFJZCIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ0WFNLQl9ydWJYUzdzQ2pYcXVwVkpFelRjVzNNc2ptRXZxMVlwWG45NlpnIiwieSI6ImRPaWNYcWJqRnhvR0otSzAtR0oxa0hZSnFpY19EX09NdVV3a1E3T2w2bmsifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJrZXlBZ3JlZW1lbnQiXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn1dLCJzZXJ2aWNlcyI6W3siaWQiOiJzZXJ2aWNlMUlkIiwic2VydmljZUVuZHBvaW50IjoiaHR0cDovL3d3dy5zZXJ2aWNlMS5jb20iLCJ0eXBlIjoic2VydmljZTFUeXBlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlES0lrd3FPNjlJUEczcE9sSGtkYjg2bll0MGFOeFNIWnUyci1iaEV6bmpkQSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQVJYTTNSVERxY0xXSllJS0VETnpTdnRoSXI4emFGeHRGZjdRMUczUjk1QUEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJmT1pkTXRVNk9CdzhQazg3OVF0Wi0ySi05RmJialNaeW9hQV9icUQ0emhBIn19"
            expect(longFormDid).toEqual(expectedMethodSpecificId)
        })

        it("vector test - should create a long-form DID correctly with Ed25519 keys.", async () => {
            const recoveryKey = jwkEd255191Public
            const updateKey = jwkEd255192Public
            const didDocumentKeys = [publicKeyModelEd25519 as any]
            const services = [service1]

            const document = {
                publicKeys: didDocumentKeys,
                services,
            }

            const longFormDid = SidetreeDid.createLongFormDid({
                recoveryKey,
                updateKey,
                document,
            })

            const expectedMethodSpecificId =
                "did:sidetree:EiBks49Ah-ZxE1-6Se-PUDk_4_ffylpeqmfMCWUBwwTM-g:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJwdWJsaWNLZXlNb2RlbEVkMjU1MTkiLCJwdWJsaWNLZXlKd2siOnsiY3J2IjoiRWQyNTUxOSIsImt0eSI6Ik9LUCIsIngiOiJoQ3hhTVI2TlVPWEkxQzd3Nlh6MW1jaGMyd1M4RlZ2WGhuZ3NnWjBodHNZIn0sInB1cnBvc2VzIjpbImF1dGhlbnRpY2F0aW9uIiwia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoic2VydmljZTFJZCIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHA6Ly93d3cuc2VydmljZTEuY29tIiwidHlwZSI6InNlcnZpY2UxVHlwZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpQ0VEZkdaZkdxeXJuMmVsTU1MbGRfMGxQVE8xTXlQbi1MdFlhZWJEYl9xQncifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUI2TVJSNFc5NFhhc21obVhXM2NhUlluWDdUWGYyZktwcUhuZGhqTmcwb2R3IiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlEbHNIVkFScDgwYTF2azhHQTlxMWcwaFNGbEp3VGdlQkZOMmkyME9sMlRJUSJ9fQ"
            expect(longFormDid).toEqual(expectedMethodSpecificId)
        })

        it("should not generate invalid JSON when `services` and/or `publicKeys` in given document are `undefined`.", async () => {
            const recoveryKey = jwkEs256k1Public
            const updateKey = jwkEs256k2Public

            const document: IonDocumentModel = {
                publicKeys: undefined,
                services: undefined,
            }

            const longFormDid = SidetreeDid.createLongFormDid({
                recoveryKey,
                updateKey,
                document,
            })

            const indexOfLastColon = longFormDid.lastIndexOf(":")
            const encodedInitialState = longFormDid.substring(indexOfLastColon + 1)

            // Making sure the encoded initial state is still parsable as JSON.
            const initialState = b64urlDecode(encodedInitialState)
            JSON.parse(initialState)
        })

        it("should not include network segment in DID if SDK network is set to mainnet.", async () => {
            SidetreeSdkConfig.network = "mainnet"
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            const longFormDid = SidetreeDid.createLongFormDid({
                recoveryKey,
                updateKey,
                document: {},
            })
            expect(longFormDid.indexOf("mainnet")).toBeLessThan(0)
        })

        it('should include network segment as "test" in DID if SDK network testnet.', async () => {
            SidetreeSdkConfig.network = "test"
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            const longFormDid = SidetreeDid.createLongFormDid({
                recoveryKey,
                updateKey,
                document: {},
            })

            const didSegments = longFormDid.split(":")
            expect(didSegments.length).toEqual(5)
            expect(didSegments[2]).toEqual("test")
        })

        it("should throw error if given operation key contains unexpected property.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            updateKey.d = "notAllowedPropertyInPublicKey" // 'd' is only allowed in private key.

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document: {},
                    }),
                ErrorCode.PublicKeyJwkEs256kHasUnexpectedProperty
            )
        })

        it("should throw error if given operation key contains incorrect crv value.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            updateKey.crv = "wrongValue"

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document: {},
                    }),
                ErrorCode.UnsupportedKeyType
            )
        })

        it("should throw error if given operation key contains incorrect kty value.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            updateKey.kty = "wrongValue"

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document: {},
                    }),
                ErrorCode.UnsupportedKeyType
            )
        })

        it("should throw error if given operation key contains invalid x length.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            updateKey.x = "wrongValueLength"

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document: {},
                    }),
                ErrorCode.JwkEs256kHasIncorrectLengthOfX
            )
        })

        it("should throw error if given operation key contains invalid y length.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            updateKey.y = "wrongValueLength"

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document: {},
                    }),
                ErrorCode.JwkEs256kHasIncorrectLengthOfY
            )
        })

        it("should throw error if given DID Document JWK is an array.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            const [anyDidDocumentKey] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId",
                purposes: [PublicKeyPurpose.Authentication],
            })
            ;(anyDidDocumentKey as any).publicKeyJwk = ["invalid object type"]

            const document = { publicKeys: [anyDidDocumentKey] }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.DidDocumentPublicKeyMissingOrIncorrectType
            )
        })

        it("should throw error if given DID Document keys with the same ID.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            const [anyDidDocumentKey1] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId",
                purposes: [PublicKeyPurpose.AssertionMethod],
            })
            const [anyDidDocumentKey2] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId",
                purposes: [PublicKeyPurpose.Authentication],
            }) // Key ID duplicate.
            const didDocumentKeys = [anyDidDocumentKey1, anyDidDocumentKey2]

            const document = { publicKeys: didDocumentKeys }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.DidDocumentPublicKeyIdDuplicated
            )
        })

        it("should throw error if given DID Document key ID exceeds maximum length.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey
            const [anyDidDocumentKey] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId",
                purposes: [PublicKeyPurpose.Authentication],
            })
            anyDidDocumentKey.id = "superDuperLongDidDocumentKeyIdentifierThatExceedsMaximumLength" // Overwrite with super long string.

            const document = { publicKeys: [anyDidDocumentKey] }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.IdTooLong
            )
        })

        it("should throw error if given service endpoint ID exceeds maximum length.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            const services = [
                {
                    id: "superDuperLongServiceIdValueThatExceedsMaximumAllowedLength",
                    type: "anyType",
                    serviceEndpoint: "http://any.endpoint",
                },
            ]

            const document = { services }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.IdTooLong
            )
        })

        it("should throw error if given service endpoint ID is a duplicate.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            const services = [
                {
                    id: "id",
                    type: "anyType",
                    serviceEndpoint: "http://any.endpoint",
                },
                {
                    id: "id",
                    type: "otherType",
                    serviceEndpoint: "http://any.other.endpoint",
                },
            ]

            const document = { services }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.DidDocumentServiceIdDuplicated
            )
        })

        it("should throw error if given service endpoint ID is not using Base64URL characters", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            const services = [
                {
                    id: "notAllBase64UrlChars!",
                    type: "anyType",
                    serviceEndpoint: "http://any.endpoint",
                },
            ]

            const document = { services }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.IdNotUsingBase64UrlCharacterSet
            )
        })

        it("should throw error if given service endpoint type exceeds maximum length.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            const services = [
                {
                    id: "anyId",
                    type: "superDuperLongServiceTypeValueThatExceedsMaximumAllowedLength",
                    serviceEndpoint: "http://any.endpoint",
                },
            ]

            const document = { services }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.ServiceTypeTooLong
            )
        })

        it("should throw error if given service endpoint value is an array", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            const document = {
                services: [
                    {
                        id: "anyId",
                        type: "anyType",
                        serviceEndpoint: [],
                    },
                ],
            }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.ServiceEndpointCannotBeAnArray
            )
        })

        it("should allow object as service endpoint value.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            const document = {
                services: [
                    {
                        id: "anyId",
                        type: "anyType",
                        serviceEndpoint: { value: "someValue" }, // `object` based endpoint value.
                    },
                ],
            }

            const longFormDid = SidetreeDid.createLongFormDid({
                recoveryKey,
                updateKey,
                document,
            })

            expect(longFormDid).toBeDefined()
        })

        it("should throw error if given service endpoint string is not a URL.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            const document = {
                services: [
                    {
                        id: "anyId",
                        type: "anyType",
                        serviceEndpoint: "http://", // Invalid URI.
                    },
                ],
            }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.ServiceEndpointStringNotValidUri
            )
        })

        it("should throw error if resulting delta property exceeds maximum size.", async () => {
            const [recoveryKey] = await SidetreeKey.generateEs256kOperationKeyPair()
            const updateKey = recoveryKey

            // Add many keys so that 'delta' property size exceeds max limit.
            const [anyDidDocumentKey1] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId1",
                purposes: [PublicKeyPurpose.Authentication],
            })
            const [anyDidDocumentKey2] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId2",
                purposes: [PublicKeyPurpose.Authentication],
            })
            const [anyDidDocumentKey3] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId3",
                purposes: [PublicKeyPurpose.Authentication],
            })
            const [anyDidDocumentKey4] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId4",
                purposes: [PublicKeyPurpose.Authentication],
            })
            const [anyDidDocumentKey5] = await SidetreeKey.generateEs256kDidDocumentKeyPair({
                id: "anyId5",
                purposes: [PublicKeyPurpose.Authentication],
            })
            const didDocumentKeys = [anyDidDocumentKey1, anyDidDocumentKey2, anyDidDocumentKey3, anyDidDocumentKey4, anyDidDocumentKey5]
            const document = {
                publicKeys: didDocumentKeys,
            }

            JasmineSidetreeErrorValidator.expectSidetreeErrorToBeThrown(
                () =>
                    SidetreeDid.createLongFormDid({
                        recoveryKey,
                        updateKey,
                        document,
                    }),
                ErrorCode.DeltaExceedsMaximumSize
            )
        })
    })
})
