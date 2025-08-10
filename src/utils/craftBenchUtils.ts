export function getRepoName(repoUrl:string) {
    try {
        const url = new URL(repoUrl);
        const parts = url.pathname.split('/').filter(Boolean);
        return parts[1] ? parts[1].replace(/\.git$/, '') : null;
    } catch (err) {
        if (err instanceof Error) {
            console.error("Invalid URL:", err.message);
        } 
        else {
            console.error("Invalid URL:", err);
        }
        return null;
    }
}