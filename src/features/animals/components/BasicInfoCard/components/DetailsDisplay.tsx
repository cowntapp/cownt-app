interface DetailsDisplayProps {
  details: string | null;
}

export const DetailsDisplay = ({ details }: DetailsDisplayProps) => {
  return (
    <>
      <p className="text-muted-foreground font-semibold my-2">{details}</p>
    </>
  );
};
