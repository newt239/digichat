import { atom } from "jotai";

export const roomAtom = atom("general");
export const messageAtom = atom("");
export const messagesAtom = atom<string[]>([]);
