export type UserType = {
    login?: string,
    email: string,
    name: string
};

export type UserData = {
    user: UserType | null,
    isAuthChecked: boolean,
    isError: boolean,
    loaderActive: boolean
};

export type ChangeUserType = {
    name: string,
    email: string,
    password: string
};

export type RequestLoginType = {
    email: string,
    password: string
};
