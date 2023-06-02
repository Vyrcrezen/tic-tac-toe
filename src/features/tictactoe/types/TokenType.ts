
export const tokenTypes = [
  "x",
  "ring",
  "coin",
  "triangle",
  "rectangle",
  "star",
  "pentagon",
  "hecagon",
  "bipyramid",
] as const;

type TokenType = typeof tokenTypes[number];

export default TokenType;
