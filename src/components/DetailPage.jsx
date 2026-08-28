import React, { useState } from 'react';
import { AREA_DATA, WARNING_TYPES } from '../mockData';

export default function DetailPage({ warnings, onWarningDetailClick, onReviewClick, onBack }) {
  // ── Region filter state (independent from primary page) ──────────────────
  const [city, setCity] = useState('全部');
  const [district, setDistrict] = useState('全部');
  const [town, setTown] = useState('全部');
  const [room, setRoom] = useState('全部');

  // ── Warning list filter state ────────────────────────────────────────────
  const [filterReviewStatus, setFilterReviewStatus] = useState('全部');
  const [filterValidity, setFilterValidity] = useState('全部');
  const [filterWarningType, setFilterWarningType] = useState('全部');
  const [filterDateStart, setFilterDateStart] = useState('2026-08-14');
  const [filterDateEnd, setFilterDateEnd] = useState('2026-08-20');
  const [appliedFilters, setAppliedFilters] = useState({
    city: '全部', district: '全部', town: '全部', room: '全部',
    reviewStatus: '全部', validity: '全部', warningType: '全部',
    dateStart: '2026-08-14', dateEnd: '2026-08-20',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ── Region filter cascade helpers (same logic as FilterBar.jsx) ──────────
  const isProvLevel = city === '浙江省本级';
  const isNormalDistrict = district !== '全部' && !district.endsWith('本级');

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setDistrict('全部');
    setTown('全部');
    setRoom('全部');
  };
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setTown('全部');
    setRoom('全部');
  };
  const handleTownChange = (e) => {
    setTown(e.target.value);
    setRoom('全部');
  };

  const getDistrictOptions = () => {
    if (city === '全部') return [];
    const districts = AREA_DATA.districts[city] || [];
    return [{ id: 'city-level', name: `${city}本级` }, ...districts];
  };

  const getTownOptions = () => {
    if (isProvLevel) return AREA_DATA.towns['浙江省本级'] || [];
    if (district === '全部') return [];
    if (isNormalDistrict) return [];
    const towns = AREA_DATA.towns[district] || [];
    if (district.endsWith('本级')) return towns;
    return [{ id: 'district-level', name: `${district}本级` }, ...towns];
  };

  const getRoomOptions = () => {
    if (isNormalDistrict) {
      const rooms = [];
      const distLevelKey = `${district}本级`;
      (AREA_DATA.towns[distLevelKey] || []).forEach(point => {
        (AREA_DATA.talkingRooms[point.name] || []).forEach(r => {
          if (!rooms.includes(r)) rooms.push(r);
        });
      });
      return rooms;
    }
    if (town === '全部') return [];
    const direct = AREA_DATA.talkingRooms[town];
    if (direct) return direct;
    const rooms = [];
    (AREA_DATA.towns[town] || []).forEach(point => {
      (AREA_DATA.talkingRooms[point.name] || []).forEach(r => {
        if (!rooms.includes(r)) rooms.push(r);
      });
    });
    return rooms;
  };

  const districtOptions = getDistrictOptions();
  const townOptions = getTownOptions();
  const roomOptions = getRoomOptions();

  // ── Query / Reset ────────────────────────────────────────────────────────
  const handleQuery = () => {
    setAppliedFilters({
      city, district, town, room,
      reviewStatus: filterReviewStatus, validity: filterValidity,
      warningType: filterWarningType, dateStart: filterDateStart, dateEnd: filterDateEnd,
    });
    setCurrentPage(1);
  };

  const handleReset = () => {
    setCity('全部'); setDistrict('全部'); setTown('全部'); setRoom('全部');
    setFilterReviewStatus('全部'); setFilterValidity('全部');
    setFilterWarningType('全部');
    setFilterDateStart('2026-08-14'); setFilterDateEnd('2026-08-20');
    setAppliedFilters({
      city: '全部', district: '全部', town: '全部', room: '全部',
      reviewStatus: '全部', validity: '全部', warningType: '全部',
      dateStart: '2026-08-14', dateEnd: '2026-08-20',
    });
    setCurrentPage(1);
  };

  // ── Filter warnings ───────────────────────────────────────────────────────
  const filteredWarningList = warnings.filter(w => {
    const af = appliedFilters;

    // Region filter (same logic as App.jsx getFilteredWarnings)
    if (af.city === '浙江省本级') {
      if (w.location.split('/')[1] !== '浙江省本级') return false;
      if (af.town !== '全部' && w.town !== af.town) return false;
      if (af.room !== '全部' && w.talkingRoom !== af.room) return false;
    } else {
      if (af.city !== '全部' && !w.location.includes(af.city)) return false;
      if (af.district !== '全部' && !w.location.includes(af.district)) return false;
      const afIsNormalDistrict = af.district !== '全部' && !af.district.endsWith('本级');
      if (afIsNormalDistrict) {
        if (w.town !== `${af.district}本级`) return false;
      } else {
        if (af.town !== '全部' && w.town !== af.town) return false;
      }
      if (af.room !== '全部' && w.talkingRoom !== af.room) return false;
    }

    // List filters
    if (af.reviewStatus === '未复核' && w.reviewStatus !== '未复核') return false;
    if (af.reviewStatus === '已复核' && w.reviewStatus === '未复核') return false;
    if (af.validity === '正确预警' && w.reviewStatus !== '正确预警') return false;
    if (af.validity === '误报' && w.reviewStatus !== '误报') return false;
    if (af.warningType !== '全部' && !(w.types || [w.type]).includes(af.warningType)) return false;
    const wDate = w.time.split(' ')[0];
    if (wDate < af.dateStart || wDate > af.dateEnd) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredWarningList.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayData = filteredWarningList.slice(startIdx, startIdx + itemsPerPage);

  // ── Shared select class ──────────────────────────────────────────────────
  const selectCls = "px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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

      <div className="mx-auto px-6 py-5 max-w-[1800px]">
        {/* Back nav + title */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            ← 返回看板
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-700">全量预警明细</span>
        </div>

        {/* Filter panel */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-0">
          <div className="px-4 py-3 border-b border-gray-100">

            {/* Row 1: region filters */}
            <div className="flex flex-wrap items-end gap-3 mb-3">
              {/* 地市 */}
              <div className="w-32">
                <label className="block text-xs text-gray-500 mb-1">地市</label>
                <select value={city} onChange={handleCityChange} className={selectCls}>
                  <option value="全部">全部地市</option>
                  <option value="浙江省本级">浙江省本级</option>
                  {AREA_DATA.cities.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* 区县 (hidden when 浙江省本级) */}
              {!isProvLevel && (
                <div className="w-32">
                  <label className="block text-xs text-gray-500 mb-1">区县</label>
                  <select value={district} onChange={handleDistrictChange} disabled={city === '全部'} className={selectCls}>
                    <option value="全部">全部区县</option>
                    {districtOptions.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* 乡镇/本级 (hidden when isNormalDistrict) */}
              {!isNormalDistrict && (
                <div className="w-36">
                  <label className="block text-xs text-gray-500 mb-1">{isProvLevel ? '谈话点' : '乡镇/本级'}</label>
                  <select value={town} onChange={handleTownChange} disabled={!isProvLevel && district === '全部'} className={selectCls}>
                    <option value="全部">{isProvLevel ? '全部谈话点' : '全部乡镇/本级'}</option>
                    {townOptions.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* 谈话间 */}
              <div className="w-32">
                <label className="block text-xs text-gray-500 mb-1">谈话间</label>
                <select value={room} onChange={(e) => setRoom(e.target.value)} disabled={isNormalDistrict ? false : town === '全部'} className={selectCls}>
                  <option value="全部">全部谈话间</option>
                  {roomOptions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: list filters + query/reset */}
            <div className="flex flex-wrap items-end gap-3">
              <div className="w-28">
                <label className="block text-xs text-gray-500 mb-1">复核状态</label>
                <select value={filterReviewStatus} onChange={(e) => { setFilterReviewStatus(e.target.value); if (e.target.value === '未复核') setFilterValidity('全部'); }} className={selectCls}>
                  <option value="全部">全部</option>
                  <option value="未复核">未复核</option>
                  <option value="已复核">已复核</option>
                </select>
              </div>
              <div className="w-28">
                <label className="block text-xs text-gray-500 mb-1">是否属实</label>
                <select value={filterReviewStatus === '未复核' ? '--' : filterValidity} onChange={(e) => setFilterValidity(e.target.value)} disabled={filterReviewStatus === '未复核'} className={selectCls}>
                  {filterReviewStatus === '未复核' ? <option value="--">--</option> : (
                    <>
                      <option value="全部">全部</option>
                      <option value="正确预警">正确预警</option>
                      <option value="误报">误报</option>
                    </>
                  )}
                </select>
              </div>
              <div className="w-36">
                <label className="block text-xs text-gray-500 mb-1">异常内容</label>
                <select value={filterWarningType} onChange={(e) => setFilterWarningType(e.target.value)} className={selectCls}>
                  <option value="全部">全部</option>
                  {Object.entries(WARNING_TYPES).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
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
              <button onClick={handleQuery} className="px-5 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">查询</button>
              <button onClick={handleReset} className="px-4 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap">重置</button>
            </div>
          </div>

          {/* Table */}
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
                      <div className="flex flex-wrap gap-1 justify-center">
                        {(warning.typeNames || [warning.typeName]).map((name, i) => (
                          <span key={i} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-medium whitespace-nowrap">{name}</span>
                        ))}
                      </div>
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
                {displayData.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-gray-400">暂无数据</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              共 <span className="font-medium text-gray-600">{filteredWarningList.length}</span> 条 &nbsp;|&nbsp; 每页 {itemsPerPage} 条 &nbsp;|&nbsp; 第 {currentPage}/{Math.max(1, totalPages)} 页
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
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">下一页 ▶</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
