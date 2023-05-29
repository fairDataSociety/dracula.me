// eslint-disable-next-line import/no-unresolved
import { FdpStorage, FdpContracts } from '@fairdatasociety/fdp-storage'
import { Reducer } from 'redux'
import { Fdp, FdpActions } from './types'
const { Environments, getEnsEnvironmentConfig } = FdpContracts

function getEnvironment() {
  const environment = process.env.REACT_APP_ENVIRONMENT

  if (environment === 'LOCALHOST') {
    return getEnsEnvironmentConfig(Environments.LOCALHOST)
  } else if (environment === 'SEPOLIA') {
    return getEnsEnvironmentConfig(Environments.SEPOLIA)
  }

  throw new Error(`REACT_APP_ENVIRONMENT has invalid value ${environment}`)
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
