// components/image-upload.tsx

import { FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "./ui/input";
import Image from "next/image";

interface ImageUploadProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  placeholder?: string;
}

export function ImageUpload({ handleFileChange, imagePreview, placeholder }: ImageUploadProps) {
  return (
    <>
      <FormControl>
        <Input
          id="card"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
      </FormControl>
      <FormMessage />
      <FormDescription>
        <Image
          src={imagePreview || placeholder || "/placeholder-image.png"}
          alt="Event card preview"
          width={300}
          height={200}
          className="max-w-xs max-h-48 object-cover rounded-md border"
        />
      </FormDescription>
    </>
  );
}
