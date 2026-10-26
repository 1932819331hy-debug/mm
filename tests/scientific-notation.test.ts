import { expect, test } from "bun:test"
import mm, { mil2mm, mmStr } from "../index.ts"

test.each([
  ["1e-3mm", 0.001],
  ["1E+2CM", 1000],
  ["2e2mil", 5.08],
  ["-2.5e-2in", -0.635],
  ["+.5E1ft", 1524],
  ["1.e2m", 100000],
  [" 1e-3 mm", 0.001],
  ["1e-3", 0.001],
  ["-2E+2", -200],
  ["1e-7mm", 0.0000001],
])("mm parses scientific notation: %s", (input, expected) => {
  expect(mm(input)).toBeCloseTo(expected, 12)
})

test("mmStr formats a scientific-notation input as a decimal", () => {
  expect(mmStr("1e-7in")).toBe("0.00000254mm")
})

test("mil2mm converts small numeric inputs that stringify with an exponent", () => {
  expect(mil2mm(1e-7)).toBeCloseTo(0.00000000254, 15)
})

test("mil2mm preserves explicit units with scientific notation", () => {
  expect(mil2mm("1e-3in")).toBeCloseTo(0.0254, 12)
})

test.each([
  "1emm",
  "1e+mm",
  "1e-mm",
  "1e-3e2mm",
  "1e3.4mm",
  "1.2.3e2mm",
  ".e2mm",
  "--1e2mm",
  "1e3px",
])("mm rejects malformed exponents or unsupported units: %s", (input) => {
  expect(() => mm(input)).toThrow("Unsupported unit:")
})
