'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StatCard({ title, value, icon: Icon, trend, delay = 0 }) {
  const cardRef = useRef(null);
  const valueRef = useRef(null);

  useEffect(() => {
    // Entrance Animation
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay, ease: 'power3.out' }
    );

    // Number Counter Animation
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (!isNaN(numValue)) {
      gsap.fromTo(valueRef.current, 
        { innerHTML: 0 }, 
        { 
          innerHTML: numValue, 
          duration: 1.5, 
          delay: delay + 0.2, 
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          onUpdate: function() {
            if (valueRef.current) {
              const val = Math.round(this.targets()[0].innerHTML);
              // format if needed
              valueRef.current.innerHTML = typeof value === 'string' && value.includes(',') 
                ? val.toLocaleString() 
                : val;
            }
          }
        }
      );
    }
  }, [value, delay]);

  return (
    <div ref={cardRef} className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#8CD83D]/20 to-[#65B300]/5 rounded-full blur-2xl group-hover:bg-[#65B300]/20 transition-all"></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white" ref={valueRef}>
            {value}
          </h3>
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className={`font-medium ${trend > 0 ? 'text-[#65B300]' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-[#0A4D45]/5 dark:bg-[#0A4D45] flex items-center justify-center text-[#65B300]">
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
