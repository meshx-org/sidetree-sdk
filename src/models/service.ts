/**
 * Defines the data structure of a service declared in a DID Document.
 */
export default interface Service {
    id: string
    type: string
    serviceEndpoint: string | object
}
