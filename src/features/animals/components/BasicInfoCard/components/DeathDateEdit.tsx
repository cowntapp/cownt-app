import { Button } from '@/shadcn/components/ui/button';
import { Calendar } from '@/shadcn/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover';
import { cn } from '@/shadcn/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Save, Trash2, XCircle } from 'lucide-react';
import { ca } from 'react-day-picker/locale';

interface DeathDateEditProps {
  tempValue: string;
  onValueChange: (value: string) => void;
  hasChanges: boolean;
  hasValidationError: boolean;
  validationError: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export const DeathDateEdit = ({
  tempValue,
  onValueChange,
  hasChanges,
  hasValidationError,
  validationError,
  onSave,
  onCancel,
}: DeathDateEditProps) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between w-fit gap-2">
          <Button
            variant="outline"
            size={'icon'}
            onClick={onSave}
            disabled={!hasChanges || hasValidationError}
          >
            <Save className="w-4 h-4" />
          </Button>
          {tempValue && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onValueChange('')}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size={'icon'}
            onClick={onCancel}
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
        {validationError && (
          <p className="text-sm text-red-500 mt-1">{validationError}</p>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-fit pl-3 text-left font-normal',
                !tempValue && 'text-muted-foreground',
                hasValidationError && 'border-red-500 focus:border-red-500'
              )}
            >
              {tempValue ? (
                format(new Date(Number(tempValue)), 'PPP', {
                  locale: ca,
                })
              ) : (
                <span>Escull una data</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
          >
            <Calendar
              mode="single"
              locale={ca}
              selected={tempValue ? new Date(Number(tempValue)) : undefined}
              onSelect={(date) => {
                if (date) {
                  const timestamp = date.getTime();
                  onValueChange(timestamp.toString());
                } else {
                  onValueChange('');
                }
              }}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
