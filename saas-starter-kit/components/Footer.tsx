import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-bold">
            🔥 Emberkit
          </Link>

          <p className="mt-2 text-sm text-gray-500">
            Build your SaaS. Ship faster.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-gray-500">
          <a href="#features" className="hover:text-gray-900 dark:hover:text-white">
            Features
          </a>

          <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white">
            Pricing
          </a>

          <a href="#faq" className="hover:text-gray-900 dark:hover:text-white">
            FAQ
          </a>

          <Link href="/login" className="hover:text-gray-900 dark:hover:text-white">
            Login
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-gray-200 px-6 pt-6 text-xs text-gray-500 dark:border-gray-800">
        © {new Date().getFullYear()} Emberkit. All rights reserved.
      </div>
    </footer>
  );
}