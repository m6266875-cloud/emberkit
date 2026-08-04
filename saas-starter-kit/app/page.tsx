import Link from 'next/link';

export default function LandingPage() {
  return (
    <main>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="font-bold text-xl">Emberkit</span>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Ship your SaaS this weekend.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Emberkit gives you auth, billing, and a dashboard — already wired together.
          Stop rebuilding the same boilerplate and start on the feature that
          actually matters.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition"
          >
            Start free
          </Link>
          <a
            href="#pricing"
            className="px-6 py-3 rounded-lg font-medium border border-gray-300 hover:border-gray-400 transition"
          >
            See pricing
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          { title: 'Auth, done', desc: 'Email + OAuth login, session handling, and protected routes out of the box.' },
          { title: 'Billing, wired', desc: 'Stripe subscriptions with checkout and webhooks already connected.' },
          { title: 'Dashboard, ready', desc: 'A clean authenticated shell so you can start building features on day one.' },
        ].map((f) => (
          <div key={f.title} className="p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-md mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-2">Simple pricing</h2>
        <p className="text-gray-600 mb-8">One plan. No surprises.</p>
        <div className="border border-gray-200 rounded-2xl p-8">
          <p className="text-4xl font-bold mb-1">$19<span className="text-lg text-gray-500 font-normal">/mo</span></p>
          <p className="text-gray-500 text-sm mb-6">Cancel anytime</p>
          <Link
            href="/signup"
            className="block bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition"
          >
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}
