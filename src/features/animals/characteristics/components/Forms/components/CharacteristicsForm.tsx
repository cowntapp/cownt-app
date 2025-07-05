import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AnimalPath } from '../../../../interfaces/animalType';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { Button } from '@/shadcn/components/ui/button';
import { Loader } from '@/shadcn/components/Loader/Loader';
import {
  characteristicSchema,
  type CharacteristicFormData,
} from '../../../schemas/characteristicSchema';

interface CharacteristicFormProps {
  animalType: AnimalPath;
  submitLabel: string;
  onSubmit: (data: CharacteristicFormData) => void;
  isMutating: boolean;
  defaultValues?: CharacteristicFormData;
}

const defaultEmptyValues: CharacteristicFormData = {
  value: '',
};

export const CharacteristicsForm = ({
  submitLabel,
  onSubmit,
  isMutating,
  defaultValues = defaultEmptyValues,
}: CharacteristicFormProps) => {
  const form = useForm<CharacteristicFormData>({
    mode: 'onTouched',
    resolver: zodResolver(characteristicSchema),
    defaultValues,
  });

  const handleOnSubmit = (data: CharacteristicFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de Característica</FormLabel>
              <FormControl>
                <Input
                  placeholder="Bona Mare"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                No pot haver-hi característiques duplicades
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isMutating ? <Loader /> : <Button type="submit">{submitLabel}</Button>}
      </form>
    </Form>
  );
};
