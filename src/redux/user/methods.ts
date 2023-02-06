import { store } from '..'
import { SetUserAction, User, UserActionType } from './types'

export const setUser = (state: User): void => {
  const action: SetUserAction = {
    type: UserActionType.SET_USER,
    state: state
  }
  store.dispatch(action)
}
