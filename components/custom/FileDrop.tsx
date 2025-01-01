import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { FileDrop } from "react-file-drop";

import { PlusIcon } from "../icons";

import { removeSpecials } from "@/utils/text";

interface FileUploaderProps {
  label?: string;
  width?: string;
  height?: string;
  multiple?: boolean;
  enableUploadSameFileTwice?: boolean;
  placeholder?: string;
  placeholderIcon?: ReactNode;
  onFilesChanged?: (files: File[]) => void;
  acceptFileType?: string;
  showIcon?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FileUploader({
  enableUploadSameFileTwice = true,
  placeholder = "Upload image",
  acceptFileType = ".jpg,.jpeg,.png,.tiff,.webp,.gif,.pdf,.doc,.docx,.xls,.xlsx,.mp4",
  placeholderIcon = <PlusIcon size={24} />,
  ...props
}: FileUploaderProps) {
  const [isInit, setIsInit] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    !props.disabled && props?.onFilesChanged?.(getFileList(event.target.files));
  };

  const onDrop = (files: FileList | null) => {
    !props.disabled && props?.onFilesChanged?.(getFileList(files));
  };

  const onClick = (event: any) => {
    enableUploadSameFileTwice && (event.target.value = null);
  };

  useEffect(() => {
    setIsInit(true);
  }, []);

  return (
    <div
      className={`file-uploader ${props.className ?? ""} ${props.disabled ? "disabled" : ""}`}
      style={{
        ...(props.width ? { width: props.width } : {}),
        ...(props.height ? { height: props.height } : {}),
      }}
    >
      {isInit && (
        <FileDrop onDrop={onDrop}>
          <label>
            <span className="w-100 text-center body-2 pt-2 d-flex flex-column align-items-center">
              {props?.showIcon != false && placeholderIcon}
              {placeholder}
            </span>
            <input
              accept={acceptFileType}
              multiple={props.multiple}
              type="file"
              onChange={onChange}
              onClick={onClick}
            />
          </label>
        </FileDrop>
      )}
      {/* <style jsx>{style}</style> */}
    </div>
  );
}

export const getFileList = (files: FileList | null): File[] => {
  if (!files || files.length === 0) return [];
  const fileList: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const newFile = new File([file || ""], removeSpecials(file?.name || ""));

    if (newFile) fileList.push(newFile);
  }

  return fileList;
};

// const style = css`
//   .file-uploader {
//     width: 100%;
//     height: 96px;
//     display: flex;
//     flex-direction: column;
//     :global(.file-drop) {
//       width: 100%;
//       height: 100%;
//       :global(.file-drop-target) {
//         width: 100%;
//         height: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         border: 3px dashed var(--indigo-4);
//         background-color: var(--indigo-1);
//         color: var(--indigo-7);
//         border-radius: 8px;
//         transition: var(--transition);
//         cursor: pointer;
//         &:hover,
//         &:global(.file-drop-dragging-over-target) {
//           color: var(--indigo-8);
//           border-color: var(--indigo-6);
//           :global(.icon) {
//             fill: var(--indigo-7);
//           }
//         }
//       }

//       label {
//         cursor: pointer;
//         height: 100%;
//         width: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         flex-wrap: wrap;
//         font-size: 13px;
//       }

//       :global(.icon) {
//         fill: var(--indigo-6);
//         width: 100%;
//         transition: var(--transition);
//       }

//       input[type="file"] {
//         display: none;
//       }
//     }
//     &.disabled {
//       opacity: 0.7;
//       :global(.file-drop .file-drop-target) {
//         pointer-events: none;
//       }
//     }
//   }
// `;
