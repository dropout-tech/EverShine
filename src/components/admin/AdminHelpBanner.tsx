import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Lightbulb } from 'lucide-react';

const STEPS = [
    {
        title: '1. 會員資料',
        body: '左側選單「會員管理 → 會員名單」可搜尋、新增會員。點「編輯」會開啟完整編輯頁（與會員自己改資料同一套表單）。儲存後首頁與會員牆會自動更新。',
    },
    {
        title: '2. 引薦案例',
        body: '「引薦管理 → 引薦案例」用表單新增案例；列表可「編輯」或刪除。引薦人／被引薦人請從會員名錄選，網站才能自動帶入頭像與產業。',
    },
    {
        title: '3. 首頁數字',
        body: '「引薦管理 → 每月成果」可更新每月引薦單數、引薦金額（元）與來賓人數。選對月份後按儲存，首頁引薦成果圖表會顯示這筆資料。',
    },
    {
        title: '4. 遇到紅字錯誤？',
        body: '多半是權限（未登入管理員）或網路問題。請先確認已用管理員帳號登入，再按右上角重新整理。若仍失敗，把錯誤訊息截圖給技術窗口。',
    },
];

const AdminHelpBanner: React.FC = () => {
    const [open, setOpen] = useState(true);

    return (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 overflow-hidden mb-6">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-primary/10 transition-colors"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                            新手操作指南
                            <span className="text-xs font-normal text-primary/90 px-2 py-0.5 rounded-full bg-primary/15">
                                給行政／小編
                            </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-0.5">
                            點此展開：三分鐘學會更新網站內容
                        </div>
                    </div>
                </div>
                {open ? <ChevronUp className="text-gray-400 shrink-0" /> : <ChevronDown className="text-gray-400 shrink-0" />}
            </button>
            {open && (
                <div className="px-4 pb-4 pt-0 border-t border-white/10">
                    <ul className="space-y-3 mt-3">
                        {STEPS.map((s) => (
                            <li
                                key={s.title}
                                className="flex gap-3 text-sm text-gray-300 bg-black/20 rounded-xl p-3 border border-white/5"
                            >
                                <Lightbulb className="text-primary shrink-0 mt-0.5" size={16} />
                                <div>
                                    <div className="font-bold text-white mb-1">{s.title}</div>
                                    <p className="leading-relaxed text-gray-400">{s.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminHelpBanner;
