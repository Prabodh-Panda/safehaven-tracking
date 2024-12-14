import LocationPage from "@/components/LocationPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LocationPage />
    </Suspense>
  );
};

export default Page;
