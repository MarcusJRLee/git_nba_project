### Build the Docker image

```
docker build -t flask-nba-api .
```

### Run the container

```
docker run -p 4000:4000 flask-nba-api
```

### Example API Request

Nikola Jokić

```
http://127.0.0.1:4000/player_stats/203999
http://localhost:4000/player_stats/203999
```
