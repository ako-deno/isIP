import {
  assert,
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { isIP, isIPv4, isIPv6 } from "../mod.ts";

const { test } = Deno;

test("isIPv4", () => {
  assert(isIPv4("192.168.0.2"));
  assert(!isIPv4("168.0.2"));
  assert(!isIPv4("2001:0db8:85a3:0000:0000:8a2e:0370:7334"));
});

test("isIPv6", () => {
  assert(isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334"));
  assert(!isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370"));
  assert(!isIPv6("192.168.0.2"));
});

test("isIP", () => {
  assertEquals(isIP("192.168.0.2"), 4);
  assertEquals(isIP("168.0.2"), 0);
  assertEquals(isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334"), 6);
  assertEquals(isIP("2001:0db8:85a3:0000:0000:8a2e:0370"), 0);
});
