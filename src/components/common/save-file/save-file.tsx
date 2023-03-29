import React, { useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import './save-file.scss'

export interface SaveFileProps {
  podName: string
  content: string
  onClose: () => void
  onSaved: () => void
}

export const SaveFile: React.FC<SaveFileProps> = ({ podName, content, onClose, onSaved }) => {
  const { file } = useApplicationState((state) => state.fdp.fdp)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const saveFile = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      try {
        await file.delete(podName, `/${fileName}`)
      } catch (error) {
        console.error(error)
      }

      await file.uploadData(podName, `/${fileName}`, content)

      onSaved()
    } catch (error) {
      setError(String(error))
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-3 d-flex flex-column'>
      <Button className='ml-auto mr-3 px-3' variant='primary' onClick={onClose} disabled={loading}>
        Close
      </Button>
      <Form onSubmit={saveFile} className='form'>
        <Form.Group controlId='fileName'>
          <Form.Label>File name</Form.Label>
          <Form.Control
            type='text'
            placeholder='File name'
            onChange={(event) => setFileName(event.currentTarget.value)}
          />
        </Form.Group>

        {error && <Alert variant='warning'>{error}</Alert>}

        <Button variant='primary' type='submit' disabled={!fileName}>
          Save
          {loading && <Spinner animation='border' style={{ marginLeft: '5px' }} variant='dark' size='sm' />}
        </Button>
      </Form>
    </div>
  )
}
