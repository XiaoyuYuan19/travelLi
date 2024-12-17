export default {
  app: {
    title: '智能行李清单',
    subtitle: '让AI帮你规划完美旅程',
    saveTrip: '保存行程',
    savedTrips: '已保存行程',
    editTrip: '编辑行程',
  },

  form: {
    destination: {
      label: '目的地',
      placeholder: '输入城市名称或选择热门城市...',
    },
    days: {
      label: '出行天数',
      unit: '天',
    },
    purpose: {
      label: '出行目的',
      placeholder: '请描述具体的出行目的...',
      types: {
        business: '商务出差',
        leisure: '休闲度假',
        study: '学习考察',
        family: '探亲访友',
        adventure: '探险冒险',
      },
    },
    accommodation: {
      label: '住宿方式',
      types: {
        hotel: '酒店',
        hostel: '青旅',
        apartment: '公寓',
        camping: '露营',
        other: '其他',
      },
    },
    transportation: {
      label: '主要交通方式',
      types: {
        walk: '步行',
        public: '公共交通',
        car: '自驾/租车',
        bike: '自行车',
      },
    },
    activities: {
      label: '计划活动',
      add: '添加活动',
      name: '活动名称',
      description: '活动描述',
      duration: '预计时长（小时）',
      delete: '删除',
    },
    submit: '智能生成清单',
    generating: '生成中...',
  },

  weather: {
    title: {
      week: '未来7天天气预报',
      full: '未来14天天气预报',
    },
    showMore: '查看更多',
    showLess: '收起',
    stats: {
      avgTemp: '平均温度',
      tempRange: '温度范围',
      rainDays: '降雨天数',
      rainChance: '降雨概率',
    },
    details: {
      days:'天',
      humidity: '湿度',
      uv: {
        label: '紫外线',
        low: '低',
        moderate: '中等',
        high: '高',
        extreme: '极高',
      },
      sunrise: '日出',
      sunset: '日落',
    },
    analysis: {
      title: '天气趋势分析',
      warm: '偏暖',
      cool: '偏凉',
      hot: '天气较热，请注意防暑降温。',
      cold: '天气较冷，请注意保暖。',
      template: '{{city}}未来{{days}}天天气总体{{temp}}，温度在{{min}}°C至{{max}}°C之间波动。预计有{{rainDays}}天可能降雨，建议携带雨具。{{extra}}',
    },
    tip: '* 点击天气卡片查看更多详细信息',
  },

  modals: {
    save: {
      title: '保存行程',
      name: '行程名称',
      placeholder: '例如：东京五日游',
      cancel: '取消',
      confirm: '保存',
    },
    share: {
      title: '分享行程',
      description: '复制以下链接分享给好友：',
      copy: '复制',
      copied: '已复制',
    },
    savedTrips: {
      title: '已保存的行程',
      empty: '还没有保存的行程',
      load: '加载此行程',
      share: '分享',
      delete: '删除',
    },
  },

  loading: {
    generating: '正在为您生成智能行李清单...',
    complete: '清单生成完成！',
  },

  categories: {
    documents: '证件文件',
    clothing: '衣物',
    electronics: '电子设备',
    toiletries: '洗漱用品',
    accessories: '配件',
    health: '医疗健康',
    equipment: '装备',
    progress: '{{completed}}/{{total}}',
  },

  priorities: {
    essential: '必需',
    recommended: '推荐',
    optional: '可选',
  },

  common: {
    error: '出错了，请稍后重试',
    delete: '删除',
    toggleItem: '切换选中状态',
    itemCount: '{{count}}项',
    addCustomItem: '添加自定义物品',
    customItemName: '物品名称',
    customItemCategory: '分类',
    customItemPriority: '优先级',
    customItemNotes: '备注',
    searchError: '搜索失败',
    searching: '搜索中...',
    popularCities: '热门城市',
    selectLocation: '请从列表中选择一个地点',
  },
  statistics: {
    progress: '打包进度',
    packedItems: '已打包: {{packedItems}} / {{totalItems}} 项',
    percent: '%',
    packed: '已打包',
    pending: '待打包',
  },
};