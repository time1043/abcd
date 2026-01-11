import type { Session, User } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { ref } from "vue";

import { accountQuery, getSession } from "@/pages/auth/data";
import type { Tables } from "@/types/supabase";

export const useAccountStore = defineStore("account", () => {
  const user = ref<User | null>(null);
  const account = ref<Tables<"accounts"> | null>(null);
  const isAuthed = computed(() => !!account.value);

  async function setAuth(userSession?: Session | null) {
    if (!userSession) return (user.value = account.value = null);
    user.value = userSession.user;
    await setAccount();
  }

  async function setAccount() {
    if (!user.value) return (account.value = null);

    const shouldRefetch = !account.value || account.value.id !== user.value.id;
    if (shouldRefetch) {
      const { data, error } = await accountQuery(user.value.id);
      // console.log({ data, error });
      if (error) throw error;
      account.value = data || null;
    }
  }

  async function getMe() {
    const { data, error } = await getSession();
    if (error) throw error;
    await setAuth(data.session);
  }

  return { user, account, isAuthed, setAuth, getMe };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
