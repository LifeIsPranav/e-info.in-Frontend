import { useState, useRef } from "react";
import EditableDigitalCard from "@/components/EditableDigitalCard";
import { PersonProfile } from "@/lib/profileData";

interface EditableProfileSectionProps {
  profile: PersonProfile;
  onProfileUpdate: (profile: PersonProfile) => void;
  className?: string;
}

export default function EditableProfileSection({
  profile,
  onProfileUpdate,
  className = "",
}: EditableProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState<PersonProfile>(profile);
  const digitalCardRef = useRef<{ handleOutsideClick: () => void }>(null);

  const handleStartEdit = () => {
    setEditingProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    onProfileUpdate(editingProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingProfile(profile);
    setIsEditing(false);
  };

  const handleProfileChange = (updatedProfile: PersonProfile) => {
    setEditingProfile(updatedProfile);
  };

  return (
    <div className={`w-full max-w-lg mx-auto space-y-6 ${className}`}>
      {/* Digital Card */}
      <div className="digital-card-container">
        <EditableDigitalCard
          ref={digitalCardRef}
          profile={isEditing ? editingProfile : profile}
          isEditing={isEditing}
          onEdit={handleStartEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onProfileChange={handleProfileChange}
        />
      </div>
    </div>
  );
}
