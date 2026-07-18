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
      <div className="space-y-3">
        {eyebrow && (
          <div className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            {eyebrow}
          </div>
        )}

        <div>
          <h1 className="mt-2 text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-white">{title}</h1>
          {description && (
            <p className="max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-slate-400 mt-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}