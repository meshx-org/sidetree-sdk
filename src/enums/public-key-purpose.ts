/** DID Document key purpose. */
enum PublicKeyPurpose {
    Authentication = "authentication",
    AssertionMethod = "assertionMethod",
    CapabilityInvocation = "capabilityInvocation",
    CapabilityDelegation = "capabilityDelegation",
    KeyAgreement = "keyAgreement",
}

export default PublicKeyPurpose
