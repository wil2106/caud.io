import { Person, Explore } from '@material-ui/icons'

export const pages = [
  {
    icon: Explore,
    title: 'Explore',
  },
  {
    icon: Person,
    title: 'Profile',
  },
]

export const containers = [
  {
    name: 'Most recent',
    list: 'mostRecentIDs',
  },
  {
    name: 'Most liked',
    list: 'mostLikedIDs',
  },
  {
    name: 'Most listened',
    list: 'mostListenedIDs',
  },
  {
    name: 'Most forked',
    list: 'mostForkedIDs',
  },
]
