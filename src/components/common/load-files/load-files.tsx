import { FileItem } from '@fairdatasociety/fdp-storage/dist/content-items/file-item'
import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export interface LoadFilesProps {
  podName: string
  disabled?: boolean
  onLoaded: (files: FileItem[]) => void
}

export const LoadFiles: React.FC<LoadFilesProps> = ({ podName, disabled, onLoaded }) => {
  const { directory } = useApplicationState((state) => state.fdp.fdp)
  const [loading, setLoading] = useState<boolean>(false)

  const loadFiles = async () => {
    try {
      setLoading(true)
      const files = await directory.read(podName, '/')

      onLoaded(files.getFiles())

      console.log('Files load')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className='mx-3' size='sm' variant='primary' onClick={loadFiles} disabled={disabled || !podName || loading}>
      Load Files
      {loading && <Spinner animation='border' style={{ marginLeft: '5px' }} variant='dark' size='sm' />}
    </Button>
  )
}
