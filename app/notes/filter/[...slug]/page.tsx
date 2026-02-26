import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NotesClient } from "./note.client";


export default async function NotesPage() {
  const queryClien = new QueryClient();

  await queryClien.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes("", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClien)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
