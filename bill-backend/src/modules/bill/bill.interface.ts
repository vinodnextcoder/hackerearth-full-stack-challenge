
import { BillDocument } from './schemas/bill.schema';
import { IRoleDocument } from '../role/role.interface';

export interface IBillDocument extends Omit<BillDocument, 'role'> {
    role: IRoleDocument;
}

export interface IUserCheckExist {
    email: boolean;
    mobileNumber: boolean;
}