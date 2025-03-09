import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";

export default function SortableItem({ file, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.preview });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300">
      <img src={file.preview} alt="Uploaded" className="w-full h-full object-cover" />
      <button
        type="button"
        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
        onClick={() => onRemove(file)}
      >
        <X size={14} />
      </button>
      <div {...attributes} {...listeners} className="absolute top-1 left-1 text-white cursor-move">
        <GripVertical size={14} />
      </div>
    </div>
  );
}
