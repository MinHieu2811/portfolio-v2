import { forwardRef } from "react";
import { Spinner } from "@nextui-org/spinner";

export const DogSpinner = () => <Spinner size="md" />;

export const DogContainer = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>(({ children }, ref) => (
  <div
    ref={ref}
    className="voxel-dog relative mt-[-20px] md:mt-[-60px] lg:[-120px] mb-[-40px] md:mb-[-140px] lg:[-200px] w-[280px] md:w-[480px] lg:w-[640px] m-auto h-[280px] md:h-[480px] lg:h-[640px]"
  >
    {children}
  </div>
));

const Loader = () => {
  return (
    <DogContainer>
      <DogSpinner />
    </DogContainer>
  );
};

export default Loader;
