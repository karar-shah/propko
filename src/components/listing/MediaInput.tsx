"use client";
import { cn } from "@/lib/utils";
import { useListingStore } from "./listing-store";
import Dropzone from "react-dropzone";
import { CheckCircledIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { createId } from "@paralleldrive/cuid2";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";
import { useState } from "react";
import Spinner from "../ui/spinner";
import apiClient from "@/client/api";

export default function MediaInput() {
  const { setMediaFiles, listingData } = useListingStore();

  const handleNext = () => {
    // if (!listingData?.mediaFiles) return false;
    if (listingData.mediaFiles?.some((file) => !file.uploaded)) return false;
    return true;
  };

  const handleDeleteFile = (fileId: string) => {
    if (!listingData?.mediaFiles) return;
    setMediaFiles(listingData.mediaFiles.filter((file) => file.id !== fileId));
  };
  const handleFileUploaded = (fileId: string, cldFile: ICldFile) => {
    if (!listingData?.mediaFiles) return;
    setMediaFiles(
      listingData.mediaFiles.map((file) => {
        if (file.id === fileId) {
          return {
            id: file.id,
            name: file.name,
            uploaded: true,
            url: cldFile.url,
            publicId: cldFile.publicId,
          };
        }
        return file;
      })
    );
  };

  return (
    <StepsLayout
      heading={stepsHeadings.mediaFiles}
      handleNext={handleNext}
      nextBtn={{ disabled: !handleNext(), text: "Publish" }}
    >
      <div className={cn("flex-1 w-full max-w-[800px] mx-auto gap-5", "py-10")}>
        <FilesInputEl onChange={setMediaFiles} />
        <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">
          {listingData?.mediaFiles?.map((file, index) => (
            <FileListItem
              handleUploaded={handleFileUploaded}
              handleDelete={() => handleDeleteFile(file.id)}
              file={file}
              key={index}
            />
          ))}
        </div>
      </div>
    </StepsLayout>
  );
}

type FileListItemProps = {
  file: ILocalFile;
  handleDelete: () => void;
  handleUploaded: (fileId: string, file: ICldFile) => void;
};

type FileUploadStatus = "UPLOADED" | "UPLOADING" | "IDLE" | "UPLOAD_FAILED";
function FileListItem({
  file,
  handleUploaded,
  handleDelete,
}: FileListItemProps) {
  const [status, setStatus] = useState<FileUploadStatus>(
    file.uploaded ? "UPLOADED" : "IDLE"
  );
  const handleUploadFile = async () => {
    if (file.uploaded) return;
    setStatus("UPLOADING");
    const res = await apiClient.files.uploadFile(file.blob);
    if (res.succeed && res.data) {
      setStatus("UPLOADED");
      handleUploaded(file.id, res.data);
    } else {
      setStatus("UPLOAD_FAILED");
    }
  };
  return (
    <div className="flex items-center justify-between py-3">
      <h5 className="text-base font-medium">{file.name}</h5>
      <div className="flex items-center gap-3">
        {status === "UPLOADED" ? (
          <CheckCircledIcon className="w-6 h-6 text-primary-700" />
        ) : (
          <Button
            type="button"
            onClick={handleUploadFile}
            size={"sm"}
            className="p-2"
            disabled={status === "UPLOADING"}
          >
            {status === "UPLOADING" ? (
              <Spinner className="w-5 h-5 border-white" />
            ) : status === "UPLOAD_FAILED" ? (
              "Retry"
            ) : (
              <UploadIcon className="w-5 h-5" />
            )}
          </Button>
        )}
        {/* {status !== "UPLOADED" && ( */}
        <Button
          type="button"
          onClick={handleDelete}
          variant="destructive"
          className="w-8 h-8 p-2"
          disabled={status === "UPLOADING"}
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
        {/* )} */}
      </div>
    </div>
  );
}

type FilesInputElProps = {
  onChange?: (files: ILocalFile[]) => void;
};

function FilesInputEl({ onChange }: FilesInputElProps) {
  const handleFilesChanged = (acceptedFiles: Array<any>) => {
    const files: ILocalFile[] = acceptedFiles.map((file) => ({
      uploaded: false,
      id: createId(),
      name: file.name,
      blob: file,
      type: file.type,
      url: webkitURL.createObjectURL(file),
    }));
    onChange?.(files);
  };

  return (
    <Dropzone
      accept={{
        "image/*": [".png", ".jpeg", ".jpg", ".webp"],
        "video/*": [".mp4", ".webm"],
        "application/pdf": [".pdf"],
      }}
      onDrop={handleFilesChanged}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <div
          {...getRootProps()}
          className={cn(
            "flex items-center justify-center text-center p-5 h-52 w-full",
            "border-2 border-dashed border-slate-200 dark:border-slate-700",
            "rounded-lg transition-all cursor-pointer",
            isDragActive
              ? "bg-slate-100 dark:bg-slate-700/50"
              : "hover:bg-slate-100 dark:hover:bg-slate-700/50",
            isDragReject && "!bg-red-500 !cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <p></p>
          {isDragReject ? (
            <span className="text-white">Files not allowed!</span>
          ) : (
            "Drag 'n' drop some files here, or click to select files"
          )}
        </div>
      )}
    </Dropzone>
  );
}
