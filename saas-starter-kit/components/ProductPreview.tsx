export default function ProductPreview() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="animate-ember-float relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-2xl shadow-gray-900/10 dark:border-gray-800 dark:bg-gray-900">
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4 dark:border-gray-800">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />

              <div className="ml-4 flex-1 rounded-md bg-gray-100 px-4 py-2 text-xs text-gray-500 dark:bg-gray-900">
                app.yoursaas.com/dashboard
              </div>
            </div>

            <div className="grid min-h-[430px] md:grid-cols-[190px_1fr]">
              <aside className="hidden border-r border-gray-200 p-5 dark:border-gray-800 md:block">
                <div className="mb-8 flex items-center gap-2 font-bold">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs text-white">
                    E
                  </span>
                  Emberkit
                </div>

                <div className="space-y-2 text-sm">
                  <div className="rounded-lg bg-indigo-50 px-3 py-2 font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                    Dashboard
                  </div>
                  <div className="px-3 py-2 text-gray-500">Profile</div>
                  <div className="px-3 py-2 text-gray-500">Settings</div>
                </div>
              </aside>

              <div className="p-6 sm:p-8">
                <div className="mb-8">
                  <p className="text-sm text-gray-500">Dashboard</p>
                  <h3 className="mt-1 text-2xl font-bold">
                    Welcome back 👋
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                    <p className="text-sm text-gray-500">Plan</p>
                    <p className="mt-2 text-2xl font-bold">Free</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                    <p className="text-sm text-gray-500">Usage</p>
                    <p className="mt-2 text-2xl font-bold">72%</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                    <p className="text-sm text-gray-500">Projects</p>
                    <p className="mt-2 text-2xl font-bold">12</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Build faster</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Everything you need to start your SaaS.
                      </p>
                    </div>

                    <div className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white sm:block">
                      Upgrade
                    </div>
                  </div>

                  <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full w-[72%] rounded-full bg-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}