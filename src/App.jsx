import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import ProfileCard from './components/ProfileCard'
import RepoList from './components/RepoList'
import PieChart from './components/PieChart'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333', '#2F80ED', '#9C27B0', '#FF6347', '#20B2AA', '#FFD700'];

function App() {
    const [profile, setProfile] = useState(null)
    const [repos, setRepos] = useState([])
    const [languages, setLanguages] = useState([])
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
            setLanguages([])
            setError("")

            let langCount = {}
            reposData.forEach(repo => {
                if (repo.language) {
                    langCount[repo.language] = (langCount[repo.language] || 0) + 1
                }
            })
            let langData = Object.keys(langCount).map(lang => ({
                language: lang,
                value: langCount[lang],
                color: COLORS[Object.keys(langCount).indexOf(lang)]
            }))
            setLanguages(langData)
            setProfile(prev => ({ ...prev, languages: langData }))
            setError("")
        } catch(err) {
            setError("Something went wrong")
            setProfile(null)
            setRepos([])
        }
    }

    return (
        <div className={isDark ? "dark" : "light"}>
            <div className="header-section">
                <div className="theme-toggle-left">
                    <button 
                        className="theme-btn" 
                        onClick={() => setIsDark(!isDark)}
                        title="Toggle theme"
                    >
                        {isDark ? '🌙' : '☀️'}
                    </button>
                </div>
                <div className="title-search-right">
                    <h1>GitHub Profile Analyzer</h1>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            
            {error && <p style={{ color: 'red',fontFamily: 'Georgia, sans-serif', marginTop: '20px' }}>{error}</p>}
            
            {profile && (
                <div className="container has-results">
                    
                    <div className="results-wrapper">
                        <div className="top-section">
                            <div className="profile-image-section">
                                <img src={profile.avatar_url} alt="avatar" />
                            </div>
                            
                            <div className="profile-details-section">
                                <h2><b>{profile.name}</b></h2>
                                <p><b>{profile.bio}</b></p>
                                <p><a href={profile.blog} target="_blank" rel="noopener noreferrer">{profile.blog}</a></p>
                                <p><a href={profile.html_url} target="_blank" rel="noopener noreferrer">View Github Profile</a></p>
                                <h5>
                                    <p>Followers: {profile.followers} | Following: {profile.following}</p>
                                    <p>Public Repos: {profile.public_repos}</p>
                                    <p>Account Created: {new Date(profile.created_at).toLocaleDateString()}</p>
                                    <p>Last Updated: {new Date(profile.updated_at).toLocaleDateString()}</p>
                                </h5>
                                
                            </div>

                        </div>
                        <hr></hr>
                        <div className="bottom-section">
                            <RepoList repos={repos} />
                        </div>
                        <hr></hr>
                        <PieChart data={profile.languages || []} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
