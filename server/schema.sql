-- Enable UUID extension
create extension if not exists "uuid-ossp";

create table employees (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  slug text unique not null,
  position text,
  phone text,
  email text,
  photo_url text
);

-- Example Insert
insert into employees (full_name, slug, position, phone, email, photo_url)
values
('Fama Diaw', 'fama-diaw', 'Senior Engineer', '+221 77 000 00 00', 'fama.diaw@powertech.sn', 'https://ui-avatars.com/api/?name=Fama+Diaw&background=0D8ABC&color=fff');
