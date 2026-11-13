import React from 'react';

export function LoadingState({ message = 'กำลังโหลดข้อมูล...' }) {
  return <div className="p-8 text-center text-gray-500 animate-pulse">{message}</div>;
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="p-6 text-center bg-red-50 border border-red-200 rounded-lg text-red-700">
      <p className="font-semibold mb-2">เกิดข้อผิดพลาด</p>
      <p className="text-sm mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="px-4 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700">
          ลองใหม่อีกครั้ง
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = 'ไม่พบข้อมูลในระบบ' }) {
  return (
    <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
      {message}
    </div>
  );
}