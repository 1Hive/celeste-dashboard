import React, { useCallback } from 'react'
import { getProviderFromUseWalletId } from 'use-wallet'
import {
  Button,
  ButtonBase,
  GU,
  IconCheck,
  IconCopy,
  RADIUS,
  textStyle,
  useTheme,
} from '@1hive/1hive-ui'
import IdentityBadge from '../IdentityBadge'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { useWallet } from '../../providers/Wallet'
import { getNetworkName } from '../../lib/web3-utils'

function AccountScreenConnected({ providerId }) {
  const theme = useTheme()
  const copy = useCopyToClipboard()
  const { account, chainId, resetConnection } = useWallet()

  const networkName = getNetworkName(chainId)
  const providerInfo = getProviderFromUseWalletId(providerId)

  const handleCopyAddress = useCallback(() => copy(account), [account, copy])

  const handleDeactivate = useCallback(() => {
    resetConnection()
  }, [resetConnection])

  return (
    <div
      css={`
        padding: ${2 * GU}px;
      `}
    >
      <div
        css={`
          padding-top: ${2 * GU}px;
        `}
      >
        <h4
          css={`
            ${textStyle('label2')};
            color: ${theme.contentSecondary};
            margin-bottom: ${2 * GU}px;
          `}
        >
          Active Wallet
        </h4>
        <div
          css={`
            display: flex;
            align-items: center;
            width: 100%;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              margin-right: ${3 * GU}px;
            `}
          >
            <img
              src={providerInfo.image}
              alt=""
              css={`
                width: ${2.5 * GU}px;
                height: ${2.5 * GU}px;
                margin-right: ${0.5 * GU}px;
                transform: translateY(-2px);
              `}
            />
            <span>
              {providerInfo.id === 'unknown' ? 'Wallet' : providerInfo.name}
            </span>
          </div>
          <div
            css={`
              display: flex;
              align-items: center;
              justify-content: flex-end;
              width: 100%;
            `}
          >
            <ButtonBase
              onClick={handleCopyAddress}
              focusRingRadius={RADIUS}
              css={`
                display: flex;
                align-items: center;
                justify-self: flex-end;
                padding: ${0.5 * GU}px;
                &:active {
                  background: ${theme.surfacePressed};
                }
              `}
            >
              <IdentityBadge
                entity={account}
                compact
                badgeOnly
                css="cursor: pointer"
              />
              <IconCopy
                css={`
                  color: ${theme.hint};
                `}
              />
            </ButtonBase>
          </div>
        </div>
        <div
          css={`
            padding: ${2 * GU}px 0;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              color: ${theme.positive};
              ${textStyle('label2')};
            `}
          >
            <IconCheck size="small" />
            <span
              css={`
                margin-left: ${0.5 * GU}px;
              `}
            >
              {`Connected to ${networkName} Network`}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleDeactivate}
        wide
        css={`
          margin-top: ${2 * GU}px;
        `}
      >
        Disconnect wallet
      </Button>
    </div>
  )
}

export default AccountScreenConnected
