export class REGEX {
  public static readonly PASSWORD = RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/,
  );
}

export enum MONGODB {
  URI = 'MONGO_DB_URI',
  DB_NAME = 'MONGO_DB_NAME',
}

export enum JWT {
  SECRET = 'JWT_SECRET',
}

export enum DECORATOR_KEY {
  IS_PUBLIC = 'IS_PUBLIC',
}
