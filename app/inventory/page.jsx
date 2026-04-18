import dynamic from 'next/dynamic';

const InstitutionalDashboard = dynamic(() => import('@/components/InstitutionalDashboard'), {
  ssr: false,
  loading: () => (
    <div id="loading-screen" className="fixed inset-0 bg-[#0C0C14] flex flex-col items-center justify-center z-[9999] opacity-100 transition-opacity duration-400">
       <div className="loading-mark uppercase text-[4rem] tracking-[12px] text-[#B8FF3C] font-head">
          SYNTRY
       </div>
       <div className="loading-bar-wrap absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8FF3C]/10">
          <div className="loading-bar h-full bg-[#B8FF3C] animate-load"></div>
       </div>
    </div>
  )
});

export default function Home() {
  return (
    <>
      <InstitutionalDashboard />
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('load', () => {
          const screen = document.getElementById('loading-screen');
          if (screen) {
            screen.style.opacity = '0';
            setTimeout(() => screen.style.display = 'none', 400);
          }
        });
        // Safety timeout of 2s
        setTimeout(() => {
          const screen = document.getElementById('loading-screen');
          if (screen) {
            screen.style.opacity = '0';
            setTimeout(() => screen.style.display = 'none', 400);
          }
        }, 2000);
      `}} />
    </>
  );
}
