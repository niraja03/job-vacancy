import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-8 w-12", className)}>
      <Image
        src="https://png.pngtree.com/png-vector/20210618/ourmid/pngtree-job-vacancy-join-our-team-vector-png-design-png-image_3471566.jpg"
        alt="Gramin Jobs Connect Logo"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}
