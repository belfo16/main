document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.getElementById('postsContainer');

    // Funktion zum Erstellen eines neuen Beitrags
    async function createPost(content) {
        try {
            await db.collection('posts').add({
                content: content,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            postContent.value = ''; // Formular zurücksetzen
        } catch (error) {
            console.error("Fehler beim Erstellen des Beitrags:", error.message);
        }
    }

    // Funktion zum Anzeigen der Beiträge
    async function displayPosts() {
        try {
            const snapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();
            postsContainer.innerHTML = ''; // Container leeren

            snapshot.forEach(doc => {
                const post = doc.data();
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.textContent = post.content;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error("Fehler beim Abrufen der Beiträge:", error.message);
        }
    }

    // Event-Listener für das Formular
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        createPost(postContent.value);
    });

    // Beiträge anzeigen, wenn die Seite geladen wird
    displayPosts();
});
