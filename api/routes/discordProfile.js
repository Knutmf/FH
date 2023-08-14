export function displayProfile(username, avatarURL) {
    document.getElementById('userName').textContent = username;
    document.getElementById('avatarImage').src = avatarURL;
    }
    export function fetchAndDisplayProfile() {
    // Here, you'd fetch the Discord data...
    // For simplicity, let's assume you've fetched and have the data in variables `fetchedUsername`
    and `fetchedAvatarURL`.
    displayProfile(fetchedUsername, fetchedAvatarURL);
    }