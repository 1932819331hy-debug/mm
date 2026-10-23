import { expect, test } from "bun:test"
import { mil2mm } from "../index.ts"

test.each([
  ["10.0", 10],
  ["0.5", 0.5],
  [".5", 0.5],
  ["10.", 10],
  ["-10", -10],
  ["+10", 10],
  ["-0.5", -0.5],
  ["+.5", 0.5],
  [" 10 ", 10],
  ["\t-0.5\n", -0.5],
] as const)("unitless decimal %s is measured in mils", (input, value) => {
  const expected = value * 0.0254
  expect(mil2mm(input)).toBeCloseTo(expected, 12)
  expect(mil2mm(value)).toBeCloseTo(expected, 12)
})

test.each([
  ["10", 0.254],
  ["0", 0],
  ["10mil", 0.254],
  ["-0.5mil", -0.0127],
  ["10mm", 10],
  ["1cm", 10],
  ["1in", 25.4],
  ["1feet", 304.8],
] as const)("preserves conversion of %s", (input, expected) => {
  expect(mil2mm(input)).toBeCloseTo(expected, 12)
})

test.each(["10kg", "10.5unknown", "invalid"])(
  "rejects unsupported unit %s",
  (input) => {
    expect(() => mil2mm(input)).toThrow("Unsupported unit:")
  },
)
