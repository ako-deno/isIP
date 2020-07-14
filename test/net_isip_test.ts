// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

import {
  assertStrictEquals,
} from "./deps.ts";
import { isIP, isIPv4, isIPv6 } from "../mod.ts";

const { test } = Deno;

test("Node.js compatible test", () => {
  assertStrictEquals(isIP("127.0.0.1"), 4);
  assertStrictEquals(isIP("x127.0.0.1"), 0);
  assertStrictEquals(isIP("example.com"), 0);
  assertStrictEquals(isIP("0000:0000:0000:0000:0000:0000:0000:0000"), 6);
  assertStrictEquals(isIP("0000:0000:0000:0000:0000:0000:0000:0000::0000"), 0);
  assertStrictEquals(isIP("1050:0:0:0:5:600:300c:326b"), 6);
  assertStrictEquals(isIP("2001:252:0:1::2008:6"), 6);
  assertStrictEquals(isIP("2001:dead:beef:1::2008:6"), 6);
  assertStrictEquals(isIP("2001::"), 6);
  assertStrictEquals(isIP("2001:dead::"), 6);
  assertStrictEquals(isIP("2001:dead:beef::"), 6);
  assertStrictEquals(isIP("2001:dead:beef:1::"), 6);
  assertStrictEquals(isIP("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"), 6);
  assertStrictEquals(isIP(":2001:252:0:1::2008:6:"), 0);
  assertStrictEquals(isIP(":2001:252:0:1::2008:6"), 0);
  assertStrictEquals(isIP("2001:252:0:1::2008:6:"), 0);
  assertStrictEquals(isIP("2001:252::1::2008:6"), 0);
  assertStrictEquals(isIP("::2001:252:1:2008:6"), 6);
  // Todo, known issues
  // assertStrictEquals(isIP("::2001:252:1:1.1.1.1"), 6);
  // assertStrictEquals(isIP("::2001:252:1:255.255.255.255"), 6);
  assertStrictEquals(isIP("::2001:252:1:255.255.255.255.76"), 0);
  assertStrictEquals(isIP("::anything"), 0);
  assertStrictEquals(isIP("::1"), 6);
  assertStrictEquals(isIP("::"), 6);
  assertStrictEquals(isIP("0000:0000:0000:0000:0000:0000:12345:0000"), 0);
  assertStrictEquals(isIP("0"), 0);
  assertStrictEquals(isIP(""), 0);

  assertStrictEquals(isIPv4("127.0.0.1"), true);
  assertStrictEquals(isIPv4("example.com"), false);
  assertStrictEquals(isIPv4("2001:252:0:1::2008:6"), false);
  assertStrictEquals(isIPv4(""), false);

  assertStrictEquals(isIPv6("127.0.0.1"), false);
  assertStrictEquals(isIPv6("example.com"), false);
  assertStrictEquals(isIPv6("2001:252:0:1::2008:6"), true);
  assertStrictEquals(isIPv6(""), false);
});

// The following cases are not going to be supported.

// assertStrictEquals(isIP(), 0);
// assertStrictEquals(isIP(null), 0);
// assertStrictEquals(isIP(123), 0);
// assertStrictEquals(isIP(true), 0);
// assertStrictEquals(isIP({}), 0);
// assertStrictEquals(isIP({ toString: () => '::2001:252:1:255.255.255.255' }), 6);
// assertStrictEquals(isIP({ toString: () => '127.0.0.1' }), 4);
// assertStrictEquals(isIP({ toString: () => 'bla' }), 0);

// assertStrictEquals(isIPv4(), false);
// assertStrictEquals(isIPv4(null), false);
// assertStrictEquals(isIPv4(123), false);
// assertStrictEquals(isIPv4(true), false);
// assertStrictEquals(isIPv4({}), false);
// assertStrictEquals(isIPv4({
//   toString: () => '::2001:252:1:255.255.255.255'
// }), false);
// assertStrictEquals(isIPv4({ toString: () => '127.0.0.1' }), true);
// assertStrictEquals(isIPv4({ toString: () => 'bla' }), false);

// assertStrictEquals(isIPv6(), false);
// assertStrictEquals(isIPv6(null), false);
// assertStrictEquals(isIPv6(123), false);
// assertStrictEquals(isIPv6(true), false);
// assertStrictEquals(isIPv6({}), false);
// assertStrictEquals(isIPv6({
//   toString: () => '::2001:252:1:255.255.255.255'
// }), true);
// assertStrictEquals(isIPv6({ toString: () => '127.0.0.1' }), false);
// assertStrictEquals(isIPv6({ toString: () => 'bla' }), false);
