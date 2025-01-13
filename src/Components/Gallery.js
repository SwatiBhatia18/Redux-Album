import React, { useState, useEffect } from "react"
import { getSearchedImages, getTrendingImages } from "../api/api"
import ImageModal from "./ImageModal"
import "./Gallery.css"

const Gallery = ({ query }) => {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    setImages([])
    setPage(1)
    fetchImages(query, 1)
  }, [query])

  const fetchImages = async (searchQuery, pageNum) => {
    setLoading(true)
    try {
      const data = searchQuery
        ? await getSearchedImages(searchQuery, pageNum)
        : await getTrendingImages(pageNum)

      if (data && data.photos && data.photos.photo) {
        setImages((prevImages) =>
          pageNum === 1
            ? data.photos.photo
            : [...prevImages, ...data.photos.photo]
        )
        setPage(pageNum + 1)
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    }
    setLoading(false)
  }

  const loadMore = () => {
    fetchImages(query, page)
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="gallery">
      <div className="image-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-item"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
              alt={image.title}
            />
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && images.length > 0 && (
        <button onClick={loadMore} className="load-more">
          Load More
        </button>
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  )
}

export default Gallery
