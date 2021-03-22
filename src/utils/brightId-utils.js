import ethers from 'ethers'
import { soliditySha3 } from '../lib/web3-utils'
export const BRIGHT_ID_CONTEXT = '1hive'
export const BRIGHT_ID_CONTEXT_BYTES =
  '0x3168697665000000000000000000000000000000000000000000000000000000' // stringToBytes32("1hive")

export const NO_CONTENT = 204
export const NOT_SPONSORED_CODE = 403
export const NOT_FOUND_CODE = 404
export const ERROR_CODE = 500

export const CONTEXT_NOT_FOUND = 1
export const CONTEXTID_NOT_FOUND = 2
export const CAN_NOT_BE_VERIFIED = 3
export const NOT_SPONSORED = 4
