import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "./CardWrapper";

export const ErrorCard = () => {
  return (
    <div className="flex justify-center items-center mt-36">
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/sign-up"
      backButtonLabel="Revert back"
    >
      <div className="w-full flex justify-center items-center">
      <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
    </div>
  );
};