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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Featured Projects
      </h2>
      
      {projects.length > 0 ? (
        <Slider {...settings}>
          {projects.map((project) => (
            <div key={project.id} className="px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden"
              >
                {project.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <motion.img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {project.name}
                  </h3>
                  
                  <p className="text-blue-400 text-sm mb-4">
                    {formatMonthYear(project.startDate)} - {formatMonthYear(project.endDate)}
                  </p>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.split(",").map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                    >
                      View Code
                    </motion.a>
                    
                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
                      >
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
        <div className="text-center py-12 bg-white/5 backdrop-blur-xl rounded-2xl">
          <p className="text-gray-400 text-lg">No projects to display yet</p>
          <p className="text-gray-500 mt-2">Check back later for updates</p>
        </div>
      )}
    </motion.div>
  );
};

export default Projects;