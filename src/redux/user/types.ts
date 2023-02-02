import { Action } from 'redux'

export interface User {
  username: string
  loggedin: boolean
}

export enum UserActionType {
  SET_USER = 'user/set'
}

export interface UserActions extends Action<UserActionType> {
  type: UserActionType
}

export interface SetUserAction extends UserActions {
  state: User
}
