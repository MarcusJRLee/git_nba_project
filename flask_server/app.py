from nba_api.stats.endpoints import playercareerstats
import os
from flask import Flask, jsonify

app = Flask(__name__)
PORT = int(os.getenv("PORT", 4000))


@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/player_stats/<player_id>', methods=['GET'])
def get_player_stats(player_id):
    print(f'Starting get_player_stats with player_id={player_id}')
    try:
        # Fetch the player's game log
        career = playercareerstats.PlayerCareerStats(player_id=player_id)

        # pandas data frames (optional: pip install pandas)
        # career.get_data_frames()[0]

        # json
        # career.get_json()

        # dictionary
        # career.get_dict()

        # Return the result as JSON
        return jsonify(career.get_dict())
    except Exception as e:
        return jsonify({"TODO(mjrlee): error": str(e)})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT)
