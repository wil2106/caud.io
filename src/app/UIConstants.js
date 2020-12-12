import { MenuBook, Explore, Info } from '@material-ui/icons'

/**
 * List of javascript navigation driven pages
 */
export const pages = [
  {
    icon: Explore,
    title: 'Explore',
  },
  {
    icon: MenuBook,
    title: 'Doc',
  },
  {
    icon: Info,
    title: 'About',
  },
]

/**
 * List of javascript navigation driven containers in Home
 */
export const containers = [
  {
    name: 'Most recent',
    list: 'mostRecentIDs',
    apiRoute: 'mostRecent',
  },
  {
    name: 'Most liked',
    list: 'mostLikedIDs',
    apiRoute: 'mostLike',
  },
  {
    name: 'Most listened',
    list: 'mostListenedIDs',
    apiRoute: 'mostListen',
  },
  {
    name: 'Most forked',
    list: 'mostForkedIDs',
    apiRoute: 'mostFork',
  },
]
