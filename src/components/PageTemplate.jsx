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

  const trendData = (() => {
    const filteredList = pageData?.warningList || [];
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    const dateCounts = {};
    filteredList.forEach(w => {
      const date = w.time.split(' ')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    const result = [];
    const today = new Date('2026-08-20');
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const monthDay = `${d.getMonth() + 1}.${d.getDate()}`;
      result.push({ date: monthDay, count: dateCounts[dateStr] || 0 });
    }
    return result;
  })();

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

  const applyListFilters = () => {
    setAppliedFilters({
      reviewStatus: filterReviewStatus,
      validity: filterValidity,
      warningType: filterWarningType,
      dateStart: filterDateStart,
      dateEnd: filterDateEnd,
    });
    setCurrentPage(1);
  };

  const filteredWarningList = (pageData?.warningList || []).filter(w => {
    if (appliedFilters.reviewStatus === '未复核' && w.reviewStatus !== '未复核') return false;
    if (appliedFilters.reviewStatus === '已复核' && w.reviewStatus === '未复核') return false;
    if (appliedFilters.validity === '正确预警' && w.reviewStatus !== '正确预警') return false;
    if (appliedFilters.validity === '误报' && w.reviewStatus !== '误报') return false;
    if (appliedFilters.warningType !== '全部' && w.type !== appliedFilters.warningType) return false;
    const wDate = w.time.split(' ')[0];
    if (wDate < appliedFilters.dateStart || wDate > appliedFilters.dateEnd) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredWarningList.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayData = filteredWarningList.slice(startIdx, startIdx + itemsPerPage);

  const misreportRate = pageData?.processedCount > 0
    ? ((pageData.misreportCount / pageData.processedCount) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
        <div className="mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-white rounded-full opacity-70"></div>
              <h1 className="text-2xl font-bold text-white tracking-wide">浙江省走读式谈话间数据看板工具平台</h1>
            </div>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              数据更新：2026-08-20 12:00
            </div>
          </div>
        </div>
      </header>

      <FilterBar
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        selectedTown={selectedTown}
        selectedRoom={selectedRoom}
        onFilterChange={() => {}}
        onConfirm={onFilterConfirm}
      />

      <div className="mx-auto px-6 py-5 max-w-[1800px]">

        {/* Row 1: stat cards + pie + bar */}
        <div className="grid grid-cols-12 gap-4 mb-4">

          <div className="col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border-t-4 border-blue-600 px-5 py-4 flex flex-col justify-between">
              <p className="text-gray-500 text-xs font-medium">预警总数</p>
              <p className="text-4xl font-extrabold text-blue-600 mt-1 leading-none">
                {(pageData?.totalWarnings || 0).toLocaleString()}
              </p>
              <p className="text-gray-400 text-xs mt-2">截至今日累计触发</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border-t-4 border-amber-500 px-5 py-4 flex flex-col justify-between">
              <p className="text-gray-500 text-xs font-medium">待处理</p>
              <p className="text-4xl font-extrabold text-amber-500 mt-1 leading-none">
                {(pageData?.waitingCount || 0).toLocaleString()}
              </p>
              <p className="text-gray-400 text-xs mt-2">未复核，待处置</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border-t-4 border-green-500 px-5 py-4 flex flex-col justify-between">
              <p className="text-gray-500 text-xs font-medium">已处理</p>
              <p className="text-4xl font-extrabold text-green-600 mt-1 leading-none">
                {(pageData?.processedCount || 0).toLocaleString()}
              </p>
              <p className="text-gray-400 text-xs mt-2">已完成复核</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border-t-4 border-red-500 px-5 py-4 flex flex-col justify-between">
              <p className="text-gray-500 text-xs font-medium">误报数</p>
              <p className="text-4xl font-extrabold text-red-500 mt-1 leading-none">
                {(pageData?.misreportCount || 0).toLocaleString()}
              </p>
              <p className="text-gray-400 text-xs mt-2">误报率 {misreportRate}%</p>
            </div>
          </div>

          <div className="col-span-4 bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">预警类型分布</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={typeData} cx="38%" cy="50%" labelLine={false} outerRadius={85} dataKey="value">
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 12 }} />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" iconSize={8}
                  formatter={(value) => <span style={{ fontSize: 11, color: '#374151' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {!hideChart && (
            <div className="col-span-3 bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">{chartTitle}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ left: -20, bottom: 55 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" interval={0} angle={-35} textAnchor="end" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 12 }} cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Row 2: trend chart */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-700">预警趋势</h3>
            <div className="flex gap-1.5">
              {['7days', '30days', '90days'].map((r) => (
                <button key={r} onClick={() => setTimeRange(r)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${timeRange === r ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {r === '7days' ? '近7天' : r === '30days' ? '近30天' : '近90天'}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData} margin={{ left: -10, right: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 11 }} interval={timeRange === '7days' ? 0 : 'preserveStartEnd'} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 12 }} cursor={{ stroke: '#3b82f6', strokeWidth: 1.5 }} />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Row 3: warning list */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">预警列表</h3>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex gap-3 items-end flex-wrap">
              <div className="w-28">
                <label className="block text-xs text-gray-500 mb-1">是否复核</label>
                <select value={filterReviewStatus} onChange={(e) => { setFilterReviewStatus(e.target.value); if (e.target.value === '未复核') setFilterValidity('全部'); }}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="全部">全部</option>
                  <option value="未复核">未复核</option>
                  <option value="已复核">已复核</option>
                </select>
              </div>
              <div className="w-28">
                <label className="block text-xs text-gray-500 mb-1">是否属实</label>
                <select value={filterReviewStatus === '未复核' ? '--' : filterValidity} onChange={(e) => setFilterValidity(e.target.value)} disabled={filterReviewStatus === '未复核'}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                  {filterReviewStatus === '未复核' ? <option value="--">--</option> : (<><option value="全部">全部</option><option value="正确预警">正确预警</option><option value="误报">误报</option></>)}
                </select>
              </div>
              <div className="w-36">
                <label className="block text-xs text-gray-500 mb-1">异常内容</label>
                <select value={filterWarningType} onChange={(e) => setFilterWarningType(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="全部">全部</option>
                  {Object.entries(WARNING_TYPES).map(([code, name]) => (<option key={code} value={code}>{name}</option>))}
                </select>
              </div>
              <div className="flex-1 min-w-[220px]">
                <label className="block text-xs text-gray-500 mb-1">谈话日期</label>
                <div className="flex items-center gap-2">
                  <input type="date" value={filterDateStart} onChange={(e) => setFilterDateStart(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-gray-400 text-xs">—</span>
                  <input type="date" value={filterDateEnd} onChange={(e) => setFilterDateEnd(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <button onClick={applyListFilters} className="px-5 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">查询</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                  <th className="px-2 py-2.5 text-center font-medium">序号</th>
                  <th className="px-2 py-2.5 text-center font-medium">谈话间号</th>
                  <th className="px-3 py-2.5 text-center font-medium">谈话地点</th>
                  <th className="px-2 py-2.5 text-center font-medium">异常内容</th>
                  <th className="px-3 py-2.5 text-center font-medium">异常时间</th>
                  <th className="px-2 py-2.5 text-center font-medium">复核状态</th>
                  <th className="px-2 py-2.5 text-center font-medium">复核人员</th>
                  <th className="px-3 py-2.5 text-center font-medium">复核时间</th>
                  <th className="px-2 py-2.5 text-center font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((warning, idx) => (
                  <tr key={warning.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/40'} hover:bg-blue-50 transition-colors`}>
                    <td className="px-2 py-2 text-gray-500 text-center">{startIdx + idx + 1}</td>
                    <td className="px-2 py-2 text-gray-800 text-center whitespace-nowrap font-medium">{warning.talkingRoom}</td>
                    <td className="px-3 py-2 text-gray-600 text-center whitespace-nowrap">{warning.location}</td>
                    <td className="px-2 py-2 text-center">
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-medium whitespace-nowrap">{warning.typeName}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-600 text-center whitespace-nowrap">{warning.time}</td>
                    <td className="px-2 py-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${warning.reviewStatus === '未复核' ? 'bg-gray-100 text-gray-500' : warning.reviewStatus === '误报' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                        {warning.reviewStatus}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-gray-600 text-center whitespace-nowrap">{warning.reviewPerson || '—'}</td>
                    <td className="px-3 py-2 text-gray-600 text-center whitespace-nowrap">{warning.reviewTime || '—'}</td>
                    <td className="px-2 py-2 text-center">
                      <div className="flex gap-2 justify-center whitespace-nowrap">
                        <button onClick={() => onWarningDetailClick(warning)} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">详情</button>
                        <button onClick={() => onReviewClick(warning)} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">复核</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              共 <span className="font-medium text-gray-600">{filteredWarningList.length}</span> 条 &nbsp;|&nbsp; 每页 {itemsPerPage} 条 &nbsp;|&nbsp; 第 {currentPage}/{totalPages} 页
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">◀ 上一页</button>
              {(() => {
                const pages = [];
                const maxVisible = 7;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);
                if (startPage > 1) { pages.push(<button key={1} onClick={() => setCurrentPage(1)} className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors">1</button>); if (startPage > 2) pages.push(<span key="e1" className="px-1 text-gray-400 text-xs">...</span>); }
                for (let i = startPage; i <= endPage; i++) { pages.push(<button key={i} onClick={() => setCurrentPage(i)} className={`px-3 py-1 text-xs rounded transition-colors ${currentPage === i ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}>{i}</button>); }
                if (endPage < totalPages) { if (endPage < totalPages - 1) pages.push(<span key="e2" className="px-1 text-gray-400 text-xs">...</span>); pages.push(<button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors">{totalPages}</button>); }
                return pages;
              })()}
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">下一页 ▶</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
