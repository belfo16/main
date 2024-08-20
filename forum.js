// forum.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsList = document.getElementById('posts-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        if (title && content) {
            addPost(title, content);
            form.reset();
        }
    });

    function addPost(title, content) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${title}</strong><p>${content}</p>`;
        postsList.appendChild(li);
    }
});
