function RepoList({ repos }) {
    return (
        <div>
            <h3><u>Top Repositories</u></h3>
            <br />
            {repos.map(repo => (
                <div key={repo.id}>
                    <h4>
                        <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                    </h4>
                    <h5>
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🔤 {repo.language}</span>
                    <br />
                    <span>{repo.description}</span>
                    </h5>
                </div>
            ))}
        </div>
    )
}

export default RepoList