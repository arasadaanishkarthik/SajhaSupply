import DashboardNavbar from '../navigation/DashboardNavbar';

export default function DashboardLayout({ tabs, basePath, children }) {
  return (
    <div className="min-h-screen bg-[#F8FAF8] relative">
      {/* Subtle green ambient lighting blobs */}
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      {/* Top Navbar & Horizontal Tabs */}
      <DashboardNavbar tabs={tabs} basePath={basePath} />

      {/* Main Content */}
      <main className="relative z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </div>
      </main>
    </div>
  );
}
