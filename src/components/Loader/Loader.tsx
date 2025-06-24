import './Loader.css';

export const Loader = () => {
  return (
    <div className="flex justify-center">
      <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    </div>
  );
};
