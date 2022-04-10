import Encoder from "./encoder"
import IonDocumentModel from "./models/ion-document.model"
import JsonCanonicalizer from "./json-canonicalizer"
import Multihash from "./multihash"
import SidetreeKeyJwk from "./models/sidetree-key-jwk"
import SidetreeRequest from "./sidetree-request"
import SidetreeSdkConfig from "./sidetree-sdk-config"

/**
 * Class containing DID related operations.
 */
export default class SidetreeDid {
    /**
     * Creates a long-form DID.
     * @param input.document The initial state to be associate with the ION DID to be created using a `replace` document patch action.
     */
    public static createLongFormDid(input: {
        recoveryKey: SidetreeKeyJwk
        updateKey: SidetreeKeyJwk
        document: IonDocumentModel
    }): string {
        const createRequest = SidetreeRequest.createCreateRequest(input)

        const didUniqueSuffix = SidetreeDid.computeDidUniqueSuffix(createRequest.suffixData)

        // Add the network portion if not configured for mainnet.
        let shortFormDid
        if (SidetreeSdkConfig.network === undefined || SidetreeSdkConfig.network === "mainnet") {
            shortFormDid = `did:${SidetreeSdkConfig.didMethod}:${didUniqueSuffix}`
        } else {
            shortFormDid = `did:${SidetreeSdkConfig.didMethod}:${SidetreeSdkConfig.network}:${didUniqueSuffix}`
        }

        const initialState = {
            suffixData: createRequest.suffixData,
            delta: createRequest.delta,
        }

        // Initial state must be canonicalized as per spec.
        const canonicalizedInitialStateBuffer = JsonCanonicalizer.canonicalizeAsBuffer(initialState)
        const encodedCanonicalizedInitialStateString = Encoder.encode(canonicalizedInitialStateBuffer)

        const longFormDid = `${shortFormDid}:${encodedCanonicalizedInitialStateString}`
        return longFormDid
    }

    /**
     * Computes the DID unique suffix given the encoded suffix data string.
     */
    private static computeDidUniqueSuffix(suffixData: object): string {
        const canonicalizedStringBuffer = JsonCanonicalizer.canonicalizeAsBuffer(suffixData)
        const multihash = Multihash.hash(canonicalizedStringBuffer, SidetreeSdkConfig.hashAlgorithmInMultihashCode)
        const encodedMultihash = Encoder.encode(multihash)
        return encodedMultihash
    }
}
