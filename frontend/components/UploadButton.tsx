import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ onFileParsed }) {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  React.useEffect(() => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          //console.log("Parsed CSV data:", result.data);
          // Pass the parsed data to the parent component
          onFileParsed(result.data);
        },
        header: true,
        skipEmptyLines: true,
        encoding: "UTF-8",
      });
    }
  }, [file, onFileParsed]); // Add onFileParsed to the dependency array

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
    </Button>
  );
}
