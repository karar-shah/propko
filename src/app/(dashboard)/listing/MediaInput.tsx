"use client";
import { cn } from "@/lib/utils";
import NextButton from "./NextButton";
import { useListingStore } from "./listing-store";
import Dropzone from "react-dropzone";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { createId } from "@paralleldrive/cuid2";

export default function MediaInput() {
  const { handleNextStep, setMediaFiles, listingData } = useListingStore();

  const handleNext = () => {
    if (!listingData?.mediaFiles) return;
    handleNextStep();
  };

  const handleDeleteFile = (fileId: string) => {
    if (!listingData?.mediaFiles) return;
    setMediaFiles(listingData.mediaFiles.filter((file) => file.id !== fileId));
  };

  return (
    <>
      <div className={cn("flex-1 w-full max-w-[800px] mx-auto gap-5", "py-10")}>
        <FilesInputEl onChange={setMediaFiles} />
        <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">
          {listingData?.mediaFiles?.map((file, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <h5 className="text-base font-medium">{file.name}</h5>
              <Button
                onClick={() => handleDeleteFile(file.id)}
                variant="destructive"
                size={"icon"}
                className="w-8 h-8"
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <NextButton onClick={handleNext}>
        {listingData?.mediaFiles ? "Next >" : "Skip"}
      </NextButton>
    </>
  );
}

type FilesInputElProps = {
  onChange?: (files: IFile[]) => void;
};

function FilesInputEl({ onChange }: FilesInputElProps) {
  const handleFilesChanged = (acceptedFiles: Array<any>) => {
    const files: IFile[] = acceptedFiles.map((file) => ({
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
