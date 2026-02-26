import { Note } from "@/types/note";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(
  search: string,
  page: number,
  perPage = 12
): Promise<{ notes: Note[]; totalPages: number }> {
  const res: AxiosResponse<{ notes: Note[]; totalPages: number }> =
    await api.get("/notes", {
      params: {
        search,
        page,
        perPage,
        sortBy: "created",
      },
    });
  return res.data;
}

export async function createNote(
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return res.data;
}
