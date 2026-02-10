import React from 'react';
import { Activity } from '../types';
import GeminiIllustration from './GeminiIllustration';
import { Package } from 'lucide-react';
interface ActivityCardProps {
  activity: Activity;
  onClick: (activity: Activity) => void;
}
const getAgeBadgeStyle = (age: string) => {
  if (age.includes('0-3')) return 'bg-blue-50 text-blue-500 border-blue-100'; 
  if (age.includes('3-6')) return 'bg-sky-50 text-sky-500 border-sky-100'; 
  if (age.includes('6-12')) return 'bg-indigo-50 text-indigo-500 border-indigo-100'; 
  return 'bg-slate-50 text-slate-500 border-slate-100';
};
const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  const ageStyle = getAgeBadgeStyle(activity.filter_tag);
  const materialSummary = activity.materials && activity.materials.length > 0 
    ? activity.materials[0]
    : 'NO ITEMS';
  return (
    <div
      onClick={() => onClick(activity)}
      className="bg-white rounded-3xl p-4 flex flex-row items-center gap-5 cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 mx-auto w-full relative"
    >
      {/* Thumbnail Square */}
      <div className="shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#F8FAFC] flex flex-col items-center justify-center border border-slate-50 group-hover:bg-blue-50/30 transition-colors overflow-hidden">
          {activity.thumbnail ? (
            <img 
              src={activity.thumbnail} 
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <GeminiIllustration 
                title={activity.title} 
                category={activity.category}
                className="w-full h-full scale-75 opacity-80" 
              />
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest pb-3">
                {activity.category}
              </span>
            </>
          )}
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-grow min-w-0 pr-2">
        <div className="flex items-center gap-3 mb-1.5">
          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider border ${ageStyle}`}>
            {activity.filter_tag}
          </span>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.15em]">
            {activity.category}
          </span>
        </div>
        <h3 className="text-lg font-display font-bold text-slate-900 mb-0.5 truncate group-hover:text-[#007AFF] transition-colors">
          {activity.title}
        </h3>
        <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-1 mb-2 font-medium">
          {activity.objective}
        </p>
        <div className="flex items-center gap-1.5 pt-0.5 min-w-0">
          <Package size={10} className="text-slate-200" />
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest truncate">
            {materialSummary.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ActivityCard;
