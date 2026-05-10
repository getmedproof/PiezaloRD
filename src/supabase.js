import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gdhubiibqkcbgtaqqfxu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_IqPwVN8vj_qLPxJH7-5x2w_a4buvRp2'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)