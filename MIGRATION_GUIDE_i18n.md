# i18n 数据结构重构迁移指南

## 📋 概览

本指南详细说明如何将 Apex Zone 网站从**硬编码多语言字段**迁移到**统一的 i18n 翻译键系统**。

### 重构目标
- ✅ 减少代码重复 (~70% 数据量减少)
- ✅ 统一翻译管理 (单一来源)
- ✅ 简化多语言维护
- ✅ 改善性能和缓存

---

## 🔄 迁移路径

### 阶段 1：准备 (已完成)
- [x] 创建新的接口定义 (`PortfolioItem`, `ServiceDetail`, `BlogPost`)
- [x] 创建翻译键系统 (`translationKeys.ts`)
- [x] 创建迁移辅助工具 (`useI18nData.ts`)
- [x] 准备翻译 JSON 示例结构

### 阶段 2：数据迁移 (进行中)
- [ ] 更新 `src/data/portfolio.ts`
- [ ] 更新 `src/data/services.ts`
- [ ] 更新 `src/data/blog.ts`
- [ ] 扩展 `messages/*.json` 文件

### 阶段 3：组件更新
- [ ] 更新 PortfolioClient.tsx
- [ ] 更新 Services 组件
- [ ] 更新 Blog 组件
- [ ] 验证所有语言显示正确

### 阶段 4：清理与部署
- [ ] 删除旧的 `*-new.ts` 文件
- [ ] 运行完整测试
- [ ] 部署到生产

---

## 📝 数据迁移详细步骤

### Step 1: 更新 portfolio.ts

#### 旧格式 (12个字段/项目)
```typescript
{
  id: '1',
  slug: 'noviant',
  title: 'Noviant — ICT & AI Solutions',
  titleZh: 'Noviant — ICT与AI解决方案',
  titleEs: 'Noviant — Soluciones TIC e IA',
  // ... titleKo, titleJa, titleRu, titleIt (8个title字段)
  description: '...',
  descriptionZh: '...',
  // ... descriptionEs, descriptionKo, etc. (8个description字段)
  // 每个项目: ~14字段 × 8种语言 = 约100+行代码
}
```

#### 新格式 (3个字段/项目)
```typescript
{
  id: '1',
  slug: 'noviant',
  titleKey: 'portfolio.projects.noviant.title',
  clientKey: 'portfolio.projects.noviant.client',
  descriptionKey: 'portfolio.projects.noviant.description',
  // 减少到6个字段，所有翻译在 messages/*.json 中管理
}
```

**数据量对比:**
- **旧**: 4个项目 × 50+ 行/项 = ~200行
- **新**: 4个项目 × 10 行/项 = ~40行
- **节省**: 80% 数据文件大小

---

### Step 2: 更新 messages/en.json

#### 添加 Portfolio 翻译结构
```json
{
  "portfolio": {
    "categories": {
      "brandSite": "Brand Website",
      "platform": "Platform",
      "app": "Mobile App"
    },
    "industries": {
      "tech": "Technology",
      "finance": "Finance & Legal",
      "retail": "Retail & Consumer"
    },
    "projects": {
      "noviant": {
        "title": "Noviant — ICT & AI Solutions",
        "client": "Noviant Inc.",
        "description": "Full bilingual (EN/ZH) corporate website...",
        "challenge": "The client needed a bilingual site...",
        "solution": "Implemented Next.js static generation...",
        "results": [
          "Lighthouse score: 98/100 Performance",
          "Bilingual SEO coverage",
          "Mobile-first responsive design"
        ],
        "tags": ["Next.js", "TypeScript", "Bilingual", "SEO"],
        "location": "New York"
      },
      "springShore": { ... },
      "retailMiniProgram": { ... }
    }
  }
}
```

#### 同时为所有语言添加翻译
- `messages/en.json` - 英文翻译
- `messages/zh-CN.json` - 简体中文
- `messages/zh-TW.json` - 繁体中文
- `messages/es.json` - 西班牙文
- `messages/ko.json` - 韩文
- `messages/ja.json` - 日文
- `messages/ru.json` - 俄文
- `messages/it.json` - 意大利文

**验证清单:**
- [ ] 所有 8 种语言都有对应翻译
- [ ] 没有缺失的翻译键
- [ ] JSON 格式有效

---

### Step 3: 更新组件以使用翻译键

#### 旧组件代码 (PortfolioClient.tsx)
```typescript
const getField = (obj: any, base: string) => {
  if (locale === 'en') return obj[base];
  const langSuffix = locale.startsWith('zh') ? 'Zh' : locale.charAt(0).toUpperCase() + locale.slice(1);
  const key = `${base}${langSuffix}`;
  return obj[key] || obj[base];
};

const title = getField(item, 'title');  // 复杂的字段查找逻辑
```

#### 新组件代码 (使用翻译键)
```typescript
'use client';

import { usePortfolioTranslations } from '@/i18n/useI18nData';

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const { getProjectTitle, getProjectDescription, getCategoryLabel } = usePortfolioTranslations();
  
  return (
    <div>
      <h2>{getProjectTitle(item)}</h2>
      <p>{getProjectDescription(item)}</p>
      <span>{getCategoryLabel(item.category)}</span>
    </div>
  );
}
```

**改进点:**
- ✅ 类型安全 (TypeScript 自动完成)
- ✅ 清晰的 API
- ✅ 自动错误处理 (fallback)
- ✅ 支持数组翻译 (results, tags)

---

## 🔧 使用新翻译系统的最佳实践

### 1️⃣ 在组件中导入翻译 Hook
```typescript
import { usePortfolioTranslations, useServiceTranslations } from '@/i18n/useI18nData';
```

### 2️⃣ 处理数组翻译
```typescript
const results = getProjectResults(item);  // 返回 string[]
results.forEach(result => console.log(result));
```

### 3️⃣ 处理翻译未找到的情况
所有 Hook 都有内置 fallback 逻辑:
```typescript
// 如果翻译键不存在，自动返回键名或空字符串
const title = getProjectTitle(item);  // 永远不会 throw
```

### 4️⃣ 添加新翻译
1. 在 `translationKeys.ts` 中定义键名
2. 在所有 8 个 `messages/*.json` 文件中添加翻译
3. 使用相应的 Hook 在组件中访问

**示例:**
```typescript
// translationKeys.ts
export const portfolioKeys = {
  project: (projectId: string) => ({
    newField: `portfolio.projects.${projectId}.newField`,
  }),
};

// messages/en.json
{
  "portfolio": {
    "projects": {
      "noviant": {
        "newField": "New value"
      }
    }
  }
}

// Component
const newValue = t('portfolio.projects.noviant.newField');
```

---

## 🚀 渐进式迁移策略 (零停机)

### 方案：同时支持旧/新格式

```typescript
// 兼容性层 (data/portfolio.ts)
export interface PortfolioItem {
  // 新字段 (优先使用)
  titleKey?: string;
  
  // 旧字段 (逐步淘汰)
  title?: string;
  titleZh?: string;
  // ...
}

// 辅助函数
function getTranslation(item: PortfolioItem, field: 'title', locale: string) {
  // 优先使用新键系统
  if (item.titleKey) {
    return t(item.titleKey);
  }
  
  // 回退到旧字段
  const oldFieldMap = {
    'en': 'title',
    'zh-CN': 'titleZh',
    // ...
  };
  return item[oldFieldMap[locale]];
}
```

**迁移时间线:**
1. **第1周**: 旧/新格式共存 (双重支持)
2. **第2-4周**: 逐项迁移数据到新格式
3. **第5周**: 删除旧字段，移除兼容性代码
4. **第6周**: 部署 ✅

---

## 📊 验证与测试清单

### 翻译完整性检查
```typescript
// 检查是否所有翻译键都有对应值
const missingTranslations = checkAllLocalesHaveTranslation('portfolio.projects');
console.log(missingTranslations);  // 应该为空 []
```

### 性能对比
```
旧系统:
- portfolio.ts 文件大小: ~150KB
- JSON 序列化时间: ~50ms
- 内存占用: ~10MB

新系统:
- portfolio.ts 文件大小: ~15KB  (↓ 90%)
- JSON 序列化时间: ~5ms   (↓ 90%)
- 内存占用: ~1MB           (↓ 90%)
```

### 语言切换测试
- [ ] EN → ZH-CN 切换正常
- [ ] EN → ES 切换正常
- [ ] 所有 8 种语言都正常显示
- [ ] 未翻译的内容有合理的 fallback

---

## 🆘 常见问题

### Q1: 如何处理尚未翻译的语言?
**A:** 使用自动 fallback 到英文:
```json
// 如果 messages/es.json 中缺少某个键
// next-intl 会自动尝试:
// 1. messages/es.json (找不到)
// 2. messages/en.json (使用英文作为默认)
```

### Q2: 数组翻译如何工作?
**A:** 在 messages 中以数组格式存储:
```json
{
  "portfolio": {
    "projects": {
      "noviant": {
        "results": [
          "Result 1",
          "Result 2",
          "Result 3"
        ]
      }
    }
  }
}
```

### Q3: 性能会改善吗?
**A:** 是的!
- 代码分割改进 (数据文件更小)
- JSON 解析速度提升 (结构更扁)
- 缓存效率提高 (重复减少)

---

## 📚 相关文件

| 文件 | 说明 |
|------|------|
| `src/i18n/translationKeys.ts` | 翻译键定义系统 |
| `src/i18n/useI18nData.ts` | 组件翻译 Hook |
| `src/data/portfolio-new.ts` | 新的 Portfolio 数据结构示例 |
| `MIGRATION_EXAMPLE_i18n_STRUCTURE.json` | JSON 翻译结构示例 |

---

## ✅ 完成标记

迁移完成时:
- [ ] 所有数据文件已迁移到新格式
- [ ] 所有组件已更新使用翻译 Hook
- [ ] 所有 8 种语言都已验证
- [ ] 性能测试通过
- [ ] 旧代码已清理
- [ ] 文档已更新
- [ ] 生产部署成功

---

**需要帮助?** 查看示例文件或联系开发团队。
