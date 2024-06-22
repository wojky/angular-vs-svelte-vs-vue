import { ref, computed } from "vue";

export type UserInfo = {
  role: string;
  email: string;
  watchList: number[];
  subscribed: boolean;
};

const user = ref<UserInfo | null>(null);

const state = computed(() => {
  return {
    user: user.value,
  };
});

export function useUserState() {
  return {
    state,
    setUser: (info: UserInfo | null) => {
      user.value = info;
    },
  };
}
