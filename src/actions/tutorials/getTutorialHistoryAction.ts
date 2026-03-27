'use server';

import { HistoryResponse } from '@/interfaces/tutorial/tutorial';
import { getServerToken } from '@/lib/server-auth';

type BackendHistoryItem = {
  id: string;
  studentName: string;
  subjectName: string;
  date: string;
  status: string;
  pricePerHour: string;
  time?: string;
};

type BackendHistoryResponse = {
  summary: {
    totalCompleted: number;
    totalSubjects: number;
    totalStudents: number;
  };
  paginatedData: {
    items: BackendHistoryItem[];
    total: number;
    page: number;
    lastPage: number;
  };
};

function toInitials(name: string): string {
  const cleaned = (name || '').trim();

  if (!cleaned) {
    return 'NA';
  }

  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';

  return `${first}${second}`.toUpperCase();
}

function formatDate(dateValue: string): string {
  const parsed = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

export async function getTutorialHistoryAction(page: number = 1, limit: number = 5): Promise<HistoryResponse> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(20, Math.max(1, limit));
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = await getServerToken();

  if (!backendBaseUrl || !token) {
    return {
      summary: {
        completedTutorials: 0,
        subjectsTaught: 0,
        studentsQualified: 0,
      },
      paginatedData: {
        items: [],
        total: 0,
        page: safePage,
        limit: safeLimit,
      },
    };
  }

  try {
    const normalizedBase = backendBaseUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBase}/tutorias/historial?page=${safePage}&limit=${safeLimit}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const payload = (await response.json()) as BackendHistoryResponse;

    return {
      summary: {
        completedTutorials: payload.summary.totalCompleted,
        subjectsTaught: payload.summary.totalSubjects,
        studentsQualified: payload.summary.totalStudents,
      },
      paginatedData: {
        items: payload.paginatedData.items.map((item) => ({
          id: item.id,
          studentInitials: toInitials(item.studentName),
          studentName: item.studentName,
          offerTitle: item.subjectName,
          date: formatDate(item.date),
          time: item.time ?? '--:--',
        })),
        total: payload.paginatedData.total,
        page: payload.paginatedData.page,
        limit: safeLimit,
      },
    };
  } catch {
    return {
      summary: {
        completedTutorials: 0,
        subjectsTaught: 0,
        studentsQualified: 0,
      },
      paginatedData: {
        items: [],
        total: 0,
        page: safePage,
        limit: safeLimit,
      },
    };
  }
}
