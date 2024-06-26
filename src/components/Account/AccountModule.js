import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, GU, IconConnect } from '@1hive/1hive-ui'
import { useWallet } from '../../providers/Wallet'

import AccountButton from './AccountButton'
import AccountPopover from './AccountPopover'
import ScreenConnected from './ScreenConnected'
import ScreenConnecting from './ScreenConnecting'
import ScreenError from './ScreenError'
import ScreenPromptingAction from './ScreenPromptingAction'
import ScreenProviders from './ScreenProviders'

const SCREENS = [
  {
    id: 'providers',
  },
  {
    id: 'connecting',
  },
  {
    id: 'networks',
  },
  {
    id: 'connected',
  },
  {
    id: 'error',
  },
]

function AccountModule({ compact }) {
  const buttonRef = useRef()

  const {
    account,
    activating,
    connect,
    connector,
    error,
    resetConnection,
    switchingNetworks,
  } = useWallet()
  const [opened, setOpened] = useState(false)
  const [activatingDelayed, setActivatingDelayed] = useState(false)

  const toggle = useCallback(() => setOpened(opened => !opened), [])

  const activate = useCallback(
    async providerId => {
      try {
        await connect(providerId)
      } catch (error) {
        console.log('error ', error)
      }
    },
    [connect]
  )

  // Always show the “connecting…” screen, even if there are no delay
  useEffect(() => {
    if (error) {
      setActivatingDelayed(null)
    }

    if (activating) {
      setActivatingDelayed(activating)
      return
    }

    const timer = setTimeout(() => {
      setActivatingDelayed(null)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [activating, error])

  const previousScreenIndex = useRef(-1)

  const { direction, screenIndex } = useMemo(() => {
    const screenId = (() => {
      if (error) return 'error'
      if (activatingDelayed) return 'connecting'
      if (switchingNetworks) return 'networks'
      if (account) return 'connected'
      return 'providers'
    })()

    const screenIndex = SCREENS.findIndex(screen => screen.id === screenId)
    const direction = previousScreenIndex.current > screenIndex ? -1 : 1

    previousScreenIndex.current = screenIndex

    return { direction, screenIndex }
  }, [activatingDelayed, account, error, switchingNetworks])

  const screen = SCREENS[screenIndex]
  const screenId = screen.id

  const handlePopoverClose = useCallback(
    reject => {
      if (screenId === 'connecting' || screenId === 'error') {
        // reject closing the popover
        return false
      }
      setOpened(false)
    },
    [screenId]
  )

  return (
    <div
      ref={buttonRef}
      tabIndex="0"
      css={`
        display: flex;
        align-items: center;
        justify-content: space-around;
        outline: 0;
      `}
    >
      {screenId === 'connected' ? (
        <AccountButton onClick={toggle} />
      ) : (
        <Button
          icon={<IconConnect />}
          label="Enable account"
          onClick={toggle}
          display={compact ? 'icon' : 'all'}
        />
      )}
      <AccountPopover
        direction={direction}
        onClose={handlePopoverClose}
        opener={buttonRef.current}
        screenId={screenId}
        screenData={{
          account,
          activating: activatingDelayed,
          activationError: error,
          status,
          screenId,
        }}
        screenKey={({ account, activating, activationError, screenId }) =>
          (activationError ? activationError.name : '') +
          account +
          activating +
          screenId
        }
        visible={opened}
        width={(screen.id === 'connected' ? 41 : 51) * GU}
      >
        {({ activating, activationError, screenId }) => {
          if (screenId === 'connecting') {
            return (
              <ScreenConnecting
                providerId={connector}
                onCancel={resetConnection}
              />
            )
          }
          if (screenId === 'connected') {
            return (
              <ScreenConnected
                providerId={connector}
                onClosePopover={handlePopoverClose}
              />
            )
          }
          if (screenId === 'error') {
            return (
              <ScreenError error={activationError} onBack={resetConnection} />
            )
          }
          if (screen.id === 'networks') {
            return <ScreenPromptingAction />
          }
          return <ScreenProviders onActivate={activate} />
        }}
      </AccountPopover>
    </div>
  )
}

export default AccountModule
