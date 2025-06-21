# MemeHustle API Documentation

## Base URL
`https://your-api-url.com/api`

## Endpoints

### Memes
- `GET /memes` - Get all memes
- `POST /memes` - Create new meme
- `GET /memes/:id` - Get specific meme
- `POST /memes/:id/caption` - Generate AI caption
- `POST /memes/:id/vibe` - Generate vibe analysis

### Bids
- `POST /memes/:id/bid` - Place a bid
- `GET /memes/:id/bids` - Get bids for meme

### Leaderboard
- `GET /leaderboard?top=10` - Get top memes