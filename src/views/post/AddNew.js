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
import { cilList, cilTrash } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'

const AllPosts = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {}, [])

  function saveHandler(id) {
    saveData()
  }

  async function saveData() {
    const request = { title, category, content, status }
    const url = `${process.env.REACT_APP_API_URL}/article`
    await axios
      .post(url, request)
      .then((res) => {
        setTitle('')
        setCategory('')
        setContent('')
        setStatus('')
        addToast(successToast('Success', 'Save Post data'))
      })
      .catch((error) => {
        console.error('Error', error)
      })
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

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <h2>Create New</h2>
        </CCol>
        <CCol className="mt-3" xs={12}>
          <CForm>
            <div>
              <CFormLabel htmlFor="i_Title">Title</CFormLabel>
              <CFormInput
                type="text"
                id="i_Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="mt-2">
              <CFormLabel htmlFor="i_Category">Category</CFormLabel>
              <CFormInput
                type="text"
                id="i_Category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>
            <div className="mt-2">
              <CFormLabel htmlFor="i_Content">Content</CFormLabel>
              <CFormTextarea
                type="text"
                rows="4"
                id="i_Content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            </div>
            <div className="mt-2">
              <CFormLabel htmlFor="i_Status">Status</CFormLabel>
              <CFormSelect
                id="i_Status"
                aria-label="Default select example"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option disabled hidden={true} selected={true} value="">
                  Choose One
                </option>
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
              </CFormSelect>
            </div>
          </CForm>
        </CCol>
        <CCol className="mt-3" xs={12}>
          <CButton color="success" onClick={saveHandler}>
            Save
          </CButton>
        </CCol>
      </CRow>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

export default AllPosts
