import { FileItem } from '@fairdatasociety/fdp-storage/dist'
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import './file-list.scss'

export interface FileListProps {
  podName: string
  files: FileItem[]
  onClose: () => void
  onSelect: (content: string) => void
}

export const FileList: React.FC<FileListProps> = ({ podName, files, onClose, onSelect }) => {
  const { file: fdpFile } = useApplicationState((state) => state.fdp.fdp)
  const [loading, setLoading] = useState<boolean>(false)

  const loadFile = async (file: FileItem) => {
    try {
      setLoading(true)
      const content = await fdpFile.downloadData(podName, `/${file.name}`)

      const text = await new Blob([content]).text()

      onSelect(text)
    } catch (error) {
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
      <div className='file-list'>
        {files.map((file) => (
          <Card key={file.name} onClick={() => loadFile(file)} className='file-card'>
            <Card.Header as='h5'>{file.name}</Card.Header>
            <Card.Body>
              <Card.Title>Size: {file.size} bytes</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}
