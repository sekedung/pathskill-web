export interface CodingExerciseResponse {
  id: number;
  assignment_id: number;
  title: string;
  description: string | null;
  learning_objectives: string[];
  requirements: string[];
  language: string;
  starter_code: string | null;
  hint: string | null;
  // kalau user sudah pernah submit, ini dipakai buat lanjutin kode terakhir
  submitted_source_code: string | null;
  submitted_at: string | null;
}

export interface CodingExerciseSubmitResponse {
  submitted_at: string;
}
