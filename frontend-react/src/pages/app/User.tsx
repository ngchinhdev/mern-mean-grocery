import useScrollToTop from "src/hooks/useScrollToTop";

import UserFeature from "src/features/app/user";
import useAuth from "src/hooks/useAuth";

export default function User() {
  useAuth(false);

  useScrollToTop();

  return <UserFeature />;
}
