"use client";

import Button from "@/components/common/Button";
import { useEnquiry } from "@/components/common/EnquiryProvider";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, "onClick" | "href" | "children"> & { label?: string };

/** Small client wrapper so server sections can open the enquiry modal. */
export default function EnquireButton({ label = "Enquire Now", variant = "light", ...rest }: Props) {
  const { openEnquiry } = useEnquiry();
  return (
    <Button variant={variant} onClick={() => openEnquiry()} {...rest}>
      {label}
    </Button>
  );
}
