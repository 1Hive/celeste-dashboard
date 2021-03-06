import React, { useMemo } from 'react'
import { GU, textStyle, useTheme, Timer } from '@1hive/1hive-ui'

import DisputeOutcomeText from './DisputeOutcomeText'
import DisputeRoundPill from './DisputeRoundPill'
import Step from '../Step'
import Stepper from '../Stepper'
import { useAsset } from '../../hooks/useAsset'
import useDisputeTimeline from '../../hooks/useDisputeTimeline'

import {
  IconStars,
  IconComment,
  IconRound,
  IconRewards,
  IconRuling,
  IconAppeal,
  IconUsers,
  IconVoting,
} from '../../utils/dispute-icons'

import {
  Phase as DisputePhase,
  getPhaseStringForStatus,
} from '../../types/dispute-status-types'
import { dateFormat } from '../../utils/date-utils'
import Accordion from '../Accordion/Accordion'

const Timeline = React.memo(function Timeline({ timeline }) {
  const theme = useTheme()
  const lineColor = theme._appearance === 'light' ? '#FFC497' : '#3A3280;'

  return (
    <div>
      <Stepper lineColor={lineColor} lineTop={12}>
        {timeline.map((item, index) => {
          if (!Array.isArray(item)) {
            return <ItemStep key={index} item={item} index={index} />
          }

          return item.map((round, roundIndex) => {
            if (roundIndex === 0) {
              return round.map((roundItem, phaseIndex) => (
                <ItemStep
                  key={phaseIndex}
                  item={roundItem}
                  index={phaseIndex}
                />
              ))
            }

            return (
              <Step
                key={roundIndex}
                active={false}
                content={
                  <div
                    css={`
                      width: 100%;
                    `}
                  >
                    <Accordion
                      key={roundIndex}
                      items={[
                        [
                          <div
                            css={`
                              display: flex;
                              align-items: center;
                            `}
                          >
                            <img
                              alt={18}
                              src={IconRound}
                              css={`
                                margin-right: ${1 * GU}px;
                              `}
                            />
                            <DisputeRoundPill roundId={round[0].roundId} />
                          </div>,

                          <Stepper
                            lineColor={lineColor}
                            lineTop={12}
                            css={`
                              padding: ${3 * GU}px 0;
                            `}
                          >
                            {round.map((roundItem, phaseIndex) => (
                              <ItemStep
                                key={phaseIndex}
                                item={roundItem}
                                index={phaseIndex}
                                roundStepContainer
                              />
                            ))}
                          </Stepper>,
                        ],
                      ]}
                      round={false}
                      css={`
                        &::after {
                          height: 0px !important;
                          width: 0px !important;
                        }
                      `}
                    />
                  </div>
                }
                displayPoint={false}
              />
            )
          })
        })}
      </Stepper>
    </div>
  )
})

function ItemStep({ item, index, roundStepContainer }) {
  const theme = useTheme()

  return (
    <Step
      key={index}
      active={item.active}
      stepPoint={
        <div
          css={`
            border-radius: 80%;
            position: relative;
            z-index: 1;
            display: inline-flex;
          `}
        >
          <PhaseIcon phase={item.phase} active={item.active} />
        </div>
      }
      content={
        <div>
          <div>
            <div>
              <span css={textStyle('body1')}>
                {getPhaseStringForStatus(item.phase, item.active)}
              </span>
            </div>
            <div>
              <span
                css={`
                  color: ${theme.surfaceContentSecondary};
                  opacity: 0.6;
                `}
              >
                <DisplayTime item={item} />
              </span>
            </div>
            {item.active && <DisputeRoundPill roundId={item.roundId} />}
            {item.showOutcome && (
              <Outcome outcome={item.outcome} phase={item.phase} />
            )}
          </div>
        </div>
      }
      displayPoint
      css={`
        ${roundStepContainer ? 'margin-left: 0px;' : ''}
      `}
    />
  )
}

function Outcome({ outcome, phase }) {
  const theme = useTheme()
  const title =
    phase && phase === DisputePhase.RevealVote ? 'Keepers outcome' : 'Outcome'

  return (
    <div
      css={`
        position: relative;
      `}
    >
      <OutcomePoint />
      <div
        css={`
          margin-top: ${1 * GU}px;
        `}
      >
        <span
          css={`
            ${textStyle('body3')}
            color:${theme.surfaceContentSecondary};
            text-transform: uppercase;
          `}
        >
          {title}
        </span>
      </div>
      <DisputeOutcomeText outcome={outcome} phase={phase} />
    </div>
  )
}

function PhaseIcon({ phase, active }) {
  const Icon = useMemo(() => {
    if (phase === DisputePhase.Created || phase === DisputePhase.NotStarted) {
      return IconStars
    }
    if (phase === DisputePhase.Evidence) {
      return IconComment
    }
    if (phase === DisputePhase.JuryDrafting) {
      return IconUsers
    }
    if (
      phase === DisputePhase.VotingPeriod ||
      phase === DisputePhase.RevealVote
    ) {
      return IconVoting
    }
    if (
      phase === DisputePhase.AppealRuling ||
      phase === DisputePhase.ConfirmAppeal
    ) {
      return IconAppeal
    }
    if (phase === DisputePhase.ExecuteRuling) {
      return IconRuling
    }
    return IconRewards
  }, [phase])

  const iconSvg = useAsset(Icon[active ? 'active' : 'inactive'])

  return <img src={iconSvg} width={6 * GU} height={6 * GU} alt="" />
}

function DisplayTime({ item }) {
  const { endTime, active } = item
  if (active) {
    if (!endTime) {
      return 'ANY TIME'
    }
    return <Timer end={new Date(endTime)} maxUnits={3} />
  }
  return <>{dateFormat(endTime, 'onlyDate')}</>
}

function OutcomePoint() {
  const theme = useTheme()
  const darkMode = theme._appearance === 'dark'

  return (
    <div
      css={`
        position: absolute;
        top: 5px;
        left: -44px;
        width: 16px;
        height: 16px;
      `}
    >
      <div
        css={`
          width: 100%;
          height: 100%;
          background: ${darkMode
            ? '#3A3280'
            : 'linear-gradient(51deg, #FFF0D9 0%, #FFDFD1 88%)'};
          opacity: 0.3;
          border-radius: 50%;
        `}
      />
      <div
        css={`
          width: 6px;
          height: 6px;
          position: absolute;
          top: 5px;
          left: 4.75px;
          background: ${darkMode ? '#675AB0' : '#FFE1CB'};
          border-radius: 50%;
          z-index: 2;
        `}
      />
    </div>
  )
}

export default function DisputeTimeline({ dispute }) {
  const disputeTimeLine = useDisputeTimeline(dispute)
  return <Timeline timeline={disputeTimeLine} />
}
