import Modal from 'react-modal';
import { FaXmark } from 'react-icons/fa6';

import PropTypes from 'prop-types';

const customModalStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '400px',
    height: '225px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
};

MyModal.propType = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  button: PropTypes.array,
  children: PropTypes.element,
};

export default function MyModal({ isOpen, setOpen, title, buttons, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      <button className="absolute top-6 right-6" onClick={() => setOpen(false)}>
        <FaXmark />
      </button>

      <div className="text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex justify-center items-center h-28">
        <div>{children}</div>
      </div>

      <div className="absolute left-0 bottom-6 w-full flex justify-center">
        {buttons.map((button, index) => (
          <div key={index} className="mx-1.5">
            {button}
          </div>
        ))}
      </div>
    </Modal>
  );
}
