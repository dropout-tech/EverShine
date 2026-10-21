/** 從 fullIntro 切出「理想引薦」段落（供卡片預覽與 Modal 共用） */
export function splitIntro(fullIntro: string): { main: string; ideal: string | null } {
    if (!fullIntro) return { main: '', ideal: null };
    const text = fullIntro.replace(/\\n/g, '\n');
    const markers = ['【理想引薦對象】', '【理想引薦】', '理想引薦對象：', '理想引薦對象'];
    let cut = -1;
    let markerLen = 0;
    for (const m of markers) {
        const i = text.indexOf(m);
        if (i !== -1 && (cut === -1 || i < cut)) {
            cut = i;
            markerLen = m.length;
        }
    }
    if (cut === -1) return { main: text.trim(), ideal: null };
    const main = text.slice(0, cut).trim();
    let ideal = text.slice(cut + markerLen).trim();
    const nextSection = ideal.search(/\n【[^】]+】/);
    if (nextSection !== -1) ideal = ideal.slice(0, nextSection).trim();
    return { main: main || text.trim(), ideal: ideal || null };
}

/** 單行預覽用：理想引薦首行精簡 */
export function idealPreviewLine(fullIntro: string, maxLen = 42): string | null {
    const { ideal } = splitIntro(fullIntro);
    if (!ideal) return null;
    const one = ideal.replace(/\s+/g, ' ').trim();
    if (one.length <= maxLen) return one;
    return `${one.slice(0, maxLen).trim()}…`;
}
