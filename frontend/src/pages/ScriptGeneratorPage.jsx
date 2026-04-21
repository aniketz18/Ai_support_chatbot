import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Copy, Check, Terminal, Info } from 'lucide-react';

const ScriptGeneratorPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('userInfo');
    if (!data) {
      navigate('/login');
      return;
    }
    setUserInfo(JSON.parse(data));
  }, [navigate]);

  if (!userInfo) return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-indigo-100 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>
    </div>
  );

  const scriptTag = `<script src="http://localhost:5000/widget.js" data-user-id="${userInfo._id}"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Widget Integration
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Embed your trained AI chatbot onto any website.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 sm:rounded-2xl overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-5 sm:px-6 flex items-center">
          <Code className="h-5 w-5 mr-2 text-indigo-500" />
          <h3 className="text-base font-semibold leading-6 text-slate-900">Installation Script</h3>
        </div>
        
        <div className="px-4 py-6 sm:p-8 space-y-6">
          <p className="text-sm text-slate-600">
            Copy the script tag below and paste it just before the closing <code>&lt;/body&gt;</code> tag of your website's HTML. The widget will automatically load and attach to the bottom right corner.
          </p>

          <div className="rounded-xl overflow-hidden shadow-sm border border-slate-800 bg-[#0f172a]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-400 font-mono">HTML</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-md transition-colors border border-slate-700 hover:border-slate-600"
                title="Copy to clipboard"
              >
                {copied ? (
                  <><Check className="h-3.5 w-3.5 text-emerald-400 mr-1.5" /> Copied</>
                ) : (
                  <><Copy className="h-3.5 w-3.5 mr-1.5" /> Copy Code</>
                )}
              </button>
            </div>
            <div className="p-4 sm:p-5 overflow-x-auto">
              <pre className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-all">
                {scriptTag}
              </pre>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100 flex items-start mt-6">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Local environment notice</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Since this is running locally, ensure your backend server is running on <code>localhost:5000</code>. If you deploy this service, the <code>src</code> attribute in the script must be updated to your deployed domain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptGeneratorPage;
