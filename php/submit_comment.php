<?php

if (isset($_POST['comment'])) {
    $comment = $_POST['comment'];
    $userId = 1; // Example: You can retrieve user info dynamically if required

    // Insert the comment into the database
    $stmt = $pdo->prepare("INSERT INTO comments (user_id, comment_text) VALUES (?, ?)");
    $stmt->execute([$userId, $comment]);

    // Retrieve the latest comments (you may want to limit the number of comments)
    $stmt = $pdo->query("SELECT comment_text FROM comments ORDER BY created_at DESC LIMIT 5");
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the comments as HTML to be inserted in the comments section
    foreach ($comments as $comment) {
        echo "<div class='comment'>" . htmlspecialchars($comment['comment_text']) . "</div>";
    }
}
?>
