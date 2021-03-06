import {
  networkConfigs,
  getNetworkConfig,
  getInternalNetworkName,
  RINKEBY_COURT,
  RINKEBY_STAGING_COURT,
} from '../networks'

const PRECEDENCE_CAMPAIGN_DISPUTES = {
  xdai: new Map([[networkConfigs.xdai.court, new Map([])]]),
  rinkeby: new Map([
    [RINKEBY_COURT, new Map([])],
    [RINKEBY_STAGING_COURT, new Map([['0']])],
  ]),
  local: new Map([[networkConfigs.local.court, new Map([])]]),
}

export function getPrecedenceCampaignDisputesByCourt() {
  const courtAddress = getNetworkConfig().court

  return PRECEDENCE_CAMPAIGN_DISPUTES[getInternalNetworkName()].get(
    courtAddress
  )
}
