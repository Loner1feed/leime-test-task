"use client";

import React, { useEffect, useState } from "react";

import { MemeCard } from "./meme-card";

import { memeMockData } from "@/config/temp";
import { Meme } from "@/types/meme";
import { getData, setInitData } from "@/utils/mockApi";
import { Spinner } from "@heroui/spinner";

export const MemeList: React.FC = () => {
  const [data, setData] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  // collect data
  useEffect(() => {
    setLoading(true);
    setInitData(memeMockData);
    getData()
      .then((res: Meme[]) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full grid place-items-center">
          <Spinner size="lg" variant="simple" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 py-5">
          {data.map((meme) => (
            <MemeCard key={meme.id} data={meme} />
          ))}
        </div>
      )}
    </>
  );
};
