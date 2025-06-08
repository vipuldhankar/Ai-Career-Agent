"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
       const router = useRouter();

       return (
              <Button
                     onClick={() => router.push("/")}
                     className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 hover:text-neutral-800 hover:bg-neutral-100 shadow-sm transition"
              >
                     <ArrowLeft className="w-4 h-4" />
                     Back
              </Button>
       );
}
