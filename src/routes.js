import React from 'react'

// Post
const AllPosts = React.lazy(() => import('./views/post/AllPosts'))
const AddNew = React.lazy(() => import('./views/post/AddNew'))
const Preview = React.lazy(() => import('./views/post/Preview'))

const routes = [
  { path: '/posts/list', name: 'Post', element: AllPosts, exact: true },
  { path: '/posts/create', name: 'Add New', element: AddNew },
  { path: '/posts/preview', name: 'Preview', element: Preview },
]

export default routes
