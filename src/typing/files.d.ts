type ICldFile = {
  publicId: string;
  url: string;
};

type ILocalFile = {
  id: string;
  name: string;
  url: string;
} & (
  | {
      uploaded: false;
      blob: Blob;
    }
  | { uploaded: true; publicId: string }
);
