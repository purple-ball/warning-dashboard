import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AREA_DATA, WARNING_TYPES } from '../mockData';
import FilterBar from './FilterBar';

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316'];

function TRBtn({ value, current, onChange }) {
  const labels = { '7days': '近7天', '30days': '近30天', '90days': '近90天' };
  return (
    <button onClick={() => onChange(value)}
      className={`px-3 py-1 text-xs rounded-md transition-colors ${current === value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
      {labels[value]}
    </button>
  );
}

function buildTrend(list, tabTimeRange) {
  const days = tabTimeRange === '7days' ? 7 : tabTimeRange === '30days' ? 30 : 90;
  const dateCounts = {};
  const processedByDate = {};
  const missByDate = {};
  list.forEach(w => {
    const date = w.time.split(' ')[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
    if (w.reviewStatus === '正确预警' || w.reviewStatus === '误报') {
      processedByDate[date] = (processedByDate[date] || 0) + 1;
    }
    if (w.reviewStatus === '误报') {
      missByDate[date] = (missByDate[date] || 0) + 1;
    }
  });
  const result = [];
  const today = new Date('2026-08-20');
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const monthDay = `${d.getMonth() + 1}.${d.getDate()}`;
    const count = dateCounts[dateStr] || 0;
    const processed = processedByDate[dateStr] || 0;
    const miss = missByDate[dateStr] || 0;
    const misreportRate = processed > 0 ? +((miss / processed) * 100).toFixed(1) : 0;
    result.push({ date: monthDay, count, misreportRate });
  }
  return result;
}

export default function PageTemplate({
  selectedCity, selectedDistrict, selectedTown, selectedRoom,
  onFilterConfirm, chartData, chartTitle, hideChart, onChartDetailClick,
  pageData, onWarningDetailClick, onReviewClick, onOpenDetail,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [tabTimeRange, setTabTimeRange] = useState('7days');
  const itemsPerPage = 10;

  const [filterReviewStatus, setFilterReviewStatus] = useState('全部');
  const [filterValidity, setFilterValidity] = useState('全部');
  const [filterWarningType, setFilterWarningType] = useState('全部');
  const [filterDateStart, setFilterDateStart] = useState('2026-08-14');
  const [filterDateEnd, setFilterDateEnd] = useState('2026-08-20');
  const [appliedFilters, setAppliedFilters] = useState({
    reviewStatus: '全部', validity: '全部', warningType: '全部',
    dateStart: '2026-08-14', dateEnd: '2026-08-20',
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [activeDonut, setActiveDonut] = useState(null);
  const [overviewSortBy, setOverviewSortBy] = useState('total');
  const [overviewSortDir, setOverviewSortDir] = useState('desc');
  const [typeSortBy, setTypeSortBy] = useState('total');
  const [typeSortDir, setTypeSortDir] = useState('desc');

  const allWarnings = pageData?.warningList || [];

  const handleDonutClick = (_, index) => {
    if (index >= typeData.length) return;
    const { code } = typeData[index];
    setActiveDonut(code);
    setActiveTab(code);
  };

  const applyListFilters = () => {
    setAppliedFilters({
      reviewStatus: filterReviewStatus, validity: filterValidity,
      warningType: filterWarningType, dateStart: filterDateStart, dateEnd: filterDateEnd,
    });
    setCurrentPage(1);
  };

  const filteredWarningList = allWarnings.filter(w => {
    if (appliedFilters.reviewStatus === '未复核' && w.reviewStatus !== '未复核') return false;
    if (appliedFilters.reviewStatus === '已复核' && w.reviewStatus === '未复核') return false;
    if (appliedFilters.validity === '正确预警' && w.reviewStatus !== '正确预警') return false;
    if (appliedFilters.validity === '误报' && w.reviewStatus !== '误报') return false;
    if (appliedFilters.warningType !== '全部' && !(w.types || [w.type]).includes(appliedFilters.warningType)) return false;
    const wDate = w.time.split(' ')[0];
    if (wDate < appliedFilters.dateStart || wDate > appliedFilters.dateEnd) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredWarningList.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayData = filteredWarningList.slice(startIdx, startIdx + itemsPerPage);

  const misreportRate = pageData?.processedCount > 0
    ? ((pageData.misreportCount / pageData.processedCount) * 100).toFixed(1) : 0;

  const typeData = useMemo(() => {
    const counts = {};
    allWarnings.forEach(w => {
      (w.types || [w.type]).forEach(code => {
        counts[code] = (counts[code] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([code, value]) => ({
      name: WARNING_TYPES[code] || code,
      value,
      code,
    }));
  }, [allWarnings]);

  const overviewTrend = useMemo(() => buildTrend(allWarnings, tabTimeRange), [allWarnings, tabTimeRange]);

  const typeTrend = useMemo(() => {
    if (activeTab === 'overview') return [];
    return buildTrend(allWarnings.filter(w => (w.types || [w.type]).includes(activeTab)), tabTimeRange);
  }, [activeTab, allWarnings, tabTimeRange]);

  const typeRegionData = useMemo(() => {
    if (activeTab === 'overview') return { pie: [], bar: [] };
    const filtered = allWarnings.filter(w => (w.types || [w.type]).includes(activeTab));
    const regionCounts = {};
    const regionProcessed = {};
    const regionMiss = {};

    filtered.forEach(w => {
      const parts = w.location.split('/');
      const region = parts[1] || '未知';
      regionCounts[region] = (regionCounts[region] || 0) + 1;
      if (w.reviewStatus === '正确预警' || w.reviewStatus === '误报') {
        regionProcessed[region] = (regionProcessed[region] || 0) + 1;
      }
      if (w.reviewStatus === '误报') {
        regionMiss[region] = (regionMiss[region] || 0) + 1;
      }
    });

    const pie = Object.entries(regionCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const totalRegion = pie.reduce((sum, p) => sum + p.value, 0);
    const pieWithPercent = pie.map(p => ({
      ...p,
      percent: totalRegion > 0 ? (p.value / totalRegion) : 0
    }));

    const bar = Object.entries(regionCounts)
      .map(([name, total]) => {
        const processed = regionProcessed[name] || 0;
        const miss = regionMiss[name] || 0;
        const rate = processed > 0 ? +((miss / processed) * 100).toFixed(1) : 0;
        return { name, rate, total };
      })
      .filter(d => d.total > 0)
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 8);

    return { pie: pieWithPercent, bar };
  }, [activeTab, allWarnings]);

  const globalRegionMisreport = useMemo(() => {
    const regionCounts = {};
    const regionProcessed = {};
    const regionMiss = {};

    allWarnings.forEach(w => {
      const parts = w.location.split('/');
      const region = parts[1] || '未知';
      regionCounts[region] = (regionCounts[region] || 0) + 1;
      if (w.reviewStatus === '正确预警' || w.reviewStatus === '误报') {
        regionProcessed[region] = (regionProcessed[region] || 0) + 1;
      }
      if (w.reviewStatus === '误报') {
        regionMiss[region] = (regionMiss[region] || 0) + 1;
      }
    });

    return Object.entries(regionCounts)
      .map(([name, total]) => {
        const processed = regionProcessed[name] || 0;
        const miss = regionMiss[name] || 0;
        const rate = processed > 0 ? +((miss / processed) * 100).toFixed(1) : 0;
        return { name, rate, total };
      })
      .filter(d => d.total > 0)
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 8);
  }, [allWarnings]);

  const sortedGlobalRanking = useMemo(() => {
    return [...globalRegionMisreport].sort((a, b) => {
      const key = overviewSortBy === 'total' ? 'total' : 'rate';
      return overviewSortDir === 'desc' ? b[key] - a[key] : a[key] - b[key];
    });
  }, [globalRegionMisreport, overviewSortBy, overviewSortDir]);

  const sortedTypeRanking = useMemo(() => {
    return [...typeRegionData.bar].sort((a, b) => {
      const key = typeSortBy === 'total' ? 'total' : 'rate';
      return typeSortDir === 'desc' ? b[key] - a[key] : a[key] - b[key];
    });
  }, [typeRegionData.bar, typeSortBy, typeSortDir]);

  const activeTypeName = activeTab !== 'overview' ? WARNING_TYPES[activeTab] : '';
  const activeTypeColor = activeTab !== 'overview'
    ? COLORS[typeData.findIndex(t => t.code === activeTab) % COLORS.length]
    : '#3b82f6';

  const RankList = ({ items, sortBy, sortDir, onSortBy, onSortDir, title }) => {
    const half = Math.ceil(items.length / 2);
    const left = items.slice(0, half);
    const right = items.slice(half);
    const SortBtn = ({ field, label }) => (
      <button
        onClick={() => {
          if (sortBy === field) { onSortDir(sortDir === 'desc' ? 'asc' : 'desc'); }
          else { onSortBy(field); onSortDir('desc'); }
        }}
        className={`px-2 py-0.5 text-xs rounded transition-colors ${sortBy === field ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-400 hover:bg-gray-100'}`}
      >
        {label}{sortBy === field ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''}
      </button>
    );
    const Row = ({ item, rank }) => (
      <div className="flex items-center justify-between px-1 py-1 rounded hover:bg-gray-50 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${rank === 1 ? 'bg-red-500 text-white' : rank === 2 ? 'bg-orange-400 text-white' : rank === 3 ? 'bg-amber-400 text-white' : 'bg-gray-200 text-gray-500'}`}>{rank}</span>
          <span className="text-gray-700 truncate">{item.name}</span>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <span className="w-16 text-right text-gray-400">{item.total.toLocaleString()} 条</span>
          <span className="w-10 text-right font-medium text-gray-700">{item.rate}%</span>
        </div>
      </div>
    );
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">排序：</span>
            <SortBtn field="total" label="总数" />
            <SortBtn field="rate" label="误报率" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-0.5">
            {left.map((item, i) => <Row key={item.name} item={item} rank={i + 1} />)}
          </div>
          <div className="space-y-0.5">
            {right.map((item, i) => <Row key={item.name} item={item} rank={half + i + 1} />)}
          </div>
        </div>
      </div>
    );
  };

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
        selectedCity={selectedCity} selectedDistrict={selectedDistrict}
        selectedTown={selectedTown} selectedRoom={selectedRoom}
        onFilterChange={() => {}} onConfirm={onFilterConfirm}
      />

      <div className="mx-auto px-6 py-5 max-w-[1800px]">

        {/* Row 1: stat cards + entry card + bar chart */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-4 grid grid-cols-2 gap-4">
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

          {/* Entry card */}
          <div
            onClick={onOpenDetail}
            className="col-span-2 bg-white rounded-xl shadow-sm border-t-4 border-blue-400 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 hover:border-blue-600 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm font-semibold text-gray-700 text-center leading-snug group-hover:text-blue-700">全量预警明细</p>
            <p className="text-xs text-gray-400 group-hover:text-blue-500">点击查看/复核</p>
          </div>

          {!hideChart && (
            <div className="col-span-6 bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{chartTitle}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ left: -15, bottom: 55, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" interval={0} angle={-35} textAnchor="end" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 12 }} cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {hideChart && <div className="col-span-6" />}
        </div>

        {/* Row 2: donut (left) + content panel (right) */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-4 bg-white rounded-xl shadow-sm p-4 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">预警类型分布</h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="40%" cy="50%"
                    innerRadius={55} outerRadius={85}
                    dataKey="value"
                    onClick={handleDonutClick}
                    style={{ cursor: 'pointer' }}
                  >
                    {typeData.map((entry, index) => (
                      <Cell
                        key={entry.code}
                        fill={COLORS[index % COLORS.length]}
                        opacity={activeDonut && entry.code !== activeDonut ? 0.3 : 1}
                        stroke={activeDonut === entry.code ? '#1d4ed8' : 'none'}
                        strokeWidth={activeDonut === entry.code ? 2 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(value, name) => [value + ' 条', name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-0.5 mt-1">
              {typeData.map((entry, index) => {
                const total = typeData.reduce((sum, d) => sum + d.value, 0);
                const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : '0.0';
                return (
                  <div
                    key={entry.code}
                    onClick={() => handleDonutClick(null, index)}
                    className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-50 cursor-pointer text-xs"
                    style={{ opacity: activeDonut && entry.code !== activeDonut ? 0.5 : 1 }}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                      <span className="text-gray-700 truncate">{entry.name}</span>
                    </div>
                    <span className="text-gray-500 ml-2 flex-shrink-0">{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content panel (no tabs, just view toggle) */}
          <div className="col-span-8 bg-white rounded-xl shadow-sm flex flex-col">
            <div className="flex-1 p-4 overflow-auto">
              {activeTab === 'overview' ? (
                <div className="h-full flex flex-col">
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700 leading-relaxed">
                      点击左侧环形图中任意预警类型，可查看该类型各地区误报数/误报率排行及趋势分析。
                    </p>
                  </div>
                  <div className="mb-4">
                    <RankList
                      items={sortedGlobalRanking}
                      sortBy={overviewSortBy}
                      sortDir={overviewSortDir}
                      onSortBy={setOverviewSortBy}
                      onSortDir={setOverviewSortDir}
                      title="全部预警各地区误报数/误报率排行"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">全局趋势</span>
                    <div className="flex gap-1.5">
                      {['7days','30days','90days'].map(r => <TRBtn key={r} value={r} current={tabTimeRange} onChange={setTabTimeRange} />)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={overviewTrend} margin={{ left: -5, right: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 10 }} interval={tabTimeRange === '7days' ? 0 : 'preserveStartEnd'} />
                        <YAxis yAxisId="left" stroke="#6b7280" tick={{ fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#6b7280" tick={{ fontSize: 10 }} tickFormatter={v => v + '%'} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 11 }} />
                        <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                        <Line yAxisId="left" type="monotone" dataKey="count" name="预警数" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                        <Line yAxisId="right" type="monotone" dataKey="misreportRate" name="误报率%" stroke="#ef4444" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} strokeDasharray="4 2" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => { setActiveTab('overview'); setActiveDonut(null); }}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium flex-shrink-0"
                    >
                      ← 返回总览
                    </button>
                    <span className="text-gray-300 text-sm">|</span>
                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: activeTypeColor }}></span>
                      {activeTypeName} — 详情分析
                    </h4>
                  </div>

                  <div className="mb-4">
                    <RankList
                      items={sortedTypeRanking}
                      sortBy={typeSortBy}
                      sortDir={typeSortDir}
                      onSortBy={setTypeSortBy}
                      onSortDir={setTypeSortDir}
                      title="该预警各地区误报数/误报率排行"
                    />
                  </div>

                  {/* Type trend */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-700">该类型趋势</span>
                    <div className="flex gap-1.5">
                      {['7days','30days','90days'].map(r => <TRBtn key={r} value={r} current={tabTimeRange} onChange={setTabTimeRange} />)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={typeTrend} margin={{ left: -5, right: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 10 }} interval={tabTimeRange === '7days' ? 0 : 'preserveStartEnd'} />
                        <YAxis yAxisId="left" stroke="#6b7280" tick={{ fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#6b7280" tick={{ fontSize: 10 }} tickFormatter={v => v + '%'} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 11 }} />
                        <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                        <Line yAxisId="left" type="monotone" dataKey="count" name="预警数" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                        <Line yAxisId="right" type="monotone" dataKey="misreportRate" name="误报率%" stroke="#ef4444" strokeWidth={1.5} dot={false} strokeDasharray="4 2" activeDot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}