import { expect, test } from "bun:test"
import mm, { mil2mm, mmStr } from "../index.ts"

test("mm ignores outer whitespace around supported units", () => {
  for (const [input, expected] of [
    ["1mm ", 1],
    [" 1cm\n", 10],
    ["\t1IN\r\n", 25.4],
    ["1inch\t", 25.4],
    ["100mil ", 2.54],
    [" 1m ", 1000],
    ["1ft\r", 304.8],
    ["\n1feet\n", 304.8],
    ["\u00a0-0.5 cm\u00a0", -5],
    ["\u2003+1.5mm\u2003", 1.5],
  ] as const) {
    expect(mm(input)).toBeCloseTo(expected)
  }
})

test("mmStr ignores outer whitespace before formatting", () => {
  expect(mmStr("\t0.1in\r\n")).toBe("2.54mm")
  expect(mmStr(" 0.0000001in ")).toBe("0.00000254mm")
})

test("mil2mm ignores outer whitespace around explicit units", () => {
  expect(mil2mm(" 100mil ")).toBeCloseTo(2.54)
  expect(mil2mm("\n2cm\t")).toBeCloseTo(20)
})

test("outer whitespace does not make unsupported units valid", () => {
  for (const input of [" 1yd ", "1m m ", "1m\tm ", "1mm x "]) {
    expect(() => mm(input)).toThrow("Unsupported unit:")
    expect(() => mmStr(input)).toThrow("Unsupported unit:")
    expect(() => mil2mm(input)).toThrow("Unsupported unit:")
  }
})

test("non-whitespace unit suffixes are still rejected", () => {
  for (const input of ["1mm\u0000", "1mm\u001b", "1mm\u200b"]) {
    expect(() => mm(input)).toThrow("Unsupported unit:")
  }
})

test("outer whitespace does not supply a missing number", () => {
  expect(mm(" \t\r\n")).toBeNaN()
  expect(mm(" mm ")).toBeNaN()
})

test("existing numeric and whitespace defaults stay unchanged", () => {
  expect(mm(0)).toBe(0)
  expect(mm(" -1.5 ")).toBe(-1.5)
  expect(mm(" 1mm")).toBe(1)
  expect(mm("1 mm")).toBe(1)
  expect(mil2mm(100)).toBeCloseTo(2.54)
  expect(mil2mm("100")).toBeCloseTo(2.54)
})
