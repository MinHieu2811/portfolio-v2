/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/button";
import React, { ComponentProps } from "react";

import { CopyIcon, DeleteIcon } from "./icons";

type ImageCardProps = ComponentProps<"img"> & {
  canDelete?: boolean;
  signature?: string;
  publicId?: string;
  assetId?: string;
  isLoading?: boolean;
  handleCopySrc?: (id: string) => void;
  handleDeleteImg?: (props: {
    publicId: string;
    signature: string;
    assetId: string;
  }) => Promise<void>;
};

const ImageCard = ({
  src,
  width = 200,
  height = 200,
  signature,
  publicId,
  assetId,
  alt,
  canDelete,
  isLoading = false,
  handleCopySrc,
  handleDeleteImg,
}: ImageCardProps) => {
  return (
    <div className="relative">
      <Button
        isIconOnly
        variant="solid"
        onClick={() => handleCopySrc?.(src ?? "")}
      >
        <CopyIcon size={24} />
      </Button>
      {canDelete && (
        <Button
          isIconOnly
          isLoading={isLoading}
          variant="solid"
          onClick={() =>
            handleDeleteImg?.({
              publicId: publicId ?? "",
              signature: signature ?? "",
              assetId: assetId ?? "",
            })
          }
        >
          <DeleteIcon size={24} />
        </Button>
      )}
      <img alt={alt} height={height} src={src} width={width} />
    </div>
  );
};

export default ImageCard;
