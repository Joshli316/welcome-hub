import { ReturneeProfile } from '@/types/returnee';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useLocale, useTranslations } from 'next-intl';

interface ReturneeCardProps {
  returnee: ReturneeProfile;
}

export default function ReturneeCard({ returnee }: ReturneeCardProps) {
  const locale = useLocale();
  const t = useTranslations('reentry.returnees');
  const tTopics = useTranslations('reentry.topics');
  const bio = locale === 'zh' ? returnee.bioZh : returnee.bio;

  const tCommon = useTranslations('common');
  const contactLabel = returnee.contactMethod === 'wechat'
    ? `${tCommon('wechat')}: ${returnee.contactValue}`
    : returnee.contactValue;

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-warm-200 text-warm-700 flex items-center justify-center text-xl font-bold">
          {returnee.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-lg leading-tight">{returnee.name}</h3>
          <p className="text-xs text-muted">{returnee.currentRole}</p>
        </div>
      </div>

      <p className="text-xs text-muted mb-1">
        📍 {tCommon('now')}: {returnee.currentCity}
      </p>
      <p className="text-xs text-muted mb-3">
        🎓 {returnee.previousUniversity} · {returnee.major} · {returnee.graduationYear}
      </p>

      <p className="text-sm text-foreground mb-3 flex-1">{bio}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {returnee.topics.map(topic => (
          <Badge key={topic} variant="primary">{tTopics(topic)}</Badge>
        ))}
      </div>

      {returnee.contactMethod === 'email' ? (
        <a
          href={`mailto:${returnee.contactValue}`}
          className="text-center px-4 py-2 bg-warm-500 text-white rounded-lg text-sm font-medium hover:bg-warm-600 transition-colors"
        >
          {t('contact')}
        </a>
      ) : (
        <div className="text-center px-4 py-2 bg-warm-50 border border-warm-200 rounded-lg text-sm text-warm-700">
          {contactLabel}
        </div>
      )}
    </Card>
  );
}
