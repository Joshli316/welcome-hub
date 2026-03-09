import { VolunteerHost } from '@/types/host';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useLocale, useTranslations } from 'next-intl';

interface HostCardProps {
  host: VolunteerHost;
}

export default function HostCard({ host }: HostCardProps) {
  const locale = useLocale();
  const t = useTranslations('community.hosts');
  const bio = locale === 'zh' ? host.bioZh : host.bio;

  const tCommon = useTranslations('common');
  const contactLabel = host.contactMethod === 'wechat'
    ? `${tCommon('wechat')}: ${host.contactValue}`
    : host.contactValue;

  return (
    <Card className="flex flex-col h-full">
      {/* Avatar placeholder */}
      <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-2xl mb-3">
        {host.name.charAt(0)}
      </div>
      <h3 className="font-semibold text-lg">{host.name}</h3>
      <p className="text-xs text-muted mb-2">📍 {host.city} · {host.university}</p>
      <p className="text-sm text-muted mb-3 flex-1">{bio}</p>

      {/* Services */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {host.services.map(service => (
          <Badge key={service} variant="sage">
            {t(`services.${service}`)}
          </Badge>
        ))}
      </div>

      {/* Languages */}
      <p className="text-xs text-muted mb-3">
        🗣 {host.languages.join(', ')}
      </p>

      {/* Contact */}
      {host.contactMethod === 'email' ? (
        <a
          href={`mailto:${host.contactValue}`}
          className="text-center px-4 py-2 bg-sage-500 text-white rounded-lg text-sm font-medium hover:bg-sage-600 transition-colors"
        >
          {t('contact')}
        </a>
      ) : (
        <div className="text-center px-4 py-2 bg-sage-50 border border-sage-200 rounded-lg text-sm text-sage-700">
          {contactLabel}
        </div>
      )}
    </Card>
  );
}
