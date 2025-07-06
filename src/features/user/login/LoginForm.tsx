import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
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
import { LoginFooter } from './components/LoginFooter';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

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
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                        placeholder="correu@exemple.com"
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
                    <FormLabel>Contrasenya</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Cownt123!"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
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
                Inicia sessió
              </Button>

              <LoginFooter />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
