import { Person, Explore } from '@material-ui/icons'

/**
 * List of javascript navigation driven pages
 */
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

/**
 * List of javascript navigation driven containers in Home
 */
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
