import { cn } from "@/lib/utils";

type WaveDividerProps = {
  className?: string;
  flip?: boolean;
};

/** Subtle hills/wave motif inspired by the OHS logo. */
export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <div
      className={cn("w-full overflow-hidden leading-none text-ohs-sky", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className={cn("block h-10 w-full sm:h-14", flip && "rotate-180")}
      >
        <path
          fill="currentColor"
          fillOpacity="0.28"
          d="M0,40 C180,8 360,56 540,32 C720,8 900,48 1080,28 C1200,16 1320,8 1440,24 L1440,64 L0,64 Z"
        />
        <path
          fill="#00548B"
          fillOpacity="0.14"
          d="M0,48 C200,24 400,56 600,40 C800,24 1000,52 1200,36 C1320,28 1380,24 1440,32 L1440,64 L0,64 Z"
        />
      </svg>
    </div>
  );
}
