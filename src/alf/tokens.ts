import {tokens} from '@puru.social/alfb'
export {tokens} from '@puru.social/alfb'

export const color = {
  temp_purple: tokens.labelerColor.purple,
  temp_purple_dark: tokens.labelerColor.purple_dark,
} as const

export const gradients = {
  primary: {
    values: [
      // primeira modificação puru.social [x]
      [0, '#A80000'],
      [0.4, '#D92020'],
      [0.6, '#D92020'],
      [1, '#FF5555'],
    ],
    hover_value: '#D92020',
  },
  sky: {
    // segunda modificação [x]
    values: [
      [0, '#C21818'],
      [1, '#FF5555'],
    ],
    hover_value: '#C21818',
  },
  midnight: {
    // terceira modificação [x]
    values: [
      [0, '#3D0000'],
      [1, '#7C3434'],
    ],
    hover_value: '#3D0000',
  },
  sunrise: {
    // quarta modificação [x]
    values: [
      [0, '#A83232'],
      [0.4, '#D95E5E'],
      [0.8, '#FF7F7F'],
      [1, '#FFC080'],
    ],
    hover_value: '#D95E5E',
  },
  sunset: {
    // quinta modificação [x]
    values: [
      [0, '#991A1A'],
      [0.6, '#E04E4E'],
      [1, '#FFB2B2'],
    ],
    hover_value: '#E04E4E',
  },
  summer: {
    // sexta modificação [x]
    values: [
      [0, '#E60000'],
      [0.3, '#FF4500'],
      [1, '#FFB380'],
    ],
    hover_value: '#FF4500',
  },
  nordic: {
    // setima modificação [x]
    values: [
      [0, '#4F0000'],
      [1, '#FFC2C2'],
    ],
    hover_value: '#993333',
  },
  bonfire: {
    // oitava modificação [x]
    values: [
      [0, '#330000'],
      [0.4, '#802A2A'],
      [0.8, '#CC5500'],
      [1, '#FF8C00'],
    ],
    hover_value: '#802A2A',
  },
} as const
