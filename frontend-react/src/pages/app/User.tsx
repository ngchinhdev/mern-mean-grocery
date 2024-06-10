import useScrollToTop from "src/hooks/useScrollToTop";
import UserFeature from "../../features/app/user";

export default function User() {
  useScrollToTop();

  return <UserFeature />;
}
