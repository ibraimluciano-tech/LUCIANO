import React, { useState, useMemo } from 'react';
import { MOCK_STUDENT_RESULTS } from '../constants';
import { Users, Trophy, Clock, BarChart3, Calendar } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('ALL');

  // Extract unique dates for filter
  const availableDates = Array.from(new Set(MOCK_STUDENT_RESULTS.map(s => s.date))).sort();

  // Filter Data
  const filteredData = useMemo(() => {
    if (selectedDate === 'ALL') return MOCK_STUDENT_RESULTS;
    return MOCK_STUDENT_RESULTS.filter(s => s.date === selectedDate);
  }, [selectedDate]);

  // Calculate stats based on filtered data
  const totalStudents = filteredData.length;
  const avgScore = totalStudents > 0 
    ? Math.round(filteredData.reduce((acc, curr) => acc + curr.score, 0) / totalStudents) 
    : 0;
  
  const bestPerformer = totalStudents > 0 
    ? filteredData.reduce((prev, current) => (prev.score > current.score) ? prev : current)
    : null;
  
  // Find max score for bar chart scaling
  const maxScore = totalStudents > 0 
    ? Math.max(...filteredData.map(s => s.score)) 
    : 100;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            Painel do Instrutor
          </h2>
          <p className="text-slate-500">Visão geral do desempenho da turma.</p>
        </div>
        
        {/* Date Filter */}
        <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-2 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600 uppercase mr-1">Filtrar por Data:</span>
            <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-100 text-sm border-none rounded px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="ALL">Todas as Datas</option>
                {availableDates.map(date => (
                    <option key={date} value={date}>{new Date(date).toLocaleDateString('pt-BR')}</option>
                ))}
            </select>
        </div>
      </div>

      {totalStudents === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
              Nenhum dado encontrado para esta data.
          </div>
      ) : (
        <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 uppercase font-semibold">Total Alunos</p>
                    <p className="text-2xl font-bold text-slate-800">{totalStudents}</p>
                </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 uppercase font-semibold">Média da Turma</p>
                    <p className="text-2xl font-bold text-slate-800">{avgScore} pts</p>
                </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                    <Trophy className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 uppercase font-semibold">Melhor Aluno</p>
                    <p className="text-2xl font-bold text-slate-800">{bestPerformer?.name || '-'}</p>
                </div>
                </div>
            </div>

            {/* Bar Chart Section */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex justify-between items-center">
                    <span>Ranking de Pontuação</span>
                    <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded">Visualização: Colunas e Dados</span>
                </h3>
                
                <div className="flex items-end gap-2 md:gap-4 h-72 w-full pt-6">
                {filteredData.sort((a,b) => b.score - a.score).map((student, idx) => {
                    const heightPercentage = (student.score / maxScore) * 100;
                    const isTop = idx === 0;
                    
                    return (
                    <div key={`${student.name}-${idx}`} className="flex-1 flex flex-col justify-end items-center group relative">
                        {/* Data Value Label (Always Visible) */}
                        <div className="mb-2 text-sm font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded shadow-sm z-10">
                            {student.score}
                        </div>

                        {/* Bar */}
                        <div 
                        className={`w-full max-w-[60px] rounded-t-lg transition-all duration-1000 relative border-x border-t border-white/20 shadow-sm ${isTop ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' : 'bg-gradient-to-t from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500'}`}
                        style={{ height: `${heightPercentage}%` }}
                        >
                        </div>

                        {/* X-Axis Label */}
                        <div className="mt-2 text-center w-full">
                           {/* Short name for chart */}
                           <p className="text-xs font-bold text-slate-700 truncate w-full px-1">
                               {student.name.split(' ')[0]}
                           </p>
                           {/* Full name on hover tooltip */}
                           <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs p-1 rounded whitespace-nowrap z-20">
                                {student.name}
                           </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Detalhes de Desempenho</h3>
                <span className="text-xs text-slate-400 uppercase font-semibold">
                    Exibindo {filteredData.length} registros
                </span>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-3">Data</th>
                        <th className="px-6 py-3">Aluno</th>
                        <th className="px-6 py-3">Pontuação</th>
                        <th className="px-6 py-3">Tarefas Concluídas</th>
                        <th className="px-6 py-3">Tempo Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((student, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                             {new Date(student.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold shrink-0">
                                {student.name.charAt(0)}
                            </div>
                            {student.name}
                        </td>
                        <td className="px-6 py-4">
                            <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded">
                                {student.score} pts
                            </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                            {student.completedTasks}
                        </td>
                        <td className="px-6 py-4 text-blue-500 font-mono">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {student.time}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
      )}
    </div>
  );
};