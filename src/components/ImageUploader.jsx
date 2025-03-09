import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function ImageUploader({ name }) {
  const { setValue, watch } = useFormContext();
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setFiles((prev) => [...prev, ...newFiles]);
    setValue(name, [...(watch(name) || []), ...newFiles]);
  };

  const onRemove = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
    setValue(name, watch(name).filter((file) => file !== fileToRemove));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = files.findIndex((file) => file.preview === active.id);
    const newIndex = files.findIndex((file) => file.preview === over.id);

    const newFiles = arrayMove(files, oldIndex, newIndex);
    setFiles(newFiles);
    setValue(name, newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Arraste e solte imagens aqui ou clique para selecionar</p>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={files.map((file) => file.preview)} strategy={verticalListSortingStrategy}>
          <div className="flex gap-2 flex-wrap">
            {files.map((file) => (
              <SortableItem key={file.preview} file={file} onRemove={onRemove} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}