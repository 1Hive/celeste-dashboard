import React from 'react'
import { GU, SyncIndicator, textStyle, useTheme } from '@1hive/1hive-ui'
import { useWallet } from 'use-wallet'

import Accordion from '../Accordion/Accordion'
import ErrorLoadingEvidence from './ErrorLoadingEvidence'
import IdentityBadge from '../IdentityBadge'
import Markdown from '../Markdown'

import useEvidences from '../../hooks/useEvidences'
import { addressesEqual } from '../../lib/web3-utils'
import { dateFormat } from '../../utils/date-utils'

import folderIcon from '../../assets/IconFolder.svg'

const DisputeEvidences = React.memo(function DisputeEvidences({
  defendant,
  evidences,
  loading,
  plaintiff,
}) {
  return (
    <React.Fragment>
      <SyncIndicator visible={loading} label="Loading comments…" />
      {evidences &&
        evidences.map((evidence, index) => {
          const { createdAt, submitter, metadata, error } = evidence
          return (
            <Accordion
              key={index}
              items={[
                [
                  <div
                    css={`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <img src={folderIcon} width="20" height="20" alt="" />
                    <span
                      css={`
                        margin-left: ${1.5 * GU}px;
                      `}
                    >
                      Comment #{index + 1}
                    </span>
                  </div>,
                  <EvidenceContent
                    createdAt={createdAt}
                    error={error}
                    metadata={metadata}
                    submitter={submitter}
                    submitterLabel={getSubmitterLabel(
                      submitter,
                      defendant,
                      plaintiff
                    )}
                  />,
                ],
              ]}
              css={`
                margin-top: ${2 * GU}px;
              `}
            />
          )
        })}
    </React.Fragment>
  )
})

const EvidenceContent = React.memo(function EvidenceContent({
  createdAt,
  error,
  metadata,
  submitter,
  submitterLabel,
}) {
  const theme = useTheme()
  const wallet = useWallet()

  if (error) {
    return <ErrorLoadingEvidence />
  }
  return (
    <div
      css={`
        margin-bottom: ${2 * GU}px;
        padding: ${3 * GU}px ${8 * GU}px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 150px minmax(180px, auto);
          grid-gap: ${5 * GU}px;
          margin-bottom: ${5 * GU}px;
        `}
      >
        <div>
          <h2
            css={`
              ${textStyle('label2')};
              color: ${theme.surfaceContentSecondary};
              margin-bottom: ${2 * GU}px;
            `}
          >
            Submitted by
          </h2>
          <div
            css={`
              display: flex;
              align-items: flex-start;
            `}
          >
            <IdentityBadge
              connectedAccount={addressesEqual(submitter, wallet.account)}
              entity={submitter}
              label={submitterLabel}
            />
          </div>
        </div>
        <div>
          <h2
            css={`
              ${textStyle('label2')};
              color: ${theme.surfaceContentSecondary};
              margin-bottom: ${2 * GU}px;
            `}
          >
            Date
          </h2>
          <span
            css={`
              ${textStyle('body2')};
            `}
          >
            {dateFormat(createdAt, 'onlyDate')}
          </span>
        </div>
      </div>
      <div>
        <h2
          css={`
            ${textStyle('label2')};
            color: ${theme.surfaceContentSecondary};
            margin-bottom: ${2 * GU}px;
          `}
        >
          Data
        </h2>
        <div
          css={`
            display: flex;
            align-items: flex-start;
          `}
        >
          <Markdown text={metadata} />
        </div>
      </div>
    </div>
  )
})

function getSubmitterLabel(submitter, defendant, plaintiff) {
  if (addressesEqual(submitter, defendant)) {
    return 'Proposer'
  }

  if (addressesEqual(submitter, plaintiff)) {
    return 'Challenger'
  }

  return ''
}

export default function Evidences({ dispute, evidences }) {
  // This hook ensures us that evidenceProcessed won't be updated unless there are new evidences.
  const [evidenceProcessed, fetchingEvidences] = useEvidences(
    dispute,
    evidences
  )

  return (
    <DisputeEvidences
      defendant={dispute.defendant}
      evidences={evidenceProcessed}
      loading={fetchingEvidences}
      plaintiff={dispute.plaintiff}
    />
  )
}
