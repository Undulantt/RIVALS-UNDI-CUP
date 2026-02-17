import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  icon?: string;
  href?: string;
  target?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  icon,
  href,
  target
}) => {
  // Base styles: skewed shape, orbitron/anton font, transition
  const baseStyles = "relative px-10 py-4 font-anton text-lg tracking-wider uppercase transform -skew-x-12 transition-all duration-300 group inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-0 text-decoration-none";
  
  // Variants configuration
  const variants = {
    // Primary: Red background, White text -> Hover: White background, Red text + Red Glow
    primary: "bg-rivals-red text-white hover:bg-white hover:text-rivals-red hover:shadow-[0_0_20px_rgba(230,36,41,0.6)]",
    
    // Secondary: Silver/White theme
    secondary: "bg-rivals-silver text-black hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
    
    // Outline: Transparent -> Hover: Red Text & Border
    outline: "bg-transparent text-white ring-2 ring-white/30 hover:ring-rivals-red hover:text-rivals-red hover:bg-black/80 backdrop-blur-md"
  };

  const content = (
    <>
      {/* Corrección de Skew para el texto y padding right para evitar corte de italic */}
      <div className="transform skew-x-12 flex items-center gap-2 italic pr-1">
        {icon && <i className={`${icon} text-lg`}></i>}
        <span>{children}</span>
      </div>
      
      {/* Decorative accent lines (Top Right / Bottom Left) */}
      {variant === 'outline' && (
        <>
           <div className="absolute top-0 right-0 w-3 h-1 bg-rivals-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="absolute bottom-0 left-0 w-3 h-1 bg-rivals-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </>
      )}
    </>
  );

  // Si existe href, renderizamos un <a>, si no, un <button>
  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={target === '_blank' ? "noopener noreferrer" : undefined}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;