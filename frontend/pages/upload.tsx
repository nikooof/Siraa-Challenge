import { useState, useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { ACCENT_COLOR, WHITE_COLOR } from "../src/constants";
import type { PropertyData, ParsedResult } from "../src/types";
import { useParse } from "../src/hooks/useParse";
import { FileDropzone } from "../src/components/FileDropzone";
import { PropertyForm } from "../src/components/PropertyForm";
import { CacheBanner } from "../src/components/CacheBanner";
import "./upload.css";

export default function UploadPage() {
  const [responseData, setResponseData] = useState<PropertyData | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);

  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);

  const { parsing, spinnerText, parse } = useParse();

  const [isCached, setIsCached] = useState<boolean>(false);

  const onDrop = useCallback((droppedFiles: File[]) => {
    if (droppedFiles.length === 2) {
      let brochure = droppedFiles.find((f) =>
        f.name.toLowerCase().includes("brochure")
      );
      let floorPlan = droppedFiles.find((f) => {
        f.name.toLowerCase().includes("floor");
      });

      if (!brochure) brochure = droppedFiles[0];
      if (!floorPlan) floorPlan = droppedFiles[1];

      setBrochureFile(brochure);
      setFloorPlanFile(floorPlan);
    } else if (droppedFiles.length === 1) {
      const lower = droppedFiles[0].name.toLowerCase();
      if (lower.includes("brochure")) {
        setBrochureFile(droppedFiles[0]);
      } else if (lower.includes("floor")) {
        setFloorPlanFile(droppedFiles[0]);
      }
    }
  }, []);

  const handleClearQueue = () => {
    setBrochureFile(null);
    setFloorPlanFile(null);
    setResponseData(null);
  };

  const onSubmitUpload = async () => {
    if (!brochureFile && !floorPlanFile) {
      alert("No files have been uploaded!");
      return;
    }

    const formData = new FormData();
    if (brochureFile) {
      formData.append("brochure", brochureFile);
    }

    if (floorPlanFile) {
      formData.append("floor_plan", floorPlanFile);
    }

    try {
      const result: ParsedResult = await parse(formData);
      setCacheKey(result.hash_key);
      setResponseData(result.property_data);

      if (result.type === "cached") {
        setIsCached(true);
      }

      setTimeout(() => setIsCached(false), 3000);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const onSubmitParsed: SubmitHandler<PropertyData> = async (editedData) => {
    if (!cacheKey) {
      console.log("cache key missing");
    }
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/submit`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cached",
          hash_key: cacheKey,
          property_data: editedData,
        }),
      });
      if (!res.ok) {
        throw new Error(`Save failed (${res.status})`);
      }
      alert("Saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <>
      <div
        style={{
          background: WHITE_COLOR,
          maxWidth: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: 20,
          flexFlow: "column",
          flexDirection: "column",
        }}
      >
        {<CacheBanner isCached={isCached} />}

        <header style={{ textAlign: "center", marginBottom: 28 }}>
          <h1
            style={{
              color: ACCENT_COLOR,
              fontSize: "2.5rem",
              fontWeight: "bold",
              borderBottom: `1px solid ${ACCENT_COLOR}`,
            }}
          >
            Siraa Brochures and Floor Plans Parser
          </h1>
          <p
            style={{
              color: ACCENT_COLOR,
              opacity: 0.8,
            }}
          >
            Automating property data extraction from brochures and floor plans
            with AI
          </p>
        </header>

        <FileDropzone
          brochureFile={brochureFile}
          floorPlanFile={floorPlanFile}
          parsing={parsing}
          spinnerText={spinnerText}
          onDrop={onDrop}
          onParse={onSubmitUpload}
          onClear={handleClearQueue}
        />

        {responseData && (
          <PropertyForm data={responseData} onSave={onSubmitParsed} />
        )}
      </div>
    </>
  );
}
