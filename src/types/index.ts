// =========================================================
// AQIZZY - CORE TYPES DEFINITIONS
// =========================================================

export type CoreDimension = 'C' | 'O' | 'R' | 'E';

export interface COREScore {
  c: number; // Control (0 - 100)
  o: number; // Ownership (0 - 100)
  r: number; // Reach (0 - 100)
  e: number; // Endurance (0 - 100)
}

export interface User {
  id: string;
  display_name: string;
  current_level: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AQProfile {
  id: string;
  user_id: string;
  control_score: number;
  ownership_score: number;
  reach_score: number;
  endurance_score: number;
  total_aq: number;
  last_scenario_completed?: string;
  updated_at?: string;
}

export type ScenarioType = 'chat' | 'swipe' | 'resource';

export interface Scenario {
  id: string;
  type: ScenarioType;
  core_focus: CoreDimension;
  title: string;
  grade_level: string;
  description: string;
  thumbnail_icon: string;
  content_json: any;
  created_at?: string;
}

export interface SessionLog {
  id?: string;
  session_id: string;
  scenario_id: string;
  user_id?: string;
  role: 'user' | 'npc' | 'system';
  message_content: string;
  extracted_core_delta: {
    c: number;
    o: number;
    r: number;
    e: number;
  };
  is_crisis_resolved?: boolean;
  created_at?: string;
}

// Expected NVIDIA AI JSON Response
export interface AIScenarioResponse {
  npc_reply: string;
  score_delta: {
    c: number;
    o: number;
    r: number;
    e: number;
  };
  is_crisis_resolved: boolean;
  coaching_tip?: string;
}

// Chat Scenario Types
export interface ChatNPC {
  id: string;
  name: string;
  role: string;
  avatar: string;
  personality: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  sender_name: string;
  text: string;
  timestamp: string;
  is_user: boolean;
  score_delta?: {
    c: number;
    o: number;
    r: number;
    e: number;
  };
  coaching_tip?: string;
}

// Swipe Card Scenario Types (Reach)
export interface SwipeCardItem {
  id: string;
  thought: string;
  correct_action: 'left' | 'right'; // left = discard, right = keep
  explanation: string;
  aq_tag: string;
}

// Resource Scenario Types (Endurance)
export interface ResourceChoice {
  id: string;
  title: string;
  description: string;
  energy_delta: number;
  stress_delta: number;
  endurance_score: number;
  feedback: string;
}

export interface ResourceDay {
  day_number: number;
  day_name: string;
  scenario_event: string;
  choices: ResourceChoice[];
}
