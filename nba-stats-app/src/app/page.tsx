"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

// Define types for stats and error
type Stats = {
  resultSets: { rowSet: Array<Array<ReactNode>> }[];
};

export default function Home() {
  const [playerId, setPlayerId] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`TODO(mjrlee): making request for player_id: ${playerId}`);
      const resp = await fetch(`/api/player_stats/${playerId}`);
      console.log(`TODO(mjrlee): resp: ${JSON.stringify(resp)}`);
      const data: Stats = await resp.json();
      setStats(data);
    } catch (error: unknown) {
      console.log(
        `TODO(mjrlee): Error fetching stats: ${JSON.stringify(error)}`
      );
      setError("Failed to load player stats. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear stats and error when player ID changes.
  useEffect(() => {
    setStats(null);
    setError(null);
  }, [playerId]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>NBA Player Stats</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Enter Player ID"
          variant="outlined"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          error={!!error} // Set error helper text if there's an error
          helperText={error}
          disabled={isLoading}
          style={{ width: "300px", margin: "10px" }}
        />
        <Button variant="contained" onClick={fetchStats} disabled={isLoading}>
          Get Stats
        </Button>
      </div>

      {stats && (
        <Card style={{ margin: "20px auto", maxWidth: "800px" }}>
          <CardContent>
            <h2>Last 3 Games:</h2>
            {isLoading && <Typography>Loading stats...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <ul>
              {stats.resultSets[0].rowSet.map(
                (game: Array<ReactNode>, index: number) => (
                  <li key={index}>
                    {game.map((stat: ReactNode, index: number) => (
                      <Typography key={index} variant="body2">
                        {stat}
                      </Typography>
                    ))}
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
