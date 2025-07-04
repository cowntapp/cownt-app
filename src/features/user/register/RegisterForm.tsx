import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { RegisterHeader } from '@/features/user/register/components/RegisterHeader';
import type { RegisterUserRequest } from '@/features/user/interfaces/Auth';
import { useForm } from 'react-hook-form';
import registerFormSchema, {
  type RegisterFormSchema,
} from './schema/RegisterFormSchema';
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
import { RegisterFooter } from './components/RegisterFooter';

interface RegisterFormProps {
  isPending: boolean;
  onUserSubmit: (registerUser: RegisterUserRequest) => void;
  className?: string;
}

export const RegisterForm = ({
  isPending,
  onUserSubmit,
  className,
  ...props
}: RegisterFormProps & React.ComponentProps<'div'>) => {
  const form = useForm<RegisterFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const isSubmitButtonDisabled = !form.formState.isValid || isPending;

  const onSubmit = (registerUser: RegisterFormSchema) => {
    onUserSubmit(registerUser);
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <RegisterHeader />

            <div className="flex flex-col gap-6">
              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correu@exemple.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PASSWORD */}
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
              {/* CONFIRM PASSWORD */}
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
                Registra&apos;t
              </Button>
            </div>
            <RegisterFooter />
          </div>
        </form>
      </Form>
    </div>
  );
};
