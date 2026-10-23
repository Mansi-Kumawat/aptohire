import React, { useState } from 'react';
import { StatusChip } from './StatusChip';

interface RosterStudent {
  name: string;
  status: string; // incoming, year 1, year 2, year 3, dropout, alumnus
  verification: 'verified-university' | 'unverified-university';
  verifiedSkills: number;
  placement: 'Placed' | 'Not placed' | 'Unknown';
}

const sampleRoster: RosterStudent[] = [
  { name: 'Aman', status: 'Incoming', verification: 'verified-university', verifiedSkills: 2, placement: 'Unknown' },
  { name: 'Ajay', status: 'Year 1', verification: 'verified-university', verifiedSkills: 3, placement: 'Unknown' },
  { name: 'Aarav', status: 'Year 2', verification: 'verified-university', verifiedSkills: 5, placement: 'Placed' },
  { name: 'Akshit', status: 'Year 3', verification: 'verified-university', verifiedSkills: 4, placement: 'Placed' },
  { name: 'Aarti', status: 'Dropout', verification: 'unverified-university', verifiedSkills: 3, placement: 'Placed' },
  { name: 'Avi', status: 'Alumnus', verification: 'verified-university', verifiedSkills: 6, placement: 'Placed' },
];

export const SampleRosterTable: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [filter, setFilter] = useState<'all' | 'placed' | 'high-skills'>('all');

  const filtered = sampleRoster.filter((student) => {
    if (filter === 'placed') return student.placement === 'Placed';
    if (filter === 'high-skills') return student.verifiedSkills >= 4;
    return true;
  });

  return (
    <div className={`w-full rounded-panel border border-hairline bg-canvas overflow-hidden shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-mist border-b border-hairline gap-3">
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-[15px] text-ink">
            University roster monitoring
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-canvas text-moss border border-hairline font-semibold">
            Sample data
          </span>
        </div>

        {/* Interactive filter pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-[12px] font-mono rounded cursor-pointer transition-colors ${
              filter === 'all'
                ? 'bg-verdant-700 text-canvas font-semibold shadow-xs'
                : 'bg-canvas text-moss border border-hairline hover:bg-mist'
            }`}
          >
            All ({sampleRoster.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('placed')}
            className={`px-2.5 py-1 text-[12px] font-mono rounded cursor-pointer transition-colors ${
              filter === 'placed'
                ? 'bg-verdant-700 text-canvas font-semibold shadow-xs'
                : 'bg-canvas text-moss border border-hairline hover:bg-mist'
            }`}
          >
            Placed ({sampleRoster.filter((s) => s.placement === 'Placed').length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('high-skills')}
            className={`px-2.5 py-1 text-[12px] font-mono rounded cursor-pointer transition-colors ${
              filter === 'high-skills'
                ? 'bg-verdant-700 text-canvas font-semibold shadow-xs'
                : 'bg-canvas text-moss border border-hairline hover:bg-mist'
            }`}
          >
            Skills ≥ 4 ({sampleRoster.filter((s) => s.verifiedSkills >= 4).length})
          </button>
        </div>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-mist/50 text-[13px] font-semibold text-moss">
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Verification</th>
              <th className="py-3 px-4 text-center">Verified skills</th>
              <th className="py-3 px-4">Placement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-[14px]">
            {filtered.map((student, idx) => (
              <tr key={idx} className="hover:bg-mist/30 transition-colors">
                <td className="py-3 px-4 font-medium text-ink">{student.name}</td>
                <td className="py-3 px-4 text-moss">{student.status}</td>
                <td className="py-3 px-4">
                  <StatusChip
                    type={student.verification}
                    label={student.verification === 'verified-university' ? 'Verified roster' : 'Unverified'}
                  />
                </td>
                <td className="py-3 px-4 text-center font-mono font-semibold text-verdant-700">
                  {student.verifiedSkills}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[12px] font-medium ${
                      student.placement === 'Placed'
                        ? 'bg-verdant-100 text-verdant-800'
                        : student.placement === 'Not placed'
                        ? 'bg-danger-50 text-danger-600'
                        : 'bg-mist text-moss'
                    }`}
                  >
                    {student.placement}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (below 640px) */}
      <div className="block sm:hidden divide-y divide-hairline">
        {filtered.map((student, idx) => (
          <div key={idx} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink text-[16px]">{student.name}</span>
              <span
                className={`px-2 py-0.5 rounded text-[12px] font-medium ${
                  student.placement === 'Placed'
                    ? 'bg-verdant-100 text-verdant-800'
                    : student.placement === 'Not placed'
                    ? 'bg-danger-50 text-danger-600'
                    : 'bg-mist text-moss'
                }`}
              >
                {student.placement}
              </span>
            </div>
            <div className="flex items-center justify-between text-[14px] text-moss">
              <span>Status: {student.status}</span>
              <span>Verified skills: <strong className="text-verdant-700 font-mono">{student.verifiedSkills}</strong></span>
            </div>
            <div className="pt-1">
              <StatusChip
                type={student.verification}
                label={student.verification === 'verified-university' ? 'Verified roster' : 'Unverified'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
