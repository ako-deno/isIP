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
  assertStrictEq,
} from "https://deno.land/std/testing/asserts.ts";
import { isIP, isIPv4, isIPv6 } from "../mod.ts";

assertStrictEq(isIP("127.0.0.1"), 4);
assertStrictEq(isIP("x127.0.0.1"), 0);
assertStrictEq(isIP("example.com"), 0);
assertStrictEq(isIP("0000:0000:0000:0000:0000:0000:0000:0000"), 6);
assertStrictEq(isIP("0000:0000:0000:0000:0000:0000:0000:0000::0000"), 0);
assertStrictEq(isIP("1050:0:0:0:5:600:300c:326b"), 6);
assertStrictEq(isIP("2001:252:0:1::2008:6"), 6);
assertStrictEq(isIP("2001:dead:beef:1::2008:6"), 6);
assertStrictEq(isIP("2001::"), 6);
assertStrictEq(isIP("2001:dead::"), 6);
assertStrictEq(isIP("2001:dead:beef::"), 6);
assertStrictEq(isIP("2001:dead:beef:1::"), 6);
assertStrictEq(isIP("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"), 6);
assertStrictEq(isIP(":2001:252:0:1::2008:6:"), 0);
assertStrictEq(isIP(":2001:252:0:1::2008:6"), 0);
assertStrictEq(isIP("2001:252:0:1::2008:6:"), 0);
assertStrictEq(isIP("2001:252::1::2008:6"), 0);
assertStrictEq(isIP("::2001:252:1:2008:6"), 6);
// Todo, known issues
// assertStrictEq(isIP("::2001:252:1:1.1.1.1"), 6);
// assertStrictEq(isIP("::2001:252:1:255.255.255.255"), 6);
assertStrictEq(isIP("::2001:252:1:255.255.255.255.76"), 0);
assertStrictEq(isIP("::anything"), 0);
assertStrictEq(isIP("::1"), 6);
assertStrictEq(isIP("::"), 6);
assertStrictEq(isIP("0000:0000:0000:0000:0000:0000:12345:0000"), 0);
assertStrictEq(isIP("0"), 0);
assertStrictEq(isIP(""), 0);

assertStrictEq(isIPv4("127.0.0.1"), true);
assertStrictEq(isIPv4("example.com"), false);
assertStrictEq(isIPv4("2001:252:0:1::2008:6"), false);
assertStrictEq(isIPv4(""), false);

assertStrictEq(isIPv6("127.0.0.1"), false);
assertStrictEq(isIPv6("example.com"), false);
assertStrictEq(isIPv6("2001:252:0:1::2008:6"), true);
assertStrictEq(isIPv6(""), false);

// The following cases are not going to be supported.

// assertStrictEq(isIP(), 0);
// assertStrictEq(isIP(null), 0);
// assertStrictEq(isIP(123), 0);
// assertStrictEq(isIP(true), 0);
// assertStrictEq(isIP({}), 0);
// assertStrictEq(isIP({ toString: () => '::2001:252:1:255.255.255.255' }), 6);
// assertStrictEq(isIP({ toString: () => '127.0.0.1' }), 4);
// assertStrictEq(isIP({ toString: () => 'bla' }), 0);

// assertStrictEq(isIPv4(), false);
// assertStrictEq(isIPv4(null), false);
// assertStrictEq(isIPv4(123), false);
// assertStrictEq(isIPv4(true), false);
// assertStrictEq(isIPv4({}), false);
// assertStrictEq(isIPv4({
//   toString: () => '::2001:252:1:255.255.255.255'
// }), false);
// assertStrictEq(isIPv4({ toString: () => '127.0.0.1' }), true);
// assertStrictEq(isIPv4({ toString: () => 'bla' }), false);

// assertStrictEq(isIPv6(), false);
// assertStrictEq(isIPv6(null), false);
// assertStrictEq(isIPv6(123), false);
// assertStrictEq(isIPv6(true), false);
// assertStrictEq(isIPv6({}), false);
// assertStrictEq(isIPv6({
//   toString: () => '::2001:252:1:255.255.255.255'
// }), true);
// assertStrictEq(isIPv6({ toString: () => '127.0.0.1' }), false);
// assertStrictEq(isIPv6({ toString: () => 'bla' }), false);
