import React from 'react';
import { Users, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AttendanceStatsProps {
  totalEmployees: number;
  presentEmployees: number;
  lateEmployees: number;
  absentEmployees: number;
}

function AttendanceStats({ totalEmployees, presentEmployees, lateEmployees, absentEmployees }: AttendanceStatsProps) {
  const stats = [
    {
      id: 1,
      title: 'الموظفين الحاضرين',
      value: presentEmployees,
      change: '+12',
      icon: Users,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      changeColor: 'text-green-600'
    },
    {
      id: 2,
      title: 'الغياب',
      value: absentEmployees,
      change: '-3',
      icon: AlertTriangle,
      color: 'bg-red-50',
      iconColor: 'text-red-600',
      changeColor: 'text-red-600'
    },
    {
      id: 3,
      title: 'التأخير',
      value: lateEmployees,
      change: '+2',
      icon: Clock,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      changeColor: 'text-yellow-600'
    },
    {
      id: 4,
      title: 'نسبة الحضور',
      value: `${Math.round((presentEmployees / totalEmployees) * 100)}%`,
      change: '98%',
      icon: CheckCircle2,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      changeColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`p-2 ${stat.color} rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <span className={`text-sm font-medium ${stat.changeColor}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-medium">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AttendanceStats;