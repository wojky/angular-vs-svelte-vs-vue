import { ref, computed, watch } from "vue";
import { useUserState } from "./useUserState";
import { useRouter, type Router } from "vue-router";
import { login, logout, verifyToken as verify_token } from "./useAuthApi";

export const AuthStateStatus = {
  INIT: "INIT",
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
  AUTHENTICATED: "AUTHENTICATED",
} as const;

export type AuthStateStatus = keyof typeof AuthStateStatus;

export type AuthState =
  | { status: (typeof AuthStateStatus)["INIT"] }
  | { status: (typeof AuthStateStatus)["NOT_AUTHENTICATED"] }
  | { status: (typeof AuthStateStatus)["AUTHENTICATED"] };

const { setUser } = useUserState();

const authState = ref<AuthState>({ status: "INIT" });

const state = computed(() => {
  return {
    auth: authState.value,
  };
});

export function watchAuthStatus(router: Router) {
  watch(
    () => state.value.auth.status,
    (status) => {
      if (["AUTHENTICATED", "NOT_AUTHENTICATED"].includes(status)) {
        router.push({ path: "/" });
      }
    }
  );
}

export function verifyToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  verify_token(token).then((verified) => {
    if (verified) {
      localStorage.setItem("token", verified.token);
    }

    setUser(verified?.user || null);

    authState.value.status = token
      ? AuthStateStatus.AUTHENTICATED
      : AuthStateStatus.NOT_AUTHENTICATED;
  });
}

export function useAuthState() {
  return {
    state,
    login(email: string, password: string) {
      login(email, password).then(({ user, token }) => {
        localStorage.setItem("token", token);

        setUser(user);
        authState.value.status = AuthStateStatus.AUTHENTICATED;
      });
    },
    logout() {
      logout().then(() => {
        localStorage.removeItem("token");

        setUser(null);
        authState.value.status = AuthStateStatus.NOT_AUTHENTICATED;
      });
    },
  };
}
