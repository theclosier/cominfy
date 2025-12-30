-- 1. Expand Communities Table
-- Add fields found in Mock Data but missing in DB
alter table communities 
add column if not exists about text,
add column if not exists gallery text[],
add column if not exists rules text[],
add column if not exists socials jsonb default '{}'::jsonb;

-- 2. Create Community Members Table
-- To replace MOCK_MEMBERS and support "Pending Approvals" dashboard
create table if not exists community_members (
  id uuid default gen_random_uuid() primary key,
  community_id uuid references communities(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  status text default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  role text default 'MEMBER' check (role in ('ADMIN', 'MODERATOR', 'MEMBER')),
  answers jsonb default '{}'::jsonb, -- Answers to join questions
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(community_id, user_id)
);

-- Enable RLS for Members
alter table community_members enable row level security;
create policy "Members are viewable by community admins." on community_members for select using (
  exists (
    select 1 from community_members cm 
    where cm.community_id = community_members.community_id 
    and cm.user_id = auth.uid() 
    and cm.role in ('ADMIN', 'MODERATOR')
  ) 
  or auth.uid() = user_id -- Users see their own membership
  or exists (select 1 from profiles where id = auth.uid() and role = 'admin') -- Platform admins
);

-- 3. Update Existing Data (Migration)
-- Update Yazılımcılar Kulübü with Mock Data
update communities
set 
  about = 'Yazılımcılar Kulübü, 2015 yılında kurulmuş, Türkiye genelinde 50.000''den fazla üyesi olan bağımsız bir teknoloji topluluğudur. Amacımız, yazılımcıları bir araya getirerek bilgi paylaşımını artırmak.',
  gallery = ARRAY[
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80'
  ],
  rules = ARRAY[
    'Saygı çerçevesinde iletişim kurun.',
    'Spam ve reklam yasaktır.',
    'Konu dışı paylaşımlardan kaçının.',
    'Siyasi ve dini tartışmalara girmeyin.'
  ],
  socials = '{
    "twitter": "https://twitter.com/yazilimcilar",
    "website": "https://yazilimcilar.org",
    "instagram": "https://instagram.com/yazilimcilar",
    "linkedin": "https://linkedin.com/company/yazilimcilar"
  }'::jsonb
where subdomain = 'yazilimcilar';

-- Update Startup Istanbul with Mock Data
update communities
set
  about = 'Startup Istanbul, girişimcileri, yatırımcıları ve mentorları buluşturan bir ekosistemdir. Her ay düzenli etkinlikler yapıyoruz.',
  gallery = ARRAY[
    'https://images.unsplash.com/photo-1559223607-a43c990ed9fc?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80'
  ],
  rules = ARRAY[
    'Yatırım tavsiyesi vermek yasaktır.',
    'Fikir hırsızlığına karşı sıfır tolerans.',
    'Üyelik formunu eksiksiz doldurun.'
  ],
  socials = '{
    "instagram": "https://instagram.com/startupist",
    "twitter": "https://twitter.com/startupist"
  }'::jsonb
where subdomain = 'startup-istanbul';
