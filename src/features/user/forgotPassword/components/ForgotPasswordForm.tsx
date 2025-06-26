import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Loader } from '@/shadcn/components/Loader/Loader';
import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormSchema,
} from '../schema/ForgotPasswordFormSchema';
import { ForgotPasswordHeader } from './ForgotPasswordHeader';
import { ForgotPasswordFooter } from './ForgotPasswordFooter';

interface ForgotPasswordFormProps {
  isPending: boolean;
  onUserSubmit: (formData: ForgotPasswordFormSchema) => void;
}

export const ForgotPasswordForm = ({
  isPending,
  onUserSubmit,
  className,
  ...props
}: ForgotPasswordFormProps & React.ComponentProps<'div'>) => {
  const form = useForm<ForgotPasswordFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });
  const isSubmitButtonDisabled = !form.formState.isValid || isPending;

  const onSubmit = (formData: ForgotPasswordFormSchema) => {
    onUserSubmit(formData);
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <ForgotPasswordHeader />
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isPending && <Loader />}

              <Button
                type="submit"
                className={`w-full ${isPending && 'hidden'}`}
                disabled={isSubmitButtonDisabled}
              >
                Reset password
              </Button>
            </div>

            <ForgotPasswordFooter />
          </div>
        </form>
      </Form>
    </div>
  );
};
