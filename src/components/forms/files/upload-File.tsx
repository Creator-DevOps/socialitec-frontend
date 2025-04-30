import React, { useRef, useState } from "react";
import classNames from "classnames";
import File from "@icons/file_upload.svg";

interface FileInputProps {
  name: string;
  onFileSelect: (file: File | null) => void;
  className?: string;
  description?: string;
  accept?: string;
  label?: string;
  error?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  onFileSelect,
  className,
  description,
  accept = ".pdf, .docx, .txt, .xls, .png, .jpg, .mp4, .mp3",
  label,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className={`mb-4 ${className ?? ""}`}>
      {label && <label className="font-semibold text-sm">{label}</label>}
      <div
        className={classNames(
          "border border-dashed border-primary text-center p-2 cursor-pointer rounded-md transition-colors",
          dragActive ? "bg-gray-100" : "",
          className
        )}
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <img src={File} alt="upload" className="mx-auto mb-2 h-10 w-10 md:w-15 md:h-15" />
        <div className="flex flex-col gap-1">
          <p className="text-xs md:text-sm md:hidden block">Subir archivo</p>
          <p className="text-xs md:text-sm md:block hidden">{description}</p>
          <p className="text-center line-clamp-2  text-[10px] md:text-xs">
            <strong>{accept}</strong>
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FileInput;
