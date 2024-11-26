export type AuthenticationParams = {
  email: string
  password: string
}

export type AuthenticationModel = {
  accessToken: string
  name: string
}
export interface IAuthentication {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationModel | null>
}
