import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="grid xl:grid-cols-4 gap-3 py-2">
      {new Array(20).fill(0).map((_, index) => (
        <div key={index} className="col-span-1">
          <Skeleton className="w-full h-32" />
        </div>
      ))}
    </div>
  );
}
