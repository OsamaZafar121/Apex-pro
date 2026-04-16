import { useEffect, useMemo, useState } from 'react';
import { api } from '../../utils/api';
import { FaEnvelope, FaSave, FaCheck, FaTimes, FaClock, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import AdminPageHeader from '../../components/admin/AdminPageHeader';

const DEFAULT_SETTINGS = {
  smtpHost: 'smtp.gmail.com',
  smtpPort: '587',
  smtpEmail: '',
  smtpPassword: '',
  notificationEmail: '',
  emailEnabled: false,
  showPrices: true,
  bufferDays: 1,
};

const PASSWORD_MASK = '••••••••';

const normalizeSettings = (data = {}) => ({
  ...DEFAULT_SETTINGS,
  ...data,
  bufferDays: Number.isFinite(Number(data.bufferDays)) ? Number(data.bufferDays) : DEFAULT_SETTINGS.bufferDays,
  emailEnabled: Boolean(data.emailEnabled),
  showPrices: Boolean(data.showPrices),
});

const AdminSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [passwordDirty, setPasswordDirty] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        setIsFetching(true);
        setError('');
        const data = await api.getSettings();

        if (!isMounted) {
          return;
        }

        setSettings(normalizeSettings(data));
        setPasswordDirty(false);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError.message || 'Failed to load settings');
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasStoredPassword = settings.smtpPassword === PASSWORD_MASK;
  const isSaveDisabled = useMemo(
    () => isLoading || isFetching || settings.bufferDays < 1 || settings.bufferDays > 7,
    [isLoading, isFetching, settings.bufferDays]
  );

  const updateSettingsField = (key, value) => {
    setSaved(false);
    setError('');
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSaved(false);
    setError('');

    try {
      const payload = {
        ...settings,
        bufferDays: Math.min(7, Math.max(1, Number(settings.bufferDays) || DEFAULT_SETTINGS.bufferDays)),
      };

      if (!passwordDirty && settings.smtpPassword === PASSWORD_MASK) {
        delete payload.smtpPassword;
      }

      await api.updateSettings(payload);
      const refreshedSettings = await api.getSettings();
      setSettings(normalizeSettings(refreshedSettings));
      setPasswordDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (saveError) {
      setError(saveError.message || 'Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Controls"
          title="Settings"
          description="Configure business rules, booking behavior, and notifications using the same page structure as the rest of the admin area."
        />
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#1169a9] border-t-transparent"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Controls"
        title="Settings"
        description="Configure business rules, booking behavior, and notifications using the same page structure as the rest of the admin area."
        stats={[
          { label: 'Email', value: settings.emailEnabled ? 'Enabled' : 'Disabled' },
          { label: 'Prices', value: settings.showPrices ? 'Visible' : 'Hidden' },
          { label: 'Buffer', value: `${settings.bufferDays} day${settings.bufferDays === 1 ? '' : 's'}` },
        ]}
      />

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          <FaTimes />
          <span>{error}</span>
        </div>
      )}

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          <FaCheck />
          <span>Settings saved successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <FaEnvelope className="text-[#1169a9]" />
            <h3 className="text-lg font-bold text-gray-800">Email Notifications (Google SMTP)</h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <p className="font-medium text-gray-800">Enable Email Notifications</p>
                <p className="text-sm text-gray-500">Send booking confirmations to customers</p>
              </div>
              <button
                type="button"
                onClick={() => updateSettingsField('emailEnabled', !settings.emailEnabled)}
                className={`text-3xl ${settings.emailEnabled ? 'text-green-600' : 'text-gray-400'}`}
              >
                {settings.emailEnabled ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>

            {settings.emailEnabled && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">SMTP Host</label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) => updateSettingsField('smtpHost', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-[#1169a9]"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">SMTP Port</label>
                  <input
                    type="text"
                    value={settings.smtpPort}
                    onChange={(e) => updateSettingsField('smtpPort', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-[#1169a9]"
                    placeholder="587"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">SMTP Email</label>
                  <input
                    type="email"
                    value={settings.smtpEmail}
                    onChange={(e) => updateSettingsField('smtpEmail', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-[#1169a9]"
                    placeholder="your-email@gmail.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">SMTP Password (App Password)</label>
                  <input
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => {
                      setPasswordDirty(true);
                      updateSettingsField('smtpPassword', e.target.value);
                    }}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-[#1169a9]"
                    placeholder={hasStoredPassword ? 'Stored app password' : 'xxxx xxxx xxxx xxxx'}
                  />
                  {hasStoredPassword && !passwordDirty && (
                    <p className="mt-1 text-xs text-gray-500">
                      A password is already stored. Leave this unchanged to keep it.
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Use an{' '}
                    <a
                      href="https://support.google.com/accounts/answer/185833"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1169a9] hover:underline"
                    >
                      App Password
                    </a>{' '}
                    from your Google account
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Notification Email</label>
                  <input
                    type="email"
                    value={settings.notificationEmail}
                    onChange={(e) => updateSettingsField('notificationEmail', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-[#1169a9]"
                    placeholder="where to send booking alerts"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSaveDisabled}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1169a9] px-4 py-2 text-white hover:bg-[#0f5a8f] disabled:opacity-50"
            >
              <FaSave />
              {isLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <FaClock className="text-[#1169a9]" />
            <h3 className="text-lg font-bold text-gray-800">Booking Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <p className="font-medium text-gray-800">Show Prices</p>
                <p className="text-sm text-gray-500">Display prices to customers</p>
              </div>
              <button
                type="button"
                onClick={() => updateSettingsField('showPrices', !settings.showPrices)}
                className={`text-3xl ${settings.showPrices ? 'text-green-600' : 'text-gray-400'}`}
              >
                {settings.showPrices ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <FaClock className="mr-2 inline" />
                Buffer Days
              </label>
              <input
                type="number"
                min="1"
                max="7"
                value={settings.bufferDays}
                onChange={(e) => updateSettingsField('bufferDays', Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-[#1169a9]"
              />
              <p className="mt-1 text-sm text-gray-500">Extra reserved days after each booking date (1-7)</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
          <h3 className="mb-3 text-lg font-bold text-gray-800">How to Setup Gmail SMTP</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Enable 2-Factor Authentication on your Google account</li>
            <li>
              Go to{' '}
              <a
                href="https://myaccount.google.com/apppasswords"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1169a9] hover:underline"
              >
                Google App Passwords
              </a>
            </li>
            <li>Generate a new app password for "Mail"</li>
            <li>Copy the 16-character password and paste it in SMTP Password field</li>
            <li>Use your full Gmail address for SMTP Email</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
