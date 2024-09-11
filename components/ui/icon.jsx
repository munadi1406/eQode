import {icons} from "lucide-react";

export default function Icon({ name, color, size, className }) {
  const LucideIcon = icons[name];
 

  if (!LucideIcon) {
    return null; // Atau render sesuatu yang lain sebagai fallback
  }

  return <LucideIcon color={color} size={size} className={className} />;
}
