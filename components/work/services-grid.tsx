import { ServiceCard } from "@/components/work/service-card";
import { services } from "@/lib/services";
import { cn } from "@/lib/cn";

const columnOffsets = [
  "",
  "lg:translate-y-6 xl:translate-y-10",
  "lg:translate-y-12 xl:translate-y-20",
];

export function ServicesGrid({
  className,
  columns = 3,
}: {
  className?: string;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        className,
      )}
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.slug}
          service={service}
          index={index}
          className={cn(
            index % 2 === 1 && "md:translate-y-6",
            columns === 3 && columnOffsets[index % 3],
          )}
        />
      ))}
    </div>
  );
}