import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save } from 'lucide-react';
import api from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({
    businessName: '',
    websiteURL: '',
    description: '',
    faqs: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/business');
        setBusinessData({
          businessName: data.businessName || '',
          websiteURL: data.websiteURL || '',
          description: data.description || '',
          faqs: data.faqs || [],
        });
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleFAQAdd = () => {
    setBusinessData({
      ...businessData,
      faqs: [...businessData.faqs, { question: '', answer: '' }]
    });
  };

  const handleFAQRemove = (index) => {
    const newFaqs = [...businessData.faqs];
    newFaqs.splice(index, 1);
    setBusinessData({ ...businessData, faqs: newFaqs });
  };

  const handleFAQChange = (index, field, value) => {
    const newFaqs = [...businessData.faqs];
    newFaqs[index][field] = value;
    setBusinessData({ ...businessData, faqs: newFaqs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.post('/business', businessData);
      setMessage('Profile saved successfully! Go to Widget page to embed.');
    } catch (error) {
      setMessage('Error saving profile.');
    } finally {
      setTimeout(() => setMessage(''), 5000);
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-indigo-100 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Business Settings
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your company details and AI knowledge base.
          </p>
        </div>
      </div>
      
      {message && (
        <div className={`p-4 mb-6 rounded-xl border ${message.includes('Error') ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'} flex items-center shadow-sm`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Information Card */}
        <div className="bg-white shadow-sm border border-slate-200 sm:rounded-2xl overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-slate-900">Profile Information</h3>
            <p className="mt-1 text-sm text-slate-500">
              Provide basic details about your business to train the AI.
            </p>
          </div>
          
          <div className="px-4 py-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={businessData.businessName}
                    onChange={e => setBusinessData({...businessData, businessName: e.target.value})}
                    className="block w-full rounded-lg border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Website URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    value={businessData.websiteURL}
                    onChange={e => setBusinessData({...businessData, websiteURL: e.target.value})}
                    className="block w-full rounded-lg border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                    placeholder="https://"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Business Description
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    value={businessData.description}
                    onChange={e => setBusinessData({...businessData, description: e.target.value})}
                    className="block w-full rounded-lg border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all resize-y"
                    placeholder="Tell us what your business does, your services, hours, location, etc. The AI uses this to answer general queries."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Card */}
        <div className="bg-white shadow-sm border border-slate-200 sm:rounded-2xl overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-slate-900">Frequently Asked Questions</h3>
            <p className="mt-1 text-sm text-slate-500">
              Add QA pairs for specific questions you receive often.
            </p>
          </div>
          
          <div className="px-4 py-6 sm:p-8 space-y-6">
            {businessData.faqs.length === 0 ? (
              <div className="text-center py-6 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <p className="text-sm text-slate-500 mb-4">No FAQs added yet. Help your AI by adding common questions.</p>
                <button
                  type="button"
                  onClick={handleFAQAdd}
                  className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add your first FAQ
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {businessData.faqs.map((faq, index) => (
                  <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative group transition-all hover:border-slate-300">
                    <button
                      type="button"
                      onClick={() => handleFAQRemove(index)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md opacity-0 group-hover:opacity-100 focus:opacity-100 bg-white shadow-sm border border-slate-200"
                      title="Remove FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-4 pr-8">
                      <div>
                        <label className="block text-sm font-medium leading-6 text-slate-900 mb-1">Question {index + 1}</label>
                        <input
                          type="text"
                          required
                          value={faq.question}
                          onChange={e => handleFAQChange(index, 'question', e.target.value)}
                          className="block w-full rounded-lg border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                          placeholder="e.g. What are your opening hours?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-slate-900 mb-1">Answer</label>
                        <textarea
                          required
                          rows={2}
                          value={faq.answer}
                          onChange={e => handleFAQChange(index, 'answer', e.target.value)}
                          className="block w-full rounded-lg border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                          placeholder="e.g. We are open Monday to Friday, 9am to 5pm."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleFAQAdd}
                  className="mt-4 flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-colors w-full justify-center"
                >
                  <Plus className="w-5 h-5 mr-2 text-slate-400" /> Add another FAQ
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="pt-5 flex justify-end gap-x-3 border-t border-slate-200 mt-8 pt-8">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardPage;
