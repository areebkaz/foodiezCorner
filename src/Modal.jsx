import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  minHeight:'600px',
  maxHeight: '90%', // Added maxHeight to make it scrollable
  width: '90%',
  overflow: 'auto', // Added to enable scrolling
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn btn-outline-danger mt-1 fs-6' style={{ marginLeft: '95%', zIndex:'1000' }} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
