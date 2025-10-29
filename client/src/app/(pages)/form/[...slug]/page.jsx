"use client"

import Form from "@/app/components/Form/Form";
import { notFound, useParams, useSearchParams } from "next/navigation";

export default function FormPage() {
  const params = useParams();
  const slug = params.slug || [];

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (slug[1] === "add" || slug[1] === "edit") {
    return <Form type={slug[0]} mode={slug[1]} id={id} />;
  }

  return notFound();
}
