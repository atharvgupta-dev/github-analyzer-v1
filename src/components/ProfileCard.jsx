function ProfileCard({ profile }) {
    return (
        <div>
            
            <img src={profile.avatar_url} alt="avatar" width="200" />
            
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
    )
}

export default ProfileCard