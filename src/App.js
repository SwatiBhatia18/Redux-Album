import React, { useState } from "react"
import SearchBox from "./Components/SearchBox"
import Gallery from "./Components/Gallery"
import "./App.css"

function App() {
  const [query, setQuery] = useState("")

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Search</h1>
        <SearchBox onSearch={handleSearch} />
      </header>
      <main>
        <Gallery query={query} />
      </main>
    </div>
  )
}

export default App
