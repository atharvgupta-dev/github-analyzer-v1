function RepoList({ repos }) {
    return (
        <div>
            <h3>Top Repositories</h3>
            {repos.map(repo => (
                <div key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🔤 {repo.language}</span>
                    <br></br>
                    <span> {repo.description}</span>
                </div>
            ))}
        </div>
    )
}

export default RepoList