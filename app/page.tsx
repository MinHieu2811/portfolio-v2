"use client";

import { Input } from "@nextui-org/input";
import { ChangeEvent, useCallback, useState } from "react";
import { Post } from "@prisma/client";
import { Button } from "@nextui-org/react";

import MyEditor from "@/components/custom/MyEditor";
import { Nullable } from "@/types";
import { FileUploader } from "@/components/custom/FileDrop";
import { axiosImageInstance } from "@/lib/axios";
import ImageCard from "@/components/ImageCard";
import { copyText } from "@/utils/copyText";
import { ImagePost } from "@/types/form";

const inititalPostForm: Nullable<Post> = {
  slug: "",
  content: "",
  title: "",
};

export default function Home() {
  const [formCreate, setFormCreate] =
    useState<Nullable<Post>>(inititalPostForm);
  const [reviewImagesBlob, setReviewImagesBlob] = useState<ImagePost[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormCreate({
      ...formCreate,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const onAutoGenerateSlug = useCallback(() => {
    setFormCreate({
      ...formCreate,
      slug: formCreate?.title?.toLocaleLowerCase()?.split(" ")?.join("-"),
    });
  }, [formCreate?.title]);

  const handleSubmitImage = async (files: Blob[]) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (files?.length > 1) {
        files?.forEach((file) => {
          formData.append("file", file);
        });
      } else {
        formData?.append("file", files[0]);
      }
      formData.append("upload_preset", "eyf8dpkh");
      const res = await axiosImageInstance.post(
        "https://api.cloudinary.com/v1_1/dp9xqwrsz/image/upload",
        formData,
      );

      setReviewImagesBlob([
        ...reviewImagesBlob,
        {
          secureUrl: res?.data?.secure_url,
          publicId: res?.data?.public_id,
          signature: res?.data?.signature,
          assetId: res?.data?.asset_id,
        },
      ]);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImg = async ({
    publicId,
    signature,
    assetId,
  }: {
    publicId: string;
    signature: string;
    assetId: string;
  }) => {
    try {
      const res = await axiosImageInstance.post(
        "https://api.cloudinary.com/v1_1/dp9xqwrsz/image/destroy",
        {
          public_id: publicId,
          signature: signature,
          asset_id: assetId,
        },
      );

      if (res?.data?.result === "ok") {
        setReviewImagesBlob(
          reviewImagesBlob?.filter((i) => i?.publicId === publicId),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col container m-auto items-center justify-center gap-4 md:py-5">
      <FileUploader
        height="100px"
        width="100px"
        onFilesChanged={handleSubmitImage}
      />
      {reviewImagesBlob?.map((item) => (
        <ImageCard
          key={item?.signature}
          canDelete
          assetId={item?.assetId}
          handleCopySrc={copyText}
          handleDeleteImg={handleDeleteImg}
          isLoading={loading}
          publicId={item?.publicId}
          signature={item?.signature}
          src={item?.secureUrl}
        />
      ))}
      <Input
        isClearable
        label={<p>Title</p>}
        name="title"
        value={formCreate?.title}
        onChange={handleOnChange}
      />
      <Input
        endContent={
          <Button isDisabled={!formCreate?.title} onPress={onAutoGenerateSlug}>
            Generate
          </Button>
        }
        label={<p>Slug</p>}
        name="slug"
        value={formCreate?.slug}
        onChange={handleOnChange}
      />
      <MyEditor />
    </section>
  );
}
