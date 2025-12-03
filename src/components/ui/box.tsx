import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const boxVariants = cva(
  "flex rounded-md transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      direction: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      direction: "vertical",
      align: "stretch",
      justify: "start",
    },
  }
)

// Helper untuk mengubah angka → unit px/rem/em
const toCss = (v?: number | string, unit: "px" | "rem" | "em" = "px") => {
  if (v == null) return undefined
  if (typeof v === "string") return v
  return `${v}${unit}`
}

interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean
  unit?: "px" | "rem" | "em"
  gap?: number | string
  p?: number | string
  m?: number | string
  // extra spacing props
  mt?: number | string
  mb?: number | string
  ml?: number | string
  mr?: number | string
  pt?: number | string
  pb?: number | string
  pl?: number | string
  pr?: number | string
}

function Box({
  asChild = false,
  direction,
  align,
  justify,
  unit = "px",
  gap,
  p,
  m,
  mt,
  mb,
  ml,
  mr,
  pt,
  pb,
  pl,
  pr,
  className,
  style,
  ...props
}: BoxProps) {
  const Comp = asChild ? Slot : "div"

  const spacing = {
    ...(gap !== undefined ? { gap: toCss(gap, unit) } : {}),
    ...(p !== undefined ? { padding: toCss(p, unit) } : {}),
    ...(m !== undefined ? { margin: toCss(m, unit) } : {}),

    // margin
    ...(mt !== undefined ? { marginTop: toCss(mt, unit) } : {}),
    ...(mb !== undefined ? { marginBottom: toCss(mb, unit) } : {}),
    ...(ml !== undefined ? { marginLeft: toCss(ml, unit) } : {}),
    ...(mr !== undefined ? { marginRight: toCss(mr, unit) } : {}),

    // padding
    ...(pt !== undefined ? { paddingTop: toCss(pt, unit) } : {}),
    ...(pb !== undefined ? { paddingBottom: toCss(pb, unit) } : {}),
    ...(pl !== undefined ? { paddingLeft: toCss(pl, unit) } : {}),
    ...(pr !== undefined ? { paddingRight: toCss(pr, unit) } : {}),
  }

  return (
    <Comp
      data-slot="box"
      className={cn(boxVariants({ direction, align, justify }), className)}
      style={{ ...spacing, ...style }}
      {...props}
    />
  )
}

export { Box, boxVariants }
