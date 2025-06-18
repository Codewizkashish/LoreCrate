import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className="w-full px-6 md:px-10 pt-12 pb-16">
      <h1 className="text-left mb-4 text-2xl sm:text-5xl font-extrabold leading-[1.15]">
        <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-pink-500 bg-clip-text text-transparent">{name} Profile</span> 
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className='mt-10 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>

    </section>
  )
}

export default Profile