// 预警类型映射（按需求文档）
export const WARNING_TYPES = {
  "001": "自伤自杀倾向",
  "002": "不文明用语",
  "003": "威胁恐吓",
  "004": "疑似指供诱供",
  "005": "违规承诺",
  "006": "权益未保障",
  "007": "情绪激动",
}

export const AREA_DATA = {
  cities: [
    { id: "hz", name: "杭州市" },
    { id: "nb", name: "宁波市" },
    { id: "wz", name: "温州市" },
    { id: "sx", name: "绍兴市" },
    { id: "jh", name: "金华市" },
    { id: "jx", name: "嘉兴市" },
    { id: "hz2", name: "湖州市" },
    { id: "tz", name: "台州市" },
    { id: "qz", name: "衢州市" },
    { id: "ls", name: "丽水市" },
    { id: "zs", name: "舟山市" },
  ],
  districts: {
    "杭州市": [
      { id: "sc", name: "上城区" },
      { id: "xh", name: "西湖区" },
      { id: "bj", name: "滨江区" },
      { id: "gs", name: "拱墅区" },
      { id: "yh", name: "余杭区" },
      { id: "laq", name: "临安区" },
      { id: "tl", name: "桐庐县" },
      { id: "ca", name: "淳安县" },
      { id: "jd", name: "建德市" },
    ],
    "宁波市": [
      { id: "hs", name: "海曙区" },
      { id: "jb", name: "江北区" },
      { id: "yz", name: "鄞州区" },
      { id: "fh", name: "奉化区" },
      { id: "yx", name: "余姚市" },
      { id: "cs", name: "慈溪市" },
      { id: "ns", name: "宁海县" },
      { id: "xx", name: "象山县" },
    ],
    "温州市": [
      { id: "lc", name: "鹿城区" },
      { id: "oh", name: "瓯海区" },
      { id: "lw", name: "龙湾区" },
      { id: "dq", name: "洞头区" },
      { id: "rq", name: "瑞安市" },
      { id: "yq", name: "乐清市" },
      { id: "yj", name: "永嘉县" },
      { id: "ps", name: "平阳县" },
      { id: "cn", name: "苍南县" },
    ],
    "绍兴市": [
      { id: "yc", name: "越城区" },
      { id: "kq", name: "柯桥区" },
      { id: "sy", name: "上虞区" },
      { id: "zj", name: "诸暨市" },
      { id: "sz", name: "嵊州市" },
      { id: "xa", name: "新昌县" },
    ],
    "金华市": [
      { id: "wc", name: "婺城区" },
      { id: "jr", name: "金东区" },
      { id: "jy", name: "义乌市" },
      { id: "dw", name: "东阳市" },
      { id: "yj2", name: "永康市" },
      { id: "lh", name: "兰溪市" },
      { id: "ww", name: "武义县" },
      { id: "ps2", name: "浦江县" },
      { id: "pm", name: "磐安县" },
    ],
    "嘉兴市": [
      { id: "nh", name: "南湖区" },
      { id: "xz", name: "秀洲区" },
      { id: "hx", name: "海宁市" },
      { id: "tx", name: "桐乡市" },
      { id: "jp", name: "嘉善县" },
      { id: "hys", name: "海盐县" },
      { id: "px", name: "平湖市" },
    ],
    "湖州市": [
      { id: "wx", name: "吴兴区" },
      { id: "nq", name: "南浔区" },
      { id: "dc", name: "德清县" },
      { id: "ca2", name: "长兴县" },
      { id: "aj", name: "安吉县" },
    ],
    "台州市": [
      { id: "jj", name: "椒江区" },
      { id: "hy", name: "黄岩区" },
      { id: "lq", name: "路桥区" },
      { id: "ws", name: "温岭市" },
      { id: "lh2", name: "临海市" },
      { id: "yt", name: "玉环市" },
      { id: "sj", name: "三门县" },
      { id: "tx2", name: "天台县" },
      { id: "xj", name: "仙居县" },
    ],
    "衢州市": [
      { id: "kc", name: "柯城区" },
      { id: "qj", name: "衢江区" },
      { id: "jh2", name: "江山市" },
      { id: "ch", name: "常山县" },
      { id: "kh", name: "开化县" },
      { id: "lt", name: "龙游县" },
    ],
    "丽水市": [
      { id: "ld", name: "莲都区" },
      { id: "lq2", name: "龙泉市" },
      { id: "qy", name: "青田县" },
      { id: "yx2", name: "云和县" },
      { id: "qt", name: "庆元县" },
      { id: "jn", name: "缙云县" },
      { id: "sj2", name: "遂昌县" },
      { id: "sl", name: "松阳县" },
      { id: "jn2", name: "景宁县" },
    ],
    "舟山市": [
      { id: "dh", name: "定海区" },
      { id: "pt", name: "普陀区" },
      { id: "ds", name: "岱山县" },
      { id: "ss", name: "嵊泗县" },
    ],
  },
  towns: {
    "浙江省本级": [
      { id: "zj-prov-01", name: "省厅第一点" },
      { id: "zj-prov-02", name: "省厅第二点" },
      { id: "zj-prov-03", name: "省厅第三点" },
    ],
    "上城区": [
      { id: "sc01", name: "城市社区" },
      { id: "sc02", name: "河东社区" },
    ],
    "西湖区": [
      { id: "xh01", name: "翠苑街道" },
      { id: "xh02", name: "留下街道" },
    ],
    "滨江区": [
      { id: "bj01", name: "长河镇" },
      { id: "bj02", name: "西兴镇" },
      { id: "bj03", name: "浦沿镇" },
    ],
    "杭州市本级": [
      { id: "hz-city-01", name: "阳明路点" },
      { id: "hz-city-02", name: "市民中心点" },
      { id: "hz-city-03", name: "西溪点" },
    ],
    "宁波市本级": [
      { id: "nb-city-01", name: "中山路点" },
      { id: "nb-city-02", name: "江北点" },
    ],
    "温州市本级": [
      { id: "wz-city-01", name: "人民路点" },
      { id: "wz-city-02", name: "学院路点" },
    ],
    "绍兴市本级": [
      { id: "sx-city-01", name: "府山点" },
      { id: "sx-city-02", name: "解放路点" },
    ],
    "金华市本级": [
      { id: "jh-city-01", name: "宾虹路点" },
      { id: "jh-city-02", name: "婺州点" },
    ],
    "嘉兴市本级": [
      { id: "jx-city-01", name: "南湖点" },
      { id: "jx-city-02", name: "禾城点" },
    ],
    "湖州市本级": [
      { id: "hz2-city-01", name: "爱山点" },
      { id: "hz2-city-02", name: "仁皇点" },
    ],
    "台州市本级": [
      { id: "tz-city-01", name: "椒江点" },
      { id: "tz-city-02", name: "海门点" },
    ],
    "衢州市本级": [
      { id: "qz-city-01", name: "柯城点" },
      { id: "qz-city-02", name: "府山点" },
    ],
    "丽水市本级": [
      { id: "ls-city-01", name: "莲都点" },
      { id: "ls-city-02", name: "大洋路点" },
    ],
    "舟山市本级": [
      { id: "zs-city-01", name: "定海点" },
      { id: "zs-city-02", name: "普陀点" },
    ],
    "上城区本级": [
      { id: "sc-dist-01", name: "望江点" },
      { id: "sc-dist-02", name: "清波点" },
    ],
    "西湖区本级": [
      { id: "xh-dist-01", name: "北山点" },
      { id: "xh-dist-02", name: "文新点" },
    ],
    "滨江区本级": [
      { id: "bj-dist-01", name: "长河路点" },
      { id: "bj-dist-02", name: "江南大道点" },
    ],
    "拱墅区本级": [
      { id: "gs-dist-01", name: "祥符点" },
      { id: "gs-dist-02", name: "湖墅点" },
    ],
    "余杭区本级": [
      { id: "yh-dist-01", name: "临平点" },
      { id: "yh-dist-02", name: "仓前点" },
    ],
    "临安区本级": [
      { id: "laq-dist-01", name: "锦城点" },
      { id: "laq-dist-02", name: "玲珑点" },
    ],
    "桐庐县本级": [
      { id: "tl-dist-01", name: "桐君点" },
      { id: "tl-dist-02", name: "富春点" },
    ],
    "淳安县本级": [
      { id: "ca-dist-01", name: "千岛湖点" },
      { id: "ca-dist-02", name: "文昌点" },
    ],
    "建德市本级": [
      { id: "jd-dist-01", name: "新安江点" },
      { id: "jd-dist-02", name: "洋溪点" },
    ],
    "海曙区本级": [
      { id: "hs-dist-01", name: "鼓楼点" },
      { id: "hs-dist-02", name: "月湖点" },
    ],
    "江北区本级": [
      { id: "jb-dist-01", name: "文教点" },
      { id: "jb-dist-02", name: "庄桥点" },
    ],
    "鄞州区本级": [
      { id: "yz-dist-01", name: "首南点" },
      { id: "yz-dist-02", name: "钟公庙点" },
    ],
    "奉化区本级": [
      { id: "fh-dist-01", name: "岳林点" },
      { id: "fh-dist-02", name: "江口点" },
    ],
    "余姚市本级": [
      { id: "yx-dist-01", name: "兰江点" },
      { id: "yx-dist-02", name: "阳明点" },
    ],
    "慈溪市本级": [
      { id: "cs-dist-01", name: "浒山点" },
      { id: "cs-dist-02", name: "古塘点" },
    ],
    "宁海县本级": [
      { id: "ns-dist-01", name: "跃龙点" },
      { id: "ns-dist-02", name: "桃源点" },
    ],
    "象山县本级": [
      { id: "xx-dist-01", name: "丹城点" },
      { id: "xx-dist-02", name: "石浦点" },
    ],
    "鹿城区本级": [
      { id: "lc-dist-01", name: "五马点" },
      { id: "lc-dist-02", name: "广化点" },
    ],
    "瓯海区本级": [
      { id: "oh-dist-01", name: "娄桥点" },
      { id: "oh-dist-02", name: "茶山点" },
    ],
    "龙湾区本级": [
      { id: "lw-dist-01", name: "永中点" },
      { id: "lw-dist-02", name: "海滨点" },
    ],
    "洞头区本级": [
      { id: "dq-dist-01", name: "北岙点" },
      { id: "dq-dist-02", name: "东屏点" },
    ],
    "瑞安市本级": [
      { id: "rq-dist-01", name: "安阳点" },
      { id: "rq-dist-02", name: "玉海点" },
    ],
    "乐清市本级": [
      { id: "yq-dist-01", name: "乐成点" },
      { id: "yq-dist-02", name: "城东点" },
    ],
    "永嘉县本级": [
      { id: "yj-dist-01", name: "上塘点" },
      { id: "yj-dist-02", name: "瓯北点" },
    ],
    "平阳县本级": [
      { id: "ps-dist-01", name: "昆阳点" },
      { id: "ps-dist-02", name: "鳌江点" },
    ],
    "苍南县本级": [
      { id: "cn-dist-01", name: "灵溪点" },
      { id: "cn-dist-02", name: "龙港点" },
    ],
    "越城区本级": [
      { id: "yc-dist-01", name: "府城点" },
      { id: "yc-dist-02", name: "迪荡点" },
    ],
    "柯桥区本级": [
      { id: "kq-dist-01", name: "柯桥点" },
      { id: "kq-dist-02", name: "齐贤点" },
    ],
    "上虞区本级": [
      { id: "sy-dist-01", name: "道墟点" },
      { id: "sy-dist-02", name: "曹娥点" },
    ],
    "诸暨市本级": [
      { id: "zj-dist-01", name: "暨阳点" },
      { id: "zj-dist-02", name: "浣东点" },
    ],
    "嵊州市本级": [
      { id: "sz-dist-01", name: "剡湖点" },
      { id: "sz-dist-02", name: "三江点" },
    ],
    "新昌县本级": [
      { id: "xa-dist-01", name: "南明点" },
      { id: "xa-dist-02", name: "羽林点" },
    ],
    "婺城区本级": [
      { id: "wc-dist-01", name: "城南点" },
      { id: "wc-dist-02", name: "城北点" },
    ],
    "义乌市本级": [
      { id: "jy-dist-01", name: "稠城点" },
      { id: "jy-dist-02", name: "江东点" },
    ],
    "金东区本级": [
      { id: "jr-dist-01", name: "多湖点" },
      { id: "jr-dist-02", name: "东孝点" },
    ],
    "东阳市本级": [
      { id: "dw-dist-01", name: "吴宁点" },
      { id: "dw-dist-02", name: "白云点" },
    ],
    "永康市本级": [
      { id: "yj2-dist-01", name: "东城点" },
      { id: "yj2-dist-02", name: "西城点" },
    ],
    "兰溪市本级": [
      { id: "lh-dist-01", name: "兰江点" },
      { id: "lh-dist-02", name: "云山点" },
    ],
    "武义县本级": [
      { id: "ww-dist-01", name: "白洋点" },
      { id: "ww-dist-02", name: "履坦点" },
    ],
    "浦江县本级": [
      { id: "ps2-dist-01", name: "浦阳点" },
      { id: "ps2-dist-02", name: "仙华点" },
    ],
    "磐安县本级": [
      { id: "pm-dist-01", name: "安文点" },
      { id: "pm-dist-02", name: "大盘点" },
    ],
    "南湖区本级": [
      { id: "nh-dist-01", name: "南湖点" },
      { id: "nh-dist-02", name: "新兴点" },
    ],
    "秀洲区本级": [
      { id: "xz-dist-01", name: "秀城点" },
      { id: "xz-dist-02", name: "高照点" },
    ],
    "海宁市本级": [
      { id: "hx-dist-01", name: "硖石点" },
      { id: "hx-dist-02", name: "海昌点" },
    ],
    "桐乡市本级": [
      { id: "tx-dist-01", name: "梧桐点" },
      { id: "tx-dist-02", name: "凤鸣点" },
    ],
    "嘉善县本级": [
      { id: "jp-dist-01", name: "罗星点" },
      { id: "jp-dist-02", name: "魏塘点" },
    ],
    "海盐县本级": [
      { id: "hys-dist-01", name: "武原点" },
      { id: "hys-dist-02", name: "元通点" },
    ],
    "平湖市本级": [
      { id: "px-dist-01", name: "当湖点" },
      { id: "px-dist-02", name: "钟埭点" },
    ],
    "吴兴区本级": [
      { id: "wx-dist-01", name: "爱山点" },
      { id: "wx-dist-02", name: "月河点" },
    ],
    "南浔区本级": [
      { id: "nq-dist-01", name: "南浔点" },
      { id: "nq-dist-02", name: "菱湖点" },
    ],
    "德清县本级": [
      { id: "dc-dist-01", name: "武康点" },
      { id: "dc-dist-02", name: "新市点" },
    ],
    "长兴县本级": [
      { id: "ca2-dist-01", name: "雉城点" },
      { id: "ca2-dist-02", name: "画溪点" },
    ],
    "安吉县本级": [
      { id: "aj-dist-01", name: "递铺点" },
      { id: "aj-dist-02", name: "昌硕点" },
    ],
    "德清县本级": [
      { id: "dc-dist-01", name: "武康点" },
      { id: "dc-dist-02", name: "新市点" },
    ],
    "椒江区本级": [
      { id: "jj-dist-01", name: "海门点" },
      { id: "jj-dist-02", name: "下陈点" },
    ],
    "黄岩区本级": [
      { id: "hy-dist-01", name: "西城点" },
      { id: "hy-dist-02", name: "头陀点" },
    ],
    "路桥区本级": [
      { id: "lq-dist-01", name: "路南点" },
      { id: "lq-dist-02", name: "路北点" },
    ],
    "温岭市本级": [
      { id: "ws-dist-01", name: "太平点" },
      { id: "ws-dist-02", name: "城东点" },
    ],
    "临海市本级": [
      { id: "lh2-dist-01", name: "古城点" },
      { id: "lh2-dist-02", name: "大洋点" },
    ],
    "玉环市本级": [
      { id: "yt-dist-01", name: "玉城点" },
      { id: "yt-dist-02", name: "坎门点" },
    ],
    "三门县本级": [
      { id: "sj-dist-01", name: "海游点" },
      { id: "sj-dist-02", name: "亭旁点" },
    ],
    "天台县本级": [
      { id: "tx2-dist-01", name: "赤城点" },
      { id: "tx2-dist-02", name: "始丰点" },
    ],
    "仙居县本级": [
      { id: "xj-dist-01", name: "南峰点" },
      { id: "xj-dist-02", name: "安洲点" },
    ],
    "柯城区本级": [
      { id: "kc-dist-01", name: "柯城点" },
      { id: "kc-dist-02", name: "华墅点" },
    ],
    "衢江区本级": [
      { id: "qj-dist-01", name: "樟潭点" },
      { id: "qj-dist-02", name: "浮石点" },
    ],
    "江山市本级": [
      { id: "jh2-dist-01", name: "双塔点" },
      { id: "jh2-dist-02", name: "虎山点" },
    ],
    "常山县本级": [
      { id: "ch-dist-01", name: "天马点" },
      { id: "ch-dist-02", name: "金川点" },
    ],
    "开化县本级": [
      { id: "kh-dist-01", name: "芹阳点" },
      { id: "kh-dist-02", name: "城关点" },
    ],
    "龙游县本级": [
      { id: "lt-dist-01", name: "龙洲点" },
      { id: "lt-dist-02", name: "东华点" },
    ],
    "莲都区本级": [
      { id: "ld-dist-01", name: "城东点" },
      { id: "ld-dist-02", name: "碧湖点" },
    ],
    "龙泉市本级": [
      { id: "lq2-dist-01", name: "龙渊点" },
      { id: "lq2-dist-02", name: "剑池点" },
    ],
    "青田县本级": [
      { id: "qy-dist-01", name: "鹤城点" },
      { id: "qy-dist-02", name: "瓯南点" },
    ],
    "云和县本级": [
      { id: "yx2-dist-01", name: "浮云点" },
      { id: "yx2-dist-02", name: "元和点" },
    ],
    "庆元县本级": [
      { id: "qt-dist-01", name: "濛洲点" },
      { id: "qt-dist-02", name: "松源点" },
    ],
    "缙云县本级": [
      { id: "jn-dist-01", name: "五云点" },
      { id: "jn-dist-02", name: "仙都点" },
    ],
    "遂昌县本级": [
      { id: "sj2-dist-01", name: "妙高点" },
      { id: "sj2-dist-02", name: "平昌点" },
    ],
    "松阳县本级": [
      { id: "sl-dist-01", name: "西屏点" },
      { id: "sl-dist-02", name: "望松点" },
    ],
    "景宁县本级": [
      { id: "jn2-dist-01", name: "红星点" },
      { id: "jn2-dist-02", name: "鹤溪点" },
    ],
    "定海区本级": [
      { id: "dh-dist-01", name: "城关点" },
      { id: "dh-dist-02", name: "干览点" },
    ],
    "普陀区本级": [
      { id: "pt-dist-01", name: "沈家门点" },
      { id: "pt-dist-02", name: "东港点" },
    ],
    "岱山县本级": [
      { id: "ds-dist-01", name: "高亭点" },
      { id: "ds-dist-02", name: "衢山点" },
    ],
    "嵊泗县本级": [
      { id: "ss-dist-01", name: "菜园点" },
      { id: "ss-dist-02", name: "嵊山点" },
    ],
  },
  talkingRooms: {
    "省厅第一点": ["省一点-01室", "省一点-02室", "省一点-03室"],
    "省厅第二点": ["省二点-01室", "省二点-02室", "省二点-03室"],
    "省厅第三点": ["省三点-01室", "省三点-02室"],
    "城市社区": ["SC-01室", "SC-02室", "SC-03室"],
    "河东社区": ["HD-01室", "HD-02室"],
    "翠苑街道": ["CY-01室", "CY-02室", "CY-03室"],
    "留下街道": ["LX-01室", "LX-02室"],
    "长河镇": ["CH-01室", "CH-02室", "CH-03室", "CH-04室"],
    "西兴镇": ["XI-01室", "XI-02室", "XI-03室"],
    "浦沿镇": ["PY-01室", "PY-02室"],
    "阳明路点": ["YM-01室", "YM-02室"],
    "市民中心点": ["SM-01室", "SM-02室"],
    "西溪点": ["XC-01室", "XC-02室"],
    "中山路点": ["ZS-01室", "ZS-02室"],
    "江北点": ["JB-01室", "JB-02室"],
    "人民路点": ["RM-01室", "RM-02室"],
    "学院路点": ["XY-01室", "XY-02室"],
    "府山点": ["FS-01室", "FS-02室"],
    "解放路点": ["JF-01室", "JF-02室"],
    "宾虹路点": ["BH-01室", "BH-02室"],
    "婺州点": ["WZ-01室", "WZ-02室"],
    "南湖点": ["NH-01室", "NH-02室"],
    "禾城点": ["HC-01室", "HC-02室"],
    "爱山点": ["AS-01室", "AS-02室"],
    "仁皇点": ["RH-01室", "RH-02室"],
    "椒江点": ["JJ-01室", "JJ-02室"],
    "海门点": ["HM-01室", "HM-02室"],
    "柯城点": ["KC-01室", "KC-02室"],
    "莲都点": ["LD-01室", "LD-02室"],
    "大洋路点": ["DY-01室", "DY-02室"],
    "定海点": ["DH-01室", "DH-02室"],
    "普陀点": ["PT-01室", "PT-02室"],
    "望江点": ["WJ-01室", "WJ-02室"],
    "清波点": ["QB-01室", "QB-02室"],
    "北山点": ["BS-01室", "BS-02室"],
    "文新点": ["WN-01室", "WN-02室"],
    "长河路点": ["CHL-01室", "CHL-02室"],
    "江南大道点": ["JN-01室", "JN-02室"],
    "祥符点": ["XF-01室", "XF-02室"],
    "湖墅点": ["HS-01室", "HS-02室"],
    "临平点": ["LP-01室", "LP-02室"],
    "仓前点": ["CQ-01室", "CQ-02室"],
    "锦城点": ["JC-01室", "JC-02室"],
    "玲珑点": ["LL-01室", "LL-02室"],
    "桐君点": ["TJ-01室", "TJ-02室"],
    "富春点": ["FCh-01室", "FCh-02室"],
    "千岛湖点": ["QDH-01室", "QDH-02室"],
    "文昌点": ["WCh-01室", "WCh-02室"],
    "新安江点": ["XAJ-01室", "XAJ-02室"],
    "洋溪点": ["YXi-01室", "YXi-02室"],
    "兰江点": ["LJ-01室", "LJ-02室"],
    "阳明点": ["YMi-01室", "YMi-02室"],
    "浒山点": ["HS-01室", "HS-02室"],
    "古塘点": ["GT-01室", "GT-02室"],
    "跃龙点": ["YLo-01室", "YLo-02室"],
    "桃源点": ["TY-01室", "TY-02室"],
    "丹城点": ["DCh-01室", "DCh-02室"],
    "石浦点": ["SP-01室", "SP-02室"],
    "北岙点": ["BA-01室", "BA-02室"],
    "东屏点": ["DP-01室", "DP-02室"],
    "安阳点": ["AY-01室", "AY-02室"],
    "玉海点": ["YHai-01室", "YHai-02室"],
    "乐成点": ["LCh-01室", "LCh-02室"],
    "城东点": ["CDo-01室", "CDo-02室"],
    "上塘点": ["ST-01室", "ST-02室"],
    "瓯北点": ["OB-01室", "OB-02室"],
    "昆阳点": ["KY-01室", "KY-02室"],
    "鳌江点": ["AJ-01室", "AJ-02室"],
    "灵溪点": ["LXi-01室", "LXi-02室"],
    "龙港点": ["LG-01室", "LG-02室"],
    "暨阳点": ["JY-01室", "JY-02室"],
    "浣东点": ["HD-01室", "HD-02室"],
    "剡湖点": ["SH-01室", "SH-02室"],
    "三江点": ["SJi-01室", "SJi-02室"],
    "南明点": ["NM-01室", "NM-02室"],
    "羽林点": ["YuL-01室", "YuL-02室"],
    "多湖点": ["DH-01室", "DH-02室"],
    "东孝点": ["DX-01室", "DX-02室"],
    "吴宁点": ["WN-01室", "WN-02室"],
    "白云点": ["BY-01室", "BY-02室"],
    "东城点": ["DCi-01室", "DCi-02室"],
    "西城点": ["XCt-01室", "XCt-02室"],
    "兰江点": ["LJi-01室", "LJi-02室"],
    "云山点": ["YS-01室", "YS-02室"],
    "白洋点": ["BYa-01室", "BYa-02室"],
    "履坦点": ["LT-01室", "LT-02室"],
    "浦阳点": ["PY-01室", "PY-02室"],
    "仙华点": ["XHu-01室", "XHu-02室"],
    "安文点": ["AW-01室", "AW-02室"],
    "大盘点": ["DP-01室", "DP-02室"],
    "硖石点": ["XS-01室", "XS-02室"],
    "海昌点": ["HCh-01室", "HCh-02室"],
    "梧桐点": ["WT-01室", "WT-02室"],
    "凤鸣点": ["FM-01室", "FM-02室"],
    "罗星点": ["LXin-01室", "LXin-02室"],
    "魏塘点": ["WT-01室", "WT-02室"],
    "武原点": ["WY-01室", "WY-02室"],
    "元通点": ["YTo-01室", "YTo-02室"],
    "当湖点": ["DH-01室", "DH-02室"],
    "钟埭点": ["ZD-01室", "ZD-02室"],
    "南浔点": ["NX-01室", "NX-02室"],
    "菱湖点": ["LH-01室", "LH-02室"],
    "雉城点": ["ZC-01室", "ZC-02室"],
    "画溪点": ["HX-01室", "HX-02室"],
    "递铺点": ["DP-01室", "DP-02室"],
    "昌硕点": ["CS-01室", "CS-02室"],
    "路南点": ["LN-01室", "LN-02室"],
    "路北点": ["LB-01室", "LB-02室"],
    "太平点": ["TP-01室", "TP-02室"],
    "古城点": ["GC-01室", "GC-02室"],
    "大洋点": ["DYa-01室", "DYa-02室"],
    "玉城点": ["YC-01室", "YC-02室"],
    "坎门点": ["KM-01室", "KM-02室"],
    "海游点": ["HY-01室", "HY-02室"],
    "亭旁点": ["TP-01室", "TP-02室"],
    "赤城点": ["CCh-01室", "CCh-02室"],
    "始丰点": ["SF-01室", "SF-02室"],
    "南峰点": ["NF-01室", "NF-02室"],
    "安洲点": ["AZ-01室", "AZ-02室"],
    "樟潭点": ["ZT-01室", "ZT-02室"],
    "浮石点": ["FSh-01室", "FSh-02室"],
    "双塔点": ["STa-01室", "STa-02室"],
    "虎山点": ["HSh-01室", "HSh-02室"],
    "天马点": ["TM-01室", "TM-02室"],
    "金川点": ["JCh-01室", "JCh-02室"],
    "芹阳点": ["QYa-01室", "QYa-02室"],
    "龙洲点": ["LZh-01室", "LZh-02室"],
    "东华点": ["DHu-01室", "DHu-02室"],
    "龙渊点": ["LYu-01室", "LYu-02室"],
    "剑池点": ["JCh-01室", "JCh-02室"],
    "鹤城点": ["HCi-01室", "HCi-02室"],
    "瓯南点": ["ON-01室", "ON-02室"],
    "浮云点": ["FY-01室", "FY-02室"],
    "元和点": ["YH-01室", "YH-02室"],
    "濛洲点": ["MZ-01室", "MZ-02室"],
    "松源点": ["SY-01室", "SY-02室"],
    "五云点": ["WYu-01室", "WYu-02室"],
    "仙都点": ["XD-01室", "XD-02室"],
    "妙高点": ["MG-01室", "MG-02室"],
    "平昌点": ["PCh-01室", "PCh-02室"],
    "西屏点": ["XP-01室", "XP-02室"],
    "望松点": ["WSo-01室", "WSo-02室"],
    "红星点": ["HXi-01室", "HXi-02室"],
    "鹤溪点": ["HX-01室", "HX-02室"],
    "沈家门点": ["SJM-01室", "SJM-02室"],
    "东港点": ["DGa-01室", "DGa-02室"],
    "高亭点": ["GT-01室", "GT-02室"],
    "衢山点": ["QS-01室", "QS-02室"],
    "菜园点": ["CY-01室", "CY-02室"],
    "嵊山点": ["SSh-01室", "SSh-02室"],
  }
}

// ---- warningList 生成器 ----
const _TYPES = ['001','002','003','004','005','006','007'];
const _STATUSES = ['未标注','未标注','未标注','已标注-非误报','已标注-误报'];
const _CONTENTS = {
  '001': ['多次使用侮辱性言语攻击他人','连续发送辱骂信息','使用歧视性言论，辱骂对方'],
  '002': ['向对方发出人身威胁','以曝光隐私相威胁','威胁对方家人安全'],
  '003': ['未充分告知权利义务','未告知调查程序及理由','告知程序不完整'],
  '004': ['引导对方作虚假陈述','诱导对方虚假证词','指供诱供，引导虚假表述'],
  '005': ['做出超出权限的承诺','违规承诺减轻处罚','超权限许诺对方利益'],
  '006': ['对方基本权益被侵害','权益未得到充分保障','基本权利受到侵害'],
  '007': ['对方表现出自伤自杀倾向','情绪崩溃，有自伤意图','心理危机迹象，需紧急干预'],
  '008': ['其他违规行为被检测到','异常对话情况','其他类型预警触发'],
};
const _DATES = [
  '2026-08-14','2026-08-15','2026-08-16','2026-08-17',
  '2026-08-18','2026-08-19','2026-08-20',
];
const _HOURS = ['08','09','10','11','12','13','14','15','16','17'];

function _genWarningList() {
  const entries = [];
  let n = 1;
  const reviewers = ['管理员', '审核员', '复核员', '监督员'];

  function push(city, district, town, room) {
    // generate 3 entries per room, cycling through types/statuses
    for (let i = 0; i < 3; i++) {
      const typeCode = _TYPES[(n + i) % _TYPES.length];
      const status = _STATUSES[(n + i) % _STATUSES.length];
      const date = _DATES[(n + i) % _DATES.length];
      const hour = _HOURS[(n + i) % _HOURS.length];
      const min = String(((n * 7 + i * 13) % 60)).padStart(2, '0');
      const sec = String(((n * 3 + i * 17) % 60)).padStart(2, '0');

      // 复核状态：约40%未复核，30%正确预警，30%误报
      const reviewRand = (n + i) % 10;
      let reviewStatus, reviewPerson, reviewTime, reviewOpinion;
      if (reviewRand < 4) {
        reviewStatus = '未复核';
        reviewPerson = '';
        reviewTime = '';
        reviewOpinion = '';
      } else if (reviewRand < 7) {
        reviewStatus = '正确预警';
        reviewPerson = reviewers[(n + i) % reviewers.length];
        const reviewDate = _DATES[Math.max(0, (n + i) % _DATES.length - 1)];
        const reviewHour = String(parseInt(hour) - 1).padStart(2, '0');
        reviewTime = `${reviewDate} ${reviewHour}:${min}:${sec}`;
        reviewOpinion = ['已确认，情节严重', '确认属实', '核实无误', ''][(n + i) % 4];
      } else {
        reviewStatus = '误报';
        reviewPerson = reviewers[(n + i + 1) % reviewers.length];
        const reviewDate = _DATES[Math.max(0, (n + i) % _DATES.length - 1)];
        const reviewHour = String(parseInt(hour) - 1).padStart(2, '0');
        reviewTime = `${reviewDate} ${reviewHour}:${min}:${sec}`;
        reviewOpinion = ['虚假举报', '系统误判', '正常对话', ''][(n + i) % 4];
      }

      entries.push({
        id: `W${String(n).padStart(4, '0')}`,
        time: `${date} ${hour}:${min}:${sec}`,
        location: `浙江/${city}/${district}`,
        town,
        talkingRoom: room,
        type: typeCode,
        typeName: WARNING_TYPES[typeCode],
        misreportTag: status === '已标注-误报',
        status,
        content: _CONTENTS[typeCode][(n + i) % _CONTENTS[typeCode].length],
        audio: `/audio/warning-${String(n).padStart(4, '0')}.mp3`,
        reviewStatus,
        reviewPerson,
        reviewTime,
        reviewOpinion,
      });
      n++;
    }
  }

  // 省本级
  (AREA_DATA.towns['浙江省本级'] || []).forEach(point => {
    (AREA_DATA.talkingRooms[point.name] || []).forEach(room => {
      push('浙江省本级', '浙江省本级', point.name, room);
    });
  });

  // 市本级
  AREA_DATA.cities.forEach(city => {
    const cityLevelKey = `${city.name}本级`;
    (AREA_DATA.towns[cityLevelKey] || []).forEach(point => {
      (AREA_DATA.talkingRooms[point.name] || []).forEach(room => {
        push(city.name, cityLevelKey, point.name, room);
      });
    });
  });

  // 区县（含区本级和下辖乡镇）
  AREA_DATA.cities.forEach(city => {
    (AREA_DATA.districts[city.name] || []).forEach(district => {
      // 区本级 —— town 字段标为 "${district}本级"，room 来自区本级谈话点
      const distLevelKey = `${district.name}本级`;
      (AREA_DATA.towns[distLevelKey] || []).forEach(point => {
        (AREA_DATA.talkingRooms[point.name] || []).forEach(room => {
          push(city.name, district.name, distLevelKey, room);
        });
      });
      // 下辖乡镇/街道
      (AREA_DATA.towns[district.name] || []).forEach(town => {
        (AREA_DATA.talkingRooms[town.name] || []).forEach(room => {
          push(city.name, district.name, town.name, room);
        });
      });
    });
  });

  return entries;
}

export const warningList = _genWarningList();

// 统计汇总数据
export const statistics = {
  totalWarnings: warningList.length,
  misreportCount: warningList.filter(w => w.status === '已标注-误报').length,
  trend7days: [
    { date: "8.14", count: 145 },
    { date: "8.15", count: 152 },
    { date: "8.16", count: 148 },
    { date: "8.17", count: 165 },
    { date: "8.18", count: 172 },
    { date: "8.19", count: 156 },
    { date: "8.20", count: 134 },
  ],
}

export const trend30days = [
  { date: "7.22", count: 145 }, { date: "7.23", count: 152 },
  { date: "7.24", count: 148 }, { date: "7.25", count: 165 },
  { date: "7.26", count: 172 }, { date: "7.27", count: 156 },
  { date: "7.28", count: 134 }, { date: "7.29", count: 168 },
  { date: "7.30", count: 175 }, { date: "7.31", count: 162 },
  { date: "8.01", count: 158 }, { date: "8.02", count: 145 },
  { date: "8.03", count: 152 }, { date: "8.04", count: 161 },
  { date: "8.05", count: 173 }, { date: "8.06", count: 168 },
  { date: "8.07", count: 156 }, { date: "8.08", count: 147 },
  { date: "8.09", count: 163 }, { date: "8.10", count: 175 },
  { date: "8.11", count: 168 }, { date: "8.12", count: 152 },
  { date: "8.13", count: 165 }, { date: "8.14", count: 145 },
  { date: "8.15", count: 152 }, { date: "8.16", count: 148 },
  { date: "8.17", count: 165 }, { date: "8.18", count: 172 },
  { date: "8.19", count: 156 }, { date: "8.20", count: 134 },
];

export const trend90days = (() => {
  const base = [
    145,152,148,165,172,156,134,168,175,162,
    158,145,152,161,173,168,156,147,163,175,
    168,152,165,145,152,148,165,172,156,134,
    140,155,160,170,165,158,145,162,175,168,
    155,148,160,172,165,158,145,163,175,168,
    152,145,158,170,165,162,148,155,168,175,
    162,148,155,170,165,158,145,163,175,168,
    152,145,158,170,162,155,148,163,172,165,
    158,145,162,172,168,155,148,163,175,168,
  ];
  const months = ['5.22','5.23','5.24','5.25','5.26','5.27','5.28','5.29','5.30','5.31',
    '6.01','6.02','6.03','6.04','6.05','6.06','6.07','6.08','6.09','6.10',
    '6.11','6.12','6.13','6.14','6.15','6.16','6.17','6.18','6.19','6.20',
    '6.21','6.22','6.23','6.24','6.25','6.26','6.27','6.28','6.29','6.30',
    '7.01','7.02','7.03','7.04','7.05','7.06','7.07','7.08','7.09','7.10',
    '7.11','7.12','7.13','7.14','7.15','7.16','7.17','7.18','7.19','7.20',
    '7.21','7.22','7.23','7.24','7.25','7.26','7.27','7.28','7.29','7.30',
    '7.31','8.01','8.02','8.03','8.04','8.05','8.06','8.07','8.08','8.09',
    '8.10','8.11','8.12','8.13','8.14','8.15','8.16','8.17','8.18','8.19',
  ];
  return months.map((date, i) => ({ date, count: base[i] || 150 }));
})();
