export async function getLastPushTimestamp(repo, branch = 'main') {
    try {
        // GitHub API für Commits aufrufen
        const commitsUrl = `https://api.github.com/repos/${repo}/commits`;
        const searchParams = new URLSearchParams({
            sha: branch,
            per_page: 1
        });

        const response = await fetch(`${commitsUrl}?${searchParams}`);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const commits = await response.json();

        if (commits && commits.length > 0) {
            // ISO-Zeitstempel des letzten Commits zurückgeben
            return commits[0].commit.author.date;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Zeitstempels:", error);
        return null;
    }
}