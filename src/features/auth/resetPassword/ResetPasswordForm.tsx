import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader } from '@/components/Loader/Loader';
import {
  resetPasswordFormSchema,
  type ResetPasswordFormSchema,
} from './schema/resetPasswordFormSchema';
import { ResetPasswordHeader } from './components/ResetPasswordHeader';
import { GoBackSection } from '../forgotPassword/components/GoBackSection';

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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="pass123"
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="pass123"
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

            <GoBackSection />
          </div>
        </form>
      </Form>
    </div>
  );
};
