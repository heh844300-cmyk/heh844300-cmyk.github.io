import test from 'node:test'
import assert from 'node:assert/strict'
import { clamp, mapRange, getScrollProgress } from './motion.js'

test('clamp 限制數值於區間內', () => {
  assert.equal(clamp(0.5, 0, 1), 0.5)
  assert.equal(clamp(-1, 0, 1), 0)
  assert.equal(clamp(3, 0, 1), 1)
  assert.equal(clamp(7, 4, 6), 6)
})

test('clamp 在未給定邊界時預設為 0 到 1', () => {
  assert.equal(clamp(0.5), 0.5)
  assert.equal(clamp(-2), 0)
  assert.equal(clamp(2), 1)
})

test('mapRange 將數值線性映射到目標區間', () => {
  assert.equal(mapRange(50, 0, 100, 0, 1), 0.5)
  assert.equal(mapRange(75, 0, 100, 0, 360), 270)
  assert.equal(mapRange(0, 0, 100, 0, 1), 0)
  assert.equal(mapRange(100, 0, 100, 0, 1), 1)
})

test('mapRange 對超出輸入區間的值做 clamp', () => {
  assert.equal(mapRange(-50, 0, 100, 0, 1), 0)
  assert.equal(mapRange(200, 0, 100, 0, 1), 1)
})

test('mapRange 在輸入區間為零時回傳最小輸出值', () => {
  assert.equal(mapRange(42, 10, 10, 0, 1), 0)
})

test('getScrollProgress 回傳區塊通過視口的 0~1 進度', () => {
  assert.equal(getScrollProgress(800, 800, 800), 0)
  assert.equal(getScrollProgress(0, 800, 800), 0.5)
  assert.equal(getScrollProgress(-800, 800, 800), 1)
})

test('getScrollProgress 的結果限制在 0 到 1', () => {
  assert.ok(getScrollProgress(2000, 800, 800) <= 1)
  assert.ok(getScrollProgress(-2000, 800, 800) >= 0)
})