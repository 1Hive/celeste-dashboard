import environment from './environment'

import { isLocalOrUnknownNetwork, getNetworkType } from './lib/web3-utils'
import { getNetworkConfig } from './networks'

const COURT_SERVER_NAME = environment('COURT_SERVER_NAME')

// BrightId endpoints
export const BRIGHT_ID_ENDPOINT_V5 = 'https://app.brightid.org/node/v5'
export const BRIGHTID_VERIFICATION_ENDPOINT = `${BRIGHT_ID_ENDPOINT_V5}/verifications`
export const BRIGHTID_1HIVE_INFO_ENDPOINT = `${BRIGHT_ID_ENDPOINT_V5}/apps/1hive`
export const BRIGHTID_SUBSCRIPTION_ENDPOINT = `${BRIGHT_ID_ENDPOINT_V5}/operations`

export const WALLET_CONNECT_BRIDGE_ENDPOINT =
  'https://walletconnect-relay.minerva.digital'

// Court server endpoint
export function courtServerEndpoint() {
  // TODO: Should we accpet a chainID as well?
  if (isLocalOrUnknownNetwork()) {
    return 'http://127.0.0.1:8050'
  }

  const networkType = getNetworkType()
  return `https://celeste-server${
    networkType === 'xdai' ? '' : `-${COURT_SERVER_NAME || networkType}`
  }.1hive.org`
}

export function defaultSubgraphEndpoint(chainId) {
  const { nodes } = getNetworkConfig(chainId)
  return nodes.subgraph
}

export function defaultEthNodeEndpoint(chainId) {
  return getNetworkConfig(chainId).nodes.defaultEth
}

export const defaultIpfsEndpoint = () => {
  return 'https://ipfs.io/ipfs/'
}
