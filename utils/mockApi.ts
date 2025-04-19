"use client";

// here I will mock all server requests. Let's pretend this is an API

import { Meme } from "@/types/meme";

const LEIME_STORAGE = "LEIME-memes-hfykndsg";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Set data to localStorage on first load if existing storage not found
export const setInitData = (data: Meme[]) => {
  const localStorage = window.localStorage;

  // made name unique because you might have a lot of candidates using localStorage
  const existingData = localStorage.getItem(LEIME_STORAGE);

  if (!existingData) {
    localStorage.setItem(LEIME_STORAGE, JSON.stringify(data));
  }
};

export const getData = async () => {
  const localStorage = window.localStorage;

  await sleep(1000);

  const jsonData = localStorage.getItem(LEIME_STORAGE);

  return jsonData ? JSON.parse(jsonData) : [];
};

export const getItem = async (id: number) => {
  const data: Meme[] = await getData();

  const item = data.find((meme: Meme) => meme.id === id);

  return item || null;
};

export const updateItem = async (id: number, itemData: Meme) => {
  const data: Meme[] = await getData();

  const item = data.find((meme: Meme) => meme.id === id);

  if (item) {
    const newData = data.map((meme: Meme) =>
      meme.id === id ? itemData : meme
    );

    localStorage.setItem(LEIME_STORAGE, JSON.stringify(newData));

    return newData;
  }
};
