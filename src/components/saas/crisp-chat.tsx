"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("574aacdd-eb14-46f7-bcbd-3b5162f4a51d");
  }, []);

  return null;
};
