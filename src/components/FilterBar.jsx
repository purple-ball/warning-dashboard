import React, { useState, useEffect } from 'react';
import { AREA_DATA } from '../mockData';

export default function FilterBar({
  selectedCity,
  selectedDistrict,
  selectedTown,
  selectedRoom,
  onFilterChange,
  onConfirm,
}) {
  const [tempCity, setTempCity] = useState(selectedCity);
  const [tempDistrict, setTempDistrict] = useState(selectedDistrict);
  const [tempTown, setTempTown] = useState(selectedTown);
  const [tempRoom, setTempRoom] = useState(selectedRoom);

  // 当外部筛选器更新时，同步临时状态
  useEffect(() => {
    setTempCity(selectedCity);
    setTempDistrict(selectedDistrict);
    setTempTown(selectedTown);
    setTempRoom(selectedRoom);
  }, [selectedCity, selectedDistrict, selectedTown, selectedRoom]);

  // 处理地市变化 - 自动重置下级
  const handleCityChange = (e) => {
    setTempCity(e.target.value);
    setTempDistrict('全部');
    setTempTown('全部');
    setTempRoom('全部');
  };

  // 是否选中了省本级（此时无区县/乡镇层级，直接到谈话点）
  const isProvLevel = tempCity === '浙江省本级';

  // 场景B：选了普通区县（非"本级"），直接跳过谈话点层级
  const isNormalDistrict = tempDistrict !== '全部' && !tempDistrict.endsWith('本级');

  // 处理区县变化
  const handleDistrictChange = (e) => {
    setTempDistrict(e.target.value);
    setTempTown('全部');
    setTempRoom('全部');
  };

  // 处理乡镇变化
  const handleTownChange = (e) => {
    setTempTown(e.target.value);
    setTempRoom('全部');
  };

  // 处理谈话间变化
  const handleRoomChange = (e) => {
    setTempRoom(e.target.value);
  };

  // 获取区县列表（包含市本级）
  const getDistrictOptions = () => {
    if (tempCity === '全部') return [];
    const districts = AREA_DATA.districts[tempCity] || [];
    const cityLevelOption = { id: 'city-level', name: `${tempCity}本级` };
    return [cityLevelOption, ...districts];
  };

  // 获取乡镇列表（包含区本级，但市本级/区本级不再追加"本级"）
  // 省本级时直接返回省本级谈话点列表（跳过区县层）
  const getTownOptions = () => {
    if (isProvLevel) return AREA_DATA.towns['浙江省本级'] || [];
    if (tempDistrict === '全部') return [];
    // 场景B：普通区县时不显示谈话点层级
    if (isNormalDistrict) return [];
    const towns = AREA_DATA.towns[tempDistrict] || [];
    if (tempDistrict.endsWith('本级')) return towns;
    const districtLevelOption = { id: 'district-level', name: `${tempDistrict}本级` };
    return [districtLevelOption, ...towns];
  };;

  // 获取谈话间列表
  // tempTown 可能是普通谈话点，也可能是"安吉县本级"这类本级key
  // 本级key下没有直接的rooms，需从其子谈话点收集
  const getRoomOptions = () => {
    // 场景B：普通区县时，第三级直接是谈话间
    if (isNormalDistrict) {
      const rooms = [];
      const distLevelKey = `${tempDistrict}本级`;
      (AREA_DATA.towns[distLevelKey] || []).forEach(point => {
        (AREA_DATA.talkingRooms[point.name] || []).forEach(room => {
          if (!rooms.includes(room)) rooms.push(room);
        });
      });
      return rooms;
    }
    if (tempTown === '全部') return [];
    const direct = AREA_DATA.talkingRooms[tempTown];
    if (direct) return direct;
    const rooms = [];
    (AREA_DATA.towns[tempTown] || []).forEach(point => {
      (AREA_DATA.talkingRooms[point.name] || []).forEach(room => {
        if (!rooms.includes(room)) rooms.push(room);
      });
    });
    return rooms;
  };;

  // 点击确定按钮
  const handleConfirm = () => {
    onConfirm({
      city: tempCity,
      district: tempDistrict,
      town: tempTown,
      room: tempRoom,
    });
  };

  // 点击刷新按钮
  const handleRefresh = () => {
    window.location.reload();
  };

  const districtOptions = getDistrictOptions();
  const townOptions = getTownOptions();
  const roomOptions = getRoomOptions();

  return (
    <div className="bg-blue-50 border-b border-blue-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-gray-700 font-medium">筛选:</span>

          {/* 地市 */}
          <select
            value={tempCity}
            onChange={handleCityChange}
            className="px-4 py-2 border border-blue-300 rounded-lg bg-white text-gray-800 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="全部">全部地市</option>
            <option value="浙江省本级">浙江省本级</option>
            {AREA_DATA.cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* 区县（省本级时隐藏） */}
          {!isProvLevel && (
          <select
            value={tempDistrict}
            onChange={handleDistrictChange}
            disabled={tempCity === '全部'}
            className="px-4 py-2 border border-blue-300 rounded-lg bg-white text-gray-800 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="全部">全部区县</option>
            {districtOptions.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          )}

          {/* 乡镇/本级（省本级时直接用省本级谈话点；场景B时隐藏） */}
          {!isNormalDistrict && (
          <select
            value={tempTown}
            onChange={handleTownChange}
            disabled={!isProvLevel && tempDistrict === '全部'}
            className="px-4 py-2 border border-blue-300 rounded-lg bg-white text-gray-800 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="全部">{isProvLevel ? '全部谈话点' : '全部乡镇/本级'}</option>
            {townOptions.map((town) => (
              <option key={town.id} value={town.name}>
                {town.name}
              </option>
            ))}
          </select>
          )}

          {/* 谈话间 */}
          <select
            value={tempRoom}
            onChange={handleRoomChange}
            disabled={isNormalDistrict ? false : tempTown === '全部'}
            className="px-4 py-2 border border-blue-300 rounded-lg bg-white text-gray-800 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="全部">全部谈话间</option>
            {roomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>

          {/* 确定按钮 */}
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            确定
          </button>

          {/* 刷新按钮 */}
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
          >
            刷新
          </button>
        </div>
      </div>
    </div>
  );
}