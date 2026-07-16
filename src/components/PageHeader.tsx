import React from "react";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

export default function PageHeader({ eyebrow, title, description, className }: Props) {
  return (
    <div className={className}>
      <div className="space-y-4">
        {eyebrow && (
          <div className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
            {eyebrow}
          </div>
        )}

        <div>
          <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-white">{title}</h1>
          {description && (
            <p className="max-w-3xl text-base sm:text-xl leading-7 sm:leading-9 text-slate-400 mt-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
