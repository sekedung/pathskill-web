export interface LearningPathModuleSummary {
  id: number;
  title: string;
  total_lessons: number;
  total_assignments: number;
  ai_generated: boolean;
  status: "not_started" | "in_progress" | "completed";
  percentage: number;
}

export interface LearningPathResponse {
  overall_progress: {
    completed_modules: number;
    total_modules: number;
  };
  total_lessons: number;
  total_assignments: number;
  estimated_duration_weeks: number;
  modules: LearningPathModuleSummary[];
}

export interface ModuleLesson {
  id: number;
  title: string;
  type: "video" | "reading" | "quiz";
  duration_minutes: number;
}

export interface ModuleAssignment {
  id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  status: "pending" | "submitted" | "successful";
}

export interface ModuleDetailResponse {
  id: number;
  title: string;
  description: string | null;
  progress_percentage: number;
  lessons: ModuleLesson[];
  assignments: ModuleAssignment[];
}
