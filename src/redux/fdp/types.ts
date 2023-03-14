import { Action } from 'redux'
import { FdpStorage } from '@fairdatasociety/fdp-storage/dist'

export interface Fdp {
  fdp: FdpStorage
}

export enum FdpActionType {}

export interface FdpActions extends Action<FdpActionType> {
  type: FdpActionType
}
