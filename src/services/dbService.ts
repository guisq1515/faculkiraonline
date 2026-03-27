import { supabase } from '../lib/supabase';
import { User, DashboardData, AppSettings, Activity, Grade, Schedule, NewsItem, Announcement, Payment, Exam, OnlineClass } from '../types';

/**
 * This service acts as a facade for the database operations.
 * It uses Supabase for all operations.
 */
export const dbService = {
  // Auth
  login: async (matricula: string, pass: string): Promise<User | null> => {
    console.log(`Attempting login for matricula: ${matricula}`);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('matricula', matricula)
      .eq('password', pass)
      .single();

    if (error) {
      console.error('Login error from Supabase:', error.message, error.details, error.hint);
      return null;
    }
    
    if (!data) {
      console.warn('Login failed: No user found with these credentials.');
      return null;
    }
    
    console.log('Login successful for:', data.name);
    return data as User;
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      console.error('Get user by email error:', error);
      return null;
    }
    return data as User;
  },

  // Students
  getStudents: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'student');

    if (error) {
      console.error('Get students error:', error);
      return [];
    }
    return data as User[];
  },

  addStudent: async (student: any): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .insert([student])
      .select()
      .single();

    if (error) {
      console.error('Add student error:', error);
      throw error;
    }
    return data as User;
  },

  updateStudent: async (id: number, updatedData: any): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update student error:', error);
      throw error;
    }
    return data as User;
  },

  // Dashboard
  getStudentDashboard: async (studentId: number): Promise<DashboardData> => {
    const [
      gradesRes,
      scheduleRes,
      newsRes,
      announcementsRes,
      paymentsRes,
      activitiesRes,
      examsRes,
      onlineClassesRes
    ] = await Promise.all([
      supabase.from('grades').select('*').eq('student_id', studentId),
      supabase.from('schedules').select('*'),
      supabase.from('news').select('*'),
      supabase.from('announcements').select('*'),
      supabase.from('payments').select('*').eq('student_id', studentId),
      supabase.from('activities').select('*').eq('student_id', studentId),
      supabase.from('exams').select('*'),
      supabase.from('online_classes').select('*')
    ]);

    return {
      grades: (gradesRes.data || []) as Grade[],
      schedule: (scheduleRes.data || []) as Schedule[],
      news: (newsRes.data || []) as NewsItem[],
      announcements: (announcementsRes.data || []) as Announcement[],
      payments: (paymentsRes.data || []) as Payment[],
      activities: (activitiesRes.data || []) as Activity[],
      exams: (examsRes.data || []) as Exam[],
      online_classes: (onlineClassesRes.data || []) as OnlineClass[]
    };
  },

  // Activities
  addActivity: async (activity: any): Promise<Activity> => {
    const { data, error } = await supabase
      .from('activities')
      .insert([activity])
      .select()
      .single();

    if (error) {
      console.error('Add activity error:', error);
      throw error;
    }
    return data as Activity;
  },

  // Settings
  getAppSettings: async (): Promise<AppSettings> => {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Get app settings error:', error);
      // Return default settings if not found
      return {
        logo_url: "https://picsum.photos/seed/college/200/200",
        primary_color: "#1e3a8a",
        secondary_color: "#3b82f6",
        theme: "barao",
        college_name: "Faculdade Barão"
      };
    }
    return data as AppSettings;
  },

  updateAppSettings: async (settings: any): Promise<AppSettings> => {
    // We assume there's only one row in app_settings, or we update the first one
    const { data: currentSettings } = await supabase.from('app_settings').select('id').single();
    
    let result;
    if (currentSettings) {
      result = await supabase
        .from('app_settings')
        .update(settings)
        .eq('id', currentSettings.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('app_settings')
        .insert([settings])
        .select()
        .single();
    }

    if (result.error) {
      console.error('Update app settings error:', result.error);
      throw result.error;
    }
    return result.data as AppSettings;
  },

  // Storage
  uploadFile: async (bucket: string, path: string, file: File): Promise<string> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload file error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  }
};
