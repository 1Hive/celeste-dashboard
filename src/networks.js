import environment from './environment'
import { getPreferredChain } from './local-settings'
import {
  getNetworkName,
  getNetworkType,
  isLocalOrUnknownNetwork,
} from './lib/web3-utils'

const SUBGRAPH_NAME = environment('SUBGRAPH_NAME')

export const RINKEBY_COURT = '0x35e7433141D5f7f2EB7081186f5284dCDD2ccacE'
export const RINKEBY_STAGING_COURT =
  '0x52180Af656A1923024D1ACcF1D827AB85cE48878'

export const SUPPORTED_CHAINS = [100, 137]
const XDAI_ETH_NODE = environment('XDAI_ETH_NODE')
const POLYGON_ETH_NODE = environment('POLYGON_ETH_NODE')

// TODO: Add type and name
export const networkConfigs = {
  xdai: {
    court: '0x44E4fCFed14E1285c9e0F6eae77D5fDd0F196f85',
    explorer: 'blockscout',
    name: 'xDai',
    type: 'xdai',
    chainId: 100,
    defaultEth: XDAI_ETH_NODE,
    nodes: {
      subgraph: 'https://api.thegraph.com/subgraphs/name/1hive/celeste',
    },
    eip3085: {
      chainId: '0x64',
      chainName: 'xDai',
      rpcUrls: ['https://rpc.xdaichain.com/'],
      iconUrls: [
        'https://gblobscdn.gitbook.com/spaces%2F-Lpi9AHj62wscNlQjI-l%2Favatar.png',
      ],
      nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
      blockExplorerUrls: ['https://blockscout.com/poa/xdai/'],
    },
    ipfs_endpoint: 'https://ipfs.io/ipfs/',
  },
  rinkeby: {
    court: getRinkebyCourtAddress(SUBGRAPH_NAME),
    explorer: 'etherscan',
    name: 'Rinkeby',
    nodes: {
      subgraph: getRinkebySubgraphUrls(SUBGRAPH_NAME),
    },
    ipfs_endpoint: 'https://ipfs.io/ipfs/',
  },
  polygon: {
    court: '0x0ED8867EDaBD4d0b5045E45a39077D97a6B78cbE',
    explorer: 'polygonscan',
    name: 'Polygon',
    type: 'matic',
    chainId: 137,
    defaultEth: POLYGON_ETH_NODE,
    nodes: {
      subgraph: 'https://api.thegraph.com/subgraphs/name/1hive/celeste-matic',
    },
    ipfs_endpoint: 'https://ipfs.io/ipfs/',
  },
  local: {
    court: '0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb',
    defaultEth: 'http://localhost:8545',
    nodes: {
      subgraph: 'http://127.0.0.1:8000/subgraphs/name/1hive/celeste-rpc',
    },
    ipfs_endpoint: 'http://127.0.0.1:8080/ipfs',
  },
}

export function getInternalNetworkName(chainId = getPreferredChain()) {
  return isLocalOrUnknownNetwork(chainId) ? 'local' : getNetworkType(chainId)
}

export function getNetworkConfig(chainId = getPreferredChain()) {
  return networkConfigs[getInternalNetworkName(chainId)]
}

function getRinkebyCourtAddress(subgraphName) {
  if (subgraphName === 'staging') {
    return RINKEBY_STAGING_COURT
  }
  return RINKEBY_COURT
}

function getRinkebySubgraphUrls(subgraphName) {
  return `https://api.thegraph.com/subgraphs/name/1hive/celeste-${subgraphName ||
    'rinkeby'}`
}

export const addEthereumChain = () => {
  const { eip3085 } = getNetworkConfig()
  if (!eip3085) {
    return Promise.resolve(null) // Network is not custom
  }
  return window?.ethereum?.request({
    method: 'wallet_addEthereumChain',
    params: [eip3085],
  })
}

export const switchNetwork = async chainId => {
  const chainIdHex = `0x${chainId.toString(16)}`
  try {
    await window?.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    })
  } catch (switchError) {
    // This error code indicates that the chain has not been added to Injected provider.
    if (switchError.code === 4902) {
      await addEthereumChain()
    }
    console.error(switchError)
  }
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAINS.includes(chainId)
}

export function getSupportedChainsNamesFormatted() {
  let networkNames = ''
  SUPPORTED_CHAINS.forEach((chain, i, array) => {
    networkNames += getNetworkName(chain)
    if (i !== array.length - 1) {
      networkNames += ', '
    }
  })
  return networkNames
}

export function getEthersNetwork() {
  const { type, chainId, ensRegistry } = getNetworkConfig()

  return {
    name: type,
    chainId: chainId,
    ensAddress: ensRegistry,
  }
}
