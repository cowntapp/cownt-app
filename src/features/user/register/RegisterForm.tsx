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
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirma Contrasenya</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Cownt123!"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
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
