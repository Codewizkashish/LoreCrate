import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col mt-8">
      <h1 className="head-text text-left mb-4 font-extrabold text-3xl">
        <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-pink-500 bg-clip-text text-transparent">
          {type} Post
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-Powered tool.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-300">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-300">
            Tag {` `}
            <span className="font-normal">
              (#science, #story, #game, #quiz, #idea)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex justify-end items-center gap-4 mt-4 mb-5">
  <Link href="/" className="text-gray-300 text-sm min-w-[60px] text-center">
    Cancel
  </Link>
  <button
    type="submit"
    disabled={submitting}
    className="px-5 py-1.5 text-sm bg-blue-800 rounded-full text-white min-w-[80px]"
  >
    {submitting ? `${type}...` : type}
  </button>
</div>

      </form>
    </section>
  );
};

export default Form;
