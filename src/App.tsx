import React, { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  Lock, 
  LayoutDashboard, 
  GraduationCap, 
  Calendar, 
  Bell, 
  Wallet, 
  FileCheck, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  QrCode,
  ArrowLeft,
  Upload,
  Search,
  Settings,
  Users,
  BookOpen,
  DollarSign,
  Copy,
  Mail,
  Wifi,
  Loader2,
  Monitor,
  ClipboardList,
  ExternalLink,
  Menu,
  FileText,
  FileDigit,
  Layers,
  MonitorPlay,
  FileEdit,
  Library,
  Fingerprint,
  LogIn,
  MessageSquare,
  FolderOpen,
  Wrench,
  Home,
  UserSquare2,
  Link,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { resetDB, COURSES } from "./storage";
import { supabase } from "./lib/supabase";
import { dbService as db } from "./services/dbService";
import { User, DashboardData, AppSettings, Grade, Schedule, Announcement, Payment, Activity, Exam, OnlineClass, NewsItem } from "./types";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LoginViewProps {
  appSettings: AppSettings | null;
  handleLogin: (e: React.FormEvent) => void;
  matricula: string;
  setMatricula: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  error: string;
  loading: boolean;
  onForgotClick: () => void;
}

const LoginView = ({ appSettings, handleLogin, matricula, setMatricula, password, setPassword, error, loading, onForgotClick }: LoginViewProps) => {
  const isRetro = appSettings?.theme === 'retro';
  const isUni = appSettings?.theme === 'uni';
  const isUniplan = appSettings?.theme === 'uniplan';
  const isBarao = appSettings?.theme === 'barao';

  if (isUniplan) {
    return (
      <div className="min-h-screen bg-white relative flex flex-col overflow-hidden font-sans">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center px-8 pt-24 pb-12 relative z-10">
          {/* Logo */}
          <div className="w-full flex flex-col items-center mb-20">
            <h1 className="text-6xl font-black italic tracking-tighter text-[#e31a22] leading-none">UNIPLAN</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2 text-center">CENTRO UNIVERSITÁRIO PLANALTO DO DISTRITO FEDERAL</p>
          </div>

          <form onSubmit={handleLogin} className="w-full max-w-[320px] space-y-8">
            {/* Matricula */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Matrícula</label>
              <div className="relative border-b-2 border-slate-200 pb-2 flex items-center gap-4 focus-within:border-[#e31a22] transition-colors">
                <UserIcon className="w-6 h-6 text-slate-300" />
                <input 
                  type="text" 
                  className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-300 focus:outline-none text-lg"
                  placeholder="Seu RA"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Senha</label>
              <div className="relative border-b-2 border-slate-200 pb-2 flex items-center gap-4 focus-within:border-[#e31a22] transition-colors">
                <Lock className="w-6 h-6 text-slate-300" />
                <input 
                  type="password" 
                  className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-300 focus:outline-none text-lg"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex justify-end pt-2">
                <button type="button" onClick={onForgotClick} className="text-[#e31a22] text-sm font-bold hover:underline">
                  Esqueci minha senha/matrícula
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs text-center font-bold bg-red-50 py-2 rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </form>
        </div>

        {/* Bottom Button */}
        <div className="p-8 mt-auto relative z-20">
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-16 bg-[#e31a22] text-white text-xl font-black uppercase tracking-widest rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-red-200"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Entrar"}
          </button>
        </div>
      </div>
    );
  }

  if (isBarao) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920)' }}
        >
          <div className="absolute inset-0 bg-[#00678a]/80 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center"
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white p-1.5 rounded-lg shadow-lg">
              <img src={appSettings?.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{appSettings?.college_name || "Barão de Mauá"}</h1>
          </div>

          {/* Avatar Icon */}
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 border border-white/30">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-slate-400" />
            </div>
          </div>

          <h2 className="text-2xl font-medium text-white mb-8">Bem-vindo</h2>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            {/* Matricula Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                className="w-full bg-white h-12 pl-10 pr-10 rounded-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                className="w-full bg-white h-12 pl-10 pr-10 rounded-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Checkboxes & Forgot Password */}
            <div className="flex justify-between items-start pt-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-white/50 rounded-sm flex items-center justify-center bg-white/10 group-hover:bg-white/20">
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-white/90 font-medium">Graduação</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-white/50 rounded-sm flex items-center justify-center bg-white/10 group-hover:bg-white/20">
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-white/90 font-medium">Pós Graduação</span>
                </label>
              </div>
              <button type="button" onClick={onForgotClick} className="text-xs text-white/70 hover:text-white transition-colors underline underline-offset-2">
                Esqueci minha senha/matrícula
              </button>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-500/20 border border-red-500/50 text-white rounded-lg text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-[#00a2b1] hover:bg-[#00c2d1] text-white font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,162,177,0.3)] transition-all active:scale-95 flex items-center justify-center"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  if (isUni) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#001a4d]">
        {/* Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-800/20 rounded-full blur-[80px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-[360px] px-4"
        >
          <div className="bg-[#002b6b]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-10">
              <h1 className="text-5xl font-black italic tracking-tighter text-white">UNIP</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* RA Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/70 uppercase tracking-wider ml-1">
                  RA (NÚMERO DA MATRÍCULA)
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#1a3a7a]/50 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Digite seu RA"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/70 uppercase tracking-wider ml-1">
                  SENHA
                </label>
                <input 
                  type="password" 
                  className="w-full bg-[#1a3a7a]/50 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-[10px] font-bold text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className={cn(
                  "w-full h-12 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2",
                  "bg-gradient-to-r from-[#00c853] to-[#1b5e20] hover:from-[#00e676] hover:to-[#2e7d32] shadow-green-900/20"
                )}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Entrar</span>
                  </>
                )}
              </button>

              {/* Biometrics Toggle & Forgot */}
              <div className="pt-4 space-y-4">
                <div className="bg-[#1a3a7a]/30 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-white/60" />
                    <span className="text-[10px] font-bold text-white/60">Usar Biometria no próximo acesso</span>
                  </div>
                  <div className="w-10 h-5 bg-white/20 rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>

                <div className="text-center">
                  <button type="button" onClick={onForgotClick} className="text-[10px] text-white/50 font-bold uppercase tracking-widest hover:text-white transition-colors">
                    Esqueci minha senha/matrícula
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isRetro) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920)' }}
        >
          <div className="absolute inset-0 bg-[#00678a]/80 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center"
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white p-1.5 rounded-lg shadow-lg">
              <img src={appSettings?.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{appSettings?.college_name || "Barão de Mauá"}</h1>
          </div>

          {/* Avatar Icon */}
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 border border-white/30">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-slate-400" />
            </div>
          </div>

          <h2 className="text-2xl font-medium text-white mb-8">Bem-vindo</h2>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            {/* Matricula Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                className="w-full bg-white h-12 pl-10 pr-10 rounded-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                className="w-full bg-white h-12 pl-10 pr-10 rounded-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Checkboxes & Forgot Password */}
            <div className="flex justify-between items-start pt-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-white/50 rounded-sm flex items-center justify-center bg-white/10 group-hover:bg-white/20">
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-white/90 font-medium">Graduação</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-white/50 rounded-sm flex items-center justify-center bg-white/10 group-hover:bg-white/20">
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-white/90 font-medium">Pós Graduação</span>
                </label>
              </div>
              <button type="button" onClick={onForgotClick} className="text-xs text-white/70 hover:text-white transition-colors underline underline-offset-2">
                Esqueci minha senha/matrícula
              </button>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-500/20 border border-red-500/50 text-white rounded-lg text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-[#00a2b1] hover:bg-[#00c2d1] text-white font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,162,177,0.3)] transition-all active:scale-95 flex items-center justify-center"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4 transition-colors duration-500",
      appSettings?.theme === 'barao' ? "bg-slate-50" : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    )}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-md p-8",
          appSettings?.theme === 'barao' ? "bg-white rounded-3xl shadow-2xl border border-slate-100" : "bg-white card rounded-3xl shadow-xl"
        )}
      >
        <div className="text-center mb-10">
          <div className={cn(
            "w-32 h-32 bg-white flex items-center justify-center mx-auto mb-6 overflow-hidden p-2",
            appSettings?.theme === 'barao' ? "rounded-full shadow-lg border border-slate-50" : "rounded-3xl shadow-xl shadow-brand-teal/10"
          )}>
            <img src={appSettings?.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            {appSettings?.theme === 'barao' ? (appSettings?.college_name || "Barão de Mauá") : "Portal do Aluno"}
          </h1>
          <p className="text-slate-500 mt-2">
            {appSettings?.theme === 'barao' ? "Centro Universitário" : "Acesse sua conta"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Matrícula</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                className={cn(
                  "w-full h-12 pl-12 pr-4 rounded-xl transition-all focus:outline-none focus:ring-2",
                  appSettings?.theme === 'barao' 
                    ? "bg-slate-50 border border-slate-200 text-slate-800 focus:ring-[#00a2b1]/50" 
                    : "input-field"
                )}
                placeholder="Ex: 2024001"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" 
                className={cn(
                  "w-full h-12 pl-12 pr-4 rounded-xl transition-all focus:outline-none focus:ring-2",
                  appSettings?.theme === 'barao' 
                    ? "bg-slate-50 border border-slate-200 text-slate-800 focus:ring-[#00a2b1]/50" 
                    : "input-field"
                )}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={cn(
              "w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-95",
              appSettings?.theme === 'barao' 
                ? "bg-[#00a2b1] hover:bg-[#008f9d] text-white shadow-lg shadow-teal-900/10" 
                : "btn-primary"
            )}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
          </button>

          <button type="button" onClick={onForgotClick} className={cn(
            "w-full text-center text-sm font-medium hover:underline",
            appSettings?.theme === 'barao' ? "text-[#00a2b1]" : "text-blue-600"
          )}>
            Esqueci minha senha/matrícula
          </button>
        </form>
      </motion.div>
    </div>
  );
};

interface AdminDashboardProps {
  appSettings: any;
  setAppSettings: (val: any) => void;
  handleLogout: () => void;
}

const AdminNavItem = ({ icon, label, active, onClick, theme }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 p-3 transition-all",
      theme === 'retro' ? (
        active ? "bg-white text-[#00678a] font-bold" : "text-white/80 hover:bg-white/10"
      ) : theme === 'barao' ? (
        active ? "bg-white/20 text-white font-bold rounded-xl" : "text-white/60 hover:bg-white/5 hover:text-white rounded-xl"
      ) : theme === 'uniplan' ? (
        active ? "bg-white text-[#e31a22] font-bold rounded-xl" : "text-white/60 hover:bg-white/5 hover:text-white rounded-xl"
      ) : (
        active ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20 rounded-xl" : "text-slate-400 hover:bg-white/5 hover:text-white rounded-xl"
      )
    )}
  >
    {React.cloneElement(icon, { size: 20 })}
    <span className="font-semibold">{label}</span>
  </button>
);

const AdminDashboard = ({ appSettings, setAppSettings, handleLogout }: AdminDashboardProps) => {
  const [students, setStudents] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("students");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  
  // New/Edit Student Form
  const [newName, setNewName] = useState("");
  const [newMatricula, setNewMatricula] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newSemester, setNewSemester] = useState("1");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newValidity, setNewValidity] = useState("12/2026");
  const [newRegularity, setNewRegularity] = useState("Regular");
  const [isUploading, setIsUploading] = useState(false);
  const [newCpf, setNewCpf] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newEnrollmentDate, setNewEnrollmentDate] = useState("");
  const [newBirthState, setNewBirthState] = useState("");
  const [newNationality, setNewNationality] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newMaritalStatus, setNewMaritalStatus] = useState("");
  const [newShortName, setNewShortName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEnrollmentProofUrls, setNewEnrollmentProofUrls] = useState<any>({
    barao: "",
    retro: "",
    uni: "",
    uniplan: "",
    modern: ""
  });

  const fetchStudents = async () => {
    const studentsData = await db.getStudents();
    setStudents(studentsData);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOpenEdit = (student: User) => {
    setEditingStudent(student);
    setNewName(student.name);
    setNewMatricula(student.matricula);
    setNewPassword(student.password || "");
    setNewCourse(student.course || "");
    setNewSemester(String(student.semester || 1));
    setNewPhotoUrl(student.photo_url || "");
    setNewValidity(student.validity || "12/2026");
    setNewRegularity(student.regularity || "Regular");
    setNewCpf(student.cpf || "");
    setNewBirthDate(student.birth_date || "");
    setNewEnrollmentDate(student.enrollment_date || "");
    setNewBirthState(student.birth_state || "");
    setNewNationality(student.nationality || "");
    setNewGender(student.gender || "");
    setNewMaritalStatus(student.marital_status || "");
    setNewShortName(student.short_name || "");
    setNewEmail(student.email || "");
    setNewEnrollmentProofUrls(student.enrollment_proof_urls || {
      barao: student.enrollment_proof_url || "",
      retro: student.enrollment_proof_url || "",
      uni: student.enrollment_proof_url || "",
      uniplan: student.enrollment_proof_url || "",
      modern: student.enrollment_proof_url || ""
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingStudent(null);
    setNewName("");
    setNewMatricula("");
    setNewPassword("");
    setNewCourse("");
    setNewSemester("1");
    setNewPhotoUrl("");
    setNewValidity("12/2026");
    setNewRegularity("Regular");
    setNewCpf("");
    setNewBirthDate("");
    setNewEnrollmentDate("");
    setNewBirthState("");
    setNewNationality("");
    setNewGender("");
    setNewMaritalStatus("");
    setNewShortName("");
    setNewEmail("");
    setNewEnrollmentProofUrls({ barao: "", retro: "", uni: "", uniplan: "", modern: "" });
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        console.log("Updating student:", editingStudent.id, { 
          name: newName, 
          enrollment_proof_urls: newEnrollmentProofUrls 
        });
        await db.updateStudent(editingStudent.id, {
          name: newName,
          matricula: newMatricula,
          password: newPassword,
          course: newCourse,
          semester: parseInt(newSemester),
          photo_url: newPhotoUrl,
          validity: newValidity,
          regularity: newRegularity,
          cpf: newCpf,
          birth_date: newBirthDate,
          enrollment_date: newEnrollmentDate,
          birth_state: newBirthState,
          nationality: newNationality,
          gender: newGender,
          marital_status: newMaritalStatus,
          short_name: newShortName,
          email: newEmail,
          enrollment_proof_urls: newEnrollmentProofUrls
        });
      } else {
        await db.addStudent({
          name: newName,
          matricula: newMatricula,
          password: newPassword || "aluno123",
          course: newCourse,
          semester: parseInt(newSemester),
          photo_url: newPhotoUrl,
          validity: newValidity,
          regularity: newRegularity,
          cpf: newCpf,
          birth_date: newBirthDate,
          enrollment_date: newEnrollmentDate,
          birth_state: newBirthState,
          nationality: newNationality,
          gender: newGender,
          marital_status: newMaritalStatus,
          short_name: newShortName,
          email: newEmail,
          enrollment_proof_urls: newEnrollmentProofUrls
        });
      }
      handleCloseModal();
      await fetchStudents();
      alert("Dados do aluno salvos com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar dados do aluno.");
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col md:flex-row",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      {/* Sidebar */}
      <div className={cn(
        "w-full md:w-64 p-6 flex flex-col",
        appSettings?.theme === 'retro' ? "bg-[#00678a] text-white" : 
        appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white" :
        appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white" : "bg-slate-900 text-white"
      )}>
        <div className="flex items-center gap-3 mb-10">
          <div className={cn(
            "w-12 h-12 bg-white flex items-center justify-center overflow-hidden p-1",
            appSettings?.theme === 'retro' ? "border-2 border-black" : 
            appSettings?.theme === 'barao' || appSettings?.theme === 'uniplan' ? "rounded-full shadow-lg" : "rounded-xl"
          )}>
            <img src={appSettings?.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-xl font-bold leading-tight">
            {appSettings?.theme === 'barao' ? `${appSettings?.college_name || "Barão de Mauá"} Admin` : 
             appSettings?.theme === 'uniplan' ? "Uniplan Admin" : "Portal do Aluno Admin"}
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <AdminNavItem icon={<Users />} label="Alunos" active={activeTab === "students"} onClick={() => setActiveTab("students")} theme={appSettings?.theme} />
          <AdminNavItem icon={<BookOpen />} label="Disciplinas" active={activeTab === "disciplines"} onClick={() => setActiveTab("disciplines")} theme={appSettings?.theme} />
          <AdminNavItem icon={<Bell />} label="Comunicados" active={activeTab === "announcements"} onClick={() => setActiveTab("announcements")} theme={appSettings?.theme} />
          <AdminNavItem icon={<DollarSign />} label="Financeiro" active={activeTab === "financial"} onClick={() => setActiveTab("financial")} theme={appSettings?.theme} />
          <AdminNavItem icon={<Settings />} label="Configurações" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} theme={appSettings?.theme} />
        </nav>

        <button onClick={handleLogout} className={cn(
          "mt-auto flex items-center gap-3 p-3 transition-colors",
          appSettings?.theme === 'retro' ? "text-slate-600 hover:text-black" : 
          appSettings?.theme === 'uniplan' ? "text-white/60 hover:text-white" :
          appSettings?.theme === 'barao' ? "text-white/60 hover:text-white" : "text-slate-400 hover:text-white"
        )}>
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 p-8 overflow-auto",
        appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : 
        appSettings?.theme === 'barao' ? "bg-slate-50" : "bg-slate-50"
      )}>
        <div className="flex justify-between items-center mb-8">
          <h2 className={cn(
            "text-2xl font-bold",
            appSettings?.theme === 'retro' ? "text-black" : 
            appSettings?.theme === 'barao' ? "text-slate-900" : "text-slate-900"
          )}>
            {activeTab === "students" ? "Gerenciamento de Alunos" : 
             activeTab === "disciplines" ? "Disciplinas" :
             activeTab === "announcements" ? "Comunicados" : 
             activeTab === "settings" ? "Configurações" : "Financeiro"}
          </h2>
          <div className="flex items-center gap-4">
            {activeTab === "students" && (
              <button 
                onClick={() => setShowAddModal(true)}
                className={cn(
                  "flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors",
                  appSettings?.theme === 'retro' ? "bg-black text-white hover:bg-slate-800" : 
                  appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white hover:bg-[#c4161c]" :
                  appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white hover:bg-[#008f9d]" : "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                <Plus className="w-5 h-5" /> Novo Aluno
              </button>
            )}
            <button 
              onClick={handleLogout}
              className={cn(
                "p-2 rounded-lg transition-colors",
                appSettings?.theme === 'uniplan' ? "text-[#e31a22] hover:bg-[#e31a22]/10" :
                appSettings?.theme === 'barao' ? "text-[#00a2b1] hover:bg-[#00a2b1]/10" : "text-slate-400 hover:bg-slate-100"
              )}
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {activeTab === "students" ? (
          <div className={cn(
            "card overflow-hidden p-0",
            appSettings?.theme === 'retro' ? "bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
          )}>
            <table className="w-full text-left">
              <thead className={cn(
                "border-b",
                appSettings?.theme === 'retro' ? "bg-black text-white border-black" : 
                appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white border-[#e31a22]" :
                appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white border-[#00a2b1]" : "bg-slate-50 border-slate-100"
              )}>
                <tr>
                  <th className="p-4 text-xs font-bold uppercase">Aluno</th>
                  <th className="p-4 text-xs font-bold uppercase">Matrícula</th>
                  <th className="p-4 text-xs font-bold uppercase">Curso</th>
                  <th className="p-4 text-xs font-bold uppercase">Semestre</th>
                  <th className="p-4 text-xs font-bold uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className={cn(
                "divide-y",
                appSettings?.theme === 'retro' ? "divide-black" : "divide-slate-100"
              )}>
                {students.map((s, index) => (
                  <tr 
                    key={`${s.id}-${index}`} 
                    className={cn(
                      "transition-colors cursor-pointer group",
                      appSettings?.theme === 'retro' ? "hover:bg-slate-100" : "hover:bg-slate-50"
                    )}
                    onClick={() => handleOpenEdit(s)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={s.photo_url} className={cn(
                          "w-10 h-10 object-cover",
                          appSettings?.theme === 'retro' ? "border border-black" : "rounded-lg"
                        )} alt="" referrerPolicy="no-referrer" />
                        <span className={cn(
                          "font-bold transition-colors",
                          appSettings?.theme === 'retro' ? "text-black group-hover:underline" : 
                          appSettings?.theme === 'barao' ? "text-slate-700 group-hover:text-[#00a2b1]" : "text-slate-700 group-hover:text-blue-600"
                        )}>{s.name}</span>
                      </div>
                    </td>
                    <td className={cn(
                      "p-4 font-mono text-sm",
                      appSettings?.theme === 'retro' ? "text-black" : "text-slate-500"
                    )}>{s.matricula}</td>
                    <td className={cn(
                      "p-4 text-sm",
                      appSettings?.theme === 'retro' ? "text-black" : "text-slate-600"
                    )}>{s.course}</td>
                    <td className={cn(
                      "p-4 text-sm",
                      appSettings?.theme === 'retro' ? "text-black" : "text-slate-600"
                    )}>{s.semester}º</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          className={cn(
                            "px-3 py-1 font-bold text-xs transition-all",
                            appSettings?.theme === 'retro' ? "bg-black text-white" : 
                            appSettings?.theme === 'barao' ? "bg-[#00a2b1]/10 text-[#00a2b1] rounded-lg hover:bg-[#00a2b1] hover:text-white" : "bg-brand-teal/10 text-brand-teal rounded-lg hover:bg-brand-teal hover:text-white"
                          )}
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "settings" ? (
          <div className="max-w-2xl space-y-8">
            <div className="card space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Configurações do Aplicativo</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome da Instituição</label>
                  <input 
                    type="text" 
                    className="input-field w-full" 
                    placeholder="Ex: Barão de Mauá"
                    value={appSettings?.college_name || ""}
                    onChange={async (e) => {
                      const newSettings = await db.updateAppSettings({ college_name: e.target.value });
                      setAppSettings(newSettings);
                    }}
                  />
                </div>

                <div className="space-y-1 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-500 uppercase">Logo da Instituição</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden p-2">
                        <img src={appSettings?.logo_url} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="input-field flex-1" 
                            placeholder="URL da Imagem"
                            value={appSettings?.logo_url?.startsWith('data:') ? 'Imagem carregada localmente' : appSettings?.logo_url}
                            onChange={async (e) => {
                              const newSettings = await db.updateAppSettings({ logo_url: e.target.value });
                              setAppSettings(newSettings);
                            }}
                          />
                        </div>
                        <label className="block cursor-pointer">
                          <div className="btn-primary flex items-center justify-center gap-2 py-2 text-sm">
                            <Upload className="w-4 h-4" /> Importar Arquivo
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const newSettings = await db.updateAppSettings({ logo_url: reader.result as string });
                                  setAppSettings(newSettings);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-500 uppercase">Tema do Aplicativo</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <button 
                      onClick={async () => {
                        const newSettings = await db.updateAppSettings({ theme: 'modern' });
                        setAppSettings(newSettings);
                      }}
                      className={cn(
                        "p-4 border-2 transition-all text-left",
                        appSettings?.theme === 'modern' ? "border-brand-teal bg-brand-teal/5" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="font-bold text-slate-900">Moderno</div>
                      <div className="text-xs text-slate-500">Colorido, arredondado e moderno.</div>
                    </button>
                    <button 
                      onClick={async () => {
                        const newSettings = await db.updateAppSettings({ theme: 'retro' });
                        setAppSettings(newSettings);
                      }}
                      className={cn(
                        "p-4 border-2 transition-all text-left",
                        appSettings?.theme === 'retro' ? "border-black bg-slate-50" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="font-bold text-slate-900">Retrô</div>
                      <div className="text-xs text-slate-500">Preto e branco, quadrado e clássico.</div>
                    </button>
                    <button 
                      onClick={async () => {
                        const newSettings = await db.updateAppSettings({ theme: 'uni' });
                        setAppSettings(newSettings);
                      }}
                      className={cn(
                        "p-4 border-2 transition-all text-left",
                        appSettings?.theme === 'uni' ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="font-bold text-slate-900">Uni</div>
                      <div className="text-xs text-slate-500">Azul profundo, ícones em grade e visual limpo.</div>
                    </button>
                    <button 
                      onClick={async () => {
                        const newSettings = await db.updateAppSettings({ theme: 'barao' });
                        setAppSettings(newSettings);
                      }}
                      className={cn(
                        "p-4 border-2 transition-all text-left",
                        appSettings?.theme === 'barao' ? "border-[#00a2b1] bg-[#00a2b1]/5" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="font-bold text-slate-900">Barão</div>
                      <div className="text-xs text-slate-500">Tema oficial {appSettings?.college_name || "Barão de Mauá"} com visual clássico e limpo.</div>
                    </button>
                    <button 
                      onClick={async () => {
                        const newSettings = await db.updateAppSettings({ theme: 'uniplan' });
                        setAppSettings(newSettings);
                      }}
                      className={cn(
                        "p-4 border-2 transition-all text-left",
                        appSettings?.theme === 'uniplan' ? "border-[#e31a22] bg-[#e31a22]/5" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="font-bold text-slate-900">Uniplan</div>
                      <div className="text-xs text-slate-500">Vermelho vibrante, visual moderno e limpo.</div>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-red-600 uppercase mb-4">Zona de Perigo</h4>
                  <p className="text-sm text-slate-500 mb-4">
                    Isso irá redefinir todo o banco de dados para os valores iniciais. Todos os novos alunos e alterações serão perdidos.
                  </p>
                  <button 
                    onClick={() => {
                      if (window.confirm("Tem certeza que deseja redefinir o banco de dados?")) {
                        resetDB();
                        window.location.reload();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                  >
                    <AlertCircle className="w-4 h-4" /> Redefinir Banco de Dados
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-center py-20 text-slate-400">
            Módulo em desenvolvimento para esta demonstração.
          </div>
        )}
      </div>

      {/* Add/Edit Student Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingStudent ? "Editar Aluno" : "Cadastrar Novo Aluno"}
              </h3>
              <form onSubmit={handleSaveStudent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                  <input type="text" className="input-field" value={newName} onChange={e => setNewName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Matrícula</label>
                    <input type="text" className="input-field" value={newMatricula} onChange={e => setNewMatricula(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Senha do Aluno</label>
                    <input type="text" className="input-field" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Senha atual" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Semestre</label>
                    <select className="input-field" value={newSemester} onChange={e => setNewSemester(e.target.value)}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}º Semestre</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Curso</label>
                    <select className="input-field" value={newCourse} onChange={e => setNewCourse(e.target.value)} required>
                      <option value="">Selecione um curso</option>
                      {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Validade</label>
                    <input type="text" className="input-field" value={newValidity} onChange={e => setNewValidity(e.target.value)} placeholder="MM/AAAA" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Estado</label>
                    <select className="input-field" value={newRegularity} onChange={e => setNewRegularity(e.target.value)}>
                      <option value="Regular">Regular</option>
                      <option value="Irregular">Irregular</option>
                      <option value="Trancado">Trancado</option>
                      <option value="Formado">Formado</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">CPF</label>
                    <input type="text" className="input-field" value={newCpf} onChange={e => setNewCpf(e.target.value)} placeholder="000.000.000-00" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Data de Nascimento</label>
                    <input type="text" className="input-field" value={newBirthDate} onChange={e => setNewBirthDate(e.target.value)} placeholder="DD/MM/AAAA" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Data de Cadastro de Matrícula</label>
                  <input type="text" className="input-field" value={newEnrollmentDate} onChange={e => setNewEnrollmentDate(e.target.value)} placeholder="DD/MM/AAAA" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Estado de Nascimento</label>
                    <input type="text" className="input-field" value={newBirthState} onChange={e => setNewBirthState(e.target.value)} placeholder="Ex: SP" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nacionalidade</label>
                    <input type="text" className="input-field" value={newNationality} onChange={e => setNewNationality(e.target.value)} placeholder="Ex: Brasileira" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sexo</label>
                    <select className="input-field" value={newGender} onChange={e => setNewGender(e.target.value)}>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Estado Civil</label>
                    <select className="input-field" value={newMaritalStatus} onChange={e => setNewMaritalStatus(e.target.value)}>
                      <option value="Solteiro">Solteiro(a)</option>
                      <option value="Casado">Casado(a)</option>
                      <option value="Divorciado">Divorciado(a)</option>
                      <option value="Viúvo">Viúvo(a)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">E-mail do Aluno</label>
                  <input type="email" className="input-field" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="exemplo@instituicao.br" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome Abreviado</label>
                  <input type="text" className="input-field" value={newShortName} onChange={e => setNewShortName(e.target.value)} placeholder="Ex: João" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Foto do Aluno</label>
                  <div className="flex items-center gap-4">
                    {newPhotoUrl && (
                      <img 
                        src={newPhotoUrl} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100" 
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="input-field flex items-center justify-center gap-2 bg-slate-50 border-dashed border-2 hover:bg-slate-100 transition-colors">
                        <Upload className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-500 font-medium">
                          {newPhotoUrl ? "Trocar Foto" : "Importar Foto"}
                        </span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewPhotoUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Comprovantes por Tema</h4>
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin text-[#00a2b1]" />}
                  </div>
                  
                  {[
                    { id: 'barao', name: 'Tema Barão' },
                    { id: 'modern', name: 'Tema Moderno' },
                    { id: 'retro', name: 'Tema Retrô' },
                    { id: 'uni', name: 'Tema Uni' },
                    { id: 'uniplan', name: 'Tema Uniplan' }
                  ].map(theme => (
                    <div key={theme.id} className="space-y-2 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                        <span>{theme.name}</span>
                        {newEnrollmentProofUrls[theme.id] && (
                          <span className="text-[8px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={10} /> Carregado
                          </span>
                        )}
                      </label>
                      
                      <div className="flex flex-col gap-2">
                        <input 
                          type="file" 
                          accept=".pdf,image/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setIsUploading(true);
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onloadend = () => {
                                setNewEnrollmentProofUrls((prev: any) => ({ ...prev, [theme.id]: reader.result as string }));
                                setIsUploading(false);
                              };
                            }
                          }}
                          className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#00a2b1]/10 file:text-[#00a2b1] hover:file:bg-[#00a2b1]/20 cursor-pointer"
                        />
                        
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                          <Link className="w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="OU COLE O LINK DO PDF" 
                            className="bg-transparent outline-none text-[10px] font-bold w-full uppercase placeholder:text-slate-300"
                            value={newEnrollmentProofUrls[theme.id] && !newEnrollmentProofUrls[theme.id].startsWith('data:') ? newEnrollmentProofUrls[theme.id] : ""}
                            onChange={(e) => setNewEnrollmentProofUrls((prev: any) => ({ ...prev, [theme.id]: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handleCloseModal} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-3">
                    {editingStudent ? "Salvar Alterações" : "Cadastrar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  if (dateStr.includes('/')) return dateStr;
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return parts.join('/');
    }
  }
  return dateStr;
};

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [view, setView] = useState<string>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [appSettings, setAppSettings] = useState<AppSettings | any>({});
  const [isEnvMissing, setIsEnvMissing] = useState(false);
  
  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setIsEnvMissing(true);
    }

    const loadSettings = async () => {
      const settings = await db.getAppSettings();
      if (settings) setAppSettings(settings);
    };
    loadSettings();
  }, []);
  const [showToast, setShowToast] = useState(false);
  const [isSimulatingLoading, setIsSimulatingLoading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editBirthState, setEditBirthState] = useState("");
  const [editNationality, setEditNationality] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editMaritalStatus, setEditMaritalStatus] = useState("");
  const [editShortName, setEditShortName] = useState("");
  const [editPhotoUrl, setEditPhotoUrl] = useState("");
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<'options' | 'input' | 'result'>('options');
  const [forgotType, setForgotType] = useState<'password' | 'matricula'>('password');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotResult, setForgotResult] = useState<any>(null);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const ForgotRecoveryModal = () => {
    if (!showForgotModal) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl"
        >
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Recuperar Acesso</h3>
            <button onClick={resetForgotFlow} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="p-8">
            {forgotStep === 'options' ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-500 font-medium mb-6">Qual informação você esqueceu?</p>
                <button 
                  onClick={() => { setForgotType('password'); setForgotStep('input'); }}
                  className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl flex items-center gap-4 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Minha Senha</p>
                    <p className="text-xs text-slate-500">Resetar senha via e-mail</p>
                  </div>
                </button>
                <button 
                  onClick={() => { setForgotType('matricula'); setForgotStep('input'); }}
                  className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl flex items-center gap-4 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <UserSquare2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Minha Matrícula</p>
                    <p className="text-xs text-slate-500">Ver meu RA/Matrícula</p>
                  </div>
                </button>
              </div>
            ) : forgotStep === 'input' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <button onClick={() => setForgotStep('options')} className="p-2 bg-slate-100 rounded-xl">
                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <h4 className="font-bold text-slate-700">Informe seu E-mail</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Informe o e-mail cadastrado para recuperar sua {forgotType === 'password' ? 'senha' : 'matrícula'}.</p>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="email" 
                      className="input-field pl-12 h-14 rounded-2xl"
                      placeholder="seu@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleForgotAction}
                  disabled={!forgotEmail || isForgotLoading}
                  className="w-full h-14 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isForgotLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "PROSSEGUIR"}
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6 py-4">
                {forgotResult?.success ? (
                  <>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">{forgotType === 'password' ? 'E-mail Enviado!' : 'Sua Matrícula'}</h4>
                      <p className="text-sm text-slate-500 mt-2 px-4">
                        {forgotType === 'password' ? forgotResult.message : (
                          <>Sua matrícula é: <span className="font-black text-indigo-600 text-lg">{forgotResult.matricula}</span></>
                        )}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
                      <AlertCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">Ops! Algo deu errado</h4>
                      <p className="text-sm text-slate-500 mt-2">{forgotResult?.message}</p>
                    </div>
                  </>
                )}

                <button 
                  onClick={forgotResult?.success && forgotType === 'matricula' ? () => { setMatricula(forgotResult.matricula); resetForgotFlow(); } : resetForgotFlow}
                  className="w-full h-14 bg-slate-900 text-white font-bold rounded-2xl active:scale-95 transition-all"
                >
                  {forgotResult?.success && forgotType === 'matricula' ? "USAR ESTA MATRÍCULA" : "FECHAR"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const navigateTo = (newView: string) => {
    setIsDashboardLoading(true);
    setTimeout(() => {
      setView(newView);
      setIsDashboardLoading(false);
    }, 1200);
  };

  const [data, setData] = useState<{
    grades: any[];
    schedule: any[];
    announcements: any[];
    payments: any[];
    activities: any[];
    exams: any[];
    online_classes: any[];
    news: any[];
  }>({
    grades: [],
    schedule: [],
    announcements: [],
    payments: [],
    activities: [],
    exams: [],
    online_classes: [],
    news: []
  });

  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    if (view === "dashboard" && data.news && data.news.length > 0) {
      const interval = setInterval(() => {
        setNewsIndex(prev => (prev + 1) % data.news.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [view, data.news]);

  // Login Form
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [showProofUrl, setShowProofUrl] = useState<string | null>(null);

  // enrollment proof opening moved to handleOpenProof below

  useEffect(() => {
    if (appSettings?.theme) {
      document.documentElement.setAttribute('data-theme', appSettings.theme);
    }
  }, [appSettings?.theme]);

  const handleOpenProof = (targetUser: User) => {
    if (!targetUser) return;
    
    const theme = appSettings?.theme || 'barao';
    const url = targetUser.enrollment_proof_urls?.[theme] || targetUser.enrollment_proof_url;
    
    if (!url || url === "EMPTY") {
      alert("Comprovante de matrícula não disponível para este aluno no tema atual.");
      return;
    }
    
    // For external links, use window.open as usual
    if (!url.startsWith('data:')) {
      window.open(url, '_blank');
      return;
    }

    // For data URLs (PDF/Image), use the internal viewer to avoid blocked popups on Android
    setShowProofUrl(url);
  };

  const handleForgotAction = async () => {
    if (!forgotEmail) return;
    setIsForgotLoading(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    
    const foundUser = await db.getUserByEmail(forgotEmail);
    
    if (forgotType === 'matricula') {
      if (foundUser) {
        setForgotResult({ success: true, matricula: foundUser.matricula });
      } else {
        setForgotResult({ success: false, message: "E-mail não encontrado em nossa base de dados." });
      }
    } else {
      // Password reset simulation
      if (foundUser) {
        setForgotResult({ success: true, message: "Um link de recuperação foi enviado para seu e-mail." });
      } else {
        setForgotResult({ success: false, message: "E-mail não encontrado em nossa base de dados." });
      }
    }
    
    setForgotStep('result');
    setIsForgotLoading(false);
  };

  const resetForgotFlow = () => {
    setShowForgotModal(false);
    setForgotStep('options');
    setForgotEmail('');
    setForgotResult(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricula || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError("");
    setDebugInfo(null);
    
    try {
      console.log(`Tentando login para matrícula: ${matricula}`);
      const userData = await db.login(matricula, password);
      
      if (userData) {
        console.log("Login bem-sucedido para:", userData.name);
        if (userData.role === 'admin') {
          setUser(userData);
          setView("admin-dashboard");
        } else {
          setEditBirthState(userData.birth_state || "");
          setEditNationality(userData.nationality || "");
          setEditGender(userData.gender || "");
          setEditMaritalStatus(userData.marital_status || "");
          setEditShortName(userData.short_name || "");
          setEditPhotoUrl(userData.photo_url || "");
          setIsSimulatingLoading(true);
          
          setTimeout(() => {
            setUser(userData);
            if (userData.regularity && userData.regularity !== 'Regular') {
              setView("financial");
              setError("Sua conta possui pendências. Por favor, regularize sua situação financeira para acessar o portal completo.");
            } else {
              setView("dashboard");
            }
            fetchStudentData(userData.id);
            setIsSimulatingLoading(false);
          }, 3000);
        }
      } else {
        console.warn("Login falhou: Credenciais incorretas.");
        setError("Matrícula ou senha incorretos.");
      }
    } catch (err: any) {
      console.error("Erro inesperado no handleLogin:", err);
      setError("Erro ao conectar com o servidor.");
      setDebugInfo(err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setDebugInfo("Testando conexão...");
    try {
      const { data, error, count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
        
      if (error) {
        setDebugInfo(`Erro de Conexão: ${error.message}\nDetalhes: ${error.details}\nDica: ${error.hint}\nCódigo: ${error.code}`);
      } else {
        setDebugInfo(`Conexão OK!\nTotal de usuários no banco: ${count}\nURL: ${import.meta.env.VITE_SUPABASE_URL}`);
      }
    } catch (err: any) {
      setDebugInfo(`Erro Crítico: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentData = async (id: number) => {
    const dashboardData = await db.getStudentDashboard(id);
    setData(dashboardData);
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
    setMatricula("");
    setPassword("");
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Views
  const renderView = () => {
    switch (view) {
      case "login": return (
        <LoginView 
          appSettings={appSettings}
          handleLogin={handleLogin}
          matricula={matricula}
          setMatricula={setMatricula}
          password={password}
          setPassword={setPassword}
          error={error}
          loading={loading}
          onForgotClick={() => setShowForgotModal(true)}
        />
      );
      case "dashboard": return <StudentDashboard />;
      case "grades": return <GradesView />;
      case "schedule": return <ScheduleView />;
      case "announcements": return <AnnouncementsView />;
      case "financial": return <FinancialView />;
      case "activities": return <ActivitiesView />;
      case "exams": return <ExamsView />;
      case "online-classes": return <OnlineClassesView />;
      case "card": return <VirtualCardView />;
      case "profile": return <ProfileView />;
      case "library": return <LibraryView />;
      case "admin-dashboard": return (
        <AdminDashboard 
          appSettings={appSettings}
          setAppSettings={setAppSettings}
          handleLogout={handleLogout}
        />
      );
      default: return (
        <>
          {isEnvMissing && (
            <div className="fixed top-0 left-0 right-0 z-[200] bg-red-600 text-white p-3 text-center text-sm font-bold shadow-lg">
              ⚠️ Configuração do Supabase Ausente! Adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas configurações.
            </div>
          )}
          <LoginView 
            appSettings={appSettings}
            handleLogin={handleLogin}
            matricula={matricula}
            setMatricula={setMatricula}
            password={password}
            setPassword={setPassword}
            error={error}
            loading={loading}
            onForgotClick={() => setShowForgotModal(true)}
          />
          
          <div className="fixed bottom-4 left-4 right-4 flex flex-col items-center gap-2">
            <button 
              onClick={testConnection}
              className="text-[10px] text-slate-400 hover:text-slate-600 underline"
            >
              Verificar Conexão com Supabase
            </button>
            {debugInfo && (
              <div className="bg-slate-800 text-white text-[10px] p-3 rounded-lg max-w-md w-full overflow-auto whitespace-pre-wrap font-mono">
                {debugInfo}
              </div>
            )}
          </div>
        </>
      );
    }
  };

  const StudentDashboard = () => (
    <div className={cn(
      "min-h-screen pb-20",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : 
      appSettings?.theme === 'uni' ? "bg-[#f5f6f8]" : 
      appSettings?.theme === 'uniplan' ? "bg-white" : 
      appSettings?.theme === 'barao' ? "bg-slate-50" : "bg-slate-50"
    )}>
      {appSettings?.theme === 'uniplan' ? (
        <>
          {/* Uniplan Theme Header */}
          <div className="bg-[#e31a22] text-white p-4 pt-12 pb-4 relative overflow-hidden rounded-b-[40px] shadow-lg">
            <div className="flex justify-between items-center relative z-10 px-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <Menu className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-black italic tracking-tighter text-white leading-none">UNIPLAN</h1>
                <p className="text-[8px] font-bold text-white/90 uppercase tracking-[0.2em] mt-1">CENTRO UNIVERSITÁRIO PLANALTO DO DISTRITO FEDERAL</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
                <div className="w-10 h-10 bg-[#001a4d] rounded-full flex items-center justify-center border-2 border-white/20 shadow-inner">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-6 px-4">
              <h2 className="text-3xl font-black text-white">Secretaria</h2>
            </div>
          </div>
        </>
      ) : appSettings?.theme === 'barao' ? (
        <>
          {/* Barao Theme Header */}
          <div className="bg-[#00a2b1] text-white p-4 pt-10 pb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://picsum.photos/seed/students/800/400" 
                alt="Background" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex justify-between items-center relative z-10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-md transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
                  <Bell className="w-5 h-5 text-white" />
                </button>
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-white/50 shadow-md">
                  <img 
                    src={user?.photo_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Barao News Hero */}
          <div className="p-4 -mt-4 relative z-20">
            <AnimatePresence mode="wait">
              <motion.div 
                key={newsIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={data.news && data.news.length > 0 ? data.news[newsIndex].image : "https://picsum.photos/seed/event/800/400"} 
                    alt="News" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <img src={appSettings.logo_url} alt="Logo" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                    <span className="text-[8px] font-black text-slate-800 uppercase tracking-tighter">{appSettings?.college_name || "Barão de Mauá"}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-2">
                    {data.news && data.news.length > 0 ? data.news[newsIndex].title : "Carregando notícias..."}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {data.news && data.news.length > 0 ? data.news[newsIndex].description : ""}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-4">
              {data.news && data.news.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setNewsIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === newsIndex ? "bg-indigo-600 w-4" : "bg-slate-200"
                  )} 
                />
              ))}
            </div>
          </div>
        </>
      ) : appSettings?.theme === 'retro' ? (
        <>
          {/* Classic Header */}
          <div className="bg-[#00678a] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <Menu className="w-6 h-6" />
              <h1 className="text-xl font-medium tracking-wide">{appSettings?.college_name || "Barão de Mauá"}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-6 h-6" />
              <button onClick={handleLogout} className="p-1 active:scale-90 transition-transform">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Classic Hero */}
          <div className="relative h-64 overflow-hidden bg-[#004a63]">
            {/* Geometric Background */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-teal to-brand-blue" />
              <div className="absolute top-0 left-0 w-full h-full" style={{ 
                backgroundImage: 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 100%)',
                backgroundSize: '40px 40px'
              }} />
            </div>
            
            <div className="relative z-10 h-full flex items-center px-6 gap-6">
              <img 
                src={user?.photo_url} 
                alt="Student" 
                className="w-32 h-40 object-cover border-2 border-white/20 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white p-1 rounded-sm">
                    <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider">Carreiras</span>
                </div>
                <h2 className="text-lg font-bold leading-tight mb-2">Conheça o novo Portal de Carreiras</h2>
                <p className="text-xs text-white/80 mb-4">Os melhores caminhos para o seu futuro acadêmico.</p>
                <button className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded text-xs font-bold border border-white/30">
                  Saiba mais
                </button>
              </div>
            </div>
            
            {/* Pagination dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </>
      ) : appSettings?.theme === 'uni' ? (
        <>
          {/* Uni Theme Header */}
          <div className="bg-gradient-to-b from-[#002b6b] to-[#0044a8] text-white p-6 pt-10 pb-12 relative overflow-hidden">
            {/* Subtle radial glow */}
            <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-[100px]" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex flex-col">
                <h1 className="text-4xl font-black italic tracking-tighter text-white mb-6">UNIP</h1>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={user?.photo_url} 
                      alt="Student" 
                      className="w-20 h-20 rounded-full border-2 border-white/30 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Olá, {user?.name?.split(' ')[0]?.toUpperCase()}</h2>
                    <p className="text-[10px] font-medium text-white/70 uppercase tracking-wide mb-2">
                      {user?.course?.toUpperCase() || "DESIGN DE MODA"}
                    </p>
                    <div className="flex gap-2">
                      <div className="bg-[#001a40]/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                        <CreditCard className="w-3 h-3 text-white/60" />
                        <span className="text-[10px] font-bold">{user?.matricula}</span>
                      </div>
                      <div className="bg-[#001a40]/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Ativo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all active:scale-95"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Modern Header */
        <div className={cn(
          "text-white p-6 pt-12 shadow-lg bg-brand-teal rounded-b-[40px]"
        )}>
          {/* University Branding */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white flex items-center justify-center overflow-hidden p-1 shadow-inner rounded-xl">
              <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight">{appSettings?.college_name || "Barão de Mauá"}</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-50">Portal do Aluno</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img 
                src={user?.photo_url} 
                alt="Profile" 
                className="w-16 h-16 border-2 object-cover rounded-2xl border-white/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                <p className="text-xs font-medium text-teal-50">RA: {user?.matricula}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-3 transition-all active:scale-90 bg-white/20 rounded-2xl text-white backdrop-blur-md"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 flex items-center justify-between bg-white/10 rounded-2xl backdrop-blur-sm">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-teal-50">Matrícula</p>
              <p className="text-lg font-mono font-bold text-white">{user?.matricula}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider font-semibold text-teal-50">Estado</p>
              <p className="text-lg font-bold text-white">{user?.regularity || "Regular"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links Grid */}
      <div className={cn(
        "p-6 grid gap-4",
        appSettings?.theme === 'uni' ? "-mt-8 grid-cols-3" : 
        appSettings?.theme === 'uniplan' ? "mt-4 grid-cols-2" : "-mt-6",
        appSettings?.theme === 'retro' ? "grid-cols-3" : 
        appSettings?.theme === 'barao' ? "grid-cols-2" :
        appSettings?.theme === 'uni' ? "grid-cols-3" : "grid-cols-2"
      )}>
        {appSettings?.theme === 'uniplan' ? (
          <>
            <DashboardCard 
              icon={<Calendar />} 
              label="Aulas" 
              onClick={() => navigateTo("schedule")} 
            />
            <DashboardCard 
              icon={<MessageSquare />} 
              label="Avisos" 
              onClick={() => navigateTo("announcements")} 
            />
            <DashboardCard 
              icon={<UserSquare2 />} 
              label="Boletim" 
              onClick={() => navigateTo("grades")} 
            />
            <DashboardCard 
              icon={<FileText />} 
              label="Documentos" 
              onClick={() => {}} 
            />
            <DashboardCard 
              icon={<FolderOpen />} 
              label="Histórico" 
              onClick={() => {}} 
            />
            <DashboardCard 
              icon={<Wrench />} 
              label="Serviços" 
              onClick={() => {}} 
            />
            <DashboardCard 
              icon={<CreditCard />} 
              label="Cartão Virtual" 
              onClick={() => navigateTo("card")} 
            />
            <DashboardCard 
              icon={<MonitorPlay />} 
              label="Aulas EAD" 
              onClick={() => navigateTo("online-classes")} 
            />
            <DashboardCard 
              icon={<UserIcon />} 
              label={appSettings?.theme === 'uni' ? "Meu Cadastro" : "Perfil"} 
              onClick={() => navigateTo("profile")} 
            />
            <DashboardCard 
              icon={<BookOpen />} 
              label="Biblioteca Online" 
              onClick={() => navigateTo("library")} 
            />
          </>
        ) : appSettings?.theme === 'barao' ? (
          <>
            <DashboardCard icon={<GraduationCap />} label="Notas e Faltas" color="bg-blue-500" onClick={() => navigateTo("grades")} />
            <DashboardCard icon={<Calendar />} label="Horario de Aulas" color="bg-blue-500" onClick={() => navigateTo("schedule")} />
            <DashboardCard icon={<Bell />} label="Comunicados" color="bg-blue-500" onClick={() => navigateTo("announcements")} />
            <DashboardCard icon={<CreditCard />} label="Cartão Virtual" color="bg-blue-500" onClick={() => navigateTo("card")} />
            <DashboardCard icon={<Wallet />} label="Financeiro" color="bg-blue-500" onClick={() => navigateTo("financial")} />
            <DashboardCard icon={<Library />} label="Atividade Complementar" color="bg-blue-500" onClick={() => navigateTo("activities")} />
            <DashboardCard icon={<UserIcon />} label={appSettings?.theme === 'uni' ? "Meu Cadastro" : "Perfil"} color="bg-blue-500" onClick={() => navigateTo("profile")} />
            <DashboardCard icon={<BookOpen />} label="Biblioteca Online" color="bg-blue-500" onClick={() => navigateTo("library")} />
          </>
        ) : appSettings?.theme === 'uni' ? (
          <>
            <DashboardCard icon={<DollarSign />} label="Pagamentos" color="bg-blue-500" onClick={() => navigateTo("financial")} />
            <DashboardCard icon={<CreditCard />} label="Carteira Estudantil" color="bg-blue-500" onClick={() => navigateTo("card")} />
            <DashboardCard icon={<FileCheck />} label="Atestado Matrícula" color="bg-blue-500" onClick={() => handleOpenProof(user?.enrollment_proof_url || "")} />
            <DashboardCard icon={<Layers />} label="Histórico Escolar" color="bg-blue-500" onClick={() => {}} />
            <DashboardCard icon={<GraduationCap />} label="Notas e Faltas" color="bg-blue-500" onClick={() => navigateTo("grades")} />
            <DashboardCard icon={<ClipboardList />} label="Médias e Exames" color="bg-blue-500" onClick={() => {}} />
            <DashboardCard icon={<MonitorPlay />} label="AVA" color="bg-blue-500" onClick={() => {}} />
            <DashboardCard icon={<Monitor />} label="Disciplinas Online" color="bg-blue-500" onClick={() => navigateTo("online-classes")} />
            <DashboardCard icon={<FileEdit />} label="Trabalhos" color="bg-blue-500" onClick={() => {}} />
            <DashboardCard icon={<BookOpen />} label="Biblioteca Online" color="bg-blue-500" onClick={() => navigateTo("library")} />
            <DashboardCard icon={<Bell />} label="Comunicados" color="bg-blue-500" onClick={() => navigateTo("announcements")} />
            <DashboardCard icon={<UserIcon />} label="Meu Cadastro" color="bg-blue-500" onClick={() => navigateTo("profile")} />
          </>
        ) : (
          <>
            <DashboardCard 
              icon={<GraduationCap />} 
              label="Notas" 
              color="bg-emerald-500" 
              onClick={() => navigateTo("grades")} 
            />
            <DashboardCard 
              icon={<Calendar />} 
              label="Horários" 
              color="bg-blue-500" 
              onClick={() => navigateTo("schedule")} 
            />
            <DashboardCard 
              icon={<Bell />} 
              label="Avisos" 
              color="bg-amber-500" 
              onClick={() => navigateTo("announcements")} 
            />
            <DashboardCard 
              icon={<Wallet />} 
              label="Financeiro" 
              color="bg-rose-500" 
              onClick={() => navigateTo("financial")} 
            />
            <DashboardCard 
              icon={<FileCheck />} 
              label="Atividades" 
              color="bg-indigo-500" 
              onClick={() => navigateTo("activities")} 
            />
            <DashboardCard 
              icon={<CreditCard />} 
              label="Carteirinha" 
              color="bg-purple-500" 
              onClick={() => navigateTo("card")} 
            />
            <DashboardCard 
              icon={<ClipboardList />} 
              label="Exames" 
              color="bg-cyan-500" 
              onClick={() => navigateTo("exams")} 
            />
            <DashboardCard 
              icon={<Monitor />} 
              label="Aulas Online" 
              color="bg-orange-500" 
              onClick={() => navigateTo("online-classes")} 
            />
            <DashboardCard 
              icon={<UserIcon />} 
              label={appSettings?.theme === 'uni' ? "Meu Cadastro" : "Perfil"} 
              color="bg-slate-500" 
              onClick={() => navigateTo("profile")} 
            />
            <DashboardCard 
              icon={<BookOpen />} 
              label="Biblioteca Online" 
              color="bg-violet-500" 
              onClick={() => navigateTo("library")} 
            />
          </>
        )}
      </div>

      {/* Recent Announcement Preview */}
      {appSettings?.theme !== 'uni' && appSettings?.theme !== 'barao' && (
        <div className="px-6 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Últimos Comunicados</h3>
            <button onClick={() => navigateTo("announcements")} className="text-sm text-blue-600 font-semibold">Ver todos</button>
          </div>
          {data.announcements.length > 0 ? (
            <div className="space-y-3">
              {[...data.announcements]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map((announcement, index) => (
                  <div key={`${announcement.id}-${index}`} className="card border-l-4 border-l-blue-600">
                    <h4 className="font-bold text-slate-900">{announcement.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{announcement.content}</p>
                    <p className="text-[10px] text-slate-400 mt-3 uppercase font-bold">{announcement.date}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="card text-center py-8 text-slate-400">
              Nenhum comunicado recente.
            </div>
          )}
        </div>
      )}

      {/* Uniplan Bottom Nav */}
      {appSettings?.theme === 'uniplan' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center z-50 max-w-md mx-auto">
          <button 
            onClick={() => navigateTo("dashboard")}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              view === "dashboard" ? "text-[#e31a22]" : "text-slate-400"
            )}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Secretaria</span>
          </button>
          <button 
            onClick={() => navigateTo("financial")}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              view === "financial" ? "text-[#e31a22]" : "text-slate-400"
            )}
          >
            <Wallet className="w-6 h-6" />
            <span className="text-[10px] font-medium">Financeiro</span>
          </button>
          <button 
            onClick={() => navigateTo("announcements")}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              view === "announcements" ? "text-[#e31a22]" : "text-slate-400"
            )}
          >
            <Bell className="w-6 h-6" />
            <span className="text-[10px] font-medium">Notificações</span>
          </button>
        </div>
      )}
    </div>
  );

  const DashboardCard = ({ icon, label, color, onClick }: any) => {
    if (appSettings?.theme === 'uniplan') {
      return (
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="bg-[#f5f6f8] rounded-[32px] flex flex-col items-center justify-center p-6 gap-3 active:scale-95 transition-all h-44 shadow-sm border border-slate-100"
        >
          <div className="text-[#e31a22]">
            {React.cloneElement(icon, { size: 48, strokeWidth: 1.5 })}
          </div>
          <span className="text-sm font-medium text-[#e31a22] text-center">{label}</span>
        </motion.button>
      );
    }

    if (appSettings?.theme === 'uni') {
      return (
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="bg-white rounded-xl shadow-sm border-b-4 border-[#002b6b] flex flex-col items-center justify-center p-4 gap-3 active:scale-95 transition-all h-32"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#002b6b]">
            {React.cloneElement(icon, { size: 28 })}
          </div>
          <span className="text-[10px] font-bold text-[#002b6b] text-center leading-tight px-1 uppercase tracking-tighter">{label}</span>
        </motion.button>
      );
    }

    if (appSettings?.theme === 'barao') {
      const getIconColor = () => {
        if (label.includes("Notas")) return "text-blue-600";
        if (label.includes("Horario")) return "text-teal-500";
        if (label.includes("Comunicados")) return "text-indigo-600";
        if (label.includes("Cartão")) return "text-pink-600";
        if (label.includes("Financeiro")) return "text-blue-500";
        if (label.includes("Atividade")) return "text-blue-600";
        return "text-blue-600";
      };

      return (
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-start justify-between p-4 h-40 active:scale-95 transition-all"
        >
          <div className={getIconColor()}>
            {React.cloneElement(icon, { size: 32 })}
          </div>
          <span className="text-sm font-bold text-slate-700 text-left leading-tight">{label}</span>
        </motion.button>
      );
    }

    return (
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "flex flex-col items-stretch transition-all text-center overflow-hidden",
          appSettings?.theme === 'retro' 
            ? "bg-white rounded-lg border border-slate-200 shadow-sm p-0" 
            : "bg-white rounded-3xl shadow-sm border border-slate-100 p-5 gap-3"
        )}
      >
        {appSettings?.theme === 'retro' ? (
          <>
            <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[100px]">
              <div className="text-[#00a2b1] mb-2">
                {React.cloneElement(icon, { size: 32 })}
              </div>
            </div>
            <div className="bg-[#00a2b1] py-2 px-1">
              <span className="font-bold text-[11px] text-white uppercase tracking-tight line-clamp-1">{label}</span>
            </div>
          </>
        ) : (
          <>
            <div className={cn(
              "w-12 h-12 flex items-center justify-center text-white self-center",
              `${color} rounded-2xl shadow-lg`
            )}>
              {React.cloneElement(icon, { size: 24 })}
            </div>
            <span className="font-bold text-sm text-slate-700">{label}</span>
          </>
        )}
      </motion.button>
    );
  };

  const ViewHeader = ({ title, onBack }: { title: string, onBack: () => void }) => (
    <div className={cn(
      "p-4 pt-10 flex items-center justify-between sticky top-0 z-50 shadow-md",
      appSettings?.theme === 'retro' ? "bg-[#00678a] text-white" : 
      appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white" :
      appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white" : "bg-white border-b border-slate-100 text-slate-900"
    )}>
      <div className="flex items-center gap-4">
        <button onClick={onBack} className={cn(
          "p-2 transition-colors",
          appSettings?.theme === 'retro' || appSettings?.theme === 'barao' || appSettings?.theme === 'uniplan' ? "text-white" : "hover:bg-slate-100 rounded-xl"
        )}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-medium tracking-wide">{title}</h2>
      </div>
      <button 
        onClick={handleLogout}
        className={cn(
          "p-2 rounded-xl transition-all active:scale-95",
          appSettings?.theme === 'retro' || appSettings?.theme === 'barao' || appSettings?.theme === 'uniplan' ? "text-white hover:bg-white/10" : "text-slate-400 hover:bg-slate-100"
        )}
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );

  const GradesView = () => (
    <div className={cn(
      "min-h-screen",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader title="Consulta de Notas" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-4">
        {data.grades.map((grade, index) => (
          <div key={`${grade.id}-${index}`} className="card">
            <div className="flex justify-between items-start mb-4">
              <h3 className={cn(
                "font-bold",
                appSettings?.theme === 'retro' ? "text-black" : "text-slate-900"
              )}>{grade.discipline_name}</h3>
              <span className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase",
                appSettings?.theme === 'retro' ? "bg-black text-white" : (grade.status === "Aprovado" ? "bg-emerald-100 text-emerald-700 rounded-full" : "bg-blue-100 text-blue-700 rounded-full")
              )}>
                {grade.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <GradeItem label="Bimestre 1" value={grade.grade_b1.toFixed(1)} />
              <GradeItem label="Bimestre 2" value={grade.grade_b2 > 0 ? grade.grade_b2.toFixed(1) : "-"} />
              <GradeItem label="Média Final" value={grade.final_grade.toFixed(1)} highlight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const GradeItem = ({ label, value, highlight }: any) => (
    <div className={cn(
      "text-center p-2",
      appSettings?.theme === 'retro' ? "bg-slate-100 border border-black" : "bg-slate-50 rounded-2xl"
    )}>
      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">{label}</p>
      <p className={cn(
        "text-lg font-bold",
        highlight ? (appSettings?.theme === 'retro' ? "text-black" : appSettings?.theme === 'barao' ? "text-[#00a2b1]" : "text-blue-600") : "text-slate-700"
      )}>{value}</p>
    </div>
  );

  const ScheduleView = () => (
    <div className={cn(
      "min-h-screen",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader title="Horário de Aulas" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-6">
        {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map(day => {
          const dayClasses = data.schedule.filter(s => s.day_of_week === day);
          if (dayClasses.length === 0) return null;
          return (
            <div key={day} className="space-y-3">
              <h3 className={cn(
                "font-bold uppercase text-xs tracking-widest ml-1",
                appSettings?.theme === 'retro' ? "text-black" : "text-slate-400"
              )}>{day}</h3>
              {dayClasses.map((item, index) => (
                <div key={`${item.id}-${index}`} className="card flex gap-4 items-center">
                  <div className={cn(
                    "w-16 text-center pr-4",
                    appSettings?.theme === 'retro' ? "border-r border-black" : "border-r border-slate-100"
                  )}>
                    <p className={cn(
                      "text-sm font-bold",
                      appSettings?.theme === 'retro' ? "text-black" : 
                      appSettings?.theme === 'barao' ? "text-[#00a2b1]" : "text-blue-600"
                    )}>{item.time.split(' - ')[0]}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{item.time.split(' - ')[1]}</p>
                  </div>
                  <div>
                    <h4 className={cn(
                      "font-bold",
                      appSettings?.theme === 'retro' ? "text-black" : "text-slate-900"
                    )}>{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.professor} • {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const AnnouncementsView = () => (
    <div className={cn(
      "min-h-screen",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader title="Comunicados" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-4">
        {[...data.announcements]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((ann, index) => (
            <div key={`${ann.id}-${index}`} className={cn(
              "card relative overflow-hidden",
              ann.important && (
                appSettings?.theme === 'retro' ? "border-l-4 border-l-black" : 
                appSettings?.theme === 'barao' ? "border-l-4 border-l-[#00a2b1]" : "border-l-4 border-l-red-500"
              )
            )}>
            {ann.important && (
              <div className={cn(
                "absolute top-0 right-0 text-[8px] font-bold px-2 py-1 uppercase",
                appSettings?.theme === 'retro' ? "bg-black text-white" : 
                appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white rounded-bl-lg" : "bg-red-500 text-white rounded-bl-lg"
              )}>
                Importante
              </div>
            )}
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">{ann.date}</p>
            <h3 className={cn(
              "font-bold mb-2",
              appSettings?.theme === 'retro' ? "text-black" : "text-slate-900"
            )}>{ann.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{ann.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const FinancialView = () => (
    <div className={cn(
      "min-h-screen",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader title="Financeiro" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-4">
        {data.payments.length > 0 ? (
          data.payments.map((pay, index) => (
            <div key={`${pay.id}-${index}`} className="card">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Vencimento</p>
                  <p className={cn(
                    "font-bold",
                    appSettings?.theme === 'retro' ? "text-black" : "text-slate-900"
                  )}>{pay.due_date}</p>
                </div>
                <span className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase",
                  appSettings?.theme === 'retro' ? "bg-black text-white" : 
                  appSettings?.theme === 'barao' ? (pay.status === "Pago" ? "bg-[#00a2b1]/10 text-[#00a2b1] rounded-full" : "bg-orange-100 text-orange-700 rounded-full") :
                  (pay.status === "Pago" ? "bg-emerald-100 text-emerald-700 rounded-full" : "bg-orange-100 text-orange-700 rounded-full")
                )}>
                  {pay.status}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Valor</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    appSettings?.theme === 'retro' ? "text-black" : "text-slate-900"
                  )}>R$ {pay.amount.toFixed(2)}</p>
                </div>
                {pay.status !== "Pago" && (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(pay.pix_code);
                      setShowToast({ message: "Código PIX copiado!", type: 'success' });
                    }}
                    className={cn(
                      "px-4 py-2 text-xs font-bold flex items-center gap-2",
                      appSettings?.theme === 'retro' ? "bg-black text-white" : "bg-blue-600 text-white rounded-xl"
                    )}
                  >
                    <Copy className="w-4 h-4" /> Copiar PIX
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <div className={cn(
              "w-16 h-16 flex items-center justify-center mx-auto mb-4",
              appSettings?.theme === 'retro' ? "bg-slate-200 border border-black" : "bg-slate-50 rounded-full"
            )}>
              <FileCheck className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">Nenhum boleto pendente ou futuro encontrado.</p>
            <p className="text-slate-400 text-xs mt-1">Boletos vencidos não são exibidos.</p>
          </div>
        )}
      </div>
    </div>
  );

  const ActivitiesView = () => {
    const [title, setTitle] = useState("");
    const [hours, setHours] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await db.addActivity({
        student_id: user?.id,
        title,
        hours: parseInt(hours),
        certificate_url: "https://example.com/cert.pdf"
      });
      setShowForm(false);
      fetchStudentData(user!.id);
    };

    const totalHours = data.activities
      .filter(a => a.status === 'approved')
      .reduce((acc, curr) => acc + curr.hours, 0);

    return (
      <div className={cn(
        "min-h-screen",
        appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
      )}>
        <ViewHeader title="Atividades Complementares" onBack={() => navigateTo("dashboard")} />
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className={cn(
            "p-6 shadow-xl flex justify-between items-center",
            appSettings?.theme === 'retro' ? "bg-black text-white border border-black" : 
            appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white rounded-3xl" : "bg-slate-900 text-white rounded-3xl"
          )}>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Acumulado</p>
              <p className="text-3xl font-bold">{totalHours}h</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Meta</p>
              <p className="text-xl font-bold">200h</p>
            </div>
          </div>

          <button 
            onClick={() => setShowForm(true)}
            className={cn(
              "w-full py-4 font-bold flex items-center justify-center gap-2 transition-all",
              appSettings?.theme === 'retro' ? "bg-black text-white border border-black" : "border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-blue-500 hover:text-blue-500"
            )}
          >
            <Plus className="w-5 h-5" /> Enviar Novo Certificado
          </button>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Histórico de Envios</h3>
            {data.activities.map((act, index) => (
              <div key={`${act.id}-${index}`} className="card flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">{act.title}</h4>
                  <p className="text-xs text-slate-500">{act.hours} horas</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn(
                    "px-2 py-1 rounded-lg text-[8px] font-bold uppercase",
                    act.status === 'approved' ? "bg-emerald-100 text-emerald-700" :
                    act.status === 'rejected' ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {act.status === 'approved' ? "Aprovado" : act.status === 'rejected' ? "Rejeitado" : "Em análise"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Novo Envio</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Título da Atividade</label>
                    <input type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Carga Horária</label>
                    <input type="number" className="input-field" value={hours} onChange={e => setHours(e.target.value)} required />
                  </div>
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Toque para selecionar o certificado</p>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-4">Enviar para Análise</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const LibraryView = () => (
    <div className={cn(
      "min-h-screen",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader title="Biblioteca Online" onBack={() => navigateTo("dashboard")} />
      <div className="p-6">
        <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-slate-100 flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center text-violet-600">
            <BookOpen size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Biblioteca Digital</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm">
              Acesse milhares de livros, artigos científicos e materiais de estudo diretamente do seu portal.
            </p>
          </div>
          <button className="bg-violet-600 text-white px-8 py-3 rounded-2xl font-bold font-black shadow-lg shadow-violet-200 active:scale-95 transition-all">
            Acessar Acervo
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="card p-4 flex flex-col gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={20} />
            </div>
            <p className="font-bold text-sm">Artigos FAPESP</p>
          </div>
          <div className="card p-4 flex flex-col gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Search size={20} />
            </div>
            <p className="font-bold text-sm">Base Scielo</p>
          </div>
        </div>
      </div>
    </div>
  );

  const VirtualCardView = () => (
    <div className={cn(
      "min-h-screen flex flex-col",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : 
      appSettings?.theme === 'uni' ? "bg-[#f5f6f8]" : 
      appSettings?.theme === 'barao' ? "bg-slate-50" : "bg-slate-900"
    )}>
      {appSettings?.theme === 'retro' ? (
        <>
          {/* Header Section (Blue) */}
          <div className="bg-[#00678a] text-white pt-12 pb-20 px-6 flex flex-col items-center text-center relative">
            <button onClick={() => navigateTo("dashboard")} className="absolute top-10 left-6 p-2 text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="relative mb-4">
              <img 
                src={user?.photo_url} 
                className="w-24 h-24 rounded-full border-4 border-white/20 object-cover shadow-xl"
                alt="Profile"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-lg">
                <div className="bg-slate-100 p-1 rounded-full">
                  <UserIcon className="w-3 h-3 text-slate-600" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-white/80 text-sm mb-1">{user?.email || "aluno@baraodemaua.br"}</p>
            <p className="text-white/80 text-sm">{user?.matricula}</p>
            
            <div className="absolute bottom-4 right-6 opacity-60">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>

          {/* Card Section */}
          <div className="px-6 -mt-12 relative z-10">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Top (Blue Gradient) */}
              <div className="bg-gradient-to-br from-[#00678a] to-[#00a2b1] p-8 pb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <div className="absolute top-6 right-8 text-white/40">
                  <Wifi className="w-8 h-8 rotate-90" />
                </div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white p-1.5 rounded-lg shadow-sm">
                    <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{appSettings?.college_name || "Barão de Mauá"}</h3>
                </div>
                <p className="text-white/60 text-xs mt-4 font-medium uppercase tracking-widest">{user?.course || "Marketing Digital"}</p>
              </div>
              
              {/* Card Bottom (White) */}
              <div className="p-8 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Matrícula</p>
                  <p className="text-slate-900 font-bold text-sm">{user?.matricula}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Estado</p>
                  <p className="text-slate-900 font-bold text-sm">{user?.regularity || "Regular"}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Validade</p>
                  <div className="flex items-center justify-end gap-1.5">
                    {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />}
                    <p className="text-slate-900 font-bold text-sm">{user?.validity || "10 Set 2026"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Info Section (Retro) */}
          <div className="px-6 mt-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Nome Completo</p>
                <p className="text-slate-900 font-bold">{user?.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">CPF</p>
                  <p className="text-slate-900 font-bold">{user?.cpf || "000.000.000-00"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Data de Nascimento</p>
                  <p className="text-slate-900 font-bold">{formatDate(user?.birth_date) || "01/01/2000"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="p-6 mt-4">
            <h4 className="text-slate-900 font-bold mb-4 ml-2">Ações rápidas</h4>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleOpenProof(user!)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <div className="p-3 bg-slate-50 rounded-xl">
                  <FileCheck className="w-8 h-8 text-[#00678a]" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase text-center leading-tight">Comprovante de matrícula</span>
              </button>

              <button 
                onClick={() => {
                  const subject = encodeURIComponent(`Cartão Virtual - ${user?.name}`);
                  const body = encodeURIComponent(`Olá,\n\nSegue os dados do meu Cartão Virtual da ${appSettings?.college_name || "Barão de Mauá"}:\n\nNome: ${user?.name}\nMatrícula: ${user?.matricula}\nCurso: ${user?.course}\n\nAtenciosamente.`);
                  window.location.href = `mailto:?subject=${subject}&body=${body}`;
                  setShowToast(true);
                }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Mail className="w-8 h-8 text-[#00678a]" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase text-center leading-tight">Enviar por e-mail</span>
              </button>
            </div>
          </div>

          {/* Informações Simplificadas (Retro) */}
          <div className="px-6 mt-6">
            <div className="w-full space-y-1 text-center border-b border-slate-100 pb-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dados do Estudante</p>
              <h4 className="text-base font-black text-slate-800 leading-tight">{user?.name}</h4>
              <div className="flex items-center justify-center gap-6 mt-1">
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Nascimento</p>
                  <p className="text-xs font-bold text-slate-700">{formatDate(user?.birth_date)}</p>
                </div>
                <div className="w-px h-5 bg-slate-100" />
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">CPF</p>
                  <p className="text-xs font-bold text-slate-700">{user?.cpf}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section (Retro) */}
          <div className="p-8 flex flex-col items-center">
            <div className="p-4 mb-6 bg-white border-2 border-slate-100 rounded-3xl shadow-sm">
              <QRCodeSVG value={`STUDENT:${user?.matricula}`} size={160} />
            </div>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold text-center max-w-xs mb-8">
              Apresente para acesso e meia-entrada
            </p>
          </div>

          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl z-50"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                <span className="font-bold text-sm">Enviado com sucesso!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <div className={cn(
            "p-6 pt-12 flex items-center justify-between sticky top-0 z-50 shadow-md",
            appSettings?.theme === 'uni' ? "bg-gradient-to-b from-[#002b6b] to-[#0044a8] text-white" : 
            appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white" :
            appSettings?.theme === 'retro' ? "bg-[#00678a] text-white" : 
            appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white" : "bg-slate-900 text-white"
          )}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateTo("dashboard")} 
                className={cn(
                  "p-2 rounded-xl transition-all active:scale-95",
                  "bg-white/10 text-white"
                )}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-medium tracking-wide text-white">
                Cartão Virtual
              </h2>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-xl transition-all active:scale-95 bg-white/10 text-white hover:bg-white/20"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className={cn(
            "flex-1 flex items-center justify-center p-6 relative",
            appSettings?.theme === 'uni' && "bg-[#f5f6f8]"
          )}>
            {appSettings?.theme === 'uni' && (
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0044a8] to-transparent opacity-20" />
            )}
            <div className="w-full max-w-sm relative z-10">
              <div className="pb-[62.5%]" /> {/* Aspect ratio hack 1.6:1 */}
              <motion.div 
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                className={cn(
                  "absolute inset-0 shadow-2xl overflow-hidden flex flex-col rounded-xl",
                  appSettings?.theme === 'uni' 
                    ? "bg-white" 
                    : appSettings?.theme === 'uniplan'
                    ? "bg-white p-6 rounded-3xl border-2 border-[#e31a22]/10"
                    : appSettings?.theme === 'barao'
                    ? "bg-white p-4 rounded-3xl border border-slate-100"
                    : "bg-gradient-to-br from-brand-blue to-brand-teal p-6 rounded-3xl"
                )}
              >
                {appSettings?.theme === 'uni' ? (
                  <>
                    {/* Uni Theme Card Design (With Photo) */}
                    <div className="bg-white p-3 flex gap-3 items-start">
                      <div className="w-16 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                        <img src={user?.photo_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-black italic tracking-tighter text-[#fbdf07] drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">UNIP</span>
                        </div>
                        <div className="bg-[#e31e24] px-1.5 py-0.5 mt-1 -ml-1 transform -skew-x-12 w-fit">
                          <span className="text-[7px] font-bold text-white uppercase tracking-tighter italic">Universidade Paulista</span>
                        </div>
                      </div>
                      <div className="text-right pt-1 flex flex-col items-end">
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight leading-tight max-w-[80px]">{user?.course?.toUpperCase() || "ADMINISTRAÇÃO"}</span>
                        <div className="text-slate-400 mt-1">
                          <Wifi className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>

                    {/* Middle Section (Blue Gradient) */}
                    <div className="flex-1 bg-gradient-to-b from-[#b3d4ff] to-[#d9e9ff] p-3 px-4 flex justify-between items-center border-y border-blue-100">
                      <div className="space-y-1.5">
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">MATRICULA:</span>
                          <span className="text-[9px] font-bold text-slate-700">{user?.matricula}</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">SEMESTRE:</span>
                          <span className="text-[9px] font-bold text-slate-700">{user?.semester || "1"}º SEMESTRE</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">IDENTIDADE:</span>
                          <span className="text-[9px] font-bold text-slate-700">{user?.cpf || "457696059"}</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">DATA NASCIMENTO:</span>
                          <span className="text-[9px] font-bold text-slate-700">{formatDate(user?.birth_date) || "11/05/1989"}</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-[8px] font-black text-slate-900">NOME:</span>
                          <span className="text-[9px] font-bold text-slate-700 leading-tight">{user?.name?.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="bg-white p-1 rounded-sm shadow-sm border border-blue-100 flex-shrink-0">
                        <QRCodeSVG value={`STUDENT:${user?.matricula}`} size={60} />
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="bg-white p-2 px-4 text-right flex items-center justify-end gap-1.5">
                      {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />}
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Validade: {user?.validity?.toUpperCase() || "JUN/2024"}</span>
                    </div>
                  </>
                ) : appSettings?.theme === 'uniplan' ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-black italic tracking-tighter text-[#e31a22] leading-none">UNIPLAN</h3>
                        <p className="text-[6px] font-bold text-slate-400 uppercase tracking-widest mt-1">Centro Universitário Planalto</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="px-2 py-0.5 bg-[#e31a22] rounded text-[8px] font-bold text-white uppercase mb-1">
                          Estudante
                        </div>
                        <Wifi className="w-5 h-5 text-[#e31a22] rotate-90" />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-center mb-4">
                      <div className="w-20 h-24 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-inner">
                        <img src={user?.photo_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-black text-slate-800 leading-tight mb-0.5">{user?.name?.toUpperCase()}</h4>
                        <p className="text-[9px] font-bold text-[#e31a22] uppercase mb-2">{user?.course}</p>
                        
                        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                          <div>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">Matrícula</p>
                            <p className="text-[10px] font-black text-slate-700">{user?.matricula}</p>
                          </div>
                          <div>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">Semestre</p>
                            <p className="text-[10px] font-black text-slate-700">{user?.semester || "1"}º</p>
                          </div>
                          <div>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">Validade</p>
                            <div className="flex items-center gap-1">
                              {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />}
                              <p className="text-[10px] font-black text-slate-700">{user?.validity || "12/2026"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-end items-end border-t border-slate-100 pt-3">
                      <div className="text-right">
                        <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">Status Acadêmico</p>
                        <div className="flex items-center gap-1 justify-end">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <p className="text-[10px] font-black text-slate-700 uppercase">{user?.regularity || "Ativo"}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : appSettings?.theme === 'barao' ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-white flex items-center justify-center p-1 rounded-full shadow-md border border-slate-50">
                        <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <h3 className="text-base font-black text-[#00a2b1] leading-tight">{appSettings?.college_name || "Barão de Mauá"}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Cartão de Identificação</p>
                          <Wifi className="w-3.5 h-3.5 text-[#00a2b1] rotate-90" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mb-4">
                      <div className="w-20 h-28 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        <img src={user?.photo_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-xs font-black text-slate-800 leading-tight mb-0.5">{user?.name?.toUpperCase()}</h4>
                        <p className="text-[9px] font-bold text-[#00a2b1] uppercase mb-2">{user?.course}</p>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Matrícula</p>
                              <p className="text-[10px] font-black text-slate-700">{user?.matricula}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Semestre</p>
                              <p className="text-[10px] font-black text-slate-700">{user?.semester || "1"}º Semestre</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Estado do Aluno</p>
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <p className="text-[10px] font-black text-slate-700 uppercase">{user?.regularity || "ATIVO"}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[6px] font-bold text-slate-400 uppercase">Validade</p>
                              <p className="text-[10px] font-black text-slate-700">{user?.validity || "10/2026"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-end items-end">
                      <div className="text-right opacity-40">
                        <p className="text-[5px] font-bold text-slate-400 uppercase tracking-tighter">Documento Digital</p>
                        <p className="text-[5px] font-bold text-slate-400 uppercase tracking-tighter">Válido em todo território nacional</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Card Design Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-teal/20 rounded-full -ml-10 -mb-10 blur-2xl" />
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white flex-shrink-0 overflow-hidden shadow-sm rounded-xl">
                          <div 
                            className="w-full h-full bg-center bg-no-repeat bg-contain" 
                            style={{ backgroundImage: `url(${appSettings.logo_url})` }}
                          />
                        </div>
                        <h3 className="font-bold tracking-tight text-lg leading-tight text-white">{appSettings?.college_name || "Barão de Mauá"}</h3>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="px-3 py-1 backdrop-blur-md bg-white/20 rounded-full text-white">
                          <p className="text-[10px] font-bold uppercase">Estudante</p>
                        </div>
                        <div className="text-white/60">
                          <Wifi className="w-8 h-8 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex gap-4 items-end">
                      <img 
                        src={user?.photo_url} 
                        className="w-20 h-24 flex-shrink-0 object-cover shadow-lg rounded-xl border-2 border-white/30"
                        alt="Student"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 pb-1">
                        <h4 className="font-bold text-lg leading-tight mb-1 text-white">{user?.name}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-teal-100">
                          {user?.course} <span className="ml-4 opacity-80">{user?.semester}º Semestre</span>
                        </p>
                        <div className="mt-3 flex gap-4">
                          <div>
                            <p className="text-[8px] font-bold uppercase text-teal-100">Matrícula</p>
                            <p className="text-xs font-mono font-bold text-white">{user?.matricula}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase text-teal-100">Validade</p>
                            <div className="flex items-center gap-1.5">
                              {user?.regularity === "Regular" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                              <p className="text-xs font-bold text-white">{user?.validity || "12/2026"}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase text-teal-100">Estado</p>
                            <p className="text-xs font-bold text-white">{user?.regularity || "Regular"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          <div className="p-8 flex flex-col items-center bg-white rounded-t-[40px]">
            {/* Informações Simplificadas */}
            <div className="w-full space-y-1 mb-6 text-center border-b border-slate-50 pb-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dados do Estudante</p>
              <h4 className="text-base font-black text-slate-800 leading-tight">{user?.name}</h4>
              <div className="flex items-center justify-center gap-6 mt-1">
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Nascimento</p>
                  <p className="text-xs font-bold text-slate-700">{formatDate(user?.birth_date)}</p>
                </div>
                <div className="w-px h-5 bg-slate-100" />
                <div className="text-center">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">CPF</p>
                  <p className="text-xs font-bold text-slate-700">{user?.cpf}</p>
                </div>
              </div>
            </div>

            {appSettings?.theme === 'uni' && (
              <div className="flex flex-col items-center py-10">
                <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Wifi className="w-20 h-20 text-blue-600 rotate-90" />
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest text-center">
                  Aproxime do leitor para acesso
                </p>
              </div>
            )}
            {appSettings?.theme !== 'uni' && (
              <>
                <div className="p-4 mb-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <QRCodeSVG value={`STUDENT:${user?.matricula}`} size={180} />
                </div>
                <p className="text-slate-400 text-sm text-center max-w-xs mb-8">
                  Apresente este QR Code para acesso às dependências da faculdade e validação de meia-entrada.
                </p>
              </>
            )}

            {(user?.enrollment_proof_urls?.[appSettings?.theme || 'barao'] || user?.enrollment_proof_url) && (
              <button 
                onClick={() => handleOpenProof(user!)}
                className={cn(
                  "w-full py-4 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all",
                  appSettings?.theme === 'uniplan' ? "bg-[#e31a22] text-white rounded-2xl" :
                  appSettings?.theme === 'retro' ? "bg-[#00a2b1] text-white rounded-xl" : 
                  appSettings?.theme === 'uni' ? "bg-[#0044a8] text-white rounded-2xl" : "bg-brand-teal text-white rounded-2xl"
                )}
              >
                <FileCheck className="w-5 h-5" /> Comprovante de matrícula
              </button>
            )}

            {appSettings?.theme !== 'uni' && (
              <>
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent(`Cartão Virtual - ${user?.name}`);
                    const body = encodeURIComponent(`Olá,\n\nSegue os dados do meu Cartão Virtual da ${appSettings?.college_name || "Barão de Mauá"}:\n\nNome: ${user?.name}\nMatrícula: ${user?.matricula}\nCurso: ${user?.course}\n\nAtenciosamente.`);
                    window.location.href = `mailto:?subject=${subject}&body=${body}`;
                    setShowToast(true);
                  }}
                  className={cn(
                    "w-full py-4 mt-4 font-bold flex items-center justify-center gap-2 transition-all active:scale-95",
                    appSettings?.theme === 'retro' ? "bg-white text-[#00678a] border border-slate-200 rounded-xl" : "bg-slate-100 text-slate-700 rounded-2xl hover:bg-slate-200"
                  )}
                >
                  <Mail className="w-5 h-5" /> Enviar por e-mail
                </button>
              </>
            )}

            {appSettings?.theme === 'uni' && (
              <button 
                onClick={handleLogout}
                className="w-full py-4 mt-4 bg-slate-100 text-slate-700 font-bold rounded-2xl"
              >
                Sair da Conta
              </button>
            )}

            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl z-50"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                  <span className="font-bold text-sm">Enviado com sucesso!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );

  const ExamsView = () => (
    <div className={cn(
      "min-h-screen",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader title="Agenda de Provas" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-4">
        {data.exams.length > 0 ? (
          data.exams.map((exam, index) => (
            <div key={`${exam.id}-${index}`} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={cn(
                    "font-bold",
                    appSettings?.theme === 'retro' ? "text-black" : "text-slate-900"
                  )}>{exam.discipline_name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Avaliação {exam.type}</p>
                </div>
                <div className={cn(
                  "px-3 py-1",
                  appSettings?.theme === 'retro' ? "bg-black text-white" : 
                  appSettings?.theme === 'barao' ? "bg-[#00a2b1]/10 text-[#00a2b1] rounded-lg" : "bg-blue-50 text-blue-600 rounded-lg"
                )}>
                  <p className="text-[10px] font-bold uppercase">Data</p>
                  <p className="text-sm font-bold">{new Date(exam.date).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-4 pt-4 border-t",
                appSettings?.theme === 'retro' ? "border-black" : "border-slate-100"
              )}>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">{exam.time}h</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Presencial</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12 text-slate-400">
            Nenhuma prova agendada.
          </div>
        )}
      </div>
    </div>
  );

  const OnlineClassesView = () => (
    <div className={cn(
      "min-h-screen",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader title="Aulas Online EAD" onBack={() => navigateTo("dashboard")} />
      <div className="p-6 space-y-4">
        {data.online_classes.length > 0 ? (
          data.online_classes.map((cls, index) => (
            <div key={`${cls.id}-${index}`} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={cn(
                    "font-bold",
                    appSettings?.theme === 'retro' ? "text-black" : "text-slate-900"
                  )}>{cls.discipline_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-slate-500">{cls.day_of_week} • {cls.time}</p>
                    {cls.mandatory && (
                      <span className={cn(
                        "text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider",
                        appSettings?.theme === 'retro' ? "bg-black text-white" : 
                        appSettings?.theme === 'barao' ? "bg-[#00a2b1]/10 text-[#00a2b1] rounded" : "bg-red-100 text-red-600 rounded"
                      )}>
                        Obrigatória
                      </span>
                    )}
                  </div>
                </div>
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center",
                  appSettings?.theme === 'retro' ? "bg-black text-white" : "bg-pink-50 text-pink-500 rounded-xl"
                )}>
                  <Monitor className="w-5 h-5" />
                </div>
              </div>
              <button 
                onClick={() => window.open(cls.link, '_blank')}
                className={cn(
                  "w-full py-3 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all",
                  appSettings?.theme === 'retro' ? "bg-black text-white" : 
                  appSettings?.theme === 'barao' ? "bg-[#00a2b1] text-white rounded-xl" : "bg-pink-500 text-white rounded-xl"
                )}
              >
                <ExternalLink className="w-4 h-4" /> Acessar Aula Online
              </button>
            </div>
          ))
        ) : (
          <div className="card text-center py-12 text-slate-400">
            Nenhuma aula online agendada.
          </div>
        )}
      </div>
    </div>
  );

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      let finalPhotoUrl = user.photo_url;

      if (selectedPhotoFile) {
        // Upload to Supabase Storage
        const fileExt = selectedPhotoFile.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;
        
        try {
          finalPhotoUrl = await db.uploadFile('student-photos', filePath, selectedPhotoFile);
        } catch (uploadErr) {
          console.error("Upload error:", uploadErr);
          alert("Erro ao fazer upload da foto. Verifique se o bucket 'student-photos' existe e está público.");
          return;
        }
      }

      const updated = await db.updateStudent(user.id, {
        birth_state: editBirthState,
        nationality: editNationality,
        gender: editGender,
        marital_status: editMaritalStatus,
        short_name: editShortName,
        photo_url: finalPhotoUrl
      });
      setUser(updated);
      setIsEditingProfile(false);
      setSelectedPhotoFile(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert("Erro ao salvar perfil");
    }
  };

  const ProfileView = () => (
    <div className={cn(
      "min-h-screen pb-20",
      appSettings?.theme === 'retro' ? "bg-[#e9f1f2]" : "bg-slate-50"
    )}>
      <ViewHeader 
        title={appSettings?.theme === 'uni' ? "Meu Cadastro" : "Meu Perfil"} 
        onBack={() => navigateTo("dashboard")} 
      />
      
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className={cn(
            "w-32 h-32 rounded-full overflow-hidden border-4 shadow-xl mb-4 relative group",
            appSettings?.theme === 'uniplan' ? "border-[#e31a22]" : 
            appSettings?.theme === 'barao' ? "border-[#00a2b1]" : "border-white"
          )}>
            <img 
              src={editPhotoUrl || user?.photo_url} 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isEditingProfile && (
              <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-8 h-8 text-white mb-1" />
                <span className="text-[10px] text-white font-bold uppercase">Alterar Foto</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedPhotoFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditPhotoUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </div>
          <h2 className="text-2xl font-black text-slate-800 text-center">{user?.name}</h2>
          <p className={cn(
            "text-sm font-bold uppercase tracking-widest mt-1",
            appSettings?.theme === 'uniplan' ? "text-[#e31a22]" : 
            appSettings?.theme === 'barao' ? "text-[#00a2b1]" : "text-blue-600"
          )}>
            {user?.course}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4">
          <div className="card space-y-4">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Informações Acadêmicas</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Matrícula</p>
                <p className="text-sm font-black text-slate-700">{user?.matricula}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Semestre</p>
                <p className="text-sm font-black text-slate-700">{user?.semester}º Semestre</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Validade</p>
                <p className="text-sm font-black text-slate-700">{user?.validity}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <p className="text-sm font-black text-slate-700 uppercase">{user?.regularity}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Data de Cadastro</p>
                <p className="text-sm font-black text-slate-700">{user?.enrollment_date}</p>
              </div>
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Dados Pessoais</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nome Completo</p>
                  <p className="text-sm font-black text-slate-700">{user?.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">CPF</p>
                  <p className="text-sm font-black text-slate-700">{user?.cpf}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Data de Nascimento</p>
                  <p className="text-sm font-black text-slate-700">{formatDate(user?.birth_date)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Estado de Nascimento</p>
                  {isEditingProfile ? (
                    <input 
                      type="text" 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editBirthState}
                      onChange={(e) => setEditBirthState(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.birth_state}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nacionalidade</p>
                  {isEditingProfile ? (
                    <input 
                      type="text" 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editNationality}
                      onChange={(e) => setEditNationality(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.nationality}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sexo</p>
                  {isEditingProfile ? (
                    <select 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editGender}
                      onChange={(e) => setEditGender(e.target.value)}
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.gender}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Estado Civil</p>
                  {isEditingProfile ? (
                    <select 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editMaritalStatus}
                      onChange={(e) => setEditMaritalStatus(e.target.value)}
                    >
                      <option value="Solteiro">Solteiro(a)</option>
                      <option value="Casado">Casado(a)</option>
                      <option value="Divorciado">Divorciado(a)</option>
                      <option value="Viúvo">Viúvo(a)</option>
                    </select>
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.marital_status}</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nome Abreviado</p>
                  {isEditingProfile ? (
                    <input 
                      type="text" 
                      className="w-full text-sm font-black text-slate-700 bg-slate-50 border-b-2 border-blue-500 outline-none"
                      value={editShortName}
                      onChange={(e) => setEditShortName(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-black text-slate-700">{user?.short_name}</p>
                  )}
                </div>
              </div>

              {isEditingProfile && (
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => {
                      setIsEditingProfile(false);
                      setEditPhotoUrl(user?.photo_url || "");
                    }}
                    className="flex-1 py-2 text-xs font-bold text-slate-500 uppercase bg-slate-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="flex-1 py-2 text-xs font-bold text-white uppercase bg-blue-600 rounded-lg"
                  >
                    Salvar Alterações
                  </button>
                </div>
              )}

              {!isEditingProfile && (
                <button 
                  onClick={() => {
                    setEditBirthState(user?.birth_state || "");
                    setEditNationality(user?.nationality || "");
                    setEditGender(user?.gender || "");
                    setEditMaritalStatus(user?.marital_status || "");
                    setEditShortName(user?.short_name || "");
                    setEditPhotoUrl(user?.photo_url || "");
                    setIsEditingProfile(true);
                  }}
                  className="w-full py-3 text-xs font-bold text-blue-600 uppercase bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Alterar Dados Cadastrais
                </button>
              )}
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Configurações de Conta</h3>
            
            <button 
              onClick={handleLogout}
              className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all border border-red-100"
            >
              <LogOut className="w-5 h-5" /> Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LoadingOverlay = () => {
    const theme = appSettings?.theme;

    if (theme === 'uniplan') {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#e31a22] z-[100] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-5xl font-black italic tracking-tighter text-white leading-none">UNIPLAN</h1>
            <p className="text-[8px] font-bold text-white/80 uppercase tracking-[0.2em] mt-2">CENTRO UNIVERSITÁRIO PLANALTO</p>
          </div>
          
          <div className="relative">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
          
          <h3 className="mt-8 text-xl font-bold text-white tracking-tight">Acessando Portal</h3>
          <p className="mt-2 text-white/70 text-sm font-medium">Sincronizando dados acadêmicos...</p>
          
          <div className="mt-12 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-full bg-white"
            />
          </div>
        </motion.div>
      );
    }

    if (theme === 'barao') {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#00a2b1] z-[100] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-4 shadow-2xl mb-8">
            <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <div className="relative">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          
          <h3 className="mt-6 text-2xl font-black text-white uppercase tracking-tight">{appSettings?.college_name || "Barão de Mauá"}</h3>
          <p className="mt-2 text-white/80 text-sm font-bold uppercase tracking-widest">Carregando seu portal...</p>
          
          <div className="mt-10 w-40 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-full bg-orange-500"
            />
          </div>
        </motion.div>
      );
    }

    if (theme === 'retro') {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#00678a] z-[100] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-lg mb-8">
            <img src={appSettings.logo_url} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <Loader2 className="w-12 h-12 text-white animate-spin mb-6" />
          
          <h3 className="text-2xl font-bold text-white mb-2">Portal do Aluno</h3>
          <p className="text-white/70 font-medium">Iniciando sessão segura...</p>
          
          <div className="mt-10 w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-full bg-white"
            />
          </div>
        </motion.div>
      );
    }

    if (theme === 'uni') {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-slate-500 font-medium text-sm">Carregando...</p>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="relative">
          <Loader2 className="w-16 h-16 text-brand-blue animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-brand-blue/10 rounded-full animate-pulse" />
          </div>
        </div>
        <h3 className="mt-8 text-2xl font-bold text-slate-900 tracking-tight">Acessando Portal do Aluno</h3>
        <p className="mt-2 text-slate-500 font-medium">Sincronizando seus dados acadêmicos...</p>
        
        <div className="mt-12 w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-brand-blue"
          />
        </div>
      </motion.div>
    );
  };

  const DashboardLoadingOverlay = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Carregando...</p>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-md mx-auto md:max-w-none bg-slate-50 min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {isSimulatingLoading && <LoadingOverlay />}
        {isDashboardLoading && <DashboardLoadingOverlay />}
        
        {showProofUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-10"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full w-full max-w-4xl mx-auto"
            >
              <div className="p-4 bg-slate-900 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <span className="font-bold text-sm">Comprovante de Matrícula</span>
                </div>
                <button 
                  onClick={() => setShowProofUrl(null)} 
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-hidden bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
                {showProofUrl.includes('application/pdf') ? (
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center shadow-inner">
                      <FileText className="w-12 h-12 text-red-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900">Documento PDF</h4>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto">
                        O sistema detectou um documento PDF. Como ele não pode ser visualizado diretamente no navegador móvel, toque no botão abaixo para abri-lo.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        try {
                          const parts = showProofUrl.split(';base64,');
                          const contentType = parts[0].split(':')[1];
                          const raw = window.atob(parts[1]);
                          const uInt8Array = new Uint8Array(raw.length);
                          for (let i = 0; i < raw.length; i++) uInt8Array[i] = raw.charCodeAt(i);
                          const blob = new Blob([uInt8Array], { type: contentType });
                          const blobUrl = URL.createObjectURL(blob);
                          
                          const link = document.createElement('a');
                          link.href = blobUrl;
                          link.target = '_blank';
                          link.download = 'comprovante_matricula.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } catch (e) {
                          window.open(showProofUrl, '_blank');
                        }
                      }}
                      className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                    >
                      <ExternalLink className="w-5 h-5" /> ABRIR DOCUMENTO
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                    <img 
                      src={showProofUrl} 
                      className="max-w-full h-auto object-contain rounded-lg shadow-sm" 
                      alt="Comprovante Imagem" 
                    />
                  </div>
                )}
                
                <div className="mt-8 p-4 bg-white border border-slate-200 rounded-2xl w-full max-w-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Opção de Backup</p>
                  <a 
                    href={showProofUrl} 
                    download="comprovante.pdf"
                    className="flex items-center justify-center gap-2 text-[#00a2b1] font-bold text-sm hover:underline"
                  >
                    <Upload className="w-4 h-4 rotate-180" /> Baixar via Navegador
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        <ForgotRecoveryModal />
      </AnimatePresence>
      {renderView()}
    </div>
  );
}
