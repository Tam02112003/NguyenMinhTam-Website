import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { fetchProjects, formatMonthYear } from "../../utils/api.js";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    getProjects();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative py-20 overflow-hidden bg-gray-900"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-16">
        Featured Projects
      </h2>

      {projects.length > 0 ? (
        <Slider {...settings} className="max-w-6xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="relative h-[500px]">
              {/* Background Image with Dark Overlay */}
              {project.imageUrl && (
                <div className="absolute inset-0">
                  <img
                    src={`${project.imageUrl}?q=80&w=1800`}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>
              )}

              {/* Floating Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative h-full flex flex-col justify-center p-12 text-white"
              >
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
                    {project.name}
                  </h3>
                  
                  <p className="text-blue-300 mb-6">
                    {formatMonthYear(project.startDate)} - {formatMonthYear(project.endDate)}
                  </p>
                  
                  <p className="text-gray-200 text-lg mb-8 leading-relaxed drop-shadow-md">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.technologies.split(",").map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm border border-white/20"
                      >
                        {tech.trim()}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.a
                      href={project.gitHubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg border border-white/20 transition-all"
                    >
                      <GithubIcon className="w-5 h-5 mr-2" />
                      View Code
                    </motion.a>
                    
                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        className="flex items-center px-6 py-3 bg-blue-600/90 hover:bg-blue-500 rounded-lg transition-all"
                      >
                        <ExternalLinkIcon className="w-5 h-5 mr-2" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-400">No projects available</p>
      )}
    </motion.div>
  );
};


// Helper Components
const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalLinkIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"/>
  </svg>
);

export default Projects;