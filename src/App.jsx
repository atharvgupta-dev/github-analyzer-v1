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
                setRepos([])
                return
            }

            let reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`)
            let reposData = await reposRes.json()

            setProfile(profileData)
            setRepos(reposData)
            setError("")
        } catch(err) {
            setError("Something went wrong")
            setProfile(null)
            setRepos([])
        }
    }

    return (
        <div className={isDark ? "dark" : "light"}>
            {/* The container expands horizontally ONLY when a profile exists */}
            <div className={profile ? "container has-results" : "container"}>
                <h1>GitHub Profile Analyzer</h1>
                
                <SearchBar onSearch={handleSearch} isDark={isDark} setIsDark={setIsDark} />
                
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                
                {/* Horizontal grid container displays only when profile data exists */}
                {profile && (
                    <>
                        <hr />
                        <div className="results-wrapper">
                            <ProfileCard profile={profile} />
                            <RepoList repos={repos} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default App
