import * as crypto from "crypto"
import Encoder from "./encoder"
import ErrorCode from "./error-code"
import JsonCanonicalizer from "./json-canonicalizer"
import SidetreeError from "./sidetree-error"
import SidetreeSdkConfig from "./sidetree-sdk-config"

const multihashes = require("multihashes")

/**
 * Class that performs hashing operations using the multihash format.
 */
export default class Multihash {
    /**
     * Hashes the content using the hashing algorithm specified.
     * @param hashAlgorithmInMultihashCode The hashing algorithm to use. If not given, latest supported hashing algorithm will be used.
     * @returns A multihash buffer.
     */
    public static hash(content: Buffer, hashAlgorithmInMultihashCode: number): Buffer {
        const conventionalHash = this.hashAsNonMultihashBuffer(content, hashAlgorithmInMultihashCode)
        const multihash = multihashes.encode(conventionalHash, hashAlgorithmInMultihashCode)

        return multihash
    }

    /**
     * Hashes the content using the hashing algorithm specified as a generic (non-multihash) hash.
     * @param hashAlgorithmInMultihashCode The hashing algorithm to use. If not given, latest supported hashing algorithm will be used.
     * @returns A multihash buffer.
     */
    public static hashAsNonMultihashBuffer(content: Buffer, hashAlgorithmInMultihashCode: number): Buffer {
        let hash
        switch (hashAlgorithmInMultihashCode) {
            case 18: // SHA256
                hash = crypto.createHash("sha256").update(content).digest()
                break
            default:
                throw new SidetreeError(
                    ErrorCode.MultihashUnsupportedHashAlgorithm,
                    `Hash algorithm defined in multihash code ${hashAlgorithmInMultihashCode} is not supported.`
                )
        }

        return hash
    }

    /**
     * Canonicalize the given content, then double hashes the result using the latest supported hash algorithm, then encodes the multihash.
     * Mainly used for testing purposes.
     */
    public static canonicalizeThenHashThenEncode(content: object, hashAlgorithmInMultihashCode: number) {
        const canonicalizedStringBuffer = JsonCanonicalizer.canonicalizeAsBuffer(content)

        const multihashEncodedString = Multihash.hashThenEncode(canonicalizedStringBuffer, hashAlgorithmInMultihashCode)
        return multihashEncodedString
    }

    /**
     * Canonicalize the given content, then double hashes the result using the latest supported hash algorithm, then encodes the multihash.
     * Mainly used for testing purposes.
     */
    public static canonicalizeThenDoubleHashThenEncode(content: object, hashAlgorithmInMultihashCode: number) {
        const contentBuffer = JsonCanonicalizer.canonicalizeAsBuffer(content)

        // Double hash.
        const intermediateHashBuffer = Multihash.hashAsNonMultihashBuffer(contentBuffer, hashAlgorithmInMultihashCode)
        const multihashEncodedString = Multihash.hashThenEncode(intermediateHashBuffer, hashAlgorithmInMultihashCode)
        return multihashEncodedString
    }

    /**
     * Hashes the content using the hashing algorithm specified then codes the multihash buffer.
     * @param hashAlgorithmInMultihashCode The hashing algorithm to use.
     */
    public static hashThenEncode(content: Buffer, hashAlgorithmInMultihashCode: number): string {
        const multihashBuffer = Multihash.hash(content, hashAlgorithmInMultihashCode)
        const multihashEncodedString = Encoder.encode(multihashBuffer)
        return multihashEncodedString
    }

    /**
     * Checks if the given encoded hash is a multihash computed using the configured hashing algorithm.
     */
    public static validateEncodedHashComputedUsingSupportedHashAlgorithm(
        encodedMultihash: string,
        inputContextForErrorLogging: string
    ) {
        let multihash
        const multihashBuffer = Encoder.decodeAsBuffer(encodedMultihash, inputContextForErrorLogging)

        try {
            multihash = multihashes.decode(multihashBuffer)
        } catch {
            throw new SidetreeError(
                ErrorCode.MultihashStringNotAMultihash,
                `Given ${inputContextForErrorLogging} string '${encodedMultihash}' is not a multihash after decoding.`
            )
        }

        const hashAlgorithmInMultihashCode = SidetreeSdkConfig.hashAlgorithmInMultihashCode

        if (hashAlgorithmInMultihashCode !== multihash.code) {
            throw new SidetreeError(
                ErrorCode.MultihashUnsupportedHashAlgorithm,
                `Given ${inputContextForErrorLogging} uses unsupported multihash algorithm with code ${multihash.code}, should use ${hashAlgorithmInMultihashCode} or change SidetreeSdkConfig to desired hashing algorithm.`
            )
        }
    }
}
