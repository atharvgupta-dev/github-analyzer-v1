function SearchBar({ onSearch }) {
    return (
        <div className="SearchBar">
            <input
                type="text"
                id="usernameInput"
                placeholder="Enter GitHub username"
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                         let username = document.getElementById("usernameInput").value
                         onSearch(username)
                    }
                }}
            />
            <button onClick={() => {
                let username = document.getElementById("usernameInput").value
                onSearch(username)
            }}>
                Search
            </button>
        </div>
    )
}

export default SearchBar