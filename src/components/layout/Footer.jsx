import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-900 text-white py-12 transition-colors">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                        <span className="text-2xl font-bold text-accent">MAV</span>
                    </div>
                    <h2 className="text-xl font-serif font-bold tracking-wider">{t('footer.company')}</h2>
                    <p className="text-gray-400 mt-2 max-w-md mx-auto">
                        {t('footer.mission')}
                    </p>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {t('footer.company')}. {t('footer.rights')}</p>
                    <div className="flex space-x-6 md:space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
                        <Link to="/" className="hover:text-accent transition-colors">{t('footer.privacy')}</Link>
                        <Link to="/" className="hover:text-accent transition-colors">{t('footer.terms')}</Link>
                        <Link to="/#contact" className="hover:text-accent transition-colors">{t('footer.support')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
