"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import EnquiryModal from "./EnquiryModal";

type Ctx = { openEnquiry: (service?: string) => void };
const EnquiryContext = createContext<Ctx>({ openEnquiry: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);

/** App-wide providers: reduced-motion handling + the enquiry modal. */
export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<string | undefined>();

  const openEnquiry = useCallback((svc?: string) => {
    setService(svc);
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);

  return (
    <MotionConfig reducedMotion="user">
      <EnquiryContext.Provider value={value}>
        {children}
        <EnquiryModal open={open} service={service} onClose={() => setOpen(false)} />
      </EnquiryContext.Provider>
    </MotionConfig>
  );
}
