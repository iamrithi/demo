import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FileUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSubmit: (file: File) => void;
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
  isOpen,
  onClose,
  onFileSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const allowedExtensions = /(\.prn|\.txt|\.xlsx)$/i;

      if (!allowedExtensions.exec(selectedFile.name)) {
        setFileError("Only .prn, .txt, and .xlsx files are allowed");
        setFile(null);
      } else {
        setFile(selectedFile);
        setFileError(null);
      }
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      onFileSubmit(file);
      onClose();
    } else {
      setFileError("Please select a valid file");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Select File to Upload Stock</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-full">
                <label
                  htmlFor="file"
                  className="block w-full text-center bg-gray-200 p-2 rounded cursor-pointer"
                >
                  {file?.name || "No file selected"}
                </label>
              </div>
              {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Upload</Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default FileUploadDialog;
