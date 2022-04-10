import Service from "../service"

export default interface AddServicesAction {
    action: string
    services: Service[]
}
