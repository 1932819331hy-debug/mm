import { expect, test } from "bun:test"
import mm, { mmStr } from "../index.ts"

test("1in", () => {
  expect(mm("1in")).toBeCloseTo(25.4)
})
test("10mm", () => {
  expect(mm("10mm")).toBeCloseTo(10)
})
test("0.54mm", () => {
  expect(mm("0.54mm")).toBeCloseTo(0.54)
})
test("0.8mm", () => {
  expect(mm("0.54mm")).toBeCloseTo(0.54)
})
test("100mil", () => {
  expect(mm("100mil")).toBeCloseTo(2.54)
})

test("mmStr avoids scientific notation", () => {
  expect(mmStr(1e-7)).toBe("0.0000001mm")
})

test("mmStr formats converted units without scientific notation", () => {
  expect(mmStr("0.0000001in")).toBe("0.00000254mm")
})

test("rejects inherited names as unsupported units", () => {
  expect(() => mm("1constructor")).toThrow("Unsupported unit: constructor")
  expect(() => mm("1CONSTRUCTOR")).toThrow("Unsupported unit: constructor")
  expect(() => mm("1parsec")).toThrow("Unsupported unit: parsec")
})

test("preserves every declared unit and the default millimeter unit", () => {
  for (const [unit, factor] of [
    ["in", 25.4],
    ["inch", 25.4],
    ["mil", 0.0254],
    ["mm", 1],
    ["m", 1000],
    ["cm", 10],
    ["ft", 304.8],
    ["feet", 304.8],
  ] as const) {
    expect(mm(`2${unit}`)).toBeCloseTo(2 * factor)
    expect(mm(`2${unit.toUpperCase()}`)).toBeCloseTo(2 * factor)
  }
  expect(mm(2)).toBe(2)
  expect(mm("2")).toBe(2)
})
