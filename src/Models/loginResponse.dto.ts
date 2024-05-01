import { IToken } from '@context/login.utils';
import { IUser } from './user.model';

export interface ILoginResponse {
   user: IUser;
   token: IToken;
}
