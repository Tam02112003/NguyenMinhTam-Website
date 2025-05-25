import React from "react";
import { motion } from "framer-motion";
import StudentCard3DViewer from "../Card/StudentCard3D";
import Projects from "../Project/Project.js";
import Certificates from "../Certificate/Certificate.js";

const BodySection = () => {
  return (
    <div className="relative z-10">
      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
              <StudentCard3DViewer />
              <p className="text-gray-300 leading-relaxed mt-6">
                I'm Nguyen Minh Tam, a passionate Backend Developer currently
                pursuing Software Engineering at Ho Chi Minh City University of
                Technology. With 8 months of experience in Java, C# and various web
                technologies, I enjoy building functional systems and exploring new
                technologies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Education
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-8"
          >
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold text-white">
                Faculty of Information Technology
              </h3>
              <p className="text-blue-400 font-medium mt-2">
                Ho Chi Minh City University of Technology
              </p>
              <p className="text-gray-400 mt-1">Major in Software Engineering</p>
              <p className="text-gray-500 mt-2">09/2021 - 09/2025</p>
              <p className="text-gray-300 mt-2">Good Academic Performance</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Professional Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Professional Skills
              </h3>
              <ul className="space-y-4">
                {[
                  "Java (8 Months Experience)",
                  "Spring Boot MVC",
                  "HTML/CSS/JavaScript",
                  "SQL Server & MySQL",
                  "GitHub Version Control",
                  "OOP Concepts",
                  "Interface Design",
                ].map((skill, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-300"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Soft Skills
              </h3>
              <ul className="space-y-4">
                {[
                  "Communication Skills",
                  "Self-Learning Mindset",
                  "Effective Problem-Solving",
                  "English Reading Comprehension",
                  "Teamwork & Collaboration",
                ].map((skill, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-300"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects and Certificates */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <Projects />
          <Certificates />
        </div>
      </section>
    </div>
  );
};

export default BodySection;