import { FdpStorage } from '@fairdatasociety/fdp-storage/dist'
import React, { useState } from 'react'
import { Alert, Button, Form, ModalFooter } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { setUser } from '../../../redux/user/methods'
import { CommonModal } from '../../common/modals/common-modal'

export interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }: LoginModalProps) => {
  const { t } = useTranslation()
  const fdp: FdpStorage = useApplicationState((state) => state.fdp.fdp)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onLogin = async () => {
    try {
      setLoading(false)
      setError(null)

      await fdp.account.login(username, password)
      setUser({
        username,
        loggedin: true
      })

      onClose()
    } catch (error) {
      setError(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CommonModal show={open} onHide={onClose} titleI18nKey='login.signIn' closeButton={true} icon={'key'}>
      <div className='d-flex flex-column p-3 align-items-center'>
        <Form.Control
          type='text'
          className='mb-2 w-auto'
          placeholder={t('login.auth.username')}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <Form.Control
          type='password'
          className='mb-2 w-auto'
          placeholder={t('login.auth.password')}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </div>
      <ModalFooter>
        {error && <Alert variant={'warning'}>{error}</Alert>}
        <Button onClick={onLogin} disabled={username.length === 0 || password.length === 0 || loading}>
          {t('login.signIn')}
        </Button>
      </ModalFooter>
    </CommonModal>
  )
}
