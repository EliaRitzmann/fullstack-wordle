import { useEffect, useState } from "react";
import { api } from "../api/client";
import { GameGameIdGet200Response } from "../api/generated";

export const useGameMetadata = (uuid: string) => {
  const [metadata, setMetadata] = useState<GameGameIdGet200Response | null>(
    null
  );

  useEffect(() => {
    api
      .gameGameIdGet(uuid)
      .then((res) => {
        setMetadata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [uuid]);

  return metadata;
};
