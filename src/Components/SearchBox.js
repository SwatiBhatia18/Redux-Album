import React, { useState, useEffect, useCallback, useRef } from "react"
import debounce from "lodash.debounce"
import "./SearchBox.css"

const SearchBox = ({ onSearch }) => {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchBoxRef = useRef(null)

  useEffect(() => {
    const savedSuggestions =
      JSON.parse(localStorage.getItem("searchSuggestions")) || []
    setSuggestions(savedSuggestions)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm)
      if (searchTerm && !suggestions.includes(searchTerm)) {
        const newSuggestions = [searchTerm, ...suggestions].slice(0, 5)
        setSuggestions(newSuggestions)
        localStorage.setItem(
          "searchSuggestions",
          JSON.stringify(newSuggestions)
        )
      }
    }, 300),
    [suggestions, onSearch]
  )

  const handleChange = (e) => {
    const value = e.target.value
    setInput(value)
    setShowSuggestions(value.length > 0)
    debouncedSearch(value)
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    setShowSuggestions(false)
    onSearch(suggestion)
  }

  return (
    <div className="search-box" ref={searchBoxRef}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search for images..."
        className="search-input"
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions
            .filter((suggestion) =>
              suggestion.toLowerCase().includes(input.toLowerCase())
            )
            .map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
