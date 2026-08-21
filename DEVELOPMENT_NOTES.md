# 浙江省预警看板 - 开发进度和改动清单

**项目状态**：进行中  
**当前日期**：2026-08-20  
**当前阶段**：Bug 修复和功能完善

---

## 一、当前存在的 5 个 Bug

### Bug 1：总览卡片只显示 2 个（应该 4 个）⚠️ 优先级：高

**现象**：页面只显示"预警总数"和"误报数"两个卡片

**应该显示**：
1. 预警总数
2. 待处理（status === '未标注'）
3. 已处理（status === '已标注-非误报'）
4. 误报（status === '已标注-误报'）

**相关文件**：`src/components/PageTemplate.jsx` 第 72-130 行

**修复方式**：检查卡片渲染代码，确保 4 个卡片都能显示

---

### Bug 2：饼图没有根据筛选器变化 ⚠️ 优先级：高

**现象**：无论选择什么筛选器，饼图显示的数据都一样

**应该表现**：
- 省级：显示全部预警的类型分布
- 市级：只显示该市预警的类型分布
- 区县级：只显示该区县预警的类型分布
- 乡镇/本级：只显示该乡镇预警的类型分布
- 谈话间：只显示该谈话间预警的类型分布

**根本原因**：`getTypeDistribution()` 函数没有使用 `pageData.warningList`，仍在使用全局数据

**相关文件**：`src/components/PageTemplate.jsx` 第 23-37 行

**修复方式**：
```
getTypeDistribution() 应该这样：
1. 遍历 pageData.warningList
2. 统计各 type 的数量
3. 返回该范围内的类型分布（不用全局 statistics.byType）
```

---

### Bug 3：筛选器缺少市/区本级的谈话点列表 ⚠️ 优先级：高

**现象**：选择"杭州市本级"后，第三个筛选器（乡镇/本级）为空

**应该表现**：
- 选择"杭州市本级" → 第三个筛选器显示：全部、阳明路点、市民中心点等
- 选择"滨江区本级" → 第三个筛选器显示：全部、长河路点、江南大道点等

**根本原因**：`AREA_DATA.towns` 中没有市本级和区本级的数据

**相关文件**：`src/mockData.js` 中 `AREA_DATA.towns`

**修复方式**：补充到 `AREA_DATA.towns` 中：
```javascript
"杭州市本级": [
  { id: "hz-city-01", name: "阳明路点" },
  { id: "hz-city-02", name: "市民中心点" },
  { id: "hz-city-03", name: "西溪点" },
],
"滨江区本级": [
  { id: "bj-dist-01", name: "长河路点" },
  { id: "bj-dist-02", name: "江南大道点" },
],
// 其他市/区本级数据...
```

---

### Bug 4：趋势图 Tab 点击没有反应 ⚠️ 优先级：中

**现象**：点击"近7天"、"近30天"、"近90天"按钮，图表不切换

**应该表现**：
- 点击【近7天】→ 显示 statistics.trend7days（7条数据）
- 点击【近30天】→ 显示 trend30days（30条数据）
- 点击【近90天】→ 显示 trend90days（90条数据）

**根本原因**：
1. trend30days 和 trend90days 可能没有正确导入
2. getTrendData() 函数可能有问题
3. 状态管理没有触发重新渲染

**相关文件**：`src/components/PageTemplate.jsx` 第 11-20 行 + LineChart 部分

**修复方式**：
1. 确保导入了 trend30days 和 trend90days
2. 确保 getTrendData() 返回正确的数据
3. 检查 LineChart 使用的是 trendData 状态

---

### Bug 5：预警列表没有显示"未标注"状态的数据 ⚠️ 优先级：中

**现象**：表格只显示少数几条数据，缺少很多"待处理"的预警

**应该表现**：
- 显示所有 50 条 warningList 数据
- 根据 status 字段显示正确的标签和颜色

**根本原因**：
1. warningList 中可能没有完整的 status 字段
2. 过滤逻辑可能有问题

**相关文件**：`src/mockData.js` warningList 和 `src/App.jsx` getFilteredWarnings()

**修复方式**：
1. 确保 warningList 每条都有 status 字段
2. 检查 getFilteredWarnings() 过滤逻辑
3. 确保 PageTemplate.jsx 列表显示逻辑正确

---

## 二、修复优先级顺序

1. **先修 Bug 1** - 确保 4 个总览卡片显示
2. **再修 Bug 2** - 饼图动态变化
3. **再修 Bug 3** - 筛选器完整性
4. **再修 Bug 4** - 趋势图 Tab
5. **最后修 Bug 5** - 列表数据完整性

---

## 三、关键文件位置

| Bug | 文件 | 关键行号 |
|-----|------|--------|
| Bug 1 | PageTemplate.jsx | 72-130 |
| Bug 2 | PageTemplate.jsx | 23-37 |
| Bug 3 | mockData.js | AREA_DATA.towns |
| Bug 4 | PageTemplate.jsx | 11-20, 趋势图部分 |
| Bug 5 | mockData.js & App.jsx | warningList + getFilteredWarnings() |

---

## 四、项目文件结构

```
warning-dashboard/
├── src/
│   ├── components/
│   │   ├── FilterBar.jsx ✅
│   │   ├── WarningModal.jsx ✅
│   │   └── PageTemplate.jsx ⚠️ 需要修复
│   ├── App.jsx ⚠️ 需要检查
│   ├── mockData.js ⚠️ 需要补充数据
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 五、下一步

用 Claude Code 按优先级逐个修复这 5 个 Bug

**后续步骤**：Claude Code 修复 → 浏览器测试 → 进行下个 Bug

---

**最后更新**：2026-08-20  
**下一步**：用 Claude Code 修复 Bug 1 - 总览卡片显示
