import React from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const StatsSection = ({ stats }) => {
  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ClipboardList,
      iconBg: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary",
    },
    {
      title: "Active Tasks",
      value: stats.active,
      icon: Clock,
      iconBg: "bg-secondary/10",
      textColor: "text-secondary",
      borderColor: "border-secondary",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      iconBg: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: AlertTriangle,
      iconBg: "bg-danger/10",
      textColor: "text-danger",
      borderColor: "border-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className={`
  group relative bg-white rounded-2xl shadow-sm
  border border-gray-100 border-t-4 ${stat.borderColor}
  p-4 sm:p-5
  hover:shadow-lg hover:-translate-y-1
  transition-all duration-300 ease-out
  cursor-pointer overflow-hidden
`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.iconBg} sm:p-3 p-2 rounded-xl transition-all duration-300 
                                group-hover:scale-110 group-hover:shadow-md`}
                >
                  <stat.icon
                    className={`sm:w-6 sm:h-6 w-4 h-4 ${stat.textColor} transition-transform duration-300 
                                       group-hover:rotate-3`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <p
                  className={`sm:text-3xl text-2xl font-bold ${stat.textColor} transition-all duration-300
                              group-hover:scale-105 origin-left`}
                >
                  {stat.value}
                </p>
                <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide">
                  {stat.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Message */}
      {stats.total === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-100">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">
            No tasks yet. Create your first task to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsSection;
