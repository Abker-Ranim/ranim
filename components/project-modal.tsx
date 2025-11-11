"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    images: string[];
    demoUrl?: string;
    githubUrl?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-2">
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {project.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-purple-500 cursor-pointer"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About this project
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          {project.demoUrl && (
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Demo
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button
              asChild
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
