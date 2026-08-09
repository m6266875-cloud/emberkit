export default function Showcase() {
  return (
    <section id="showcase" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Built for developers
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            A foundation you can actually build on.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Every part of Emberkit is designed to be understandable,
            customizable and ready for your own SaaS idea.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-8 dark:border-gray-800">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-indigo-950/50">
              🧩
            </div>

            <h3 className="text-xl font-bold">Modular architecture</h3>

            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
              Keep your application organized with clear routes,
              components and server-side utilities.
            </p>

            <div className="mt-8 rounded-xl bg-gray-950 p-5 font-mono text-sm text-gray-300">
              <div>app/</div>
              <div className="pl-4">dashboard/</div>
              <div className="pl-4">profile/</div>
              <div className="pl-4">settings/</div>
              <div>components/</div>
              <div className="pl-4">ProfileForm.tsx</div>
              <div className="pl-4">ThemeProvider.tsx</div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-8 dark:border-gray-800">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-xl dark:bg-purple-950/50">
              🚀
            </div>

            <h3 className="text-xl font-bold">Deploy in minutes</h3>

            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
              Connect your repository to Vercel, configure your environment
              variables and launch your SaaS.
            </p>

            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Production deployment
                </span>
                <span className="text-sm font-semibold text-green-600">
                  ● Live
                </span>
              </div>

              <div className="mt-5 h-2 rounded-full bg-gray-200 dark:bg-gray-800">
                <div className="h-2 w-full rounded-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}