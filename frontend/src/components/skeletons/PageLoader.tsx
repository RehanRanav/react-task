import { Spinner } from "./Spinner";

export const PageLoader = () => {
  return (
    <div className="absolute inset-x-0 inset-y-0 bg-black opacity-40 flex">
      <Spinner />
    </div>
  );
};
