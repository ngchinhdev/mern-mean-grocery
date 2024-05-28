import axios from "axios";

import HomeFeature from "../../features/app/home";
import { useEffect } from "react";

export default function Home() {
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
