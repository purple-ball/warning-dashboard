import React from 'react';

export default function WarningModal({ warning, onClose }) {
  if (!warning) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* 弹窗头部 */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-blue-600">预警详情</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 space-y-6">
          {/* 基本信息 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">【基本信息】</h3>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">地点：</span>
                <span className="text-gray-800">{warning.location}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">谈话间号：</span>
                <span className="text-gray-800">{warning.talkingRoom}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">异常内容：</span>
                <span className="text-gray-800">{warning.typeName}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">异常时间：</span>
                <span className="text-gray-800">{warning.time}</span>
              </div>
            </div>
          </div>

          {/* 预警详情 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">【预警详情】</h3>
            <div className="space-y-4">
              <div>
                <div className="text-gray-600 font-medium mb-2">预警摘要：</div>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-800 text-sm leading-relaxed">
                  {warning.content}
                </div>
              </div>

              {/* 音视频记录 */}
              <div>
                <div className="text-gray-600 font-medium mb-2">音视频记录：</div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                    ▶ 谈话录音
                  </button>
                  <span className="text-gray-600 text-sm">00:15:32 / 00:45:20</span>
                  <span className="text-gray-500 text-xs ml-auto">(模拟播放)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 弹窗底部 */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}