import React, { useCallback } from 'react'
import { Button, GU, Info, Link } from '@1hive/1hive-ui'

import { useCourtConfig } from '../../../providers/CourtConfig'
import { useWallet } from '../../../providers/Wallet'

function DisputeAppeal({ onRequestAppeal, confirm }) {
  const wallet = useWallet()

  const actionLabel = confirm ? 'Confirm appeal' : 'Appeal Ruling'

  const { feeToken } = useCourtConfig()

  const handleRequestAppeal = useCallback(() => {
    onRequestAppeal(confirm)
  }, [confirm, onRequestAppeal])

  return (
    <div>
      <Button
        wide
        mode="strong"
        onClick={handleRequestAppeal}
        css={`
          margin-bottom: ${1.5 * GU}px;
        `}
        disabled={!wallet.account}
      >
        {actionLabel}
      </Button>
      <Info>
        <strong>Anyone</strong> can{' '}
        <strong>
          lock {feeToken.symbol} as collateral to{' '}
          {confirm ? 'confirm an appeal' : 'initiate an appeal'}{' '}
        </strong>
        if they believe the{' '}
        {confirm ? 'ruling appealed for' : 'current outcome'} is incorrect. When
        the final ruling is confirmed, the user who{' '}
        {confirm ? 'confirmed the appeal' : 'appealed'} gets rewarded if the
        ruling has switched in their favor. If not, their entire collateral
        could be re-distributed to the winning party. {confirm ? 'When' : 'If'}{' '}
        an appeal is confirmed, a new adjudication round is initiated and new
        keepers are drafted.{' '}
        <Link href="https://1hive.gitbook.io/celeste/keepers/dispute-lifecycle">
          Learn more
        </Link>
        .
      </Info>
    </div>
  )
}

export default DisputeAppeal
