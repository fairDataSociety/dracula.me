import { Pod } from '@fairdatasociety/fdp-storage/dist/pod/types'
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownButton, Spinner } from 'react-bootstrap'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export interface ListPodsProps {
  selectedPod: string
  disabled?: boolean
  onSelect: (pod: Pod) => void
}

export const ListPods: React.FC<ListPodsProps> = ({ selectedPod, disabled, onSelect }) => {
  const { personalStorage } = useApplicationState((state) => state.fdp.fdp)
  const [pods, setPods] = useState<Pod[] | null>(null)

  const loadPods = async () => {
    try {
      const pods = await personalStorage.list()

      setPods(pods.pods)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadPods()
  }, [])

  return (
    <DropdownButton title={selectedPod || 'Select pod'} size='sm' disabled={disabled}>
      {pods === null ? (
        <Spinner animation='border' variant='dark' />
      ) : (
        pods.map((pod) => (
          <Dropdown.Item as='button' key={pod.index} onClick={() => onSelect(pod)}>
            {pod.name}
          </Dropdown.Item>
        ))
      )}
    </DropdownButton>
  )
}
