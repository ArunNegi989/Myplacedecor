"use client";

import Button from "@/components/common/Button";
import { useEnquiry } from "@/components/common/EnquiryProvider";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, "onClick" | "href" | "children"> & {
  label?: string;
  /** Pre-selects this service in the enquiry form */
  service?: string;
};

/** Small client wrapper so server sections can open the enquiry modal. */
export default function EnquireButton({ label = "Enquire Now", variant = "light", service, ...rest }: Props) {
  const { openEnquiry } = useEnquiry();
  return (
    <Button variant={variant} onClick={() => openEnquiry(service)} {...rest}>
      {label}
    </Button>
  );
}
