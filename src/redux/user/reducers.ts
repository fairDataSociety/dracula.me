import { Reducer } from 'redux'
import { SetUserAction, User, UserActions, UserActionType } from './types'

export const initialState: User = {
  username: '',
  loggedin: false
}

export const UserReducer: Reducer<User, UserActions> = (state: User = initialState, action: UserActions) => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return (action as SetUserAction).state
    default:
      return state
  }
}
