import { useState } from "react";
import { STEPS } from "../constants";
import type { ParsedResult } from "../types";

export function useParse() {
  const [parsing, setParsing] = useState(false);
  const [spinnerText, setSpinnerText] = useState<string | null>(null);

  async function parse(formData: FormData): Promise<ParsedResult> {
    if (parsing) {
      console.log("Parsing already in progress");
      throw new Error("Parsing already in progress");
    }

    setParsing(true);

    let step_index = 0;
    setSpinnerText(STEPS[step_index]);
    const steps_interval = window.setInterval(() => {
      step_index = Math.min(step_index + 1, STEPS.length - 1);
      setSpinnerText(STEPS[step_index]);
    }, 1000);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/parse`;
      const res = await fetch(url, { method: "POST", body: formData });

      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
      const result: ParsedResult = await res.json();
      return result;
    } finally {
      clearInterval(steps_interval);
      setParsing(false);
      setSpinnerText(null);
    }
  }

  return { parsing, spinnerText, parse };
}
