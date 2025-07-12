import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/components/ui/button';
import { useForm } from 'react-hook-form';
import createAnimalSchema, {
  type CreateAnimalSchema,
} from '../../schemas/createAnimalSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { Loader } from '@/shadcn/components/Loader/Loader';
import type { CreateAnimalPayload } from '../../actions/createAnimal';
import { ABSENCE, ORIGIN, SEX } from '../../consts/animal.consts';
import type { ReactNode } from 'react';
import type { Breed } from '../../breeds/interface/breed';
import type { Characteristic } from '../../characteristics/interface/characteristic';
import { i18n_absenceLabels } from '@/shared/translations/translations';
import { CalendarIcon, ChevronDown, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover';

import { format } from 'date-fns';
import { Calendar } from '@/shadcn/components/ui/calendar';
import { ca } from 'react-day-picker/locale';

interface NewAnimalFormProps {
  isPending: boolean;
  onAnimalSubmit: (animal: CreateAnimalPayload) => void;
  className?: string;
  origin?: ORIGIN | null;
  motherId?: string | null;
  children?: ReactNode;
  breeds: Breed[];
  characteristics: Characteristic[];
  isLoadingBreeds?: boolean;
  isLoadingCharacteristics?: boolean;
}

export const NewAnimalForm = ({
  isPending,
  onAnimalSubmit,
  className,
  origin,
  motherId,
  children,
  breeds,
  characteristics,
  isLoadingBreeds = false,
  isLoadingCharacteristics = false,
  ...props
}: NewAnimalFormProps & React.ComponentProps<'div'>) => {
  const form = useForm<CreateAnimalSchema>({
    mode: 'onTouched',
    resolver: zodResolver(createAnimalSchema),
    defaultValues: {
      longCode: '',
      breed: '',
      sex: undefined,
      birthDate: undefined,
      weight: undefined,
      origin: origin ?? undefined,
      buyPrice: undefined,
      salePrice: undefined,
      absence: null,
      characteristics: undefined,
      mother: motherId || undefined,
    },
  });

  const isSubmitButtonDisabled = !form.formState.isValid || isPending;

  const onSubmit = (animal: CreateAnimalSchema) => {
    // Transform data to match CreateAnimalPayload
    const payload: CreateAnimalPayload = {
      ...animal,
      // Ensure fields are properly set or undefined
      birthDate: animal.birthDate || undefined,
      weight: animal.weight || undefined,
      buyPrice: animal.buyPrice || undefined,
      salePrice: animal.salePrice || undefined,
      characteristics: animal.characteristics?.length
        ? animal.characteristics
        : undefined,
      mother: animal.mother || undefined,
      children: animal.children?.length ? animal.children : undefined,
    };
    onAnimalSubmit(payload);
  };

  return (
    <div
      className={cn('max-w-xl flex flex-col gap-6', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Header */}
            {children}

            {/* Form Fields */}
            <div className="flex flex-col gap-6">
              {/* Sección 0: Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Estat</h3>

                {/* Absence */}
                <FormField
                  control={form.control}
                  name="absence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estat de l'Animal</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          // Convert "present" string back to null
                          field.onChange(value === 'present' ? null : value);
                        }}
                        value={field.value === null ? 'present' : field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona l'estat" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          {Object.values(ABSENCE).map((absenceValue) => (
                            <SelectItem
                              key={absenceValue}
                              value={absenceValue}
                            >
                              {i18n_absenceLabels[absenceValue]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sección 1: Información Básica */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informació Bàsica</h3>

                {/* Long Code */}
                <FormField
                  control={form.control}
                  name="longCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Codi Llarg *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ES123456789012"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Breed */}
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raça *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoadingBreeds}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una raça" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {breeds.map((breed) => (
                            <SelectItem
                              key={breed.id}
                              value={breed.id}
                            >
                              {breed.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sex */}
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexe *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el sexe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={SEX.M}>Mascle</SelectItem>
                          <SelectItem value={SEX.F}>Femella</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Weight */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pes (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="450"
                          min="0"
                          max="9999"
                          step="1"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value || undefined);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Birth Date */}
                {/* <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Data de Naixement {origin === 'born' ? '*' : ''}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value
                              ? new Date(Number(field.value))
                                  .toISOString()
                                  .split('T')[0]
                              : ''
                          }
                          onChange={(e) => {
                            const dateValue = e.target.value;
                            if (dateValue) {
                              const timestamp = new Date(dateValue).getTime();
                              field.onChange(timestamp.toString());
                            } else {
                              field.onChange(undefined);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Data de Naixament {origin === 'born' ? '*' : ''}
                      </FormLabel>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(new Date(Number(field.value)), 'PPP', {
                                    locale: ca,
                                  })
                                ) : (
                                  <span>Escull una data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              locale={ca}
                              selected={
                                field.value
                                  ? new Date(Number(field.value))
                                  : undefined
                              }
                              onSelect={(date) => {
                                if (date) {
                                  const timestamp = date.getTime();
                                  field.onChange(timestamp.toString());
                                } else {
                                  field.onChange(undefined);
                                }
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        {field.value && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => field.onChange(undefined)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Origin */}
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origen *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!!origin} // Disabled if origin is pre-set
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona l'origen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ORIGIN.BOUGHT}>
                            Comprada
                          </SelectItem>
                          <SelectItem value={ORIGIN.BORN}>Nascuda</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sección 2: Información Financiera */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informació Financera</h3>

                {/* Buy Price */}
                <FormField
                  control={form.control}
                  name="buyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preu de Compra (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1500"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : undefined);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sale Price */}
                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preu de Venda (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2000"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : undefined);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sección 3: Características */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Característiques</h3>{' '}
                {/* Characteristics */}
                <FormField
                  control={form.control}
                  name="characteristics"
                  render={({ field }) => {
                    const handleToggle = (characteristicId: string) => {
                      const currentValues = field.value || [];
                      if (currentValues.includes(characteristicId)) {
                        const newValues = currentValues.filter(
                          (id) => id !== characteristicId
                        );
                        field.onChange(
                          newValues.length > 0 ? newValues : undefined
                        );
                      } else {
                        field.onChange([...currentValues, characteristicId]);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>Característiques</FormLabel>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                              disabled={isLoadingCharacteristics}
                              type="button"
                            >
                              Selecciona característiques
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="w-full"
                            align="end"
                          >
                            {characteristics.map((characteristic) => (
                              <DropdownMenuCheckboxItem
                                key={characteristic.id}
                                checked={
                                  field.value?.includes(characteristic.id) ??
                                  false
                                }
                                onCheckedChange={() =>
                                  handleToggle(characteristic.id)
                                }
                              >
                                {characteristic.value}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Display selected characteristics */}
                        {field.value && field.value.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {field.value.map((charId) => {
                              const characteristic = characteristics.find(
                                (c) => c.id === charId
                              );
                              return characteristic ? (
                                <div
                                  key={charId}
                                  className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                                >
                                  {characteristic.value}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newValues = (
                                        field.value || []
                                      ).filter((id) => id !== charId);
                                      field.onChange(
                                        newValues.length > 0
                                          ? newValues
                                          : undefined
                                      );
                                    }}
                                    className="ml-1 text-muted-foreground hover:text-foreground"
                                  >
                                    ×
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {isPending && <Loader />}

              <Button
                type="submit"
                className={`${isPending && 'hidden'}`}
                disabled={isSubmitButtonDisabled}
              >
                {origin === 'born'
                  ? 'Registrar Part'
                  : origin === 'bought'
                  ? 'Registrar Compra'
                  : 'Crear Animal'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
