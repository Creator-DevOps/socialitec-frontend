export interface Users {
    id:string;
    name: string;
    role?: 'user';
    email:string;
  }
const users: Users[] = [
    {
        id:'1',
        name: 'Bustamante Servin Carlos Eduardo rivera hernandez',
        role: 'user',
        email:'bustamanteservincarloseduardo@yopmail.com',
    }
];
export default users;  