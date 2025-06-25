import { cn } from '@/shadcn/lib/utils';
import { Button, buttonVariants } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { Link } from 'react-router';
import type { LoginUserRequest } from '@/features/user/interfaces/Auth';
import { LoginHeader } from '@/features/user/login/components/LoginHeader';
import { useForm } from 'react-hook-form';
import loginFormSchema, {
  type LoginFormSchema,
} from './schema/LoginFormSchema';
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

interface LoginFormProps {
  isPending: boolean;
  onUserSubmit: (loginUser: LoginUserRequest) => void;
}

export const LoginForm = ({
  isPending,
  onUserSubmit,
  className,
  ...props
}: LoginFormProps & React.ComponentProps<'div'>) => {
  const form = useForm<LoginFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const isSubmitButtonDisabled = !form.formState.isValid || isPending;

  const onSubmit = (loginUser: LoginFormSchema) => {
    onUserSubmit(loginUser);
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <LoginHeader />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="$welcome123!"
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
                Log in
              </Button>
              <Link
                to={'/password/forgot'}
                className={buttonVariants({ variant: 'link', size: 'default' })}
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
