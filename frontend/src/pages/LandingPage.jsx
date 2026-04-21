import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-slate-50 flex-grow flex flex-col">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 flex-grow flex flex-col justify-center">
        {/* Abstract background blobs */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>

        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 text-center">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20 bg-white/50 backdrop-blur-sm">
              Announcing our next-gen embed widget. <Link to="/signup" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            AI Chatbot for your Business
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
            Train a custom ChatGPT bot on your business data and embed it on your website in minutes. Turn visitors into customers with instant support.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started for free
            </Link>
            <Link to="/login" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-indigo-600 transition-colors">
              Log in to dashboard <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        {/* Bottom blob */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-24 sm:py-32 bg-white rounded-t-3xl border-t border-slate-200/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">Everything you need to support customers</p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Set up your knowledge base and let the AI handle your customer queries automatically.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 text-base leading-7 text-slate-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
                Custom Trained
              </dt>
              <dd className="leading-relaxed">Upload your FAQs and business details. The AI uses strictly your information to provide accurate answers.</dd>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                Quick Setup
              </dt>
              <dd className="leading-relaxed">Just copy and paste a single script tag into your website's HTML body. Zero coding required.</dd>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                Better Support
              </dt>
              <dd className="leading-relaxed">Provide 24/7 instant replies to your website visitors, boosting conversions and customer satisfaction.</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
