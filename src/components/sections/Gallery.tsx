import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectModal } from '../ui/ProjectModal';

const projects = [
    {
        title: "Project Alpha",
        category: "Branding",
        img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop",
        year: "2023",
        color: "bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
    },
    {
        title: "Neon Nexus",
        category: "Web Design",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2400&auto=format&fit=crop",
        year: "2024",
        color: "bg-stone-900 dark:bg-black text-stone-100 dark:text-stone-300"
    },
    {
        title: "Void Scape",
        category: "Architecture",
        img: "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=2400&auto=format&fit=crop",
        year: "2022",
        color: "bg-neon-lime text-stone-900"
    },
    {
        title: "Cyber Form",
        category: "3D Art",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2400&auto=format&fit=crop",
        year: "2025",
        color: "bg-stone-400 dark:bg-stone-700 text-stone-900 dark:text-stone-100"
    }
];

function Card({ i, project, progress, range, targetScale, onClick }: any) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                onClick={() => onClick(project)}
                className={`relative flex flex-col w-full md:w-[95vw] h-[80vh] rounded-none border border-stone-400 dark:border-stone-600 origin-top cursor-pointer overflow-hidden ${project.color}`}
            >
                <div className="flex justify-between items-center p-8 md:p-12 border-b border-stone-400/20 dark:border-stone-600/20">
                    <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-center">{project.title}</h2>
                    <span className="font-body text-xl opacity-60">({project.year})</span>
                </div>

                <div className="relative w-full h-full overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full">
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                    </motion.div>
                </div>

                <div className="p-4 md:p-8 flex justify-between items-center bg-inherit">
                    <span className="font-display font-bold uppercase text-lg">{project.category}</span>
                    <span className="font-body uppercase text-sm underline">View Case Study</span>
                </div>
            </motion.div>
        </div>
    )
}

export function Gallery() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <section ref={container} className="mt-[20vh] mb-[20vh] px-4">
                <h1 className="font-display font-black text-[15vw] leading-none text-center sticky top-10 text-stone-200 dark:text-stone-800 z-0 mb-20 pointer-events-none opacity-50 transition-colors duration-700">
                    WORK
                </h1>
                {projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return (
                        <Card
                            key={i}
                            i={i}
                            project={project}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                            onClick={setSelectedProject}
                        />
                    );
                })}
            </section>

            <ProjectModal selectedProject={selectedProject} onClose={() => setSelectedProject(null)} />
        </>
    );
}
