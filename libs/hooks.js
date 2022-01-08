import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return {
        user: data.user || null,
        isLoggedIn: data.isLoggedIn || null,
      };
    });

export function useUser(redirectTo) {
  const router = useRouter();
  const { data, error } = useSWR("/api/auth", fetcher);
  const user = data && data.user;
  const isLoggedIn = data && data.isLoggedIn;
  const finished = Boolean(data);
  const hasUser = Boolean(user);
  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (redirectTo && !hasUser) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, user, hasUser]);

  return { user, isLoggedIn };
}
