
const ActionStatus = ({ actionLabel }) => {
    return (
        <div className="text-center mb-2">
            <div className="h-px w-full bg-linear-to-r from-transparent via-current to-transparent opacity-20 mb-4" />
            <p className="text-xs tracking-[0.3em] uppercase font-black whitespace-pre-line">
                {actionLabel}
            </p>
        </div>
    );
};

export default ActionStatus;