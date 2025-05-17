import React from 'react'

const Links = () => {
  const usefulLinks = [
    {
      title: "My Blog Page",
      description: "",
      url: "https://mcskn.com"
    },
    {
      title: "My News Page Project",
      description: " ",
      url: "https://newsup.mcskn.com"
    },
    {
      title: "My Linkedin Page",
      description: "",
      url: "https://www.linkedin.com/in/mcsknyy/"
    },
    {
      title: "My Github Page",
      description: "",
      url: "https://github.com/mcskny"
    }
  ];

  return (
    <div className="min-h-screen bg-[#303030] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Relevant links</h1>
        
        <div className="grid gap-6">
          {usefulLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-[#202020] rounded-lg hover:bg-[#404040] transition-colors duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{link.title}</h2>
              <p className="text-gray-300">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Links 