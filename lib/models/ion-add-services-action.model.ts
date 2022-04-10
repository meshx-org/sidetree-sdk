import IonServiceModel from "./ion-service.model"

export default interface IonAddServicesActionModel {
    action: string
    services: IonServiceModel[]
}
