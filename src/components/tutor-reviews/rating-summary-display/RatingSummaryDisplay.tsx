'use client';

import { FiBookOpen, FiCheckCircle, FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import type { ReviewSummaryDto } from '@/interfaces/reviews/review-dtos';

interface RatingSummaryDisplayProps {
  summary: ReviewSummaryDto;
}

function formatRating(value: number): string {
  return value.toFixed(1);
}

export default function RatingSummaryDisplay({ summary }: RatingSummaryDisplayProps) {
  const sortedDistribution = [...summary.starDistribution].sort((a, b) => b.stars - a.stars);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex items-center gap-6">
        <div className="w-20 shrink-0">
          <p className="text-4xl font-extrabold leading-none text-center text-primary">{formatRating(summary.avgRating)}</p>

          <div className="mt-2 flex items-center gap-0.5 text-[#f2a21f]">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar key={index} size={14} />
            ))}
          </div>

          <p className="mt-1 text-m text-center text-[#6d7f97]">{summary.totalReviews} reseña{summary.totalReviews > 1 ? "s" : ""}</p>
        </div>

        <div className="flex-1 space-y-2">
          {sortedDistribution.map((item) => (
            <div key={item.stars} className="grid grid-cols-[66px_1fr_38px] items-center gap-2">
              <span className="text-xs font-medium text-[#3482d0]">{item.stars} estrella{item.stars > 1 ? 's' : ''}</span>

              <div className="h-2.5 overflow-hidden rounded-full bg-[#e4eaf2]">
                <div
                  className="h-full rounded-full bg-[#f2a21f]"
                  style={{ width: `${Math.min(Math.max(item.percentage, 0), 100)}%` }}
                />
              </div>

              <span className="text-right text-sm text-[#7f8fa6]">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-[#e8edf3] bg-[#f7fafd] p-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#e9f8ef] p-1 text-[#48a061]">
              <FiCheckCircle size={14} />
            </span>
            <span className="text-xl font-bold leading-none text-primary">{summary.metrics.totalAppointments}</span>
          </div>
          <p className="mt-1 text-xs text-[#70839c]">Tutorías completadas</p>
        </div>

        <div className="rounded-lg border border-[#e8edf3] bg-[#f7fafd] p-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#eaf2fa] p-1 text-[#4b6f9a]">
              <FiBookOpen size={14} />
            </span>
            <span className="text-xl font-bold leading-none text-primary">{summary.metrics.completedHours}</span>
          </div>
          <p className="mt-1 text-xs text-[#70839c]">Materias impartidas</p>
        </div>

        <div className="rounded-lg border border-[#e8edf3] bg-[#f7fafd] p-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#fff7e7] p-1 text-[#d2a238]">
              <FiStar size={14} />
            </span>
            <span className="text-xl font-bold leading-none text-primary">{summary.metrics.averageResponseTime}%</span>
          </div>
          <p className="mt-1 text-xs text-[#70839c]">Estudiantes que califican</p>
        </div>
      </div>
    </div>
  );
}