import React from 'react'
import CIcon from '@coreui/icons-react'

import { CNavGroup, CNavItem } from '@coreui/react'
import { cilStar } from '@coreui/icons'

const _nav = [
  {
    component: CNavGroup,
    name: 'Posts',
    to: '/posts',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Posts',
        to: '/posts/list',
      },
      {
        component: CNavItem,
        name: 'Add New',
        to: '/posts/create',
      },
      {
        component: CNavItem,
        name: 'Preview',
        to: '/posts/preview',
      },
    ],
  },
]

export default _nav
