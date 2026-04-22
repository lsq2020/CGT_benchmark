// 常量定义
export const DIFFICULTIES = [
    { value: "L1", label: "L1 基础知识检索", desc: "查询 Uniprot / PDB / 经典概念等" },
    { value: "L2", label: "L2 单任务序列/结构分析", desc: "同源建模、保守位点、二级结构预测" },
    { value: "L3", label: "L3 简单功能设计与预测", desc: "单点突变、结合位点、催化位点" },
    { value: "L4", label: "L4 多步骤理性设计", desc: "酶底物改造、多靶点设计、稳定性" },
    { value: "L5", label: "L5 复杂系统级设计", desc: "蛋白组、复合物、动态构象" },
];

export const DOMAINS = [
    "蛋白质序列设计",
    "蛋白质结构预测与建模",
    "蛋白质功能改造与设计",
    "蛋白质-配体相互作用设计",
    "多蛋白复合物与系统设计",
    "AI辅助蛋白质设计方法",
];

export const SOURCE_TYPES = ["原创", "文献改编", "教材改编", "数据库条目改编"];

export const STATUS_META = {
    pending: { label: "待审核", cls: "badge-pending", emoji: "⏳" },
    approved: { label: "已审核", cls: "badge-approved", emoji: "✅" },
    needs_revision: { label: "需修改", cls: "badge-needs_revision", emoji: "⚠️" },
};

export const PRESET_REVISION_REASONS = [
    "题目描述不清晰",
    "采分点设置违规",
    "参考答案错误/不完整",
    "溯源信息缺失",
    "领域不符",
    "其他",
];
