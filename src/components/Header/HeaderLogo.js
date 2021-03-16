import React from 'react'
import { GU, useTheme } from '@1hive/1hive-ui'

function HeaderLogo() {
  return (
    <div
      css={`
        margin-right: ${1 * GU}px;
        display: flex;
      `}
    >
      <Logo />
    </div>
  )
}

function Logo() {
  const theme = useTheme()

  return (
    <svg
      width={22 * GU}
      height="33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55.035 23.482c-4.971 0-8.239-2.588-8.239-7.309s3.269-7.309 8.239-7.309c3.11 0 5.447 1.044 6.81 3.155l1.111-.567c-1.498-2.293-4.154-3.7-7.899-3.7-5.947 0-9.465 3.315-9.465 8.421s3.519 8.421 9.42 8.421c3.79 0 6.446-1.407 7.944-3.7l-1.112-.567c-1.34 2.111-3.7 3.155-6.81 3.155zm13.09-.477v-6.424h11.621V15.47H68.124V9.32h13.55v-1.09h-14.73v15.89h14.96v-1.114h-13.78zm19.218 0V8.23h-1.18v15.888h13.732v-1.113l-12.552.001zm17.157 0v-6.424h11.621V15.47H104.5V9.32h13.55v-1.09h-14.731v15.89h14.958v-1.114H104.5zm25.417-7.604c-3.972-.363-7.286-.953-7.286-3.155 0-2.338 3.654-3.405 6.718-3.382 2.815.023 5.22.75 6.81 2.452l.93-.772c-1.657-1.68-4.335-2.792-7.785-2.792-4.086 0-7.899 1.611-7.899 4.517 0 2.996 3.995 3.86 8.103 4.244 4.563.432 7.218 1.044 7.218 3.246 0 2.157-2.429 3.723-6.809 3.723-3.382 0-6.265-.976-8.217-3.133l-.863.84c2.066 2.247 5.357 3.405 9.034 3.405 5.198 0 8.058-2.134 8.058-4.903 0-2.973-3.268-3.881-8.012-4.29zm26.052-7.172h-16.683v1.066h7.74v14.822h1.179V9.295h7.763l.001-1.066zm4.589 14.776v-6.424h11.621V15.47h-11.621V9.32h13.549v-1.09h-14.73v15.89h14.958v-1.114h-13.777z"
        fill={theme._appearance === 'light' ? '#432D89' : theme.content}
      />
      <path
        d="M17.232 20.15c10.684 0 16.33-2.797 16.77-3.025.014-.009.02-.023.025-.038.018-.3.03-.604.03-.91 0-.307-.012-.611-.03-.912-.002-.014-.008-.032-.026-.038-.44-.228-6.085-3.025-16.769-3.025-10.684 0-16.33 2.794-16.77 3.023-.014.008-.02.023-.025.037-.018.304-.03.605-.03.911 0 .307.012.61.03.911.003.015.008.032.026.038.44.228 6.085 3.028 16.769 3.028z"
        fill="url(#paint0_radial)"
      />
      <path
        d="M17.232 5.523c-6.725 0-11.448 1.108-14.135 1.985A15.46 15.46 0 00.74 13.006a.046.046 0 00.044.005c1.373-.636 6.892-2.871 16.448-2.871 9.556 0 15.074 2.235 16.448 2.871a.046.046 0 00.044-.005 15.483 15.483 0 00-2.358-5.498c-2.69-.877-7.41-1.985-14.134-1.985z"
        fill="url(#paint1_radial)"
      />
      <path
        d="M5.287 27.439c3.049 2.924 7.274 4.734 11.945 4.734s8.897-1.81 11.945-4.735c-2.788.703-6.77 1.357-11.945 1.357-5.174 0-9.157-.654-11.945-1.357z"
        fill="url(#paint2_radial)"
      />
      <path
        d="M5.287 4.907C8.336 1.983 12.561.173 17.232.173s8.897 1.81 11.945 4.734c-2.788-.703-6.77-1.356-11.945-1.356-5.174 0-9.157.653-11.945 1.356z"
        fill="url(#paint3_radial)"
      />
      <path
        d="M17.232 26.78c-6.725 0-11.448-1.109-14.135-1.985A15.46 15.46 0 01.74 19.297a.046.046 0 01.044-.006c1.373.636 6.892 2.872 16.448 2.872 9.556 0 15.074-2.236 16.448-2.872a.046.046 0 01.044.006 15.484 15.484 0 01-2.358 5.498c-2.69.88-7.41 1.984-14.134 1.984z"
        fill="url(#paint4_radial)"
      />
      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(11.066 -68.16 -40.998) scale(46.7109)"
        >
          <stop stopColor="#FEAE6F" />
          <stop offset=".316" stopColor="#FF9B73" />
          <stop offset=".631" stopColor="#D66F8D" />
          <stop offset=".855" stopColor="#8E54A5" />
          <stop offset=".991" stopColor="#6050B0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(9.144 -65.511 25.094) scale(42.7705 25.8655)"
        >
          <stop offset=".021" stopColor="#FEAE6F" />
          <stop offset=".497" stopColor="#D66F8D" />
          <stop offset=".795" stopColor="#8E54A5" />
          <stop offset=".984" stopColor="#7652AB" />
        </radialGradient>
        <radialGradient
          id="paint2_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11.217 19.833) scale(20.0101)"
        >
          <stop offset=".071" stopColor="#FF9B73" />
          <stop offset=".261" stopColor="#F4A575" />
          <stop offset=".368" stopColor="#EE977B" />
          <stop offset=".57" stopColor="#DF7389" />
          <stop offset=".607" stopColor="#DC6B8C" />
          <stop offset=".612" stopColor="#DA6B8D" />
          <stop offset=".731" stopColor="#B06099" />
          <stop offset=".839" stopColor="#9259A2" />
          <stop offset=".931" stopColor="#8055A7" />
          <stop offset=".996" stopColor="#7953A9" />
        </radialGradient>
        <radialGradient
          id="paint3_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(1.325 -473.523 273.367) scale(25.0248)"
        >
          <stop offset=".109" stopColor="#FEAE6F" />
          <stop offset=".391" stopColor="#FEAE6F" />
          <stop offset=".641" stopColor="#DF7389" />
          <stop offset=".907" stopColor="#B56398" />
          <stop offset=".996" stopColor="#7852AA" />
        </radialGradient>
        <radialGradient
          id="paint4_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(4.712 -242.873 -203.359) scale(52.8177)"
        >
          <stop offset=".071" stopColor="#FF9B73" />
          <stop offset=".39" stopColor="#F4A575" />
          <stop offset=".589" stopColor="#DF7389" />
          <stop offset=".645" stopColor="#DC6B8C" />
          <stop offset=".915" stopColor="#7953A9" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default HeaderLogo
