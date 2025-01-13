import React from "react"
import "./ImageModal.css"

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`}
          alt={image.title}
        />
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  )
}

export default ImageModal
