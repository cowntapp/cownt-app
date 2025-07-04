import { AppMessage } from '@/shared/components/AppMessage';

export const VerifyEmailInfo = () => {
  return (
    <div className="my-auto">
      <AppMessage
        title="Verifica el teu email"
        description="Consulta el teu email per trobar l'Enllaç de Verificació i segueix les instruccions."
        linkLabel="Inicia sessió"
        linkPath="/login"
      />
    </div>
  );
};
