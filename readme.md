# isIP

[![tag](https://img.shields.io/github/tag/ako-deno/isIP.svg)](https://github.com/ako-deno/isIP/tags)
![isIP-ci](https://github.com/ako-deno/isIP/workflows/isIP-ci/badge.svg)
[![HitCount](http://hits.dwyl.com/ako-deno/isIP.svg)](http://hits.dwyl.com/ako-deno/isIP)

IP address detector for Deno.

# Usage

```javascript
import { isIPv4, isIPv6, isIP } from "https://deno.land/x/isIP/mod.ts";

isIPv4("192.168.0.2"); // true
isIPv4("168.0.2"); // false
isIPv4("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // false

isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // true
isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370"); // false
isIPv6("192.168.0.2"); // false

isIP("192.168.0.2"); // 4
isIP("168.0.2"); // 0
isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // 6
isIP("2001:0db8:85a3:0000:0000:8a2e:0370"); // 0
```

# API

- **isIPv4(input: string): boolean**

  Returns true if input is a version 4 IP address, otherwise returns false. It should be compatible with Node.js' [net.isIPv4](https://nodejs.org/dist/latest-v14.x/docs/api/net.html#net_net_isipv4_input).

- **isIPv6(input: string): boolean**
  
  Returns true if input is a version 6 IP address, otherwise returns false. It should be compatible with Node.js' [net.isIPv6](https://nodejs.org/dist/latest-v14.x/docs/api/net.html#net_net_isipv6_input).

- **isIP(input: string): number**

  Tests if input is an IP address. Returns 0 for invalid strings, returns 4 for IP version 4 addresses, and returns 6 for IP version 6 addresses. It should be compatible with Node.js' [net.isIP](https://nodejs.org/dist/latest-v14.x/docs/api/net.html#net_net_isip_input).

Any incompatibility, please check [net_isip_test.ts](./test/net_isip_test.ts)

# License

[MIT](./LICENSE)
