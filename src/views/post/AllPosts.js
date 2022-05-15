import React, { useState, useEffect, useRef } from 'react'
import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CModalFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import axios from 'axios'

const AllPosts = () => {
  const [_posts, _setPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [visible, setVisible] = useState(false)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  const [postId, setPostId] = useState('')

  useEffect(() => {
    getPostData()
  }, [])

  const getPostData = () => {
    const url = `${process.env.REACT_APP_API_URL}/article/100/0`
    axios
      .get(url)
      .then((res) => {
        _setPosts(res.data)
        setPosts(res.data)
      })
      .catch((error) => {
        console.error('Error', error)
      })
  }

  function updateHandler(id) {
    setVisible(!visible)

    const post = posts.find((x) => x.id === id)

    setPostId(post.id)
    setTitle(post.title)
    setCategory(post.category)
    setContent(post.content)
    setStatus(post.status)
  }

  async function updateData() {
    const request = { title, category, content, status }
    const url = `${process.env.REACT_APP_API_URL}/article/${postId}`
    await axios
      .put(url, request)
      .then((res) => {
        addToast(successToast('Success', 'Update Post data'))
      })
      .catch((error) => {
        console.error('Error', error)
      })

    setVisible(!visible)

    getPostData()
  }

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const successToast = (title, body) => {
    return (
      <CToast
        animation={true}
        autohide={true}
        color="success"
        className="text-white align-items-center"
      >
        <CToastHeader closeButton>
          <strong className="me-auto">{title}</strong>
        </CToastHeader>
        <CToastBody>{body}</CToastBody>
      </CToast>
    )
  }

  const removeHandler = (id) => {
    removePost(id)
  }

  const removePost = async (id) => {
    const url = `${process.env.REACT_APP_API_URL}/article/${id}`
    await axios
      .delete(url)
      .then((res) => {
        addToast(successToast('Success', 'Remove Post data'))
      })
      .catch((error) => {
        console.error('Error', error)
      })

    getPostData()
  }

  const navHandler = (e) => {
    const nav = e.target.dataset.index

    switch (nav) {
      case '1':
        setPosts(_posts.filter((x) => x.status === 'Publish'))
        break
      case '2':
        setPosts(_posts.filter((x) => x.status === 'Draft'))
        break
      case '3':
        setPosts(_posts.filter((x) => x.status === 'Thrash'))
        break
    }

    let navList = document.querySelectorAll('.nav-tab')
    navList.forEach((el) => el.classList.remove('active'))
    e.target.classList.add('active')
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CNav variant="pills">
            <CNavItem>
              <CNavLink
                className="nav-tab"
                href="#publish"
                data-index="1"
                onClick={(e) => navHandler(e)}
              >
                Published
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="nav-tab"
                href="#draft"
                data-index="2"
                onClick={(e) => navHandler(e)}
              >
                Drafts
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="nav-tab"
                href="#thrash"
                data-index="3"
                onClick={(e) => navHandler(e)}
              >
                Thrash
              </CNavLink>
            </CNavItem>
          </CNav>
        </CCol>
        <CCol xs={12} className="mt-3">
          <CTable hover>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell className="col-1 text-center" scope="col">
                  No.
                </CTableHeaderCell>
                <CTableHeaderCell className="col-4" scope="col">
                  Title
                </CTableHeaderCell>
                <CTableHeaderCell className="col-5" scope="col">
                  Category
                </CTableHeaderCell>
                <CTableHeaderCell className="col-2 text-center" scope="col">
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {posts.length ? (
                posts.map((post, i) => (
                  <CTableRow key={post.id}>
                    <CTableDataCell className="text-center" scope="row">
                      {i + 1}
                    </CTableDataCell>
                    <CTableDataCell>{post.title}</CTableDataCell>
                    <CTableDataCell>{post.category}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="warning"
                        size="sm"
                        variant="outline"
                        onClick={() => updateHandler(post.id)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        variant="outline"
                        className="mx-1"
                        onClick={() => removeHandler(post.id)}
                      >
                        Remove
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell className="text-center" colSpan={4}>
                    No Data
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
      <CModal
        alignment="center"
        size="xl"
        backdrop="static"
        keyboard={false}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit Post</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div>
              <CFormLabel htmlFor="i_Title">Title</CFormLabel>
              <CFormInput
                type="text"
                id="i_Title"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
              />
            </div>
            <div className="mt-2">
              <CFormLabel htmlFor="i_Category">Category</CFormLabel>
              <CFormInput
                type="text"
                id="i_Category"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={category}
              />
            </div>
            <div className="mt-2">
              <CFormLabel htmlFor="i_Content">Content</CFormLabel>
              <CFormTextarea
                type="text"
                rows="4"
                id="i_Content"
                onChange={(e) => setContent(e.target.value)}
                defaultValue={content}
              />
            </div>
            <div className="mt-2">
              <CFormLabel htmlFor="i_Status">Status</CFormLabel>
              <CFormSelect
                id="i_Status"
                aria-label="Default select example"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={status}
              >
                <option disabled hidden={true} selected={true}>
                  Choose One
                </option>
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
                <option value="Thrash">Thrash</option>
              </CFormSelect>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={updateData}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

export default AllPosts
