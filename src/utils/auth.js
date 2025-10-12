import { supabase } from '../lib/supabase';

export const registerUser = async (formData) => {
  const { email, password, role, ...rest } = formData;

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) throw signUpError;

  const userId = authData.user.id;

  const { error: insertError } = await supabase.from('profiles').insert([
    {
      id: userId,
      role,
      email,
      ...rest,
    },
  ]);

  if (insertError) throw insertError;

  return authData.user;
};
