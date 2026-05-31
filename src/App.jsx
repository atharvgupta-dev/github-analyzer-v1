import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import ProfileCard from './components/ProfileCard'
import RepoList from './components/RepoList'

function App() {
    const [profile, setProfile] = useState(null)
    const [repos, setRepos] = useState([])
    const [error, setError] = useState("")
    const [isDark, setIsDark] = useState(true)

    async function handleSearch(username) {
        if (!username) return
        try {
            let profileRes = await fetch(`https://api.github.com/users/${username}`)
            let profileData = await profileRes.json()

            if (profileData.message === "Not Found") {
                setError("User not found")
                setProfile(null)
                return
            }

            let reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`)
            let reposData = await reposRes.json()

            setProfile(profileData)
            setRepos(reposData)
            setError("")
        } catch(err) {
            setError("Something went wrong")
        }
    }

    return (
        <div className={isDark ? "dark" : "light"}>
            <h1>GitHub Profile Analyzer</h1>
            <hr></hr>
            <SearchBar onSearch={handleSearch} isDark={isDark} setIsDark={setIsDark} />
            {error && <p>{error}</p>}
            <hr></hr>
            {profile && <ProfileCard profile={profile} />}
            {profile && <RepoList repos={repos} />}
        </div>
    )
}

export default App