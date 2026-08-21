# 预警列表功能改动需求文档

**版本**：v1.0  
**日期**：2026-08-20  
**优先级**：高

---

## 一、概述

预警列表从原来的"误报标注"模式改为"复核"模式。用户可以在列表中直接查看预警、进行复核操作（标记为"正确预警"或"误报"）。

---

## 二、UI 设计

### 2.1 列表上方筛选区

```
是否复核：[未复核 ▼]  是否属实：[全部 ▼]  谈话日期：[2026-08-01] - [2026-08-20]  【确定】
```

**筛选字段**：
- 是否复核：全部、未复核、已复核
- 是否属实：全部、正确预警、误报
- 谈话日期：开始日期 ~ 结束日期选择器

**按钮**：
- 【确定】：应用筛选条件

**注意**：不需要搜索按钮、清空按钮等其他功能

---

### 2.2 表格结构（8 列）

| 序号 | 谈话间号 | 谈话地点 | 异常内容 | 异常时间 | 复核状态 | 复核人员 | 复核时间 | 操作 |
|------|---------|---------|---------|---------|---------|---------|---------|------|
| 1 | 编号001 | 浙江/绍兴市/本级 | 不文明用语 | 2026-08-14 16:23:25 | 未复核 | - | - | 【详情】【复核】 |
| 2 | 编号002 | 浙江/杭州市/滨江区 | 威胁恐吓 | 2026-08-14 16:21:24 | 正确预警 | 管理员 | 2026-08-14 16:20:16 | 【详情】【复核】 |
| 3 | 编号003 | 浙江/宁波市/海曙区 | 程序告知不充分 | 2026-08-14 16:20:07 | 误报 | 审核员 | 2026-08-14 16:15:53 | 【详情】【复核】 |

**字段说明**：
- 序号：表格行号（1-n）
- 谈话间号：warningList.talkingRoom
- 谈话地点：warningList.location
- 异常内容：warningList.typeName（预警类型名称）
- 异常时间：warningList.time
- 复核状态：warningList.reviewStatus（未复核/正确预警/误报）
  - 未复核
  - 正确预警
  - 误报
- 复核人员：warningList.reviewPerson（初始为空）
- 复核时间：warningList.reviewTime（初始为空）
- 操作：【详情】【复核】两个按钮

---

### 2.3 样式要求

**表格行颜色**：
- 奇数行：白色背景
- 偶数行：浅蓝色背景（#f0f9ff）
- 悬停时：蓝色高亮背景

**复核状态标签**样式维持原状

**操作按钮**：

- 【详情】：蓝色按钮，打开详情弹窗
- 【复核】：紫色或其他色按钮，打开复核弹窗

---

## 三、详情弹窗（WarningModal）

### 3.1 结构

```
┌──────────────────────────────────────────────┐
│ 预警详情                            【✕关闭】 │
├──────────────────────────────────────────────┤
│                                              │
│ 【基本信息】                                 │
│                                              │
│  地点：          浙江/绍兴市/本级            │
│  谈话间号：      编号001                    │
│  异常内容：      不文明用语                  │
│  异常时间：      2026-08-14 16:23:25       │
│                                              │
│ 【预警详情】                                 │
│                                              │
│  预警摘要：                                  │
│ 谈话人1：····
  谈话人2：····
│                                              │
│  音视频记录：                                │
│  [▶ 谈话录音]  00:15:32 / 00:45:20         │
│                                              │
│                                  │
└──────────────────────────────────────────────┘
```

### 3.2 字段映射

- 地点：warning.location
- 谈话间号：warning.talkingRoom
- 异常内容：warning.typeName
- 异常时间：warning.time
- 预警摘要：warning.content
- 音视频记录：warning.audio（模拟播放，暂不真实播放）

### 3.3 功能要求

- 点击【关闭】或右上角 ✕ 关闭弹窗
- 显示预警的完整信息
- 不需要显示附件
- 音频播放器只需要 UI，暂不实现真实播放功能

---

## 四、复核弹窗（ReviewModal - 新建）

### 4.1 结构

```
┌──────────────────────────────────────────────┐
│ 复核预警                            【✕关闭】 │
├──────────────────────────────────────────────┤
│                                              │
│ 地点：          浙江/绍兴市/本级            │
│ 谈话间号：      编号001                    │
│ 异常内容：      不文明用语                  │
│ 异常时间：      2026-08-14 16:23:25       │
│                                              │
│ 复核结果：                                   │
│ ○ 正确预警  ○ 误报                        │
│                                              │
│ 复核意见（可选）：                          │
│ ┌──────────────────────────────────────────┐│
│ │                                          ││
│ │  请输入复核意见...                      ││
│ │                                          ││
│ │                                          ││
│ └──────────────────────────────────────────┘│
│                                              │
│                  【确定】【取消】             │
│                                              │
└──────────────────────────────────────────────┘
```

### 4.2 字段说明

- 地点、谈话间号、异常内容、异常时间：同详情弹窗（展示用）
- 复核结果：单选框
  - ○ 正确预警（reviewStatus = '正确预警'）
  - ○ 误报（reviewStatus = '误报'）
- 复核意见：可选文本框（reviewOpinion）

### 4.3 功能要求

- 【确定】按钮：
  - 验证复核结果是否选中
  - 如果未选中，提示"请选择复核结果"
  - 如果选中，保存复核数据（reviewStatus、reviewPerson、reviewTime、reviewOpinion）
  - 关闭弹窗
  - 表格数据立即更新显示

- 【取消】按钮：
  - 关闭弹窗，不保存任何数据

- 【✕关闭】按钮：
  - 同【取消】

---

## 五、数据结构调整

### 5.1 warningList 需要补充的字段

```javascript
{
  id: "W001",
  time: "2026-08-14 16:23:25",
  location: "浙江/绍兴市/本级",
  talkingRoom: "编号001",
  type: "001",
  typeName: "不文明用语",
  content: "你们这是什么破制度...",
  audio: "/audio/warning-001.mp3", // 音频地址（暂不真实播放）
  
  // 新增字段（必须）
  reviewStatus: "未复核",        // 未复核 | 正确预警 | 误报
  reviewPerson: "",              // 初始为空，复核后填充
  reviewTime: "",                // 初始为空，复核后填充
  reviewOpinion: "",             // 初始为空，复核意见（可选）
}
```

### 5.2 样本数据

```javascript
// 未复核的预警
{
  id: "W001",
  reviewStatus: "未复核",
  reviewPerson: "",
  reviewTime: "",
  reviewOpinion: "",
}

// 已复核为"正确预警"
{
  id: "W002",
  reviewStatus: "正确预警",
  reviewPerson: "管理员",
  reviewTime: "2026-08-14 16:20:16",
  reviewOpinion: "已确认，情节严重",
}

// 已复核为"误报"
{
  id: "W003",
  reviewStatus: "误报",
  reviewPerson: "审核员",
  reviewTime: "2026-08-14 16:15:53",
  reviewOpinion: "虚假举报",
}
```

---

## 六、组件改动清单

### 6.1 需要修改的组件

#### 1. PageTemplate.jsx

**修改内容**：
- [ ] 在预警列表上方添加筛选区（3个下拉框 + 1个日期范围 + 【确定】按钮）
- [ ] 修改表格字段（从原来的6列改为8列）
  - 删除原来的"时间"、"地点"、"谈话间"、"类型"、"状态"列
  - 添加新字段：序号、谈话间号、谈话地点、异常内容、异常时间、复核状态、复核人员、复核时间
- [ ] 修改操作列（从【详情】【标记误报】【取消标注】改为【详情】【复核】）
- [ ] 添加筛选逻辑（根据三个筛选条件过滤表格数据）
- [ ] 移除原来的"总览卡片中的误报数"改为"复核状态"统计

**关键行号**：表格字段定义部分

---

#### 2. WarningModal.jsx（详情弹窗 - 修改）

**修改内容**：
- [ ] 删除"预警ID"字段
- [ ] 删除"附件"部分
- [ ] 保留"地点"、"谈话间号"、"异常内容"、"异常时间"、"预警摘要"、"音视频记录"
- [ ] 更新字段标签名称和映射关系

**关键行号**：弹窗内容区域

---

#### 3. ReviewModal.jsx（复核弹窗 - 新建）

**需要创建**：`src/components/ReviewModal.jsx`

**内容**：
- [ ] 弹窗容器（600px 宽）
- [ ] 基本信息展示区（4个字段）
- [ ] 复核结果单选框（2个选项：正确预警、误报）
- [ ] 复核意见文本框（可选）
- [ ] 【确定】【取消】按钮
- [ ] 确定时的验证和数据保存逻辑

---

#### 4. App.jsx（主应用 - 修改）

**修改内容**：
- [ ] 添加 `selectedReview` 状态（当前要复核的预警对象）
- [ ] 添加 `handleReviewOpen()` 方法（打开复核弹窗）
- [ ] 添加 `handleReviewSubmit()` 方法（提交复核结果）
- [ ] 将 ReviewModal 组件集成到主应用
- [ ] 处理复核数据的保存和表格更新

---

#### 5. mockData.js（Mock 数据 - 修改）

**修改内容**：
- [ ] 为所有 warningList 数据补充 reviewStatus、reviewPerson、reviewTime、reviewOpinion 字段
- [ ] 其中部分数据设置为"已复核"状态（带有 reviewPerson 和 reviewTime）
- [ ] 部分数据设置为"未复核"状态（reviewPerson 和 reviewTime 为空）

---

### 6.2 新建的组件

**文件**：`src/components/ReviewModal.jsx`

```javascript
// 结构
export default function ReviewModal({ warning, onClose, onSubmit }) {
  const [reviewStatus, setReviewStatus] = useState('');
  const [reviewOpinion, setReviewOpinion] = useState('');

  const handleSubmit = () => {
    if (!reviewStatus) {
      alert('请选择复核结果');
      return;
    }
    
    // 调用父组件的 onSubmit 回调
    onSubmit({
      warningId: warning.id,
      reviewStatus,
      reviewOpinion,
      reviewPerson: '当前用户', // 模拟用户
      reviewTime: new Date().toLocaleString(),
    });
  };

  // 渲染弹窗...
}
```

---

## 七、交互流程

### 7.1 查看预警详情流程

```
点击【详情】按钮
  ↓
打开 WarningModal（详情弹窗）
  ↓
显示预警基本信息 + 内容
  ↓
点击【关闭】或 ✕ 关闭弹窗
```

### 7.2 复核预警流程

```
点击【复核】按钮
  ↓
打开 ReviewModal（复核弹窗）
  ↓
选择复核结果（正确预警/误报）
  ↓
（可选）输入复核意见
  ↓
点击【确定】
  ↓
保存复核数据（reviewStatus、reviewPerson、reviewTime、reviewOpinion）
  ↓
关闭弹窗
  ↓
表格数据立即更新
  ↓
该行的"复核状态"显示为"正确预警"或"误报"
  ↓
"复核人员"显示为"当前用户"
  ↓
"复核时间"显示为复核时间戳
```

### 7.3 筛选流程

```
修改筛选条件（是否复核、是否属实、日期范围）
  ↓
点击【确定】按钮
  ↓
根据三个条件过滤 warningList
  ↓
表格显示过滤后的结果
  ↓
重新分页展示
```

---

## 八、状态管理

### App.jsx 中需要的状态

```javascript
const [selectedWarning, setSelectedWarning] = useState(null);        // 详情弹窗
const [selectedReview, setSelectedReview] = useState(null);          // 复核弹窗
const [filterReviewStatus, setFilterReviewStatus] = useState('全部'); // 筛选：是否复核
const [filterValidity, setFilterValidity] = useState('全部');        // 筛选：是否属实
const [filterDateRange, setFilterDateRange] = useState({             // 筛选：日期范围
  start: '',
  end: '',
});
```

### PageTemplate.jsx 中需要的状态

```javascript
const [currentPage, setCurrentPage] = useState(1);                   // 分页
const [timeRange, setTimeRange] = useState('7days');                // 趋势图时间范围
```

---

## 九、修改步骤

### 步骤顺序

1. [ ] **第1步**：修改 mockData.js - 补充 reviewStatus、reviewPerson、reviewTime、reviewOpinion 字段
2. [ ] **第2步**：创建 ReviewModal.jsx - 新建复核弹窗组件
3. [ ] **第3步**：修改 WarningModal.jsx - 删除预警ID和附件
4. [ ] **第4步**：修改 PageTemplate.jsx - 调整表格结构和添加筛选区
5. [ ] **第5步**：修改 App.jsx - 集成两个弹窗和筛选逻辑
6. [ ] **第6步**：浏览器测试 - 验证所有功能正常

---

## 十、测试清单

- [ ] 详情弹窗能正常打开和关闭
- [ ] 复核弹窗能正常打开和关闭
- [ ] 复核弹窗提交后，表格数据立即更新
- [ ] 复核状态标签显示正确的颜色
- [ ] 筛选条件能正确过滤表格数据
- [ ] 分页功能正常
- [ ] 操作按钮【详情】【复核】都能响应

---

**下一步**：将此文档内容传给 Claude Code，按步骤逐个修改组件。

**最后更新**：2026-08-20  
**版本**：v1.0
