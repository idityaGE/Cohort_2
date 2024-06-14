import {Link} from "react-router-dom"

export default function Landing() {
  return (
    <section className="w-full h-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="h-full container grid items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Unleash Your Creativity, Inspire the World
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Join our vibrant community of writers, thinkers, and storytellers. Share your voice, connect with
            like-minded individuals, and embark on a journey of personal growth and literary exploration.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              to="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          <blockquote className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
            <div className="text-2xl font-bold">"Writing is the painting of the voice."</div>
            <cite className="text-sm font-medium text-gray-500 dark:text-gray-400">- Voltaire</cite>
          </blockquote>
          <blockquote className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
            <div className="text-2xl font-bold">"The pen is the tongue of the mind."</div>
            <cite className="text-sm font-medium text-gray-500 dark:text-gray-400">- Miguel de Cervantes</cite>
          </blockquote>
          <blockquote className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
            <div className="text-2xl font-bold">
              "The role of a writer is not to say what we can all say, but what we are unable to say."
            </div>
            <cite className="text-sm font-medium text-gray-500 dark:text-gray-400">- Anaïs Nin</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}