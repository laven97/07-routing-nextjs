"use client";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>loading...</p>}
      {isError && <p>error...</p>}

      {data && (
        <div>
          <button onClick={handleClose}>Close</button>

          <h2>{data.title}</h2>
          <p>Tag: {data.tag}</p>
          <p>Content: {data.content}</p>
          <p>Create: {data.createdAt}</p>
        </div>
      )}
    </Modal>
  );
}
