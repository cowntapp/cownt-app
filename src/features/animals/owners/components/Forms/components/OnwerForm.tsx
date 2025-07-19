import { useForm } from 'react-hook-form';
import { ownerSchema, type OwnerFormData } from '../../../schemas/ownerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Loader } from '@/shadcn/components/Loader';
import { Button } from '@/shadcn/components/ui/button';

interface OwnerFormProps {
  submitLabel: string;
  onSubmit: (data: OwnerFormData) => void;
  isMutating: boolean;
  defaultValues?: OwnerFormData;
}

const defaultEmptyValues: OwnerFormData = {
  value: '',
};

export const OwnerForm = ({
  submitLabel,
  onSubmit,
  isMutating,
  defaultValues = defaultEmptyValues,
}: OwnerFormProps) => {
  const form = useForm<OwnerFormData>({
    mode: 'onTouched',
    resolver: zodResolver(ownerSchema),
    defaultValues,
  });

  const handleOnSubmit = (data: OwnerFormData) => {
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
              <FormLabel>Nom de Propietari</FormLabel>
              <FormControl>
                <Input
                  placeholder="Joan"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                No pot haver-hi propietaris duplicats
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
