import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchUser, session } from "services/authentication";
import { useSnapshot } from "valtio";

export function useSessionRedirects(redirect) {
  const router = useRouter();
  const authPath = redirect?.to || 'auth/login';

  function toLogin() {
    const to = Buffer.from(router.asPath, "utf8").toString("base64");
    router.push(`${authPath}?intended=${to}`);
  }

  function fromLogin() {
    const from = router.query.intended
      ? Buffer.from(router.query.intended, "base64").toString("utf8")
      : "/";
    router.push(from);
  }

  return {
    fromLogin,
    toLogin,
  };
}

const useSession = (redirect) => {
  const state = useSnapshot(session);
  const { toLogin } = useSessionRedirects(redirect);

  useEffect(() => {
    if ((session.token || redirect) && !session.user) {
      fetchUser().catch(() => {
        if (!!redirect) {
          toLogin();
        }
      });
    }
  }, [session.user, session.token]);

  return {
    ...state,
    refresh: fetchUser,
  };
};

export default useSession;
