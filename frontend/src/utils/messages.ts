import { atom } from "jotai";
import { Message } from "../types/message";

// Jotai atom for the message list
export const messageListAtom = atom<Message[]>([]);
