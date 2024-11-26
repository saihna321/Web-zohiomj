const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/campaign-detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/campaign-detail.html'));
});

// WebSocket setup
const wss = new WebSocket.Server({ server });
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    ws.on('close', () => clients.delete(ws));
});

// Auto refresh in development
if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'refresh' }));
            }
        });
    }, 5000);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Example using Express
app.post('/api/comments', async (req, res) => {
    try {
        // Verify user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Нэвтрэх шаардлагатай.' });
        }

        const { text, campaignId } = req.body;
        
        // Save comment to database
        const comment = await Comment.create({
            text,
            campaignId,
            userId: req.user.id,
            createdAt: new Date()
        });

        // Return the new comment with user info
        res.json({
            success: true,
            comment: {
                id: comment.id,
                text: comment.text,
                userName: req.user.name,
                userAvatar: req.user.avatar,
                createdAt: comment.createdAt
            }
        });
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ success: false, message: 'Сэтгэгдэл хадгалахад алдаа гарлаа.' });
    }
});

app.get('/api/comments', async (req, res) => {
    try {
        const { campaignId } = req.query;
        const comments = await Comment.findAll({
            where: { campaignId },
            include: [{ model: User, attributes: ['name', 'avatar'] }],
            order: [['createdAt', 'DESC']]
        });
        
        res.json(comments);
    } catch (error) {
        console.error('Error loading comments:', error);
        res.status(500).json({ success: false, message: 'Сэтгэгдэл ачаалахад алдаа гарлаа.' });
    }
}); 