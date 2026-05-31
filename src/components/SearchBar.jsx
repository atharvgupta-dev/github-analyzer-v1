function SearchBar({ onSearch, isDark, setIsDark }) {
    return (
        <div>
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
            <br/>
            <button onClick={() => setIsDark(!isDark)}>
                {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
        </div>
    )
}

export default SearchBar