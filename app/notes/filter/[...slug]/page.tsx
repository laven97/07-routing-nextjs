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
  const { slug } = await params;
  const tag = (slug && slug.length > 0 ? slug[0] : "all") as NoteTags;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () => fetchNotes(tag === "all" ? "all" : tag, "", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
