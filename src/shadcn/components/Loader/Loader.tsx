import { CowIcon } from '@/features/animals/components/icons/CowIcon';
import './Loader.css';
import { cn } from '@/shadcn/lib/utils';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn('my-2', className)}>
      <CowIcon
        className={cn('animate-spin [animation-duration:1.5s] w-full')}
        size={60}
      />
    </div>
    // <div className={`flex justify-center ${className}`}>
    //   <div className="loader-container">
    //     <div className="loader-dot"></div>
    //     <div className="loader-dot"></div>
    //     <div className="loader-dot"></div>
    //     <div className="loader-dot"></div>
    //   </div>
    // </div>
  );
};
