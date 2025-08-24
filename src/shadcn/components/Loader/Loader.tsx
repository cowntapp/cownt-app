import { CowIcon } from '@/features/animals/components/icons/CowIcon';
import './Loader.css';
import { cn } from '@/shadcn/lib/utils';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps {
  className?: string;
  size?: Size;
}

export const Loader = ({ className, size = 'md' }: LoaderProps) => {
  const getSize = (size: Size) => {
    switch (size) {
      case 'xs':
        return 14;
      case 'sm':
        return 28;
      case 'md':
        return 60;
      case 'lg':
        return 72;
      case 'xl':
        return 100;

      default:
        return 60;
    }
  };

  return (
    <div className={cn('my-2', className)}>
      <CowIcon
        className={cn('animate-spin [animation-duration:1.5s] w-full')}
        size={getSize(size)}
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
