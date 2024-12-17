import type { TravelDetails, ChecklistItem } from '../types';

// 基础必需品
const ESSENTIAL_ITEMS: ChecklistItem[] = [
  { id: 'e1', name: '护照/身份证', category: 'documents', checked: false },
  { id: 'e2', name: '现金/信用卡', category: 'documents', checked: false },
  { id: 'e3', name: '手机/充电器', category: 'electronics', checked: false },
  { id: 'e4', name: '保险证明', category: 'documents', checked: false },
];

// 季节性物品映射
const CLIMATE_ITEMS: Record<string, ChecklistItem[]> = {
  cold: [
    { id: 'c1', name: '羽绒服/厚外套', category: 'clothing', checked: false },
    { id: 'c2', name: '保暖内衣套装 x 2套', category: 'clothing', checked: false },
    { id: 'c3', name: '围巾/手套/帽子', category: 'accessories', checked: false },
    { id: 'c4', name: '保温水壶', category: 'accessories', checked: false },
  ],
  hot: [
    { id: 'h1', name: '防晒霜', category: 'toiletries', checked: false },
    { id: 'h2', name: '太阳镜', category: 'accessories', checked: false },
    { id: 'h3', name: '遮阳帽', category: 'accessories', checked: false },
    { id: 'h4', name: '驱蚊喷雾', category: 'toiletries', checked: false },
  ],
  tropical: [
    { id: 't1', name: '防水包', category: 'accessories', checked: false },
    { id: 't2', name: '雨伞/雨衣', category: 'accessories', checked: false },
    { id: 't3', name: '防潮袋', category: 'accessories', checked: false },
  ],
  moderate: [
    { id: 'm1', name: '轻薄外套', category: 'clothing', checked: false },
    { id: 'm2', name: '长袖衣物 x 2件', category: 'clothing', checked: false },
  ],
};

// 活动特定物品
const ACTIVITY_ITEMS: Record<string, ChecklistItem[]> = {
  Beach: [
    { id: 'b1', name: '泳衣/泳裤 x 2套', category: 'clothing', checked: false },
    { id: 'b2', name: '沙滩毛巾', category: 'accessories', checked: false },
    { id: 'b3', name: '防水相机', category: 'electronics', checked: false },
    { id: 'b4', name: '沙滩拖鞋', category: 'footwear', checked: false },
  ],
  Hiking: [
    { id: 'h1', name: '登山鞋', category: 'footwear', checked: false },
    { id: 'h2', name: '登山杖', category: 'equipment', checked: false },
    { id: 'h3', name: '急救包', category: 'health', checked: false },
    { id: 'h4', name: '指南针/地图', category: 'equipment', checked: false },
  ],
  'City Tours': [
    { id: 'ct1', name: '舒适步行鞋', category: 'footwear', checked: false },
    { id: 'ct2', name: '相机/充电宝', category: 'electronics', checked: false },
    { id: 'ct3', name: '城市地图', category: 'documents', checked: false },
  ],
  Business: [
    { id: 'bu1', name: '正装/西装 x 2套', category: 'clothing', checked: false },
    { id: 'bu2', name: '商务笔记本', category: 'equipment', checked: false },
    { id: 'bu3', name: '名片', category: 'documents', checked: false },
  ],
  'Winter Sports': [
    { id: 'ws1', name: '滑雪服 x 2套', category: 'clothing', checked: false },
    { id: 'ws2', name: '防水手套', category: 'accessories', checked: false },
    { id: 'ws3', name: '护目镜', category: 'equipment', checked: false },
  ],
};

// 根据天数计算衣物数量
const calculateClothingQuantity = (days: number): ChecklistItem[] => {
  const items: ChecklistItem[] = [];
  
  // 计算内衣和袜子数量：天数 + 2（备用）
  const underwearCount = days + 2;
  
  // 计算上衣数量：每2天一件 + 2件备用
  const topsCount = Math.ceil(days / 2) + 2;
  
  // 计算裤子数量：每3天一条 + 1条备用
  const pantsCount = Math.ceil(days / 3) + 1;

  items.push(
    { 
      id: `cq1`,
      name: `内衣 x ${underwearCount}件（含备用）`,
      category: 'clothing',
      checked: false 
    },
    { 
      id: `cq2`,
      name: `袜子 x ${underwearCount}双（含备用）`,
      category: 'clothing',
      checked: false 
    },
    { 
      id: `cq3`,
      name: `上衣 x ${topsCount}件（含备用）`,
      category: 'clothing',
      checked: false 
    },
    { 
      id: `cq4`,
      name: `裤子 x ${pantsCount}条（含备用）`,
      category: 'clothing',
      checked: false 
    }
  );

  // 如果旅行超过4天，添加洗衣建议
  if (days > 4) {
    items.push(
      { 
        id: 'cq5',
        name: '便携洗衣液',
        category: 'toiletries',
        checked: false 
      },
      { 
        id: 'cq6',
        name: '便携晾衣绳',
        category: 'accessories',
        checked: false 
      }
    );
  }

  return items;
};

// 智能生成行李清单
export const generateSmartChecklist = (details: TravelDetails): ChecklistItem[] => {
  let items: ChecklistItem[] = [...ESSENTIAL_ITEMS];

  // 添加基础衣物
  items = [...items, ...calculateClothingQuantity(details.days)];

  // 添加气候相关物品
  if (details.climate && CLIMATE_ITEMS[details.climate]) {
    items = [...items, ...CLIMATE_ITEMS[details.climate]];
  }

  // 添加活动相关物品
  if (details.activities) {
    details.activities.forEach(activity => {
      if (ACTIVITY_ITEMS[activity]) {
        items = [...items, ...ACTIVITY_ITEMS[activity]];
      }
    });
  }

  return items;
};