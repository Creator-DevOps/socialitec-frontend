import React, { useRef, useState } from "react";
import { useController, Control, FieldError } from "react-hook-form";
import FileIcon from "@icons/file_upload.svg";

interface FileInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  accept?: string;
  rules?: Record<string, any>;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  control,
  label = "Archivo",
  accept = ".pdf,.docx,.txt,.xls,.png,.jpg,.mp4,.mp3",
  rules = {},
}) => {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      onChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) onChange(e.target.files);
  };

  const fileList = Array.isArray(value) ? value : value instanceof FileList ? value : [];

  return (
    <div>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-primary border-dashed rounded-md p-6
          flex flex-col items-center justify-center text-center
          cursor-pointer transition-colors hover:bg-gray-50
          ${dragActive ? "bg-gray-50" : "bg-white"}
        `}
      >
        <p className="font-semibold text-sm">{label}</p>
        <img src={FileIcon} className="h-12 w-12 my-2" alt="Icono carga" />
        <p className={
            fileList.length > 0
              ? "text-secondary text-sm"
              : "text-gray-500 text-sm"
          }
        >
          {fileList.length > 0
            ? fileList[0].name
            : "Arrastra u oprime para cargar un archivo."}
        </p>
        <input
          type="file"
          accept={accept}
          className="hidden"
          ref={el => { ref(el); fileInputRef.current = el; }}
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="text-red-500 !text-xs mt-1">{(error as FieldError).message}</p>}
    </div>
  );
};

export default FileInput;
