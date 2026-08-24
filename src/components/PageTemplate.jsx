import React, { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { statistics, trend30days, trend90days, WARNING_TYPES } from '../mockData';
import FilterBar from './FilterBar';

export default function PageTemplate({
  selectedCity,
  selectedDistrict,
  selectedTown,
  selectedRoom,
  onFilterConfirm,
  chartData,
  chartTitle,
  hideChart,
  onChartDetailClick,
  pageData,
  onWarningDetailClick,
  onReviewClick,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState('7days');
  const itemsPerPage = 10;

  // 预警列表筛选条件
  const [filterReviewStatus, setFilterReviewStatus] = useState('全部');
  const [filterValidity, setFilterValidity] = useState('全部');
  const [filterWarningType, setFilterWarningType] = useState('全部');
  const [filterDateStart, setFilterDateStart] = useState('2026-08-14');
  const [filterDateEnd, setFilterDateEnd] = useState('2026-08-20');
  const [appliedFilters, setAppliedFilters] = useState({
    reviewStatus: '全部',
    validity: '全部',
    warningType: '全部',
    dateStart: '2026-08-14',
    dateEnd: '2026-08-20',
  });

  // 获取趋势数据（根据选中的时间范围和筛选条件动态计算）
  const trendData = (() => {
    const filteredList = pageData?.warningList || [];
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    const dateCounts = {};

    filteredList.forEach(w => {
      const date = w.time.split(' ')[0]; // "2026-08-20"
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    // 生成日期列表
    const result = [];
    const today = new Date('2026-08-20');
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const monthDay = `${d.getMonth() + 1}.${d.getDate()}`;
      result.push({
        date: monthDay,
        count: dateCounts[dateStr] || 0,
      });
    }
    return result;
  })();

  // 获取类型分布数据（基于当前筛选后的列表）
  const typeData = (() => {
    const counts = {};
    (pageData?.warningList || []).forEach(w => {
      counts[w.type] = (counts[w.type] || 0) + 1;
    });
    return Object.entries(counts).map(([code, count]) => ({
      name: WARNING_TYPES[code] || code,
      value: count,
    }));
  })();

  const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316'];

  // 应用预警列表筛选
  const applyListFilters = () => {
    setAppliedFilters({
      reviewStatus: filterReviewStatus,
      validity: filterValidity,
      warningType: filterWarningType,
      dateStart: filterDateStart,
      dateEnd: filterDateEnd,
    });
    setCurrentPage(1); // 重置到第一页
  };

  // 根据筛选条件过滤预警列表
  const filteredWarningList = (pageData?.warningList || []).filter(w => {
    // 是否复核筛选
    if (appliedFilters.reviewStatus === '未复核' && w.reviewStatus !== '未复核') return false;
    if (appliedFilters.reviewStatus === '已复核' && w.reviewStatus === '未复核') return false;

    // 是否属实筛选
    if (appliedFilters.validity === '正确预警' && w.reviewStatus !== '正确预警') return false;
    if (appliedFilters.validity === '误报' && w.reviewStatus !== '误报') return false;

    // 异常内容筛选
    if (appliedFilters.warningType !== '全部' && w.type !== appliedFilters.warningType) return false;

    // 日期范围筛选
    const wDate = w.time.split(' ')[0];
    if (wDate < appliedFilters.dateStart || wDate > appliedFilters.dateEnd) return false;

    return true;
  });

  // 分页
  const totalPages = Math.ceil(filteredWarningList.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayData = filteredWarningList.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">浙江省预警看板</h1>
            <div className="text-sm text-blue-100">
              数据更新：2026-08-20 12:00
            </div>
          </div>
        </div>
      </header>

      {/* 筛选器栏 */}
      <FilterBar
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        selectedTown={selectedTown}
        selectedRoom={selectedRoom}
        onFilterChange={() => {}}
        onConfirm={onFilterConfirm}
      />

      {/* 主要内容 */}
      <div className="container mx-auto px-8 py-8 max-w-[1600px]">
        {/* 总览卡片 */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* 预警总数 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">预警总数</p>
                <p className="text-4xl font-bold text-blue-600">
                  {(pageData?.totalWarnings || 0).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-2">截至今日累计触发</p>
              </div>
            </div>
          </div>

          {/* 待处理 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">待处理</p>
                <p className="text-4xl font-bold text-blue-600">
                  {(pageData?.waitingCount || 0).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-2">未标注状态</p>
              </div>
            </div>
          </div>

          {/* 已处理 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">已处理</p>
                <p className="text-4xl font-bold text-blue-600">
                  {(pageData?.processedCount || 0).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-2">已处理状态</p>
              </div>
            </div>
          </div>

          {/* 误报数 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">误报数</p>
                <p className="text-4xl font-bold text-red-600">
                  {(pageData?.misreportCount || 0).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  误报率 {pageData?.processedCount > 0
                    ? ((pageData.misreportCount / pageData.processedCount) * 100).toFixed(1)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 图表区 */}
        {!hideChart && (
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* 柱状图 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{chartTitle}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" interval={0} angle={-35} textAnchor="end" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 饼图 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">预警类型分布</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 如果隐藏柱图，饼图单独显示 */}
        {hideChart && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">预警类型分布</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 趋势图 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">预警趋势</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('7days')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  timeRange === '7days'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                近7天
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  timeRange === '30days'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                近30天
              </button>
              <button
                onClick={() => setTimeRange('90days')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  timeRange === '90days'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                近90天
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 预警列表 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">预警列表</h3>

          {/* 筛选区 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex gap-3 items-end">
              {/* 是否复核 */}
              <div className="w-32">
                <label className="block text-xs text-gray-700 mb-1">是否复核：</label>
                <select
                  value={filterReviewStatus}
                  onChange={(e) => {
                    setFilterReviewStatus(e.target.value);
                    // 如果选择"未复核"，重置"是否属实"为"全部"
                    if (e.target.value === '未复核') {
                      setFilterValidity('全部');
                    }
                  }}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="全部">全部</option>
                  <option value="未复核">未复核</option>
                  <option value="已复核">已复核</option>
                </select>
              </div>

              {/* 是否属实 */}
              <div className="w-32">
                <label className="block text-xs text-gray-700 mb-1">是否属实：</label>
                <select
                  value={filterReviewStatus === '未复核' ? '--' : filterValidity}
                  onChange={(e) => setFilterValidity(e.target.value)}
                  disabled={filterReviewStatus === '未复核'}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {filterReviewStatus === '未复核' ? (
                    <option value="--">--</option>
                  ) : (
                    <>
                      <option value="全部">全部</option>
                      <option value="正确预警">正确预警</option>
                      <option value="误报">误报</option>
                    </>
                  )}
                </select>
              </div>

              {/* 异常内容 */}
              <div className="w-40">
                <label className="block text-xs text-gray-700 mb-1">异常内容：</label>
                <select
                  value={filterWarningType}
                  onChange={(e) => setFilterWarningType(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="全部">全部</option>
                  {Object.entries(WARNING_TYPES).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
              </div>

              {/* 谈话日期 */}
              <div className="flex-1">
                <label className="block text-xs text-gray-700 mb-1">谈话日期：</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={filterDateStart}
                    onChange={(e) => setFilterDateStart(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-600 text-sm">-</span>
                  <input
                    type="date"
                    value={filterDateEnd}
                    onChange={(e) => setFilterDateEnd(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 确定按钮 */}
              <div>
                <button
                  onClick={applyListFilters}
                  className="px-6 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                >
                  确定
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                  <th className="px-2 py-2 text-center">序号</th>
                  <th className="px-2 py-2 text-center">谈话间号</th>
                  <th className="px-3 py-2 text-center">谈话地点</th>
                  <th className="px-2 py-2 text-center">异常内容</th>
                  <th className="px-3 py-2 text-center">异常时间</th>
                  <th className="px-2 py-2 text-center">复核状态</th>
                  <th className="px-2 py-2 text-center">复核人员</th>
                  <th className="px-3 py-2 text-center">复核时间</th>
                  <th className="px-2 py-2 text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((warning, idx) => (
                  <tr
                    key={warning.id}
                    className={`border-b ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                    } hover:bg-blue-100 transition-colors`}
                  >
                    <td className="px-2 py-2 text-gray-800 text-center">{startIdx + idx + 1}</td>
                    <td className="px-2 py-2 text-gray-800 text-center whitespace-nowrap">{warning.talkingRoom}</td>
                    <td className="px-3 py-2 text-gray-800 text-center whitespace-nowrap">{warning.location}</td>
                    <td className="px-2 py-2 text-center">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium whitespace-nowrap">
                        {warning.typeName}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-800 text-center whitespace-nowrap">{warning.time}</td>
                    <td className="px-2 py-2 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                          warning.reviewStatus === '未复核'
                            ? 'bg-gray-100 text-gray-800'
                            : warning.reviewStatus === '误报'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {warning.reviewStatus}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-gray-800 text-center whitespace-nowrap">{warning.reviewPerson || '-'}</td>
                    <td className="px-3 py-2 text-gray-800 text-center whitespace-nowrap">{warning.reviewTime || '-'}</td>
                    <td className="px-2 py-2 text-center">
                      <div className="flex gap-2 justify-center whitespace-nowrap">
                        <button
                          onClick={() => onWarningDetailClick(warning)}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          详情
                        </button>
                        <button
                          onClick={() => onReviewClick(warning)}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          复核
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              共 {filteredWarningList.length} 条 | 每页 {itemsPerPage} 条 | 第 {currentPage}/{totalPages} 页
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ◀ 上一页
              </button>
              {(() => {
                const pages = [];
                const maxVisible = 7;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                if (endPage - startPage < maxVisible - 1) {
                  startPage = Math.max(1, endPage - maxVisible + 1);
                }
                if (startPage > 1) {
                  pages.push(<button key={1} onClick={() => setCurrentPage(1)} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors">1</button>);
                  if (startPage > 2) { pages.push(<span key="ellipsis-start" className="px-2 text-gray-500">...</span>); }
                }
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(<button key={i} onClick={() => setCurrentPage(i)} className={`px-3 py-1 rounded transition-colors ${currentPage === i ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}>{i}</button>);
                }
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) { pages.push(<span key="ellipsis-end" className="px-2 text-gray-500">...</span>); }
                  pages.push(<button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors">{totalPages}</button>);
                }
                return pages;
              })()}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                下一页 ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}