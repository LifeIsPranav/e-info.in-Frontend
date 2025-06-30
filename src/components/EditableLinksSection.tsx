import { useState } from "react";
import {
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectLink, defaultProjects } from "@/lib/profileData";

interface EditableLinksectionProps {
  projects?: ProjectLink[];
  onProjectsUpdate: (projects: ProjectLink[]) => void;
  className?: string;
}

interface EditableLinkItemProps {
  project: ProjectLink;
  isEditing: boolean;
  onUpdate: (project: ProjectLink) => void;
  onDelete: () => void;
}

const EditableLinkItem = ({
  project,
  isEditing,
  onUpdate,
  onDelete,
}: EditableLinkItemProps) => {
  const [editingProject, setEditingProject] = useState<ProjectLink>(project);

  const handleFieldChange = (field: keyof ProjectLink, value: string) => {
    const updated = { ...editingProject, [field]: value };
    setEditingProject(updated);
    onUpdate(updated);
  };

  const handleDirectLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing && project.href) {
      window.open(project.href, "_blank", "noopener,noreferrer");
    }
  };

  if (isEditing) {
    return (
      <div className="bg-blue-50/50 border border-blue-200 rounded-xl transition-all duration-200 overflow-hidden">
        <div className="p-4 space-y-3">
          {/* Title and URL Row */}
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={editingProject.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              placeholder="Link title"
              className="text-sm bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
            <Input
              value={editingProject.href}
              onChange={(e) => handleFieldChange("href", e.target.value)}
              placeholder="https://..."
              className="text-sm bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <Input
            value={editingProject.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            placeholder="Short description"
            className="text-sm bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />

          {/* Project Details */}
          <Textarea
            value={editingProject.projectDetails}
            onChange={(e) =>
              handleFieldChange("projectDetails", e.target.value)
            }
            placeholder="Detailed description for expandable view"
            className="text-sm bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 min-h-[60px] resize-none"
          />

          {/* Image URL */}
          <Input
            value={editingProject.imageUrl || ""}
            onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
            placeholder="Image URL (optional)"
            className="text-sm bg-white border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />

          {/* Actions */}
          <div className="flex justify-between items-center pt-2 border-t border-blue-200">
            <Button
              onClick={onDelete}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
            <div className="flex items-center text-gray-400">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs ml-1">Drag to reorder</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white hover:bg-gray-50 border border-gray-100 rounded-xl transition-all duration-200 group shadow-sm overflow-hidden">
      <div className="flex">
        {/* Main content area */}
        <div className="flex-1 p-4 flex items-center gap-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors duration-200">
            {project.icon || <ExternalLink className="w-4 h-4 text-gray-600" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-gray-900 font-medium text-sm">
              {project.title}
            </div>
            {project.description && (
              <div className="text-gray-500 text-xs mt-0.5 truncate">
                {project.description}
              </div>
            )}
          </div>
        </div>

        {/* Direct link button */}
        <button
          onClick={handleDirectLink}
          className="p-4 border-l border-gray-100 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
        >
          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
};

export default function EditableLinksSection({
  projects = defaultProjects,
  onProjectsUpdate,
  className = "",
}: EditableLinksectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjects, setEditingProjects] =
    useState<ProjectLink[]>(projects);

  const handleStartEdit = () => {
    setEditingProjects([...projects]);
    setIsEditing(true);
  };

  const handleSave = () => {
    onProjectsUpdate(editingProjects);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingProjects([...projects]);
    setIsEditing(false);
  };

  const handleProjectUpdate = (index: number, updatedProject: ProjectLink) => {
    const updated = [...editingProjects];
    updated[index] = updatedProject;
    setEditingProjects(updated);
  };

  const handleProjectDelete = (index: number) => {
    const updated = editingProjects.filter((_, i) => i !== index);
    setEditingProjects(updated);
  };

  const handleAddProject = () => {
    const newProject: ProjectLink = {
      id: `custom-${Date.now()}`,
      title: "New Link",
      description: "Description",
      href: "https://example.com",
      projectDetails: "Detailed description here...",
    };
    setEditingProjects([...editingProjects, newProject]);
  };

  const currentProjects = isEditing ? editingProjects : projects;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Links</h2>
          <p className="text-gray-600 text-sm">
            {isEditing
              ? "Edit your links and social profiles"
              : "Connect through my various platforms"}
          </p>
        </div>

        <div className="ml-4">
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                onClick={handleCancel}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
              >
                <X className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                onClick={handleSave}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleStartEdit}
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
            >
              <Edit3 className="w-4 h-4 text-gray-600" />
            </Button>
          )}
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-2">
        {currentProjects.map((project, index) => (
          <EditableLinkItem
            key={project.id}
            project={project}
            isEditing={isEditing}
            onUpdate={(updated) => handleProjectUpdate(index, updated)}
            onDelete={() => handleProjectDelete(index)}
          />
        ))}

        {/* Add New Link Button */}
        {isEditing && (
          <button
            onClick={handleAddProject}
            className="w-full p-4 border-2 border-dashed border-blue-200 rounded-xl text-blue-500 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add New Link</span>
          </button>
        )}
      </div>
    </div>
  );
}
