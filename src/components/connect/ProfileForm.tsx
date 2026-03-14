'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MyProfile, interestOptions, degreeLevelOptions } from '@/types/peer';
import { isValidEmail } from '@/lib/utils/sanitize';

interface ProfileFormProps {
  initialProfile?: MyProfile | null;
  onSubmit: (profile: MyProfile) => void;
}

export default function ProfileForm({ initialProfile, onSubmit }: ProfileFormProps) {
  const t = useTranslations('connect.profile');
  const tCommon = useTranslations('common');
  const tInterests = useTranslations('connect.interests');
  const tDegree = useTranslations('connect.degrees');

  const [name, setName] = useState(initialProfile?.name ?? '');
  const [university, setUniversity] = useState(initialProfile?.university ?? '');
  const [city, setCity] = useState(initialProfile?.city ?? '');
  const [major, setMajor] = useState(initialProfile?.major ?? '');
  const [degreeLevel, setDegreeLevel] = useState(initialProfile?.degreeLevel ?? 'masters');
  const [arrivalSemester, setArrivalSemester] = useState(initialProfile?.arrivalSemester ?? 'Fall 2026');
  const [interests, setInterests] = useState<string[]>(initialProfile?.interests ?? []);
  const [languages, setLanguages] = useState(initialProfile?.languages.join(', ') ?? '中文, English');
  const [bio, setBio] = useState(initialProfile?.bio ?? '');
  const [contactMethod, setContactMethod] = useState<'wechat' | 'email'>(initialProfile?.contactMethod ?? 'wechat');
  const [contactValue, setContactValue] = useState(initialProfile?.contactValue ?? '');

  function toggleInterest(interest: string) {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : prev.length < 6 ? [...prev, interest] : prev
    );
  }

  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setValidationError('');

    // Validate email format when email is the contact method
    if (contactMethod === 'email' && !isValidEmail(contactValue)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    // Basic length guards — prevent localStorage abuse
    if (name.length > 100 || university.length > 100 || city.length > 100 || major.length > 100 || bio.length > 200) {
      setValidationError('One or more fields exceed the maximum length.');
      return;
    }

    setIsSubmitting(true);
    const profile: MyProfile = {
      id: initialProfile?.id ?? `peer-${Date.now()}`,
      name,
      university,
      city,
      major,
      degreeLevel,
      arrivalSemester,
      interests,
      languages: languages.split(',').map(l => l.trim()).filter(Boolean),
      bio,
      contactMethod,
      contactValue,
      createdAt: initialProfile?.createdAt ?? new Date().toISOString().split('T')[0],
    };
    onSubmit(profile);
    setIsSubmitting(false);
  }

  const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-sm placeholder:text-muted/50';
  const labelClass = 'block text-sm font-medium mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + University row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-name" className={labelClass}>{t('name')} *</label>
          <input id="profile-name" type="text" value={name} onChange={e => setName(e.target.value)} required maxLength={100} className={inputClass} placeholder={t('namePlaceholder')} />
        </div>
        <div>
          <label htmlFor="profile-university" className={labelClass}>{t('university')} *</label>
          <input id="profile-university" type="text" value={university} onChange={e => setUniversity(e.target.value)} required maxLength={100} className={inputClass} placeholder={t('universityPlaceholder')} />
        </div>
      </div>

      {/* City + Major */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-city" className={labelClass}>{t('city')} *</label>
          <input id="profile-city" type="text" value={city} onChange={e => setCity(e.target.value)} required maxLength={100} className={inputClass} placeholder={t('cityPlaceholder')} />
        </div>
        <div>
          <label htmlFor="profile-major" className={labelClass}>{t('major')} *</label>
          <input id="profile-major" type="text" value={major} onChange={e => setMajor(e.target.value)} required maxLength={100} className={inputClass} placeholder={t('majorPlaceholder')} />
        </div>
      </div>

      {/* Degree + Arrival */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-degree" className={labelClass}>{t('degreeLevel')}</label>
          <select id="profile-degree" value={degreeLevel} onChange={e => setDegreeLevel(e.target.value as MyProfile['degreeLevel'])} className={inputClass}>
            {degreeLevelOptions.map(d => (
              <option key={d} value={d}>{tDegree(d)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="profile-semester" className={labelClass}>{t('arrivalSemester')}</label>
          <input id="profile-semester" type="text" value={arrivalSemester} onChange={e => setArrivalSemester(e.target.value)} className={inputClass} placeholder="Fall 2026" />
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className={labelClass}>{t('interests')} ({t('selectUpTo', { max: 6 })})</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {interestOptions.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                interests.includes(interest)
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white border-border text-muted hover:border-primary-300'
              }`}
            >
              {tInterests(interest)}
            </button>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label htmlFor="profile-languages" className={labelClass}>{t('languages')}</label>
        <input id="profile-languages" type="text" value={languages} onChange={e => setLanguages(e.target.value)} className={inputClass} placeholder="中文, English" />
        <p className="text-xs text-muted mt-1">{t('languagesHint')}</p>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="profile-bio" className={labelClass}>{t('bio')}</label>
        <textarea
          id="profile-bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={3}
          maxLength={200}
          className={inputClass}
          placeholder={t('bioPlaceholder')}
        />
        <p className="text-xs text-muted mt-1">{bio.length}/200</p>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-contact-method" className={labelClass}>{t('contactMethod')}</label>
          <select id="profile-contact-method" value={contactMethod} onChange={e => setContactMethod(e.target.value as 'wechat' | 'email')} className={inputClass}>
            <option value="wechat">{tCommon('wechat')}</option>
            <option value="email">{tCommon('email')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="profile-contact-value" className={labelClass}>{t('contactValue')} *</label>
          <input
            id="profile-contact-value"
            type="text"
            value={contactValue}
            onChange={e => setContactValue(e.target.value)}
            required
            className={inputClass}
            placeholder={contactMethod === 'wechat' ? t('wechatPlaceholder') : t('emailPlaceholder')}
          />
        </div>
      </div>

      {validationError && (
        <p role="alert" className="text-red-500 text-sm">{validationError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-7 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-foreground/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {initialProfile ? t('updateProfile') : t('createProfile')}
      </button>
    </form>
  );
}
