import axios from "axios";
import { useEffect } from "react";

import HomeFeature from "../../features/app/home";
import useScrollToTop from "src/hooks/useScrollToTop";

export default function Home() {
  useScrollToTop();

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/api/v1/auth/login/success",
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      console.log(99);
    } catch (error) {
      console.log(9);
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <HomeFeature />;
}
