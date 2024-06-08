import { useEffect } from "react";
import { Link } from "react-router-dom";

import { hideBackButton } from "../lib/telegram";
import { Button, Checkbox } from "../components";

const HomaPage = () => {
  useEffect(() => {
    hideBackButton();
  }, []);

  return (
    <div className="space-y-8 mt-20">
      <div>
        <p className="text-6xl">Find your love</p>
        <p className="text-6xl font-bold">easily & quickly</p>
      </div>
      <p>
        Our date app is the perfect way to find your first love or interesting
        expierence.
      </p>

      <div className="flex flex-col space-y-2 items-center justify-center">
        <Link className="w-full" to="/create-profile">
          <Button className="w-full">Start</Button>
        </Link>
        <Checkbox label="I am more than 18 years" />
      </div>
    </div>
  );
};

export default HomaPage;
