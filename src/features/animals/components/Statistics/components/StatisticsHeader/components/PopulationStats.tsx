interface PopulationStatsProps {
  totalReproductiveAnimals: number;
  totalOnePlusBirthAnimals: number;
  totalZeroBirthAnimals: number;
}

export const PopulationStats = ({
  totalReproductiveAnimals,
  totalOnePlusBirthAnimals,
  totalZeroBirthAnimals,
}: PopulationStatsProps) => {
  return (
    <div className="grid grid-cols-1 justify-between sm:grid-cols-3 space-y-4">
      <div className="">
        <h1 className="font-bold">Total Reproductives</h1>
        <p className="text-primary">{totalReproductiveAnimals}</p>
      </div>

      <div className="">
        <h1 className="font-bold">Total 1+ Parts</h1>
        <p className="text-primary">{totalOnePlusBirthAnimals}</p>
      </div>

      <div className="">
        <h1 className="font-bold">Total Novelles</h1>
        <p className="text-primary">{totalZeroBirthAnimals}</p>
      </div>
    </div>
  );
};
