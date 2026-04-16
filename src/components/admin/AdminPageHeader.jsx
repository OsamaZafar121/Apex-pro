const AdminPageHeader = ({ eyebrow = 'Admin Workspace', title, description, stats = [], actions = null }) => {
  return (
    <section className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c5d97] via-[#1169a9] to-[#f08a7f] text-white shadow-xl">
      <div className="grid gap-4 sm:gap-6 px-4 sm:px-6 py-5 sm:py-8 lg:grid-cols-[1.5fr_auto] lg:px-8">
        <div>
          <p className="mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70">{eyebrow}</p>
          <h1 className="max-w-3xl text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{title}</h1>
          {description && (
            <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-6 text-white/80 lg:text-base">
              {description}
            </p>
          )}
          {stats.length > 0 && (
            <div className="mt-3 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm"
                >
                  <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/65">{stat.label}</p>
                  <p className="mt-0.5 sm:mt-1 text-base sm:text-lg font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {actions && <div className="flex items-start justify-start lg:justify-end">{actions}</div>}
      </div>
    </section>
  );
};

export default AdminPageHeader;
