"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

type FilterOption = {
  value: string;
  label: string;
};

type FilterRow = {
  label: string;
  options: FilterOption[];
  active: string;
  param: string;
};

type WorkFiltersProps = {
  serviceRow: FilterRow;
  industryRow: FilterRow;
};

function Chip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300",
        isActive
          ? "border-accent bg-accent text-background"
          : "border-gray-500 text-gray-100 hover:border-accent hover:text-accent",
      )}
    >
      {label}
    </button>
  );
}

function FilterRowChips({ row }: { row: FilterRow }) {
  const router = useRouter();

  const apply = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "all" || value === row.active) {
      params.delete(row.param);
    } else {
      params.set(row.param, value);
    }
    const query = params.toString();
    router.replace(`/work${query ? `?${query}` : ""}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="w-24 shrink-0 text-xs uppercase tracking-[0.25em] text-gray-300">
        {row.label}
      </span>
      <div className="flex flex-wrap gap-2">
        <Chip
          label="All"
          isActive={row.active === "all"}
          onClick={() => apply("all")}
        />
        {row.options.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            isActive={row.active === option.value}
            onClick={() => apply(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

export function WorkFilters({ serviceRow, industryRow }: WorkFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <FilterRowChips row={serviceRow} />
      <FilterRowChips row={industryRow} />
    </div>
  );
}