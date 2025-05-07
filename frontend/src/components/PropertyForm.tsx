"use client";

import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { PropertyData } from "../types";
import {
  ACCENT_COLOR,
  NO_RELEVANT_DATA_EXTRACTED,
  NO_RELEVANT_DATA_EXTRACTED_OUTPUT,
} from "../constants";

interface PropertyFormProps {
  data: PropertyData;
  onSave: SubmitHandler<PropertyData>;
}

export function PropertyForm({ data, onSave }: PropertyFormProps) {
  const { reset, control, handleSubmit } = useForm<PropertyData>();

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      style={{ maxWidth: 600, margin: "40px auto" }}
    >
      <h2
        style={{
          color: ACCENT_COLOR,
          textAlign: "center",
          marginTop: -17.5,
        }}
      >
        Property Data
      </h2>
      <p
        style={{
          color: ACCENT_COLOR,
          opacity: 0.8,
          textAlign: "center",
          marginTop: -12,
          marginBottom: 30,
        }}
      >
        Edit as Desired and Save!
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          alignItems: "stretch",
        }}
      >
        <fieldset
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 16,
            borderRadius: 8,
            borderColor: ACCENT_COLOR,
          }}
        >
          <legend
            style={{
              backgroundColor: "transparent",
              color: ACCENT_COLOR,
              fontWeight: 800,
              margin: "0 auto",
              padding: "0 8px",
              width: "fit-content",
              textAlign: "center",
              fontSize: "1.2rem",
              borderBottom: `1px solid ${ACCENT_COLOR}`,
            }}
          >
            Property Summary
          </legend>
          {[
            { name: "property_name", label: "Property Name" },
            { name: "property_type", label: "Property Type" },
            { name: "developer", label: "Developer" },
            { name: "description", label: "Description", textarea: true },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name as keyof PropertyData}
              control={control}
              render={({ field }) => (
                <div style={{ marginBottom: 12 }}>
                  <label style={{ color: ACCENT_COLOR, fontWeight: 550 }}>
                    {item.label}
                  </label>
                  {item.textarea ? (
                    <textarea
                      rows={5}
                      style={{
                        width: "100%",
                        marginTop: 4,
                        borderRadius: 2.5,
                        border: `1px solid ${ACCENT_COLOR}`,
                        resize: "none",
                        overflow: "auto",
                      }}
                      {...field}
                      value={
                        field.value === NO_RELEVANT_DATA_EXTRACTED
                          ? NO_RELEVANT_DATA_EXTRACTED_OUTPUT
                          : (field.value as string)
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        marginTop: 4,
                        borderRadius: 2.5,
                        border: `1px solid ${ACCENT_COLOR}`,
                      }}
                      {...field}
                      value={
                        field.value === NO_RELEVANT_DATA_EXTRACTED
                          ? NO_RELEVANT_DATA_EXTRACTED_OUTPUT
                          : (field.value as string)
                      }
                    />
                  )}
                </div>
              )}
            />
          ))}
        </fieldset>

        <fieldset
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 16,
            borderRadius: 8,
            borderColor: ACCENT_COLOR,
          }}
        >
          <legend
            style={{
              backgroundColor: "transparent",
              color: ACCENT_COLOR,
              fontWeight: 800,
              margin: "0 auto",
              padding: "0 8px",
              width: "fit-content",
              textAlign: "center",
              fontSize: "1.2rem",
              borderBottom: `1px solid ${ACCENT_COLOR}`,
            }}
          >
            Pricing & Payment
          </legend>
          {[
            { name: "price", label: "Price" },
            { name: "payment_plan", label: "Payment Plan" },
            { name: "down_payment", label: "Down Payment" },
            { name: "average_price_per_sqft", label: "Avg. Price/Sqft" },
            { name: "handover", label: "Handover Date" },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name as keyof PropertyData}
              control={control}
              render={({ field }) => (
                <div style={{ marginBottom: 12 }}>
                  <label style={{ color: ACCENT_COLOR, fontWeight: 550 }}>
                    {item.label}
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      marginTop: 4,
                      borderRadius: 2.5,
                      border: `1px solid ${ACCENT_COLOR}`,
                    }}
                    {...field}
                    value={
                      field.value === NO_RELEVANT_DATA_EXTRACTED
                        ? NO_RELEVANT_DATA_EXTRACTED_OUTPUT
                        : (field.value as string)
                    }
                  />
                </div>
              )}
            />
          ))}
        </fieldset>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <fieldset
          style={{
            flex: 1,
            padding: 16,
            borderRadius: 8,
            borderColor: ACCENT_COLOR,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <legend
            style={{
              backgroundColor: "transparent",
              color: ACCENT_COLOR,
              fontWeight: 800,
              margin: "0 auto",
              padding: "0 8px",
              width: "fit-content",
              textAlign: "center",
              fontSize: "1.2rem",
              borderBottom: `1px solid ${ACCENT_COLOR}`,
            }}
          >
            Specifications
          </legend>
          {[
            { name: "bedrooms", label: "Bedrooms" },
            { name: "bathroom", label: "Bathrooms" },
            { name: "area", label: "Area" },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name as keyof PropertyData}
              control={control}
              render={({ field }) => (
                <div style={{ marginBottom: 12 }}>
                  <label style={{ color: ACCENT_COLOR, fontWeight: 550 }}>
                    {item.label}
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      marginTop: 4,
                      borderRadius: 2.5,
                      border: `1px solid ${ACCENT_COLOR}`,
                    }}
                    {...field}
                    value={
                      field.value === NO_RELEVANT_DATA_EXTRACTED
                        ? NO_RELEVANT_DATA_EXTRACTED_OUTPUT
                        : (field.value as string)
                    }
                  />
                </div>
              )}
            />
          ))}
        </fieldset>

        <fieldset
          style={{
            flex: 1,
            padding: 16,
            borderRadius: 8,
            borderColor: ACCENT_COLOR,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <legend
            style={{
              backgroundColor: "transparent",
              color: ACCENT_COLOR,
              fontWeight: 800,
              margin: "0 auto",
              padding: "0 8px",
              width: "fit-content",
              textAlign: "center",
              fontSize: "1.2rem",
              borderBottom: `1px solid ${ACCENT_COLOR}`,
            }}
          >
            Location
          </legend>
          {[
            { name: "location", label: "Neighborhood" },
            { name: "city", label: "City" },
            { name: "country", label: "Country" },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name as keyof PropertyData}
              control={control}
              render={({ field }) => (
                <div style={{ marginBottom: 12 }}>
                  <label style={{ color: ACCENT_COLOR, fontWeight: 550 }}>
                    {item.label}
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      marginTop: 4,
                      borderRadius: 2.5,
                      border: `1px solid ${ACCENT_COLOR}`,
                    }}
                    {...field}
                    value={
                      field.value === NO_RELEVANT_DATA_EXTRACTED
                        ? NO_RELEVANT_DATA_EXTRACTED_OUTPUT
                        : (field.value as string)
                    }
                  />
                </div>
              )}
            />
          ))}
        </fieldset>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <fieldset
          style={{
            width: "100%",
            maxWidth: 600,
            padding: 16,
            borderRadius: 8,
            borderColor: ACCENT_COLOR,
            margin: "0 auto 24px",
          }}
        >
          <legend
            style={{
              backgroundColor: "transparent",
              color: ACCENT_COLOR,
              fontWeight: 800,
              margin: "0 auto",
              padding: "0 8px",
              width: "fit-content",
              textAlign: "center",
              fontSize: "1.2rem",
              borderBottom: `1px solid ${ACCENT_COLOR}`,
            }}
          >
            Amenities
          </legend>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
              columnGap: "24px",
              rowGap: "12px",
            }}
          >
            {(Object.keys(data) as (keyof PropertyData)[])
              .filter((k) => k.startsWith("has_") || k === "is_pet_friendly")
              .map((name) => (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        alignItems: "center",
                      }}
                    >
                      <label style={{ color: ACCENT_COLOR }}>
                        {name
                          .replace(/_/g, " ")
                          .replace(/^./, (s) => s.toUpperCase())}
                        ?
                      </label>
                      <select
                        {...field}
                        value={field.value ? "true" : "false"}
                        onChange={(e) =>
                          field.onChange(e.target.value === "true")
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  )}
                />
              ))}
          </div>
        </fieldset>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          type="submit"
          style={{
            background: ACCENT_COLOR,
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
