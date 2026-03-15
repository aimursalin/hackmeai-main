"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  onClick?: () => void;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  onClick?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
  selectedIndex?: number | null;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
  selectedIndex = null,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(selectedIndex);
  const outsideClickRef = React.useRef(null);

  React.useEffect(() => {
    setSelected(selectedIndex);
  }, [selectedIndex]);

  useOnClickOutside(outsideClickRef, () => {
    // We don't necessarily want to deselect on outside click for a persistent navbar,
    // but I'll keep the prop logic if needed.
    // setSelected(null);
    // onChange?.(null);
  });

  const handleSelect = (index: number, tab: Tab) => {
    setSelected(index);
    onChange?.(index);
    tab.onClick?.();
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border/40" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-background/40 backdrop-blur-md p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = (tab as Tab).icon;
        return (
          <motion.button
            key={(tab as Tab).title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index, tab as Tab)}
            transition={transition as any}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-muted/80", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition as any}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {(tab as Tab).title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
