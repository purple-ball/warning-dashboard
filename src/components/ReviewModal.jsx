import React, { useState } from 'react';

export default function ReviewModal({ warning, onClose, onSubmit }) {
  const [reviewStatus, setReviewStatus] = useState('');
  const [reviewOpinion, setReviewOpinion] = useState('');

  if (!warning) return null;

  const handleSubmit = () => {
    if (!reviewStatus) {
      alert('请选择复核结果');
      return;
    }

    const now = new Date();
    const reviewTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    onSubmit({
      warningId: warning.id,
      reviewStatus,
      reviewOpinion,
      reviewPerson: '当前用户',
      reviewTime,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
        {/* 标题栏 */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">复核预警</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 内容区 */}
        <div className="px-6 py-6 space-y-4">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 font-medium">地点：</span>
              <span className="text-gray-800">{warning.location}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">谈话间号：</span>
              <span className="text-gray-800">{warning.talkingRoom}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">异常内容：</span>
              <span className="text-gray-800">{warning.typeName}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">异常时间：</span>
              <span className="text-gray-800">{warning.time}</span>
            </div>
          </div>

          {/* 复核结果 */}
          <div className="pt-4">
            <div className="text-gray-700 font-medium mb-3">复核结果：</div>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="reviewStatus"
                  value="正确预警"
                  checked={reviewStatus === '正确预警'}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <span className="ml-2 text-gray-800">正确预警</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="reviewStatus"
                  value="误报"
                  checked={reviewStatus === '误报'}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-4 h-4 text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="ml-2 text-gray-800">误报</span>
              </label>
            </div>
          </div>

          {/* 复核意见 */}
          <div className="pt-2">
            <div className="text-gray-700 font-medium mb-2">复核意见（可选）：</div>
            <textarea
              value={reviewOpinion}
              onChange={(e) => setReviewOpinion(e.target.value)}
              placeholder="请输入复核意见..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="4"
            />
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-center gap-4 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            确定
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
