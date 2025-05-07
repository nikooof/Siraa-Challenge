import { ACCENT_COLOR } from "../constants";

interface SpinnerProps {
  text: string;
}

export function Spinner({ text }: SpinnerProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 16,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          border: "2px solid #ccc",
          borderTop: `2px solid ${ACCENT_COLOR}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          gap: 15,
        }}
      />
      <span style={{ color: ACCENT_COLOR }}>{text}</span>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
