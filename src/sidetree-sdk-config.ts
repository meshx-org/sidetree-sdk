/**
 * Global configuration of the SDK.
 */
export default class SidetreeSdkConfig {
    /**
     * Default hash algorithm used when hashing is performed.
     */
    public static hashAlgorithmInMultihashCode = 18 // SHA256

    /**
     * Maximum bytes for canonicalized delta.
     */
    public static maxCanonicalizedDeltaSizeInBytes: number = 1000

    public static didMethod: string = "sidetree"

    /**
     * Network name in ION DID, okay to leave as `undefined` if mainnet.
     */
    public static network?: "test" | "main" | string
}
