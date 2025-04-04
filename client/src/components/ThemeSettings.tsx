
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ThemeSettings() {
  const [settings, setSettings] = useState({
    siteName: '',
    themeColor: '',
    font: '',
    themeVariant: '',
    logoUrl: '',
    faviconUrl: ''
  });

  useEffect(() => {
    axios.get('/api/settings').then(res => {
      setSettings(res.data);
      applyTheme(res.data);
    });
  }, []);

  const applyTheme = (config) => {
    document.documentElement.style.setProperty('--theme-color', config.themeColor);
    document.body.setAttribute('data-theme', config.themeVariant);
    if (config.logoUrl) {
      const logo = document.getElementById('site-logo');
      if (logo) logo.src = config.logoUrl;
    }
    if (config.faviconUrl) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = config.faviconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };

  const saveSettings = () => {
    axios.post('/api/settings', settings, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      setSettings(res.data);
      applyTheme(res.data);
      alert('Settings saved');
    });
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-2">Theme & Site Settings</h3>
      <label className="block mb-2">Site Name:
        <input type="text" value={settings.siteName}
          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
          className="ml-2 p-1 border rounded" />
      </label>
      <label className="block mb-2">Theme Color:
        <input type="color" value={settings.themeColor}
          onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
          className="ml-2" />
      </label>
      <label className="block mb-2">Font:
        <select value={settings.font}
          onChange={(e) => setSettings({ ...settings, font: e.target.value })}
          className="ml-2 p-1 border rounded">
          <option value="default">Default</option>
          <option value="Tajawal">Tajawal (Arabic)</option>
          <option value="Roboto">Roboto (Latin)</option>
        </select>
      </label>
      <label className="block mb-2">Theme Variant:
        <select value={settings.themeVariant}
          onChange={(e) => setSettings({ ...settings, themeVariant: e.target.value })}
          className="ml-2 p-1 border rounded">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label className="block mb-2">Site Logo URL:
        <input type="text" value={settings.logoUrl}
          onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
          className="ml-2 p-1 border rounded w-96" />
      </label>
      <label className="block mb-2">Favicon URL:
        <input type="text" value={settings.faviconUrl}
          onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
          className="ml-2 p-1 border rounded w-96" />
      </label>
      <button onClick={saveSettings}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2">
        Save Settings
      </button>
    </div>
  );
}

export default ThemeSettings;
