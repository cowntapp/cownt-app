import type { ApiError } from '@/api/lib/ApiError';
import { sendPasswordResetEmail } from '@/features/user/forgotPassword/actions/sendPasswordResetEmail';
import { ForgotPasswordForm } from '@/features/user/forgotPassword/components/ForgotPasswordForm';
import type { ForgotPasswordRequest } from '@/features/user/interfaces/Auth';
import { AppMessage } from '@/shared/components/AppMessage';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const ForgotPassword = () => {
  const handleSubmit = (data: ForgotPasswordRequest) => {
    forgotPasswordMutation.mutate(data);
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: sendPasswordResetEmail,
    onError: (error: ApiError) => {
      const message =
        error.status && error.status !== 500
          ? error.message
          : 'Something went wrong';
      toast.error(message);
    },
  });

  return (
    <div className="w-full h-full max-w-sm m-auto">
      {!forgotPasswordMutation.isSuccess && (
        <ForgotPasswordForm
          isPending={forgotPasswordMutation.isPending}
          onUserSubmit={handleSubmit}
        />
      )}

      {forgotPasswordMutation.isSuccess && (
        <AppMessage
          title="Email sent!"
          description="Check your inbox for further instructions."
        />
      )}
    </div>
  );
};
