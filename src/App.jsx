import { useState, useEffect } from "react"
import "./App.css"

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const debouncedQuery = useDebounce(searchQuery, 500)

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      setUsers(data)
      setLoading(false) 
    })
}, [])


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Search Users</h1>
      <input
        type="text"
        placeholder="Search by name.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <p className="count">{filteredUsers.length} users found</p>

          {filteredUsers.length === 0 ? (
            <p className="no-result">No user found</p>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="user-card">
                <h3>👤 {user.name}</h3>
                <p>✉️ {user.email}</p>
                <p>🏢 {user.company.name}</p>
                <p>📍 {user.address.city}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default App
