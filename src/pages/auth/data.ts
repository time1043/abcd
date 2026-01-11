import { supabase } from "@/lib/supabase-client";
import type { SigninForm, SignupForm } from "@/types/auth-form";

export const signup = ({ email, password }: SignupForm) =>
  supabase.auth.signUp({
    email,
    password,
  });

export const accountInsert = ({ username }: SignupForm, id: string) =>
  supabase.from("accounts").insert({
    id,
    username: username,
  });

export const signin = ({ email, password }: SigninForm) =>
  supabase.auth.signInWithPassword({
    email,
    password,
  });

export const accountQuery = (id: string) =>
  supabase.from("accounts").select(`*`).eq("id", id).single();

export const getSession = () => supabase.auth.getSession();

export const signOut = () => supabase.auth.signOut();
