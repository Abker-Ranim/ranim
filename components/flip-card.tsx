"use client"

import { useState } from "react"
import Image from "next/image"
import { Github } from "lucide-react"
import Link from "next/link"

interface FlipCardProps {
  title: string
  image: string
  description: string
  technologies: string[]
  category: string
  githubUrl: string
  onViewDetails: () => void
}

export function FlipCard({
  title,
  image,
  description,
  technologies,
  category,
  githubUrl,
  onViewDetails,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="w-full h-96 cursor-pointer perspective group snap-start"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side - Image and Title */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/50 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.1)",
          }}
        >
          {/* Image Background */}
          <div className="absolute inset-0 overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/80" />
          </div>

          {/* Title Overlay */}
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
              {title}
            </h3>
            <p className="text-sm text-purple-300 mt-2 font-semibold uppercase tracking-widest">{category}</p>
          </div>
        </div>

        {/* Back Side - Details */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/50 flex flex-col p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)",
          }}
        >
          {/* Content */}
          <div className="flex flex-col justify-between h-full">
            {/* Description and Tech */}
            <div>
              <p className="text-gray-200 text-sm mb-4 line-clamp-3">{description}</p>

              {/* Technologies */}
              <div>
                <p className="text-cyan-300 text-xs font-semibold mb-2 uppercase tracking-widest">Technologies</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-medium border border-cyan-500/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={onViewDetails}
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-semibold transition-all duration-300 text-sm shadow-lg shadow-purple-600/50"
              >
                View Project
              </button>
              <Link
                href={githubUrl}
                target="_blank"
                className="py-2 px-3 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded-lg font-semibold transition-all duration-300 border border-cyan-500/50 flex items-center justify-center"
              >
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
