// lib/inngest.ts

import axios from "axios";

export async function getRuns(runId: string) {
  try {
    const result = await axios.get(
      `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
      {
        headers: {
          Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
        },
      }
    );

    if (result.status !== 200) {
      throw new Error(`Unexpected status code: ${result.status}`);
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching run status:", error);
    throw new Error("Failed to fetch run status");
  }
}
