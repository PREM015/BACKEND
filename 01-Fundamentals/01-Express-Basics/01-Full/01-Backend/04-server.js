import express from 'express';
import cors from 'cors';  
const app = express();
app.use(cors());   
app.get('/hello/jokes', (req, res) => {
    try {
        const jokes = [
            { id: 1, title: 'A Joke', content: 'This is a joke' },
            { id: 2, title: 'Another Joke', content: 'Another joke' },
            { id: 3, title: 'Funny Joke', content: 'Funny content' },
        ];
        res.json(jokes);
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
