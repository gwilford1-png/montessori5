
import React, { useMemo, useEffect } from 'react';
import { Activity } from '../types';
import GeminiIllustration from './GeminiIllustration';
import { 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Clock, 
  Wrench, 
  ShieldAlert,
  ShoppingCart,
  ExternalLink,
  Info
} from 'lucide-react';

interface ActivityDetailProps {
  activity: Activity;
  activities?: Activity[];
  onSelectActivity?: (activity: Activity) => void;
}

interface ActivityDetailComponentProps extends ActivityDetailProps {
  onBack: () => void;
}

const ActivityDetail: React.FC<ActivityDetailComponentProps> = ({ 
  activity, 
  onBack, 
  activities = [], 
  onSelectActivity 
}) => {
  useEffect(() => {
    const container = document.querySelector('.activity-detail-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activity.id]);

  const handleShare = async () => {
    const shareData = {
      title: `TinySteps: ${activity.title}`,
      text: `Check out this developmental activity for your little one: ${activity.title}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Sharing failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        alert('Could not copy link.');
      }
    }
  };

  const handleBuyNow = () => {
    const query = activity.materials && activity.materials.length > 0 
      ? activity.materials[0] 
      : activity.title;
    window.open(`https://www.amazon.com/s?k=${encodeURIComponent(query + ' montessori')}`, '_blank');
  };

  const nextActivity = useMemo(() => {
    const currentIndex = activities.findIndex(a => a.id === activity.id);
    if (currentIndex !== -1 && currentIndex < activities.length - 1) {
      return activities[currentIndex + 1];
    }
    return null;
  }, [activities, activity.id]);

  return (
    <div className="activity-detail-container fixed inset-0 z-[100] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500">
      <nav className="sticky top-0 z-[110] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-all active:scale-95"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Back</span>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Activity Guide</span>
        <button 
          onClick={handleShare}
          className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Share2 size={18} />
        </button>
      </nav>

      <div className="max-w-xl mx-auto px-5 pt-6 pb-24">
        {/* 1. Hero Image - Nested within padding */}
        <div className="mb-8">
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 mb-3 relative flex items-center justify-center">
            {activity.hero ? (
              <img 
                src={activity.hero} 
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/40">
                <GeminiIllustration 
                  title={activity.title}
                  category={activity.category}
                  className="w-full h-full opacity-60 scale-75"
                />
              </div>
            )}
          </div>
        </div>

        {/* 2. Header Info */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 bg-blue-50 text-[#007AFF] rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100">
              {activity.filter_tag}
            </span>
            <span className="px-2.5 py-1 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-slate-100">
              {activity.category}
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-3 leading-tight tracking-tight">{activity.title}</h1>
          <p className="text-slate-400 font-medium italic text-sm leading-relaxed border-l-2 border-blue-100 pl-4">
            "{activity.reassurance}"
          </p>
        </div>

        {/* 3. The Goal */}
        <section className="mb-14 bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4 flex items-center gap-2">
            <Info size={14} className="text-blue-400" />
            The Goal
          </h3>
          <div>
            <p className="text-slate-900 font-semibold text-lg leading-snug mb-1">{activity.objective}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{activity.outcome}</p>
          </div>
        </section>

        {/* 4. Prepared Environment (Materials + Buy) */}
        <section className="mb-16">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4 px-1">Prepared Environment</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {activity.materials.map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                <Wrench size={10} className="text-slate-300" />
                <span className="text-[11px] font-semibold text-slate-600">{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <button 
              onClick={handleBuyNow}
              className="w-full h-12 bg-blue-500/90 text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-[0.2em] shadow-sm shadow-blue-100/50 hover:bg-blue-600 transition-all active:scale-[0.98]"
            >
              <ShoppingCart size={16} />
              Buy Item
              <ExternalLink size={12} className="opacity-40" />
            </button>
            <p className="text-[9px] text-slate-400 text-center font-medium leading-relaxed px-4">
              Selected items may earn us a small commission at no extra cost to you.
            </p>
          </div>
        </section>

        {/* 5. The Guide (Steps) */}
        <section className="mb-20 relative">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-8 px-1">The Guide</h3>
          <div className="space-y-10 relative">
            {activity.steps.map((step, i) => (
              <div key={i} className="flex gap-6 relative">
                {/* Step Connector Line */}
                {i < activity.steps.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-[-2.5rem] w-px bg-slate-100" />
                )}
                <div className="shrink-0 w-8 h-8 rounded-full bg-white text-[#007AFF] flex items-center justify-center text-xs font-black border border-blue-100 shadow-sm z-10">
                  {i + 1}
                </div>
                <p className="text-[15px] text-slate-600 leading-relaxed pt-1">{step.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Safety First */}
        <section className="mb-10 p-8 bg-amber-50 rounded-[2rem] border border-amber-100 shadow-sm shadow-amber-100/20">
          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-4">
            <ShieldAlert size={16} />
            Safety First
          </h3>
          <p className="text-[14px] text-amber-800/80 leading-relaxed font-medium italic">{activity.safety_notes}</p>
        </section>

        {/* 7. Observation (When to pause) */}
        <section className="mb-20 p-8 bg-indigo-50/30 rounded-[2rem] border border-indigo-100/30">
          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-4">
            <Clock size={16} />
            When to Pause?
          </h3>
          <p className="text-[14px] text-indigo-900/60 leading-relaxed font-medium">
            {activity.when_to_pause}
          </p>
        </section>

        {/* 8. Continue Journey */}
        {nextActivity && onSelectActivity && (
          <div className="pt-12 border-t border-slate-100">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-6 text-center">Continue Journey</h3>
            <div className="max-w-md mx-auto">
              <button 
                onClick={() => onSelectActivity(nextActivity)}
                className="w-full flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 transition-all group shadow-sm active:scale-[0.99]"
              >
                <div className="flex flex-col items-start min-w-0 pr-4 text-left">
                  <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Up Next • {nextActivity.filter_tag}</span>
                  <span className="text-lg font-display font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate w-full">{nextActivity.title}</span>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <ArrowRight size={24} strokeWidth={2.5} />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetail;
