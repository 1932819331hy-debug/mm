# @tscircuit/mm

```ts
import mm from "@tscircuit/mm"

mm("10mm") // 10
mm("10cm") // 100
mm("10m") // 10000
mm("1in") // 25.4
mm("1ft") // 304.8
```

```bash
npm install -g @tscircuit/mm
```

## Extra Features

```ts
import { mmStr } from "@tscircuit/mm"

mmStr(10) // 10mm
mmStr("0.1in") // 2.54mm
```

`mil2mm` treats numbers and unitless decimal strings as mils (one thousandth
of an inch). Strings with an explicit unit use that unit instead.

```ts
import { mil2mm } from "@tscircuit/mm"

mil2mm(10) // 0.254
mil2mm("10.0") // 0.254
mil2mm("-0.5") // -0.0127
mil2mm("10mm") // 10
```
