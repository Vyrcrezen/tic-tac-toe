
export const tokenTypes = [
  "x",
  "ring",
  "coin",
  "triangle",
  "star",
  "pentagon",
  "hexagon",
  "bipyramid",
  "square",
  "heart"
] as const;

type TokenType = typeof tokenTypes[number];

export default TokenType;
