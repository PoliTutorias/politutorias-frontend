'use client';

import { useState } from 'react';
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
    <div className="bg-white rounded-lg p-6 overflow-x-auto">
      {/* Selected blocks counter */}
      {selectedBlocks.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-green-600 font-medium text-sm">
            ✓ {selectedBlocks.length} horario{selectedBlocks.length !== 1 ? 's' : ''} seleccionado{selectedBlocks.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="inline-block min-w-full">
        {/* Header Row */}
        <div className="flex border-b border-gray-200">
          <div className="w-16 flex-shrink-0 p-3 text-xs font-semibold text-gray-600 uppercase">
            HORA
          </div>
          {days.map((day) => (
            <div
              key={day}
              className="flex-1 min-w-20 p-3 text-center text-xs font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Hour Rows */}
        {hours.map((hour) => (
          <div key={hour} className="flex border-b border-gray-100">
            {/* Hour Cell */}
            <div className="w-16 flex-shrink-0 p-3 text-xs font-semibold text-gray-600">
              {hour}
            </div>

            {/* Block Cells */}
            {days.map((day) => (
              <div
                key={`${day}-${hour}`}
                className="flex-1 min-w-20"
              >
                <button
                  onClick={() => toggleBlock(day, hour)}
                  className={`w-full h-14 border transition-all ${isSelected(day, hour)
                      ? 'bg-blue-900 border-blue-900 text-white flex items-center justify-center'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  aria-label={`Disponibilidad ${day} ${hour}`}
                >
                  {isSelected(day, hour) && (
                    <span className="text-white text-lg font-bold">✓</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
