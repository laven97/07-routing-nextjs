"use client";

import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SerachBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { NoteList } from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { NoteTags } from "@/types/note";

interface NotesClientProps {
  tag: NoteTags;
}

export function NotesClient({ tag }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [useInput, setUseInput] = useState("");
  const [page, setPage] = useState(1);

  const debaunceSerch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, search, page],
    queryFn: () => fetchNotes(tag, search, page),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header>
        <SearchBox
          value={useInput}
          onSearch={(value) => {
            setUseInput(value);
            debaunceSerch(value);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      {isLoading && <p>Loading...</p>}

      {isError && <p>Error...</p>}

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
