import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  CalendarDays, 
  Wrench, 
  Phone, 
  Mail, 
  Plus, 
  Search 
} from 'lucide-react';
import MaintenanceTeamForm from './MaintenanceTeamForm';

interface MaintenanceTeam {
  id: string;
  name: string;
  members: string[];
  specialization: string;
  rating: number;
  availability: 'available' | 'busy' | 'off';
  contact: {
    phone: string;
    email: string;
  };
  skills: string[];
  workingHours: {
    start: string;
    end: string;
  };
  location: string;
}

const mockTeams: MaintenanceTeam[] = [
  {
    id: 'MT001',
    name: 'فريق الصيانة الميكانيكية',
    members: ['أحمد محمد', 'خالد عبدالله', 'محمد علي'],
    specialization: 'ميكانيكا',
    rating: 4.8,
    availability: 'available',
    contact: {
      phone: '0501234567',
      email: 'mechanical@example.com'
    },
    skills: ['صيانة محركات', 'هيدروليك', 'تشخيص أعطال'],
    workingHours: {
      start: '08:00',
      end: '17:00'
    },
    location: 'مستودع أ'
  },
  {
    id: 'MT002',
    name: 'فريق الصيانة الكهربائية',
    members: ['سعيد أحمد', 'فهد محمد'],
    specialization: 'كهرباء',
    rating: 4.5,
    availability: 'busy',
    contact: {
      phone: '0507654321',
      email: 'electrical@example.com'
    },
    skills: ['صيانة كهربائية', 'أنظمة تحكم', 'لوحات توزيع'],
    workingHours: {
      start: '07:00',
      end: '16:00'
    },
    location: 'مستودع ب'
  }
];

export default function MaintenanceTeams() {
  const [teams, setTeams] = useState<MaintenanceTeam[]>(mockTeams);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddTeam = (data: any) => {
    const newTeam: MaintenanceTeam = {
      id: `MT${teams.length + 1}`.padStart(5, '0'),
      name: data.name,
      members: data.members,
      specialization: data.specialization,
      rating: 0,
      availability: data.availability,
      contact: data.contact,
      skills: data.skills,
      workingHours: data.workingHours,
      location: data.location
    };
    setTeams([...teams, newTeam]);
    setShowForm(false);
  };

  const getAvailabilityColor = (availability: MaintenanceTeam['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'off':
        return 'bg-red-100 text-red-800';
    }
  };

  const getAvailabilityText = (availability: MaintenanceTeam['availability']) => {
    switch (availability) {
      case 'available':
        return 'متاح';
      case 'busy':
        return 'مشغول';
      case 'off':
        return 'غير متاح';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">فرق الصيانة</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومتابعة فرق الصيانة والفنيين
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة فريق جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="بحث في الفرق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {teams
            .filter(team => 
              team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              team.specialization.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="mr-3">
                        <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
                        <p className="text-sm text-gray-500">{team.specialization}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(team.availability)}`}>
                      {getAvailabilityText(team.availability)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      <span>{team.rating} / 5.0</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{team.workingHours.start} - {team.workingHours.end}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {team.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          <Wrench className="w-3 h-3 mr-1" />
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center text-sm mb-2">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{team.contact.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{team.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {showForm && (
        <MaintenanceTeamForm
          onSubmit={handleAddTeam}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}