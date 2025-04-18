export type ClassificationResult = {
  category: string;
  topics: string[];
  sentiment: "positive" | "neutral" | "negative";
};

export type ProcessResult = {
  response: string;
};
