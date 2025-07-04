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
  resetPasswordFormSchema,
  type ResetPasswordFormSchema,
} from './schema/resetPasswordFormSchema';
import { ResetPasswordHeader } from './components/ResetPasswordHeader';
import { ForgotPasswordFooter } from '../forgotPassword/components/ForgotPasswordFooter';

interface ResetPasswordFormProps {
  isPending: boolean;
  onUserSubmit: (formData: ResetPasswordFormSchema) => void;
}

export const ResetPasswordForm = ({
  isPending,
  onUserSubmit,
  className,
  ...props
}: ResetPasswordFormProps & React.ComponentProps<'div'>) => {
  const form = useForm<ResetPasswordFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const isSubmitButtonDisabled = !form.formState.isValid || isPending;

  const onSubmit = (formData: ResetPasswordFormSchema) => {
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
            <ResetPasswordHeader />
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contrasenya</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Cownt123!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirma Contrasenya</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Cownt123!"
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
                Canvia contrasenya
              </Button>
            </div>

            <ForgotPasswordFooter />
          </div>
        </form>
      </Form>
    </div>
  );
};
