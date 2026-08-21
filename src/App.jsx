import React, { useState } from 'react';
import {
  warningList,
  AREA_DATA,
} from './mockData';
import FilterBar from './components/FilterBar';
import PageTemplate from './components/PageTemplate';
import WarningModal from './components/WarningModal';
import ReviewModal from './components/ReviewModal';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('全部');
  const [selectedDistrict, setSelectedDistrict] = useState('全部');
  const [selectedTown, setSelectedTown] = useState('全部');
  const [selectedRoom, setSelectedRoom] = useState('全部');
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [warnings, setWarnings] = useState(warningList);

  const handleFilterConfirm = (filters) => {
    setSelectedCity(filters.city);
    setSelectedDistrict(filters.district);
    setSelectedTown(filters.town);
    setSelectedRoom(filters.room);
  };

  // 打开复核弹窗
  const handleReviewClick = (warning) => {
    setSelectedReview(warning);
  };

  // 提交复核结果
  const handleReviewSubmit = (reviewData) => {
    setWarnings(prevWarnings =>
      prevWarnings.map(w =>
        w.id === reviewData.warningId
          ? {
              ...w,
              reviewStatus: reviewData.reviewStatus,
              reviewPerson: reviewData.reviewPerson,
              reviewTime: reviewData.reviewTime,
              reviewOpinion: reviewData.reviewOpinion,
            }
          : w
      )
    );
    setSelectedReview(null);
  };

  // 获取当前筛选范围的预警列表
  const getFilteredWarnings = () => {
    return warnings.filter((w) => {
      if (selectedCity === '浙江省本级') {
        // 省本级：location 第一段为 '浙江省本级'
        if (w.location.split('/')[1] !== '浙江省本级') return false;
        if (selectedTown !== '全部' && w.town !== selectedTown) return false;
        if (selectedRoom !== '全部' && w.talkingRoom !== selectedRoom) return false;
        return true;
      }
      if (selectedCity !== '全部' && !w.location.includes(selectedCity)) return false;
      if (selectedDistrict !== '全部' && !w.location.includes(selectedDistrict)) return false;
      if (selectedTown !== '全部' && w.town !== selectedTown) return false;
      if (selectedRoom !== '全部' && w.talkingRoom !== selectedRoom) return false;
      return true;
    });
  };

  const filteredWarnings = getFilteredWarnings();

  // 计算当前页面的统计数据
  const getPageStats = () => {
    const totalWarnings = filteredWarnings.length;
    const waitingCount = filteredWarnings.filter(w => w.status === '未标注').length;
    const misreportCount = filteredWarnings.filter(w => w.status === '已标注-误报').length;
    const processedCount = filteredWarnings.filter(w => w.status === '已标注-非误报' || w.status === '已标注-误报').length;

    return {
      totalWarnings,
      waitingCount,
      processedCount,
      misreportCount,
      warningList: filteredWarnings,
    };
  };

  // 获取柱状图数据
  const getChartData = () => {
    // 省本级
    if (selectedCity === '浙江省本级') {
      if (selectedTown === '全部') {
        const points = AREA_DATA.towns['浙江省本级'] || [];
        return {
          data: points.map(p => ({
            name: p.name,
            count: warnings.filter(w => w.town === p.name).length,
            id: p.id,
          })),
          title: '谈话点预警排行',
          hideChart: false,
        };
      }
      // 选了具体谈话点 → 谈话间排行
      if (selectedRoom === '全部') {
        const rooms = AREA_DATA.talkingRooms[selectedTown] || [];
        return {
          data: rooms.map(room => ({
            name: room,
            count: warnings.filter(w => w.talkingRoom === room).length,
            id: room,
          })),
          title: '谈话间预警排行',
          hideChart: false,
        };
      }
      return { data: [], title: '', hideChart: true };
    }

    if (selectedCity === '全部' && selectedDistrict === '全部' && selectedTown === '全部') {
      return {
        data: AREA_DATA.cities.map((city) => ({
          name: city.name,
          count: warnings.filter(w => w.location.includes(city.name)).length,
          id: city.id,
        })),
        title: '地市预警排行',
        hideChart: false,
      };
    }

    if (selectedCity !== '全部' && selectedDistrict === '全部' && selectedTown === '全部') {
      const districtList = AREA_DATA.districts[selectedCity] || [];
      return {
        data: districtList.map((d) => ({
          name: d.name,
          count: warnings.filter(w => w.location.includes(d.name)).length,
          id: d.id,
        })),
        title: '下级单位预警排行',
        hideChart: false,
      };
    }

    if (selectedCity !== '全部' && selectedDistrict !== '全部' && selectedTown === '全部') {
      const townList = AREA_DATA.towns[selectedDistrict] || [];
      return {
        data: townList.map((t) => ({
          name: t.name,
          count: warnings.filter(w => w.town === t.name).length,
          id: t.id,
        })),
        title: '下级单位预警排行',
        hideChart: false,
      };
    }

    if (selectedCity !== '全部' && selectedDistrict !== '全部' && selectedTown !== '全部' && selectedRoom === '全部') {
      // selectedTown 可能是"余杭区本级"这样的本级key，其rooms挂在下属谈话点上
      // 先尝试直接把selectedTown当谈话点key查rooms（普通谈话点）
      // 再尝试从towns[selectedTown]收集所有下属谈话点的rooms（本级key）
      let roomList = [];
      const directRooms = AREA_DATA.talkingRooms[selectedTown];
      if (directRooms) {
        roomList = directRooms;
      } else {
        const subPoints = AREA_DATA.towns[selectedTown] || [];
        subPoints.forEach(point => {
          (AREA_DATA.talkingRooms[point.name] || []).forEach(room => {
            if (!roomList.includes(room)) roomList.push(room);
          });
        });
      }
      return {
        data: roomList.map((room) => ({
          name: room,
          count: warnings.filter(w => w.talkingRoom === room).length,
          id: room,
        })),
        title: '谈话间预警排行',
        hideChart: false,
      };
    }

    if (selectedRoom !== '全部') {
      return { data: [], title: '', hideChart: true };
    }

    return { data: [], title: '预警排行', hideChart: false };
  };

  // 处理柱状图【详情】按钮
  const handleChartDetailClick = (item) => {
    if (selectedCity === '全部') {
      handleFilterConfirm({ city: item.name, district: '全部', town: '全部', room: '全部' });
      return;
    }

    if (selectedDistrict === '全部' && selectedTown === '全部') {
      handleFilterConfirm({ city: selectedCity, district: item.name, town: '全部', room: '全部' });
      return;
    }

    if (selectedTown === '全部' && selectedRoom === '全部') {
      handleFilterConfirm({ city: selectedCity, district: selectedDistrict, town: item.name, room: '全部' });
      return;
    }

    if (selectedRoom === '全部') {
      handleFilterConfirm({ city: selectedCity, district: selectedDistrict, town: selectedTown, room: item.name });
      return;
    }
  };

  const chartInfo = getChartData();
  const pageData = getPageStats();

  return (
    <div>
      <PageTemplate
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        selectedTown={selectedTown}
        selectedRoom={selectedRoom}
        onFilterConfirm={handleFilterConfirm}
        chartData={chartInfo.data}
        chartTitle={chartInfo.title}
        hideChart={chartInfo.hideChart}
        onChartDetailClick={handleChartDetailClick}
        pageData={pageData}
        onWarningDetailClick={setSelectedWarning}
        onReviewClick={handleReviewClick}
      />

      <WarningModal
        warning={selectedWarning}
        onClose={() => setSelectedWarning(null)}
      />

      <ReviewModal
        warning={selectedReview}
        onClose={() => setSelectedReview(null)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}