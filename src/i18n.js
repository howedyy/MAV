import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            nav: {
                home: 'Home',
                about: 'About',
                products: 'Products',
                certifications: 'Certifications',
                contact: 'Contact',
                gb_standard: 'GB Standard',
                din_standard: 'DIN Standard'
            },
            hero: {
                title: 'Precision Engineering',
                subtitle: 'Leading the Middle East in Industrial Valve Solutions since 1998',
                cta: 'Discover Our Story'
            },
            about: {
                title: 'Engineering Excellence',
                subtitle: 'Building the foundation of industrial success',
                f1_title: '25+ Years of Excellence',
                f1_desc: 'Since 1998, MAV has been at the forefront of industrial valve manufacturing.',
                f2_title: 'Industry Leader',
                f2_desc: 'Recognized as the pioneer company in Egypt for manufacturing industrial valves.',
                f3_title: 'International Standards',
                f3_desc: 'Our products meet DIN, API, ASTM, and ANSI specifications.'
            },
            products: {
                title: 'Our Product Range',
                subtitle: 'Comprehensive valve solutions for every industrial need',
                view_tech: 'View Technical Specifications',
                gb_valves: 'GB Standard Valves',
                din_valves: 'DIN Standard Valves',
                view_details: 'View Details'
            },
            certifications: {
                title: 'Our Certifications',
                subtitle: 'Committed to the highest quality and safety standards',
                iso9001: 'ISO 9001:2015 Quality Management',
                iso14001: 'ISO 14001:2015 Environmental Management',
                iso45001: 'ISO 45001:2018 Occupational Health & Safety'
            },
            footer: {
                company: 'MAV Egypt for Valves',
                mission: 'Engineering excellence in industrial valve solutions since 1998. Providing reliable flows for global industries.',
                rights: 'All rights reserved.',
                privacy: 'Privacy Policy',
                terms: 'Terms of Service',
                support: 'Support'
            },
            details: {
                not_found: 'Product Not Found',
                not_found_desc: 'The requested valve type is currently being updated in our catalog.',
                return: 'Return to Products',
                request_quote: 'Request Quote',
                contact_sales: 'Contact Sales',
                tech_specs: 'Technical Specifications',
                performance: 'Key Performance Features',
                specialized: 'Need a specialized solution?',
                specialized_desc: 'Our engineering team can provide customized valve solutions tailored to your unique industrial requirements.',
                consult: 'Consult with an Engineer',
                gate_valve: {
                    title: 'Gate Valves',
                    subtitle: 'Reliable shut-off solutions for demanding industrial applications',
                    desc: 'Our gate valves provide excellent shut-off capabilities with minimal pressure drop when fully open. Engineered for durability and manufactured to GB and DIN standards.',
                    size_label: 'Size Range',
                    size_val: 'DN 15 - DN 600 (1/2" - 24")',
                    press_label: 'Pressure Rating',
                    press_val: 'Class 150 - 1500 LB',
                    temp_label: 'Temperature Range',
                    temp_val: '-29°C to 425°C',
                    mat_label: 'Materials',
                    mat_val: 'Cast Iron, Cast Steel, Stainless Steel',
                    feat1: 'Full port design for unrestricted flow',
                    feat2: 'Rising stem and non-rising stem options',
                    feat3: 'Solid or flexible wedge gate design'
                },
                globe_valve: {
                    title: 'Globe Valves',
                    subtitle: 'Precision throttling and regulation for industrial flows',
                    desc: 'MAV globe valves are designed for precise flow control and regulation. They feature a robust body construction and high-quality seating materials for reliable performance.',
                    size_label: 'Size Range',
                    size_val: 'DN 15 - DN 400 (1/2" - 16")',
                    press_label: 'Pressure Rating',
                    press_val: 'PN16 - PN100 / Class 150 - 600',
                    temp_label: 'Temperature Range',
                    temp_val: '-29°C to 450°C',
                    mat_label: 'Materials',
                    mat_val: 'Carbon Steel, Alloy Steel, Stainless Steel',
                    feat1: 'Excellent throttling characteristics',
                    feat2: 'Short stem travel for fast operation',
                    feat3: 'Renewable seat and disc design'
                },
                check_valve: {
                    title: 'Check Valves',
                    subtitle: 'Ensuring unidirectional flow and system integrity',
                    desc: 'Our check valves prevent backflow in piping systems, protecting equipment from potential damage. Available in swing and lift types for various application needs.',
                    size_label: 'Size Range',
                    size_val: 'DN 50 - DN 600 (2" - 24")',
                    press_label: 'Pressure Rating',
                    press_val: 'PN10 - PN64 / Class 150 - 600',
                    temp_label: 'Temperature Range',
                    temp_val: '-29°C to 425°C',
                    mat_label: 'Materials',
                    mat_val: 'Cast Iron, Ductile Iron, WCB',
                    feat1: 'Self-actuating based on flow direction',
                    feat2: 'Minimal pressure drop design',
                    feat3: 'Silent operation and quick closure'
                },
                ball_valve: {
                    title: 'Ball Valves',
                    subtitle: 'Quick quarter-turn shut-off for modern industries',
                    desc: 'MAV ball valves offer reliable bubble-tight sealing and easy operation. Perfect for a wide range of industrial applications from water to chemicals.',
                    size_label: 'Size Range',
                    size_val: 'DN 15 - DN 300 (1/2" - 12")',
                    press_label: 'Pressure Rating',
                    press_val: 'PN16 - PN64 / Class 150 - 600',
                    temp_label: 'Temperature Range',
                    temp_val: '-20°C to 200°C',
                    mat_label: 'Materials',
                    mat_val: 'WCB, CF8, CF8M (Stainless Steel)',
                    feat1: 'Tight sealing and low torque operation',
                    feat2: 'Anti-static and blowout-proof stem',
                    feat3: 'Full bore or reduced bore options'
                },
                butterfly_valve: {
                    title: 'Butterfly Valves',
                    subtitle: 'Compact and efficient flow control solutions',
                    desc: 'Our butterfly valves are designed for efficiency and space-saving. They provide excellent flow control for large-diameter pipelines with minimal maintenance.',
                    size_label: 'Size Range',
                    size_val: 'DN 50 - DN 1200 (2" - 48")',
                    press_label: 'Pressure Rating',
                    press_val: 'PN10 - PN25 / Class 125 - 150',
                    temp_label: 'Temperature Range',
                    temp_val: '-20°C to 120°C',
                    mat_label: 'Materials',
                    mat_val: 'Ductile Iron, Aluminum Bronze',
                    feat1: 'Lightweight and compact construction',
                    feat2: 'Low pressure drop and high flow capacity',
                    feat3: 'Concentric and offset design options'
                },
                strainer_valve: {
                    title: 'Strainer Valves',
                    subtitle: 'Protecting your system from pipeline debris',
                    desc: 'Y-Strainers from MAV effectively remove solid particles from liquids or gases, protecting expensive downstream equipment like pumps and meters.',
                    size_label: 'Size Range',
                    size_val: 'DN 15 - DN 400 (1/2" - 16")',
                    press_label: 'Pressure Rating',
                    press_val: 'PN16 - PN40 / Class 125 - 300',
                    temp_label: 'Temperature Range',
                    temp_val: '-20°C to 350°C',
                    mat_label: 'Materials',
                    mat_val: 'Cast Iron, WCB, SS304/316',
                    feat1: 'Easy cleaning and screen replacement',
                    feat2: 'Large screening area for low pressure drop',
                    feat3: 'Robust body with various mesh options'
                }
            },
            contact: {
                title: 'Contact Us',
                subtitle: 'Get in touch with our engineering experts',
                form_name: 'Your Name',
                form_email: 'Email Address',
                form_phone: 'Phone Number',
                form_subject: 'Subject',
                form_message: 'Message',
                form_send: 'Send Message',
                info_address: 'Address',
                info_address_val: 'Industrial Zone, 10th of Ramadan City, Egypt',
                info_hours: 'Working Hours',
                info_hours_val: 'Sun - Thu: 09:00 - 17:00'
            }
        }
    },
    ar: {
        translation: {
            nav: {
                home: 'الرئيسية',
                about: 'عن الشركة',
                products: 'المنتجات',
                certifications: 'الشهادات',
                contact: 'اتصل بنا',
                gb_standard: 'المواصفات الصينية (GB)',
                din_standard: 'المواصفات الألمانية (DIN)'
            },
            hero: {
                title: 'هندسة دقيقة',
                subtitle: 'رائد حلول الصمامات الصناعية في الشرق الأوسط منذ عام 1998',
                cta: 'اكتشف قصتنا'
            },
            about: {
                title: 'التميز الهندسي',
                subtitle: 'بناء أسس النجاح الصناعي',
                f1_title: 'أكثر من 25 عاماً من التميز',
                f1_desc: 'منذ عام 1998، كانت MAV في طليعة تصنيع الصمامات الصناعية.',
                f2_title: 'رائد الصناعة',
                f2_desc: 'معترف بها كشركة رائدة في مصر لتصنيع الصمامات الصناعية.',
                f3_title: 'المعايير الدولية',
                f3_desc: 'منتجاتنا تلبي مواصفات DIN و API و ASTM و ANSI.'
            },
            products: {
                title: 'مجموعة منتجاتنا',
                subtitle: 'حلول صمامات شاملة لكل الاحتياجات الصناعية',
                view_tech: 'عرض المواصفات الفنية',
                gb_valves: 'صمامات المواصفات الصينية (GB)',
                din_valves: 'صمامات المواصفات الألمانية (DIN)',
                view_details: 'عرض التفاصيل'
            },
            certifications: {
                title: 'شهاداتنا',
                subtitle: 'ملتزمون بأعلى معايير الجودة والسلامة',
                iso9001: 'ISO 9001:2015 إدارة الجودة',
                iso14001: 'ISO 14001:2015 الإدارة البيئية',
                iso45001: 'ISO 45001:2018 السلامة والصحة المهنية'
            },
            footer: {
                company: 'ماف مصر للصمامات',
                mission: 'التميز الهندسي في حلول الصمامات الصناعية منذ عام 1998. توفير تدفقات موثوقة للصناعات العالمية.',
                rights: 'جميع الحقوق محفوظة.',
                privacy: 'سياسة الخصوصية',
                terms: 'شروط الخدمة',
                support: 'الدعم الفني'
            },
            details: {
                not_found: 'المنتج غير موجود',
                not_found_desc: 'نوع الصمام المطلوب قيد التحديث حالياً في كتالوجنا.',
                return: 'العودة للمنتجات',
                request_quote: 'طلب عرض سعر',
                contact_sales: 'اتصل بالمبيعات',
                tech_specs: 'المواصفات الفنية',
                performance: 'مميزات الأداء الأساسية',
                specialized: 'هل تحتاج إلى حل مخصص؟',
                specialized_desc: 'يمكن لفريقنا الهندسي تقديم حلول صمامات مخصصة مصممة خصيصاً لمتطلباتك الصناعية الفريدة.',
                consult: 'استشر مهندساً',
                gate_valve: {
                    title: 'صمامات بوابة',
                    subtitle: 'حلول إغلاق موثوقة للتطبيقات الصناعية الشاقة',
                    desc: 'توفر صمامات البوابة لدينا قدرات إغلاق ممتازة مع حد أدنى من انخفاض الضغط عند فتحها بالكامل. مصممة للمتانة ومصنعة وفقاً لمعايير GB و DIN.',
                    size_label: 'نطاق الحجم',
                    size_val: 'DN 15 - DN 600 (1/2" - 24")',
                    press_label: 'تصنيف الضغط',
                    press_val: 'Class 150 - 1500 LB',
                    temp_label: 'نطاق درجة الحرارة',
                    temp_val: '-29°C إلى 425°C',
                    mat_label: 'المواد',
                    mat_val: 'حديد زهر، صلب مصبوب، فولاذ مقاوم للصدأ',
                    feat1: 'تصميم كامل للمنافذ لتدفق غير مقيد',
                    feat2: 'خيارات الجذع الصاعد وغير الصاعد',
                    feat3: 'تصميم بوابة إسفينية صلبة أو مرنة'
                },
                globe_valve: {
                    title: 'صمامات كروية',
                    subtitle: 'تنظيم دقيق لتدفقات الصناعة',
                    desc: 'صمامات globe من MAV مصممة للتحكم الدقيق في التدفق والتنظيم. تتميز بهيكل قوي ومواد عالية الجودة للأداء الموثوق.',
                    size_label: 'نطاق الحجم',
                    size_val: 'DN 15 - DN 400 (1/2" - 16")',
                    press_label: 'تصنيف الضغط',
                    press_val: 'PN16 - PN100',
                    temp_label: 'نطاق درجة الحرارة',
                    temp_val: '-29°C إلى 450°C',
                    mat_label: 'المواد',
                    mat_val: 'صلب كربوني، صلب سبائكي، فولاذ مقاوم للصدأ',
                    feat1: 'خصائص خنق ممتازة',
                    feat2: 'حركة جذع قصيرة للتشغيل السريع',
                    feat3: 'قاعدة وقرص قابل للتجديد'
                },
                check_valve: {
                    title: 'صمامات عدم رجوع',
                    subtitle: 'ضمان التدفق أحادي الاتجاه وسلامة النظام',
                    desc: 'صمامات عدم الرجوع لدينا تمنع التدفق العكسي في أنظمة الأنابيب، مما يحمي المعدات من التلف المحتمل.',
                    size_label: 'نطاق الحجم',
                    size_val: 'DN 50 - DN 600 (2" - 24")',
                    press_label: 'تصنيف الضغط',
                    press_val: 'PN10 - PN64',
                    temp_label: 'نطاق درجة الحرارة',
                    temp_val: '-29°C إلى 425°C',
                    mat_label: 'المواد',
                    mat_val: 'حديد زهر، حديد مطروق، صلب مصبوب',
                    feat1: 'تشغيل ذاتي بناءً على اتجاه التدفق',
                    feat2: 'تصميم يقلل من انخفاض الضغط',
                    feat3: 'تشغيل هادئ وإغلاق سريع'
                },
                ball_valve: {
                    title: 'صمامات الكرة',
                    subtitle: 'إغلاق سريع لربع دورة للصناعات الحديثة',
                    desc: 'توفر صمامات الكرة من MAV إغلاقاً محكماً وسهولة في التشغيل. مثالية لمجموعة واسعة من التطبيقات.',
                    size_label: 'نطاق الحجم',
                    size_val: 'DN 15 - DN 300 (1/2" - 12")',
                    press_label: 'تصنيف الضغط',
                    press_val: 'Class 150 - 600',
                    temp_label: 'نطاق درجة الحرارة',
                    temp_val: '-20°C إلى 200°C',
                    mat_label: 'المواد',
                    mat_val: 'صلب مصبوب، فولاذ مقاوم للصدأ',
                    feat1: 'إغلاق محكم وعزم تشغيل منخفض',
                    feat2: 'جذع مضاد للكهرباء الساكنة ومقاوم للانفجار',
                    feat3: 'خيارات التجويف الكامل أو المخفض'
                },
                butterfly_valve: {
                    title: 'صمامات فراشة',
                    subtitle: 'حلول مدمجة وفعالة للتحكم في التدفق',
                    desc: 'صمامات الفراشة لدينا مصممة للكفاءة وتوفير المساحة. توفر تحكماً ممتازاً في التدفق للأنابيب الكبيرة.',
                    size_label: 'نطاق الحجم',
                    size_val: 'DN 50 - DN 1200 (2" - 48")',
                    press_label: 'تصنيف الضغط',
                    press_val: 'PN10 - PN25',
                    temp_label: 'نطاق درجة الحرارة',
                    temp_val: '-20°C إلى 120°C',
                    mat_label: 'المواد',
                    mat_val: 'حديد مطروق، برونز ألومنيوم',
                    feat1: 'هيكل خفيف الوزن ومدمج',
                    feat2: 'انخفاض ضغط منخفض وسعة تدفق عالية',
                    feat3: 'تصميم مركز أو متدرج'
                },
                strainer_valve: {
                    title: 'مصافي (Y-Strainer)',
                    subtitle: 'حمایة نظامك من شوائب الأنابيب',
                    desc: 'تعمل مصافي MAV على إزالة الجزيئات الصلبة من السوائل أو الغازات بشكل فعال، مما يحمي المعدات اللاحقة.',
                    size_label: 'نطاق الحجم',
                    size_val: 'DN 15 - DN 400 (1/2" - 16")',
                    press_label: 'تصنيف الضغط',
                    press_val: 'PN16 - PN40',
                    temp_label: 'نطاق درجة الحرارة',
                    temp_val: '-20°C إلى 350°C',
                    mat_label: 'المواد',
                    mat_val: 'حديد زهر، صلب مصبوب، فولاذ مقاوم للصدأ',
                    feat1: 'سهولة التنظيف واستبدال الشبكة',
                    feat2: 'مساحة تصفية كبيرة لتقليل انخفاض الضغط',
                    feat3: 'هيكل قوي مع خيارات شبكية متنوعة'
                }
            },
            contact: {
                title: 'اتصل بنا',
                subtitle: 'تواصل مع خبرائنا الهندسيين',
                form_name: 'اسمك',
                form_email: 'البريد الإلكتروني',
                form_phone: 'رقم الهاتف',
                form_subject: 'الموضوع',
                form_message: 'الرسالة',
                form_send: 'إرسال الرسالة',
                info_address: 'العنوان',
                info_address_val: 'المنطقة الصناعية، مدينة العاشر من رمضان، مصر',
                info_hours: 'ساعات العمل',
                info_hours_val: 'الأحد - الخميس: 09:00 - 17:00'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
