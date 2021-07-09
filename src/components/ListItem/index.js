import Image from 'next/image'
const ListItem = ({ data }) => {
  // const { data } = props
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl mt-3">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className='h-48 w-full object-cover md:w-48' src={data.article_cover} alt={data.author} ></img>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{data?.article_title}</a>
          <p className="mt-2 text-gray-500">{data?.article_abstract}</p>
        </div>
      </div>
    </div>
  )
}
export default ListItem
