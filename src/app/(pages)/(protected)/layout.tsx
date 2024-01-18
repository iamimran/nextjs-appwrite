"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authStatus } = useAuth();
  console.log(authStatus);
  if (!authStatus) {
    router.replace("/login");
    return <></>;
  }

  return children;
};

export default ProtectedLayout;
