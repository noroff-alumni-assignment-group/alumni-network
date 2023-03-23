type User = {
   email?:string;
   username?: string;
   firstName?:string;
   lastName?:string;
   topics?:Array<string>;
   groups?:Array<string>;
   
};

export default User;