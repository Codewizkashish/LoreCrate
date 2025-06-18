import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-4xl font-bold text-white-900 text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span
          className="font-bold bg-gradient-to-r from-blue-700 via-pink-600 to-yellow-400 bg-clip-text text-transparent"
        >
          {" "}AI-Powered Prompts{" "}
        </span>
      </h1>

      <p className="mt-4 max-w-lg mx-auto text-center text-white-700 text-md font-semibold">
        Turn Boring Chapters into Stories, Games, or Adventures with AI-Powered Prompts
      </p>

      <Feed/>
    </section>
  )
}

export default Home