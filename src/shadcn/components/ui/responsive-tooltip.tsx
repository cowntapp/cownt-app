import * as React from 'react';
import { useIsMobile } from '@/shadcn/hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shadcn/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover';

interface ResponsiveTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  contentClassName?: string;
}

export function ResponsiveTooltip({
  children,
  content,
  side = 'top',
  className,
  contentClassName,
}: ResponsiveTooltipProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  // En móviles, usamos un Popover que se puede controlar con click/tap
  if (isMobile) {
    return (
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <div
            className={className}
            role="button"
            tabIndex={0}
            aria-label="Mostrar información adicional"
            aria-expanded={isOpen}
            onKeyDown={handleKeyDown}
          >
            {children}
          </div>
        </PopoverTrigger>
        <PopoverContent
          side={side}
          className={`w-auto p-2 ${contentClassName || ''}`}
          sideOffset={5}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onEscapeKeyDown={() => setIsOpen(false)}
        >
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  // En desktop, usamos el tooltip normal con hover (comportamiento estándar)
  return (
    <Tooltip>
      <TooltipTrigger
        asChild
        className={className}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className={contentClassName}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
