document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    // Load existing comments
    loadComments();

    // Handle comment submission
    commentForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const commentText = document.getElementById('commentText').value;
        
        if (!commentText.trim()) {
            return;
        }

        try {
            const response = await submitComment(commentText);
            if (response.success) {
                // Add new comment to the list
                addCommentToList(response.comment);
                // Clear the form
                commentForm.reset();
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Сэтгэгдэл илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
        }
    });

    async function submitComment(text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                campaignId: getCampaignId(), // You'll need to implement this
                userId: getCurrentUserId() // You'll need to implement this
            })
        });

        return await response.json();
    }

    async function loadComments() {
        try {
            const response = await fetch(`/api/comments?campaignId=${getCampaignId()}`);
            const comments = await response.json();
            
            comments.forEach(comment => {
                addCommentToList(comment);
            });
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    }

    function addCommentToList(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-avatar">
                <img src="${comment.userAvatar || '/images/default-avatar.png'}" alt="User avatar">
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.userName)}</span>
                    <span class="comment-date">${formatDate(comment.createdAt)}</span>
                </div>
                <p class="comment-text">${escapeHtml(comment.text)}</p>
            </div>
        `;
        
        commentsList.insertBefore(commentElement, commentsList.firstChild);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('mn-MN');
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}); 