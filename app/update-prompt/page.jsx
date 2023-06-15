"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import CreateOrUpdate from "@components/CreateOrUpdatePrompt";

const CreatePageBasedId = () => {
  const id = useSearchParams().get("id");

  return (
      <CreateOrUpdate id={id} />
  );
};

export default CreatePageBasedId;
