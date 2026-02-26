import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NotePreviewProps {
  param: Promise<{ id: string }>;
}

export default async function NotePreview({ param }: NotePreviewProps) {
  const { id } = await param;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
}
