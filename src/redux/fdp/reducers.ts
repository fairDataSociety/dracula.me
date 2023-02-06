// eslint-disable-next-line import/no-unresolved
import { FdpStorage, FdpContracts } from '@fairdatasociety/fdp-storage'
import { Reducer } from 'redux'
import { Fdp, FdpActions } from './types'
const { Environments, getEnvironmentConfig } = FdpContracts

function getEnvironment() {
  const environment = process.env.REACT_APP_ENVIRONMENT

  if (environment === 'LOCALHOST') {
    return getEnvironmentConfig(Environments.LOCALHOST)
  } else if (environment === 'GOERLI') {
    return getEnvironmentConfig(Environments.GOERLI)
  }

  throw new Error('REACT_APP_ENVIRONMENT has invalid value')
}

function createFdpStorage(): FdpStorage {
  return new FdpStorage(process.env.REACT_APP_BEE_URL, process.env.REACT_APP_BATCH_ID as any, {
    ensOptions: {
      performChecks: true,
      ...getEnvironment()
    },
    ensDomain: 'fds'
  })
}

export const initialState: Fdp = {
  fdp: createFdpStorage()
}

export const FdpReducer: Reducer<Fdp, FdpActions> = (state: Fdp = initialState) => {
  return state
}
