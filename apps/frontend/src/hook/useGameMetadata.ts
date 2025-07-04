import { useEffect, useState } from "react";
import { api } from "../api/client";
import { GameGameIdGet200Response } from "../api/generated";

export const useGameMetadata = (uuid: string | undefined) => {
  const [metadata, setMetadata] = useState<GameGameIdGet200Response | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  const fetchGameMetadata = async (gameUUID: string) => {
    api
      .gameGameIdGet(gameUUID)
      .then((res) => {
        setMetadata(res.data);
        setError(null); // clear any previous error
      })
      .catch((err) => {
        console.error(err);
        setMetadata(null);
        setError(err); // capture the error
      });
  };

  useEffect(() => {
    if (!uuid) {
      setMetadata(null);
      setError(new Error("Missing UUID"));
      return;
    }
    fetchGameMetadata(uuid);
  }, [uuid]);

  return { metadata, error, refetchGameMetadata: fetchGameMetadata };
};
