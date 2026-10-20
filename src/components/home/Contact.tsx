import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { useMembers } from '../../hooks/useMembers';
import { memberPhotoFallback, memberPhotoSrc } from '../../lib/memberPhoto';

const Contact: React.FC = () => {
    const { members } = useMembers();

    // Map leadership roles
    const roles = [
        { title: '現任主席', name: '王年煜' },
        { title: '現任副主席', name: '王祈' },
        { title: '現任秘書財務', name: '劉懿德' }
    ];

    const leadership = roles.map(role => {
        const member = members.find(m => m.name === role.name);
        return {
            ...role,
            member: member || null
        };
    });

    return (
        <section className="min-h-screen flex flex-col justify-center relative py-24 md:py-32 overflow-hidden" id="contact">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-bg-dark/50 -skew-x-12 transform origin-top-right"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        聯繫 <span className="text-primary">EverShine</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        歡迎與台灣 BNI 長輝白金分會聯繫。無論是業務合作、商會參訪申請，或是想了解更多關於台灣 BNI 商會的資訊，我們隨時為您服務。
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                    {leadership.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-bg-dark/60 backdrop-blur-md border border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group text-center h-full flex flex-col"
                        >
                            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-primary/50 mb-4 group-hover:border-primary transition-colors shrink-0">
                                <img
                                    src={memberPhotoSrc(item.member?.photo || `/images/members/${item.name}.jpg`, 'thumb')}
                                    alt={item.name}
                                    width={112}
                                    height={112}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: 'top' }}
                                    onError={(e) => {
                                        const next = memberPhotoFallback(e.currentTarget.src, item.member?.photo || `/images/members/${item.name}.jpg`);
                                        if (e.currentTarget.src.endsWith(next)) return;
                                        e.currentTarget.src = next;
                                    }}
                                />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                            <div className="text-xl text-primary font-bold mb-1">{item.name}</div>
                            <div className="text-gray-300 text-base mb-4">{item.member?.industry || (index === 0 ? 'AI程式交易' : index === 1 ? 'AI學習整合' : '策展規劃設計')}</div>

                            <div className="border-t border-white/10 pt-4 space-y-2 text-left inline-block w-full text-base mt-auto">
                                <div className="flex flex-col items-center gap-1 text-gray-300 justify-center">
                                    <span className="font-medium text-white text-center">{item.member?.company || (index === 0 ? '創達智能技術股份有限公司 董事長' : index === 1 ? '祈育教育實業坊 董事長' : '樂橙創作設計 董事長')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 justify-center pt-2">
                                    <Phone size={16} className="text-primary shrink-0" />
                                    <span>{item.member?.phone || (index === 0 ? '0938-767-768' : index === 1 ? '0956-522-350' : '0952-983-157')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 justify-center">
                                    <Mail size={16} className="text-primary shrink-0" />
                                    <span className="text-sm break-all">{item.member?.email || (index === 0 ? 'wang.ian@investrontech.com' : index === 1 ? 'samuel900731@gmail.com' : 'claire@allrange.tw')}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
