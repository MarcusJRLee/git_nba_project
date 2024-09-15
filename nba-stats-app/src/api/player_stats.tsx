import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface PlayerStatsResponse {
  // Define the structure of the response data you expect from your server
  // Replace with actual data types based on your server's response
  [key: string]: unknown; // Placeholder for now
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerStatsResponse | { error: string }>
) {
  console.log(`TODO(mjrlee): Running player_stats handler.\nrequest: ${req}`);
  const { playerId } = req.query;

  try {
    const response = await axios.get(
      `http://localhost:4000/player_stats/${playerId}`
    );
    const data = response.data as PlayerStatsResponse; // Type assertion

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Failed to fetch player stats" });
  }
}
