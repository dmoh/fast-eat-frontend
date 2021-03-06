import { User } from "./user";

export class Deliverer extends User {
    deliveryName: string;
    workingTime: Date;
    workingTimeTwo: Date;
    phone: string;
    siret: string;
    ca?: string;
    nbDeliveries?: number;
    deliverer_email?: string;
}
