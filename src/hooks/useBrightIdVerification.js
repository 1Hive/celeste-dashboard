import { useEffect, useState } from 'react'
import { BRIGHTID_VERIFICATION_ENDPOINT } from '../endpoints'
import {
  BRIGHT_ID_CONTEXT,
  CAN_NOT_BE_VERIFIED,
  ERROR_CODE,
  NOT_FOUND_CODE,
  NOT_SPONSORED_CODE,
} from '../utils/brightId-utils'

const VERIFICATION_POLLING_EVERY = 3000
const REQUEST_TIMEOUT = 60000

const VERIFICATION_INFO_DEFAULT = {
  addressExist: false,
  addressUnique: false,
  signature: null,
  timestamp: 0,
  userAddresses: [],
  userSponsored: false,
  userVerified: false,
  error: null,
  fetching: true,
}

export function useBrightIdVerification(account) {
  const [verificationInfo, setVerificationInfo] = useState(
    VERIFICATION_INFO_DEFAULT
  )

  useEffect(() => {
    let cancelled = false
    let retryTimer

    if (!account) {
      return setVerificationInfo(info => ({ ...info, fetching: false }))
    }

    const fetchVerificationInfo = async () => {
      const endpoint = `${BRIGHTID_VERIFICATION_ENDPOINT}/${BRIGHT_ID_CONTEXT}/${account}?signed=eth&timestamp=seconds`
      try {
        const rawResponse = await fetch(endpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: REQUEST_TIMEOUT,
        })

        const response = await rawResponse.json()

        if (!cancelled) {
          switch (response.code) {
            case ERROR_CODE:
              setVerificationInfo({
                error: response.errorMessage,
                fetching: false,
              })
              break

            case NOT_FOUND_CODE:
              // If the users didn't link their address to the their BrightId account or cannot be verified for the context (meaning is unverified on the BrightId app)
              setVerificationInfo({
                addressExist: response.errorNum === CAN_NOT_BE_VERIFIED,
                addressUnique: false,
                timestamp: 0,
                userAddresses: [],
                userSponsored: response.errorNum === CAN_NOT_BE_VERIFIED,
                userVerified: false,
                fetching: false,
              })
              break

            case NOT_SPONSORED_CODE:
              setVerificationInfo({
                addressExist: true,
                addressUnique: false,
                timestamp: 0,
                userAddresses: [],
                userSponsored: false,
                userVerified: false,
                fetching: false,
              })
              break

            default:
              setVerificationInfo({
                addressExist: true,
                addressUnique: response.data?.unique,
                signature: { ...response.data?.sig },
                timestamp: response.data?.timestamp,
                userAddresses: response.data?.contextIds,
                userSponsored: true,
                userVerified: true,
                fetching: false,
              })
              break
          }
        }
      } catch (err) {
        console.error(`Could not fetch verification info `, err)
      }

      if (!cancelled) {
        retryTimer = setTimeout(
          fetchVerificationInfo,
          VERIFICATION_POLLING_EVERY
        )
      }
    }

    fetchVerificationInfo()

    return () => {
      cancelled = true
      clearTimeout(retryTimer)
    }
  }, [account])

  return verificationInfo
}
