export interface IUser {
   id?: string;
   uid?: string | null;
   username: string | null;
   email?: string | null;
   displayName?: string | null;
   photoURL?: string | null;
   createAt?: Date | null;
   lastLoginAt?: Date | null;
   password?: string;
}
