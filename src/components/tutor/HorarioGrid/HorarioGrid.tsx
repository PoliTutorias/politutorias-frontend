'use client';

import { AvailabilityBlock } from '@/interfaces/tutor/AvailabilityBlock';

interface HorarioGridProps {
  selectedBlocks: AvailabilityBlock[];
  onBlocksChange?: (blocks: AvailabilityBlock[]) => void;
  readOnly?: boolean;
}

export function HorarioGrid({ selectedBlocks, onBlocksChange, readOnly = false }: HorarioGridProps) {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const hours = Array.from({ length: 14 }, (_, i) => {
    const hour = 7 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const toggleBlock = (day: string, hour: string) => {
    if (readOnly || !onBlocksChange) return;

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
    <div className="overflow-x-auto" style={{ borderRadius: '8px', overflow: 'hidden' }}>
      {/* Grid Table */}
      <table className="w-full border-collapse" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              className="w-16 p-3 text-left text-xs font-bold text-gray-600 uppercase"
              style={{ backgroundColor: '#f3f4f6' }}
            >
              Hora
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="min-w-20 p-3 text-center text-xs font-bold text-gray-700"
                style={{ backgroundColor: '#f3f4f6' }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour} style={{ borderBottom: '1px solid #e5e7eb' }}>
              {/* Hour cell */}
              <td
                className="w-16 p-3 text-xs font-semibold text-gray-600"
                style={{ backgroundColor: '#f3f4f6' }}
              >
                {hour}
              </td>

              {/* Day cells */}
              {days.map((day) => (
                <td
                  key={`${day}-${hour}`}
                  className="min-w-20 p-0"
                  style={{ borderRight: '1px solid #e5e7eb' }}
                >
                  {readOnly ? (
                    <div
                      className="w-full h-12 flex items-center justify-center"
                      style={{
                        backgroundColor: isSelected(day, hour) ? 'var(--primary)' : 'white',
                        color: isSelected(day, hour) ? 'white' : '#d1d5db',
                      }}
                    >
                      {isSelected(day, hour) && <span className="text-base font-bold">✓</span>}
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleBlock(day, hour)}
                      className="w-full h-12 transition-colors font-semibold border-0 flex items-center justify-center"
                      style={{
                        backgroundColor: isSelected(day, hour) ? 'var(--primary)' : 'white',
                        color: isSelected(day, hour) ? 'white' : '#d1d5db',
                        cursor: 'pointer',
                      }}
                      aria-label={`Disponibilidad ${day} ${hour}`}
                    >
                      {isSelected(day, hour) && <span className="text-base font-bold">✓</span>}
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
