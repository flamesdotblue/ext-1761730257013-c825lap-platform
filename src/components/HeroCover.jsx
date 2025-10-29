import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative h-[42vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-neutral-950/90" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Daily Finance Tracker</h1>
        <p className="mt-1 max-w-sm text-sm text-white/70">
          Stay on top of your spending with a sleek, modern interface.
        </p>
      </div>
    </section>
  );
}
