import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

interface Props {
  title?: string
  visible: boolean
  onClose: () => void
  confirm: () => void
  children?: React.ReactNode
}
const CustomModal = ({ title, visible, onClose, children, confirm }: Props) => {
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={confirm} colorScheme='blue'>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
