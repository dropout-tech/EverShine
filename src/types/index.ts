export type MemberStatus = 'active' | 'frozen';
export type MembershipType = 'resigned' | 'credit_hold';

export interface Member {
    id: number;
    name: string;
    photo: string;
    industry: string;
    category?: string;
    company: string;
    position?: string;
    title: string;
    shortIntro: string;
    fullIntro: string;
    links: { [key: string]: string } | MemberLink[];
    services: string[];
    hashtags: string[];
    editCount?: number;
    photoPosition?: string;
    user_id?: string;
    email?: string;
    phone?: string;
    is_admin?: boolean;
    status?: MemberStatus;
    membership_type?: MembershipType | null;
    frozen_at?: string | null;
    /** 金質獎章數：0 無、1 金質、2 雙金質 */
    gold_medal_count?: number;
    /** @deprecated 請改用 gold_medal_count；保留相容舊資料 */
    has_gold_medal?: boolean;
}

export interface MemberLink {
    type: string;
    url: string;
    icon?: string;
}

export interface Referral {
    id: string;
    title: string;
    description: string;
    metrics: {
        amount: string;
        type: string;
    };
    referrer: ReferralPerson;
    referee: ReferralPerson;
}

export interface ReferralPerson {
    memberId?: string;
    name: string;
    industry: string;
    photo: string;
    /** 與 members.photoPosition 同步，供頭像 object-position */
    photoPosition?: string;
    story?: string;
    testimonial?: string;
    value?: string;
}
