import type { ApiError } from '@/api/lib/ApiError';
import { resetPassword } from '@/features/user/resetPassword/actions/resetPassword';
import { ResetPasswordForm } from '@/features/user/resetPassword/ResetPasswordForm';
import type { ResetPasswordFormSchema } from '@/features/user/resetPassword/schema/resetPasswordFormSchema';
import { AppMessage } from '@/shared/components/AppMessage';
import { i18n_errors } from '@/shared/translations/translations';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      navigate('/', { replace: true });
    }
  }, [code, navigate]);

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onError: (error: ApiError) => {
      const message =
        error.status && error.status !== 500 ? error.message : i18n_errors[500];
      toast.error(message);
    },
  });

  const handleSubmit = (formData: ResetPasswordFormSchema) => {
    resetPasswordMutation.mutate({
      password: formData.password,
      verificationCode: code!,
    });
  };

  return (
    <div className="w-full h-full max-w-sm m-auto">
      {!resetPasswordMutation.isSuccess && (
        <ResetPasswordForm
          isPending={resetPasswordMutation.isPending}
          onUserSubmit={handleSubmit}
        />
      )}
      {resetPasswordMutation.isSuccess && (
        <AppMessage
          title="Contrasenya canviada correctament!"
          linkLabel="Inicia sessió"
          linkPath="/login"
        />
      )}
    </div>
  );
};
