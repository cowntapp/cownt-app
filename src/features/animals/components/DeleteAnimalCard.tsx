import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/shadcn/components/ui/alert';
import { Button } from '@/shadcn/components/ui/button';
import { DialogHeader, DialogFooter } from '@/shadcn/components/ui/dialog';
import { Input } from '@/shadcn/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/shadcn/components/ui/dialog';
import { Label } from '@/shadcn/components/ui/label';
import { AlertCircle, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shadcn/lib/utils';

interface DeleteAnimalCardProps {
  longCode: string;
  onDeleteAnimal: () => void;
  isPending: boolean;
}

export const DeleteAnimalCard = ({
  longCode,
  onDeleteAnimal,
  isPending,
}: DeleteAnimalCardProps) => {
  const [value, setValue] = useState('');

  return (
    <Dialog onOpenChange={() => setValue('')}>
      <Alert variant={'destructive'}>
        <AlertCircle />
        <AlertTitle>Zona de perill</AlertTitle>
        <AlertDescription className="space-y-2">
          <TypoLead className="text-base">
            Acció crítica. Pot suposar canvis irreversibles en altres animals!
          </TypoLead>
          <DialogTrigger asChild>
            <Button variant={'destructive'}>Eliminar animal</Button>
          </DialogTrigger>
        </AlertDescription>
      </Alert>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Acció Crítica!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Les estadístiques que depenen d'aquest animal es veuran afectades.
        </DialogDescription>
        <DialogDescription>
          Si vols marcar l'animal com a no present, has de canvair el seu estat
          en comptes d'eliminar-lo
        </DialogDescription>
        <DialogDescription>
          Per continuar eliminant, entra el{' '}
          <span className="font-semibold">codi llarg</span> de l'animal:
        </DialogDescription>
        <DialogFooter>
          <div className="flex flex-col gap-y-2 w-full">
            <Label>{longCode}</Label>
            <Input
              placeholder={longCode}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="flex justify-between">
              <Button
                variant={'destructive'}
                disabled={isPending}
                onClick={() => {
                  if (value === longCode) {
                    onDeleteAnimal();
                  }
                }}
              >
                <span
                  className={cn(
                    isPending
                      ? 'text-transparent selection:text-transparent'
                      : 'text-inherit'
                  )}
                >
                  Eliminar Definitivament
                </span>
                <RotateCw
                  className={cn(
                    'absolute animate-spin',
                    isPending ? 'block' : 'hidden'
                  )}
                />
              </Button>
              <DialogClose asChild>
                <Button>Cancelar</Button>
              </DialogClose>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
