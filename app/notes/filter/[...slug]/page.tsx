import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NotesClient } from "./Notes.client";
import { NoteTags } from "@/types/note";

interface NotesProps {
  params: { slug: string[] };
}

export default async function NotesPage({ params }: NotesProps) {
  const queryClien = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] as NoteTags;

  await queryClien.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () => fetchNotes(tag, "", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClien)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
