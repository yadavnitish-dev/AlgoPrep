import axios from "axios";

export const getJudge0LanguageId = (Language: string) => {
  const languageMap: Record<string, number> = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[Language.toUpperCase()];
};

interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output: string;
}

interface Judge0Response {
  token: string;
}

export const submitBatch = async (
  submissions: Judge0Submission[]
): Promise<Judge0Response[]> => {
  if (!process.env.JUDGE0_API_URL) {
    throw new Error("JUDGE0_API_URL is not defined");
  }
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions }
  );

  console.log("submissions result:", data);

  return data;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens: string[]) => {
  if (!process.env.JUDGE0_API_URL) {
    throw new Error("JUDGE0_API_URL is not defined");
  }
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
      }
    );

    const results = data.submissions;

    const isAllDone = results.every(
      (r: any) => r.status.id !== 1 && r.status.id !== 2
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
};

export function getLanguageName(languageId: number) {
  const LANGUAGE_NAMES: Record<number, string> = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };

  return LANGUAGE_NAMES[languageId] || "Unknown";
}