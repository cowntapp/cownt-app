import { useForm } from 'react-hook-form';
import { breedSchema, type BreedFormData } from '../../../schemas/breedSchema';
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

interface BreedsFormProps {
  animalType: AnimalPath;
  submitLabel: string;
  onSubmit: (data: BreedFormData) => void;
  isMutating: boolean;
  defaultValues?: BreedFormData;
}

const defaultEmptyValues: BreedFormData = {
  value: '',
};

export const BreedsForm = ({
  submitLabel,
  onSubmit,
  isMutating,
  defaultValues = defaultEmptyValues,
}: BreedsFormProps) => {
  const form = useForm<BreedFormData>({
    mode: 'onTouched',
    resolver: zodResolver(breedSchema),
    defaultValues,
  });

  const handleOnSubmit = (data: BreedFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de Raça</FormLabel>
              <FormControl>
                <Input
                  placeholder="Xarolesa"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                No pot haver-hi races duplicades
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
