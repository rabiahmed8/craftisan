-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."User" (id, email, "updatedAt")
  values (new.id, new.email, now());
  return new;
end;
$$;

-- Create the trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
