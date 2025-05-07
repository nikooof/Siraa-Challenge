import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { FaFilePdf } from "react-icons/fa";
import { ACCENT_COLOR, RED_COLOR, WHITE_COLOR } from "../constants";
import { Spinner } from "../components/Spinner";

interface FileDropzoneProps {
  brochureFile: File | null;
  floorPlanFile: File | null;
  parsing: boolean;
  spinnerText: string | null;
  onDrop: (files: File[]) => void;
  onParse: () => void;
  onClear: () => void;
}

export const FileDropzone: FC<FileDropzoneProps> = ({
  brochureFile,
  floorPlanFile,
  parsing,
  spinnerText,
  onDrop,
  onParse,
  onClear,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: true,
    maxFiles: 2,
  });

  return (
    <div style={{ margin: "auto" }}>
      <div
        {...getRootProps()}
        style={{
          border: `1.5px dashed ${ACCENT_COLOR}`,
          padding: 20,
          paddingLeft: 160,
          paddingRight: 160,
          textAlign: "center",
          background: isDragActive ? "#F0F4FF" : undefined,
          marginBottom: 16,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 70,
          maxHeight: 70,
          flexDirection: "row",
          gap: 24,
        }}
      >
        <input {...getInputProps()} />
        {brochureFile || floorPlanFile ? (
          <div style={{ display: "flex", gap: 24 }}>
            {brochureFile && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaFilePdf size={50} color={ACCENT_COLOR} />
                <span
                  style={{
                    marginTop: 4,
                    color: ACCENT_COLOR,
                    fontSize: 14,
                  }}
                >
                  {brochureFile.name.replace(/\.pdf$/i, "")}
                </span>
              </div>
            )}
            {floorPlanFile && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaFilePdf size={50} color={ACCENT_COLOR} />
                <span
                  style={{
                    marginTop: 4,
                    color: ACCENT_COLOR,
                    fontSize: 14,
                  }}
                >
                  {floorPlanFile.name.replace(/\.pdf$/i, "")}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p style={{ color: ACCENT_COLOR }}>
            Drop your Brochure and Floor Plan or Click Here
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        <button
          onClick={onParse}
          disabled={parsing || !(brochureFile && floorPlanFile)}
          style={{
            background: ACCENT_COLOR,
            color: WHITE_COLOR,
            padding: "10px 20px",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          {parsing ? "Parsing…" : "Parse"}
        </button>
        <button
          onClick={onClear}
          disabled={parsing}
          style={{
            background: RED_COLOR,
            color: WHITE_COLOR,
            padding: "10px 20px",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {spinnerText && <Spinner text={spinnerText} />}
    </div>
  );
};
