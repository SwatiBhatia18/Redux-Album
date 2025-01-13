const API_KEY = "6b38ea75acc26996180a238979867806"

export const getTrendingImages = async (page) => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&safe_search=1&page=${page}&format=json&nojsoncallback=1`
  return fetchImages(url)
}

export const getSearchedImages = async (query, page) => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${encodeURIComponent(
    query
  )}&page=${page}&format=json&nojsoncallback=1`
  return fetchImages(url)
}

const fetchImages = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching images:", error)
    return null
  }
}
