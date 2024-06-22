import { computed, ref } from "vue";
import { getAll, toggleWatchList, type Episode } from "./useEpisodesApi";
import { useUserState } from "@/auth/data/useUserState";

const episodes = ref<Episode[]>([]);
const { state: userState, setUser } = useUserState();

const state = computed(() => {
  return {
    episodes: episodes.value,
    watchLists: episodes.value.filter((e) =>
      userState.value.user?.watchList.includes(e.id)
    ),
  };
});

export function useEpisodesState() {
  if (!episodes.value.length) {
    getAll().then((payload) => {
      console.log(payload);
      episodes.value = payload.results;
    });
  }
  return {
    state,
    setEpisodes: (payload: Episode[]) => {
      episodes.value = payload;
    },
    toggleWatchList(episode: Episode) {
      const { user } = userState.value;

      if (!user) {
        return;
      }

      toggleWatchList(episode.id).then(({ watchList }) => {
        setUser({
          ...user,
          watchList,
        });
      });
    },
  };
}
