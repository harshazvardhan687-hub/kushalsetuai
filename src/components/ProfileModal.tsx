import React, { useState } from 'react';
import { StoreProfile } from '../types';
import { Building2, X, Check, Store } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StoreProfile;
  onSaveProfile: (newProfile: StoreProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [storeName, setStoreName] = useState(profile.storeName);
  const [merchantName, setMerchantName] = useState(profile.merchantName);
  const [enterpriseCategory, setEnterpriseCategory] = useState(profile.enterpriseCategory);
  const [monthlyRevenue, setMonthlyRevenue] = useState(profile.monthlyRevenue);
  const [primaryLocation, setPrimaryLocation] = useState(profile.primaryLocation);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      storeName,
      merchantName,
      enterpriseCategory,
      monthlyRevenue,
      primaryLocation,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fadeIn">
        <div className="p-5 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Enterprise Profile Settings</h3>
              <p className="text-xs text-slate-400">Customizes diagnostics, mentor advice, and credentials</p>
            </div>
          </div>

          <button
            id="close-profile-modal-btn"
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Store / Enterprise Name
            </label>
            <input
              id="profile-store-name-input"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Owner / General Manager Name
            </label>
            <input
              id="profile-merchant-name-input"
              type="text"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              required
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Enterprise Category
            </label>
            <select
              id="profile-category-select"
              value={enterpriseCategory}
              onChange={(e) => setEnterpriseCategory(e.target.value as any)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="General Merchandise Store">General Merchandise Store</option>
              <option value="Retail Provisions Emporium">Retail Provisions Emporium</option>
              <option value="Wholesale & Semi-Urban Hub">Wholesale & Semi-Urban Hub</option>
              <option value="Community NGO Enterprise">Community NGO Enterprise</option>
              <option value="Consumer Packaged Goods Outlet">Consumer Packaged Goods Outlet</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Monthly Volume
              </label>
              <input
                id="profile-revenue-input"
                type="text"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value)}
                placeholder="₹4,50,000 / mo"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Regional Location
              </label>
              <input
                id="profile-location-input"
                type="text"
                value={primaryLocation}
                onChange={(e) => setPrimaryLocation(e.target.value)}
                placeholder="District / State"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              id="cancel-profile-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="save-profile-btn"
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
