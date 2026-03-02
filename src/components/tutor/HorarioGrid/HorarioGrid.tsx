'use client';

import { AvailabilityBlock } from '@/interfaces/tutor/AvailabilityBlock';

interface HorarioGridProps {
  selectedBlocks: AvailabilityBlock[];
  onBlocksChange: (blocks: AvailabilityBlock[]) => void;
}

export function HorarioGrid({ selectedBlocks, onBlocksChange }: HorarioGridProps) {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const hours = Array.from({ length: 14 }, (_, i) => {
    const hour = 7 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const toggleBlock = (day: string, hour: string) => {
    const blockExists = selectedBlocks.some(
      (block) => block.day === day && block.hour === hour
    );

    if (blockExists) {
      onBlocksChange(
        selectedBlocks.filter(
          (block) => !(block.day === day && block.hour === hour)
        )
      );
    } else {
      onBlocksChange([...selectedBlocks, { day, hour }]);
    }
  };

  const isSelected = (day: string, hour: string) => {
    return selectedBlocks.some((block) => block.day === day && block.hour === hour);
  };

  return (
    <div className="bg-white rounded-lg p-6 overflow-x-auto border border-gray-200">
      {/* Grid Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-16 p-3 text-left text-xs font-bold text-gray-600 uppercase border-b border-gray-200">
              Hora
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="min-w-20 p-3 text-center text-xs font-bold text-gray-700 border-b border-gray-200"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              {/* Hour cell */}
              <td className="w-16 p-3 text-xs font-semibold text-gray-600 border-b border-gray-100">
                {hour}
              </td>

              {/* Day cells */}
              {days.map((day) => (
                <td
                  key={`${day}-${hour}`}
                  className="min-w-20 p-2 text-center border-b border-gray-100"
                >
                  <button
                    onClick={() => toggleBlock(day, hour)}
                    className={`w-full h-12 border transition-colors font-semibold ${
                      isSelected(day, hour)
                        ? 'bg-blue-900 border-blue-900 text-white'
                        : 'bg-white border-gray-300 text-gray-400 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                    aria-label={`Disponibilidad ${day} ${hour}`}
                  >
                    {isSelected(day, hour) && <span>✓</span>}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
