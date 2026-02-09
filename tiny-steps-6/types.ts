
export type ViewMode = 'SELECTION' | 'LIST' | 'DETAIL' | 'SHOPPING' | 'BUNDLES' | 'SCIENCE';
export type SectionType = 'Activity';

export interface ActivityStep {
  image_url: string;
  caption: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  filter_tag: string;
  reassurance: string; // One-sentence reassurance line
  objective: string; // What the child is doing
  outcome: string; // What skill is being supported
  why_matters: string; // Short paragraph on developmental relevance
  steps: ActivityStep[];
  when_to_pause: string;
  materials: string[];
  safety_notes: string;
  image_prompt?: string;
  thumbnail?: string;
  hero?: string;
}

export interface Book {
  title: string;
  author: string;
  description: string;
  category: string;
  cover_image: string;
  amazon_link: string;
  badge?: string;
  rating?: number;
  review_count?: string;
  pros?: string[];
}

export interface BundleItem {
  id: number;
  title: string;
  line_1: string;
  line_2: string;
  link: string;
}

export interface ActivityBundle {
  id: string;
  name: string;
  tagline: string;
  age_range: string;
  items: BundleItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum TabView {
  ACTIVITIES = 'ACTIVITIES',
  EXPERT_CHAT = 'EXPERT_CHAT',
}
