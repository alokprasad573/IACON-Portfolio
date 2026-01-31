import { Cpu, Activity } from 'lucide-react';

const DetailPanel = ({ isVerified }) => {
    if (!isVerified) return null;

    return (
        <div className="mb-4 p-4 bg-yellow-400/5 border border-yellow-400/10">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {[
                    { label: 'Designation', value: 'SCOUT', icon: <Cpu size={10} /> },
                    { label: 'Spark ID', value: '774-BEE-882', color: 'text-yellow-400' },
                    { label: 'Chassis Sync', value: 'URBAN_COMPACT_V1', icon: <Activity size={10} /> },
                    { label: 'Tactical Status', value: 'OPERATIONAL', color: 'text-green-400' },
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-xs opacity-50 uppercase mb-1 flex items-center gap-1 font-bold">
                            {stat.icon} {stat.label}
                        </div>
                        <div className={`text-s font-black tracking-wider ${stat.color || 'text-white'}`}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default DetailPanel;